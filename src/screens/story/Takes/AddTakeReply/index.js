import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {MeWrapper} from '../../../../components/MeWrapper';
import TakeComponent from '../Components/TakeComponent';
import MeBottomNavbar from '../../../../components/BottomNavbar';
import {MeHeader} from '../../../../components/MeHeader';
import {useDispatch, useSelector} from 'react-redux';
import * as TASKS from '../../../../store/actions/index';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  getPicture,
  HP,
  navigate,
  showToast,
  WP,
} from '../../../../services';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {
  connectToTakesComment,
  sendTakeMessage,
} from '../../../../services/utilities/takeSockets';
import uuid from 'react-native-uuid';
import {removeElementFromArray} from '../../../../services/helpers';
import MeFullImageModal from '../../../../components/MeFullSizeImageModal';
import useTakesSocket from '../../../../hooks/useTakesSocket';
import {MeButton} from '../../../../components/MeButton';
import HashTagList from '../../../../components/HashTagList';
import useHashtags from '../../../../hooks/useHashtags';
import useMentionUser from '../../../../hooks/useMentionUser';
import MentionedUsersList from '../../../../components/MentionedUsersList';
import useTakesHelperFunction from '../../../../hooks/useTakesHelperFunctions';
const AddTakeReply = props => {
  const {
    hashtags,
    setShowHashtagsSuggestions,
    replaceHashtagsInTextMessage,
    resetHashtagsList,
    showHashtagsSuggestions,
    detectCurrentHashtag,
    detectAllHashtagsInText,
    setHashtagsDetected,
  } = useHashtags();
  const {
    mentionedUsers,
    replaceMentionedUsersInTextMessage,
    detectCurrentMentionedUser,
    showMentionSuggestions,
    setMentionDetected,
    mentionedUsersDetected,
  } = useMentionUser();
  const {
    uploadImage,
    uploadVideo,
    isMediaUploadLoading,
    selectedMediaFile,
    setSelectedMediaFile,
  } = useTakesHelperFunction();
  const takesLoading = useSelector(state => state.story.takesLoading);

  const dispatch = useDispatch();
  const {isDisconnected} = useTakesSocket(
    'TAKES',
    false,
    'TakesAddToReply',
    props.navigation,
  );
  console.log('ADDTOREPLY_socket');
  const {parentTake, takesRootParentId} = props.route.params;
  const [textMessage, setTextMessage] = useState('');
  const [selection, setSelection] = useState({start: 0, end: 0});
  const user = useSelector(state => state.auth.user);
  const [isEmojiOpen, setEmoji] = React.useState(false);
  const [showFullImg, setShowFullImg] = React.useState(false);
  const [height, setHeight] = React.useState(false);
  // const [selectedMediaFile, setSelectedMediaFile] =
  //   React.useState({
  //     state: false,
  //     fullImageSource: '',
  //     loading: '',
  //     uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  //   });
  // const [selectedMediaFile, setSelectedMediaFile] = React.useState({
  //   state: false,
  //   fullImageSource: '',
  //   loading: '',
  //   uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  // });
  const textInputRef = useRef(null);
  useEffect(() => {
    // Focus the text input when the component mounts
    let timer;
    if (!takesLoading) {
      timer = setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 2000); // delay to ensure layout is complete
    }
    return () => timer && clearTimeout(timer);
  }, [takesLoading]);

  const handleEmojiSelected = emoji => {
    const text = textMessage || '';
    const newText = `${text.slice(
      0,
      Number(selection.start),
    )}${emoji}${text.slice(Number(selection.end))}`;
    setTextMessage(newText);
  };
  const handleSelectionChange = event => {
    console.log({selection_2: selection, s: event.nativeEvent.selection});
    setSelection(event.nativeEvent.selection);
    setHeight(true);
    // setShowHashtagsSuggestions(true);
  };

  const handleOnChange = text => {
    if (text && typeof text === 'string') {
      setTextMessage(text);
      detectCurrentHashtag(selection, text, parentTake?.sport, setTextMessage);
      detectCurrentMentionedUser(selection, text, setTextMessage);
    } else {
      setShowHashtagsSuggestions(false);
      setTextMessage('');
    }
  };
  const onSend = () => {
    setTextMessage('');
    setSelectedMediaFile({
      state: false,
      fullImageSource: '',
      loading: '',
      uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
    });
    const hashtags = detectAllHashtagsInText(textMessage, parentTake?.sport);
    console.log(
      'selectedMediaFile',
      selectedMediaFile,
      selectedMediaFile?.fullImageSource,
    );
    if (textMessage || selectedMediaFile?.fullImageSource?.length > 0) {
      const takeReplyObject = {
        userRole: user.role,
        takesMessage: textMessage,
        takesImg: selectedMediaFile?.fullImageSource,
        type: 'GROUP',
        takesUserId: user.id,
        takesType:
          textMessage &&
          textMessage.trim() !== '' &&
          selectedMediaFile?.fullImageSource.length > 0
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_WITH_TEXT
            : textMessage && textMessage.trim() !== ''
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.TEXT_ONLY
            : selectedMediaFile?.fullImageSource.length > 0
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_ONLY
            : 'NONE',
        takesUuid: uuid.v4(),
        takesParentId: parentTake._id,
        takesRootParentId: takesRootParentId,
        sport: parentTake.sport,
        hashtags,
        senderData: {
          user: user.id,
          username: user.username,
          profile_image: user.profile_image_url,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      };
      sendTakeMessage(takeReplyObject, () => {
        Keyboard.dismiss();
        setEmoji(false);
        props.navigation.goBack(null);
        dispatch(
          TASKS.notifyUsersLikesDislike({
            sender_auth_token: user.id,
            receiver_slug: parentTake?.senderData?.user,
            notification_type: 'reply',
            takes_message: textMessage,
          }),
        );
        showToast('Take Sent');
      });
      setHeight(false);
    }
  };
  const reConnectSocket = () => {
    console.log('ONRESH');
    setTimeout(() => {
      showToast('Refreshed!');
      // setRefreshState(false);
      props.navigation.replace('AddTakeReply', props);
    }, 1000);
  };
  const onSelectHashTag = hashtag => {
    setHashtagsDetected(prev => [...prev, hashtag]);
    setShowHashtagsSuggestions(false);
    const updatedHashtagMessage = replaceHashtagsInTextMessage(
      textMessage,
      selection,
      hashtag.hashtag,
    );
    setTextMessage(updatedHashtagMessage);
  };
  const onSelectMentionedUser = selectedMentionedUser => {
    console.log('onselecthashtag updatedHashtagMessage', selectedMentionedUser);
    const updatedHashtagMessage = replaceMentionedUsersInTextMessage(
      textMessage,
      selection,
      selectedMentionedUser.username,
    );
    setMentionDetected(prev => [...prev, selectedMentionedUser]);
    setTextMessage(updatedHashtagMessage);
  };

  return (
    <>
      <MeHeader
        showProfilePic={true}
        showlogo={true}
        profilePicUrl={user ? user.profile_image : null}
      />

      {!takesLoading && !showFullImg && (
        <KeyboardAvoidingView
          // eslint-disable-next-line react-native/no-inline-styles
          // style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            height: Dimensions.get('window').height,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 10}>
          <View style={styles.takesHeading}>
            <Text style={styles.takesHeadingText}>Takes</Text>
          </View>
          <ScrollView>
            <MeWrapper>
              {parentTake && parentTake._id && (
                <TakeComponent
                  parentTake={parentTake}
                  showReactionContainer={false}
                  showCommentIcon={true}
                  isOnPressActive={true}
                  setSelectedMediaFile={setSelectedMediaFile}
                  setShowFullImg={setShowFullImg}
                />
              )}
            </MeWrapper>
          </ScrollView>
          {/* selectedMediaFile?.fullImageSource?.length > 0 */}
          {/* <View style={{}}> */}
          {showHashtagsSuggestions && (
            <HashTagList
              data={hashtags}
              onSelectHashTag={onSelectHashTag}
              imageSelected={selectedMediaFile?.fullImageSource?.length > 0}
              closeHandler={() => setShowHashtagsSuggestions(false)}
            />
          )}
          {showMentionSuggestions && (
            <MentionedUsersList
              data={mentionedUsers}
              flag="CreateTakes"
              onSelectMentionedUser={onSelectMentionedUser}
              // setCurrentHashtag={setCurrentHashtag}
            />
          )}
          <View
            style={
              isEmojiOpen
                ? {
                    height: HP('40'),
                    width: '100%',
                    backgroundColor: COLORS.white,
                  }
                : {}
            }>
            {isEmojiOpen && (
              <EmojiSelector
                category={Categories.emotion}
                onEmojiSelected={emoji => handleEmojiSelected(emoji)}
                showSectionTitles={false}
                showSearchBar={false}
                columns={10}
              />
            )}
            {selectedMediaFile && (
              <View>
                {selectedMediaFile?.fullImageSource?.length > 0 ? (
                  <View style={styles.uploadedImageContainer}>
                    {selectedMediaFile.fullImageSource.map(({uri}, index) => (
                      <View style={styles.uploadedImage}>
                        <TouchableOpacity
                          style={styles.deleteIconParent}
                          onPress={() => {
                            const updatedArray = removeElementFromArray(
                              index,
                              selectedMediaFile.fullImageSource,
                            );
                            setSelectedMediaFile(prev => ({
                              ...prev,
                              fullImageSource: updatedArray,
                            }));
                          }}>
                          <Image
                            source={APPLICATION_IMAGES.cancel}
                            style={styles.deleteImage}
                          />
                        </TouchableOpacity>
                        <Image
                          source={{uri: uri}}
                          style={styles.imageContainer}
                        />
                      </View>
                    ))}
                    {isMediaUploadLoading ? (
                      <View style={styles.uploadedImage}>
                        <ActivityIndicator style={styles.imageContainer} />
                      </View>
                    ) : null}
                  </View>
                ) : isMediaUploadLoading ? (
                  <View style={styles.uploadedImageContainer}>
                    <View style={styles.uploadedImage}>
                      <ActivityIndicator style={styles.imageContainer} />
                    </View>
                  </View>
                ) : null}

                <View style={styles.toolBarContainer}>
                  <View style={styles.toolBar}>
                    <View>
                      <TextInput
                        ref={textInputRef}
                        placeholder={'Write your reply...'}
                        style={
                          height ? styles.autoHeight : styles.inputContainer
                        }
                        multiline={true}
                        numberOfLines={1}
                        value={textMessage}
                        onChangeText={text => handleOnChange(text)}
                        onSelectionChange={handleSelectionChange}
                        onFocus={() => {
                          if (isEmojiOpen) {
                            setEmoji(false);
                          }
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => uploadImage()}
                      disabled={
                        selectedMediaFile?.fullImageSource.length >= 4
                          ? true
                          : false
                      }>
                      <View style={styles.ImageIconContainer}>
                        {selectedMediaFile?.fullImageSource.length >= 4 ? (
                          <Image
                            source={APPLICATION_IMAGES.disableImage}
                            style={styles.icons}
                          />
                        ) : (
                          <Image
                            source={APPLICATION_IMAGES.sendImage}
                            style={styles.icons}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => uploadVideo()}
                      disabled={
                        selectedMediaFile?.fullImageSource.length >= 4
                          ? true
                          : false
                      }>
                      <View style={styles.ImageIconContainer}>
                        {selectedMediaFile?.fullImageSource.length >= 4 ? (
                          <Image
                            source={APPLICATION_IMAGES.disableImage}
                            style={styles.icons}
                          />
                        ) : (
                          <Image
                            source={APPLICATION_IMAGES.sendVideo}
                            style={styles.icons}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.emojiIconContainer}
                      onPress={() => {
                        Keyboard.dismiss();
                        setEmoji(!isEmojiOpen);
                      }}>
                      <Image
                        source={APPLICATION_IMAGES.smileImage}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => onSend()}>
                    <View style={styles.chatIcon}>
                      <Image
                        source={APPLICATION_IMAGES.sendChat}
                        style={styles.icons}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      )}

      {takesLoading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FONTS.appFont,
              color: COLORS.appColour,
            }}>
            Loading Takes...
          </Text>
        </View>
      )}

      {showFullImg && (
        <MeFullImageModal
          isVisible={selectedMediaFile.state}
          image={selectedMediaFile.fullImageSource}
          closeHandler={() => {
            setShowFullImg(false);
            setSelectedMediaFile({
              state: false,
              fullImageSource: '',
              loading: '',
              uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
            });
          }}
        />
      )}
      {!takesLoading && isDisconnected && (
        <View style={{marginBottom: 10}}>
          <MeButton onPress={reConnectSocket} title="Refresh Takes" />
        </View>
      )}

      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};
export default AddTakeReply;
const styles = StyleSheet.create({
  uploadedImage: {
    borderColor: COLORS.appColour,
    borderWidth: 1,
    // width: '100%',
    margin: 10,
    position: 'relative',
  },
  uploadedImageContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  // deleteImage: {
  //   width: 25,
  //   height: 25,
  //   position: 'absolute',
  //   top: -15,
  //   right: -15,
  // },
  deleteImage: {
    width: 20,
    height: 20,
    zIndex: 10,
  },
  deleteIconParent: {
    position: 'absolute',
    top: -5,
    right: -10,
    zIndex: 10,
  },
  inputContainer: {
    width: WP('45'),
    // margin: WP('1'),
    marginLeft: WP('5'),
    backgroundColor: COLORS.white,
    color: COLORS.black,
    padding: 0,
    // paddingTop: WP('1'),
    // overflow: 'hidden',
    fontSize: 16,
    maxHeight: HP('5'),
  },
  autoHeight: {
    maxHeight: 70,
    marginLeft: WP('5'),
    color: COLORS.black,
    width: WP('45'),
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  takesHeading: {
    width: '100%',
    marginTop: 10,
  },
  takesHeadingText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.appColour,
    fontWeight: 'bold',
    fontSize: 20,
  },
  chatIcon: {
    display: 'flex',
    height: WP('12'),
    width: WP('12'),
    // marginVertical:10,
    // borderRadius: 100,
    marginHorizontal: WP('2'),
  },
  ImageIconContainer: {
    height: WP('8'),
    width: WP('8'),
    margin: WP('1'),
    marginRight: WP('2'),
  },
  emojiIconContainer: {
    height: WP('10'),
    width: WP('10'),
    // margin: WP('1'),
  },
  icons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    // borderColor: COLORS.white,
    borderColor: COLORS.lightGrey,
    paddingVertical: 2,
    borderRadius: 50,
    marginLeft: 5,
    overflow: 'hidden',
  },
  toolBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    zIndex: 3,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    // textAlign: 'center',
    fontFamily: FONTS.appFont,
  },
  writeComment: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: COLORS.textFieldBorder,
    paddingHorizontal: 10,
  },
  // hr: {
  //   borderBottomColor: 'black',
  //   borderBottomWidth: 0.3,
  //   marginVertical: 20,
  // },
  commentHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  threadedComment: {
    width: '65%',
    // marginHorizontal: 'auto',
    marginLeft: 50,
  },
  threadedComment2: {
    width: '65%',
    // marginHorizontal: 'auto',
    marginLeft: 50,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
