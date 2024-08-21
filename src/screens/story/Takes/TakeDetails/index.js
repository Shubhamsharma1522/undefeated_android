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
  WP,
} from '../../../../services';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {
  connectToTakesComment,
  sendTakeMessage,
  subscribeToNewTakeReply,
} from '../../../../services/utilities/takeSockets';
import uuid from 'react-native-uuid';
import TakeNestedComponent from '../Components/TakeNestedComponent';
import TakeComponent from '../Components/TakeComponent';
import MeFullImageModal from '../../../../components/MeFullSizeImageModal';
import useTakesSocket from '../../../../hooks/useTakesSocket';
import {MeButton} from '../../../../components/MeButton';
import {
  getVideosToUpload,
  removeElementFromArray,
} from '../../../../services/helpers';
import HashTagList from '../../../../components/HashTagList';
import useHashtags from '../../../../hooks/useHashtags';
import MentionedUsersList from '../../../../components/MentionedUsersList';
import useMentionUser from '../../../../hooks/useMentionUser';
import RNFetchBlob from 'rn-fetch-blob';
import useTakesHelperFunction from '../../../../hooks/useTakesHelperFunctions';
const TakeDetails = props => {
  const dispatch = useDispatch();
  const {
    setShowHashtagsSuggestions,
    replaceHashtagsInTextMessage,
    showHashtagsSuggestions,
    detectCurrentHashtag,
    hashtags,
    detectAllHashtagsInText,
    setHashtagsDetected,
  } = useHashtags();
  const {
    mentionedUsers,
    replaceMentionedUsersInTextMessage,
    detectCurrentMentionedUser,
    showMentionSuggestions,
    setMentionDetected,
  } = useMentionUser();
  const {
    uploadImage,
    uploadVideo,
    isMediaUploadLoading,
    selectedMediaFile,
    setSelectedMediaFile,
  } = useTakesHelperFunction();
  const {isDisconnected} = useTakesSocket(
    'TAKES',
    false,
    'TakesDetails',
    props.navigation,
  );
  const {parentTake} = props.route.params;
  console.log('PROPS POSTS', parentTake);
  const [textMessage, setTextMessage] = useState('');
  const [selection, setSelection] = useState({start: 0, end: 0});
  const [takeDetails, setTakeDetails] = useState(null);
  const user = useSelector(state => state.auth.user);
  const [isEmojiOpen, setEmoji] = React.useState(false);
  const [showFullImg, setShowFullImg] = React.useState(false);
  const [height, setHeight] = React.useState(false);
  const [viewMoreRepliesState, setViewMoreReplies] = React.useState({
    state: false,
    takeId: '',
  });

  // const [selectedMediaFile, showSelectedImageInFullScreen] =
  //   React.useState({
  //     state: false,
  //     fullImageSource: '',
  //     loading: '',
  //     uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  //   });
  const textInputRef = useRef(null);
  const takesLoading = useSelector(state => state.story.takesLoading);
  // const [selectedMediaFile, setSelectedMediaFile] = React.useState({
  //   state: false,
  //   fullImageSource: [],
  //   loading: '',
  //   uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  // });

  useEffect(() => {
    subscribeToNewTakeReply(msg => {
      if (
        msg &&
        String(msg?.takesRootParentId) === String(parentTake?.takesRootParentId)
      ) {
        setTakeDetails(msg);
      }
    });
    connectToTakesComment({takeId: parentTake?._id}, setTakeDetails);
  }, [parentTake?._id]);

  console.log('TAKE_DETAILS>>', {takeDetails});
  const handleEmojiSelected = emoji => {
    const text = textMessage || '';
    const newText = `${text.slice(
      0,
      Number(selection.start),
    )}${emoji}${text.slice(Number(selection.end))}`;
    setTextMessage(newText);
  };
  const handleSelectionChange = event => {
    setSelection(event.nativeEvent.selection);
    setHeight(true);
    // setShowHashtagsSuggestions(true);
  };

  const handleOnChange = text => {
    if (text && typeof text === 'string') {
      setTextMessage(text);
      detectCurrentMentionedUser(selection, text, setTextMessage);
      detectCurrentHashtag(selection, text, parentTake?.sport, setTextMessage);
    } else {
      setShowHashtagsSuggestions(false);
      setTextMessage('');
    }
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
  const onSend = () => {
    console.log({takeDetails, textMessage});
    const hashtags = detectAllHashtagsInText(textMessage, parentTake?.sport);
    setTextMessage('');
    setSelectedMediaFile({
      state: false,
      fullImageSource: [],
      loading: '',
      uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
    });
    if (textMessage || selectedMediaFile?.fullImageSource?.length > 0) {
      sendTakeMessage(
        {
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
          takesRootParentId: takeDetails._id,
          sport: parentTake.sport,
          hashtags,
          senderData: {
            user: user.id,
            username: user.username,
            profile_image: user.profile_image_url,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          parentTake: parentTake,
        },
        () => {
          setEmoji(false);

          Keyboard.dismiss();
          // if (parentTake._id) {
          dispatch(
            TASKS.notifyUsersLikesDislike({
              sender_auth_token: user.id,
              receiver_slug: parentTake?.senderData?.user,
              notification_type: 'reply',
              takes_message: textMessage,
            }),
          );
          // }
        },
      );
      setHeight(false);
    }
  };
  const reConnectSocket = () => {
    setTimeout(() => {
      props.navigation.replace('TakeDetails', {parentTake});
    }, 1000);
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
  console.log({selectedMediaFile});
  // const ListData = [
  //   'Football',
  //   'Basketball',
  //   'Tennis',
  //   'Soccer',
  //   'Volleyball',
  //   'Sports',
  //   'Teamspirit',
  //   'Lorem',
  //   'i',
  //   'j',
  //   'k',
  // ];
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
              {takeDetails && takeDetails._id && (
                <TakeNestedComponent
                  parentTake={takeDetails}
                  showSelectedImageInFullScreen={setSelectedMediaFile}
                  setShowFullImg={setShowFullImg}
                />
              )}
              <View style={styles.commentHeading}>
                <Text style={styles.heading}>Replies</Text>
              </View>
              <View>
                <FlatList
                  data={takeDetails?.replies}
                  renderItem={({item}) => {
                    console.log('TKC', item);
                    if (item?.takesActiveStatus !== 'disable')
                      return (
                        <React.Fragment>
                          <View>
                            <TakeComponent
                              isOnPressActive={false}
                              parentTake={item}
                              showReactionContainer={true}
                              showCommentIcon={true}
                              showFireIcon={true}
                              showTrashIcon={true}
                              showSelectedImageInFullScreen={
                                setSelectedMediaFile
                              }
                              setShowFullImg={setShowFullImg}
                              selectedMediaFile={selectedMediaFile}
                            />
                            {item &&
                              item?.replies &&
                              item.replies.length > 0 &&
                              viewMoreRepliesState.state === false && (
                                <TouchableOpacity
                                  onPress={() =>
                                    setViewMoreReplies({
                                      state: true,
                                      takeId: item._id,
                                    })
                                  }>
                                  <View style={{marginLeft: 50}}>
                                    <Text style={{color: COLORS.appColour}}>
                                      View {item.replies.length} more replies
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                          </View>
                          {viewMoreRepliesState.state &&
                            viewMoreRepliesState.takeId == item._id && (
                              <FlatList
                                data={item?.replies}
                                renderItem={({item: subItem}) => {
                                  if (subItem?.takesActiveStatus !== 'disable')
                                    return (
                                      <View style={{marginLeft: 50}}>
                                        <TakeComponent
                                          parentTake={subItem}
                                          isOnPressActive={false}
                                          showReactionContainer={true}
                                          showCommentIcon={false}
                                          showFireIcon={true}
                                          showTrashIcon={true}
                                          showSelectedImageInFullScreen={
                                            setSelectedMediaFile
                                          }
                                          setShowFullImg={setShowFullImg}
                                          selectedMediaFile={selectedMediaFile}
                                        />
                                      </View>
                                    );
                                }}
                              />
                            )}
                          {item &&
                            item?.replies &&
                            item.replies.length > 0 &&
                            viewMoreRepliesState.state &&
                            viewMoreRepliesState.takeId == item._id && (
                              <TouchableOpacity
                                onPress={() =>
                                  setViewMoreReplies({
                                    state: false,
                                    takeId: '',
                                  })
                                }>
                                <View
                                  style={{marginLeft: 50, marginBottom: 10}}>
                                  <Text style={{color: COLORS.appColour}}>
                                    Hide Replies
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                        </React.Fragment>
                      );
                  }}
                  keyExtractor={item => item._id}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: FONTS.appFont,
                          color: COLORS.appColour,
                        }}>
                        No Replies Yet
                      </Text>
                    </View>
                  )}
                />
              </View>
            </MeWrapper>
          </ScrollView>

          {showHashtagsSuggestions && (
            <HashTagList
              data={hashtags}
              imageSelected={selectedMediaFile?.fullImageSource?.length > 0}
              onSelectHashTag={onSelectHashTag}
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
            <View>
              {selectedMediaFile?.fullImageSource?.length > 0 ? (
                <View style={styles.uploadedImageContainer}>
                  {selectedMediaFile.fullImageSource.map((image, index) => (
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
                        source={{uri: image}}
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
                  <ActivityIndicator style={styles.imageContainer} />
                </View>
              ) : null}
              <View style={styles.toolBarContainer}>
                <View style={styles.toolBar}>
                  {selectedMediaFile?.fullImageSource?.length > 0 &&
                    selectedMediaFile?.fullImageSource?.map(image => {
                      return <Image source={{uri: image}} />;
                    })}
                  <View>
                    <TextInput
                      ref={textInputRef}
                      placeholder={'Write your reply...'}
                      style={height ? styles.autoHeight : styles.inputContainer}
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
                      <Image
                        source={APPLICATION_IMAGES.sendImage}
                        style={styles.icons}
                      />
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
                      <Image
                        source={APPLICATION_IMAGES.sendVideo}
                        style={styles.icons}
                      />
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
export default TakeDetails;
const styles = StyleSheet.create({
  uploadedImage: {
    borderColor: COLORS.appColour,
    borderWidth: 1,
    // width: '100%',
    margin: 10,
    position: 'relative',
  },
  autoHeight: {
    maxHeight: 70,
    marginLeft: WP('5'),
    color: COLORS.black,
    width: WP('45'),
    fontSize: 16,
    backgroundColor: COLORS.white,
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
  //   zIndex: 10,
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
  inputContainer: {
    display: 'flex',
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
  },
  toolBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: COLORS.white,
    // borderTopColor: COLORS.lightGrey,
    // marginHorizontal: 15,
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
