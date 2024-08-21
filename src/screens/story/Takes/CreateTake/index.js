import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
  ActivityIndicator,
  Image
} from 'react-native';
import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  HP,
  WP,
} from '../../../../services';
import {MeInputField} from '../../../../components/MeInputField';
import {MeButton} from '../../../../components/MeButton';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import SportsList from './SportsList';
import {sendTakeMessage} from '../../../../services/utilities/takeSockets';
import uuid from 'react-native-uuid';
import * as TASKS from '../../../../store/actions/index';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {
  getVideosToUpload,
  removeElementFromArray,
} from '../../../../services/helpers';
import CreateTakeList from '../../../../components/CreateTakeList';
import MentionedUsersList_CreateTake from '../../../../components/MentionedUsersList_CreateTake';
import useHashtags from '../../../../hooks/useHashtags';
import useMentionUser from '../../../../hooks/useMentionUser';
import useTakesHelperFunction from '../../../../hooks/useTakesHelperFunctions';
const CreateTakes = props => {
  const {
    hashtags,
    replaceHashtagsInTextMessage,
    resetHashtagsList,
    showHashtagsSuggestions,
    detectCurrentHashtag,
    setShowHashtagsSuggestions,
    setHashtagsDetected,
    detectAllHashtagsInText,
  } = useHashtags();
  const {
    mentionedUsers,
    replaceMentionedUsersInTextMessage,
    detectCurrentMentionedUser,
    showMentionSuggestions,
    setMentionDetected,
    mentionedUsersDetected,
    detectAllMentionedUsersInText,
  } = useMentionUser();
  const {
    uploadImage,
    uploadVideo,
    isMediaUploadLoading,
    selectedMediaFile,
    setSelectedMediaFile,
  } = useTakesHelperFunction();
  const textInputRef = useRef(null);
  const user = useSelector(state => state.auth.user);
  const [selection, setSelection] = React.useState({start: 0, end: 0});

  const sportsList = useSelector(state => state.story.getSportsList);
  console.log('CREATE ===', sportsList);
  const dispatch = useDispatch();

  const [selectedSport, setSelectedSport] = React.useState('Sports');
  const [loading, setLoading] = React.useState(false);

  const [isEmojiOpen, setEmoji] = React.useState(false);
  const [shouldShowSportSelection, setShouldShowSportSelection] =
    React.useState(false);
  // console.log({selectedSport});
  const [textMessage, setTextMessage] = React.useState('');
  // const [selectedMediaFile, setSelectedMediaFile] = React.useState({
  //   state: false,
  //   fullImageSource: [],
  //   loading: '',
  //   uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  // });

  useEffect(() => {
    dispatch(TASKS.getSportList({contest_type: 'TAKES'}));
  }, []);

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
  };

  const onChangeTakes = text => {
    if (text && (typeof text === 'string' || text === '')) {
      setTextMessage(text);
      detectCurrentHashtag(selection, text, selectedSport, setTextMessage);
      detectCurrentMentionedUser(selection, text, setTextMessage);
    } else {
      setShowHashtagsSuggestions(false);
      setTextMessage('');
    }
  };
  const onChangeSportsType = selectedSportsType => {
    resetHashtagsList();
    setSelectedSport(selectedSportsType);
  };

  const onSelectHashTag = hashtag => {
    console.log('onselecthashtag updatedHashtagMessage', hashtag);
    const updatedHashtagMessage = replaceHashtagsInTextMessage(
      textMessage,
      selection,
      hashtag.hashtag,
    );
    setHashtagsDetected(prev => [...prev, hashtag]);
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
  const handleCreateTakeSubmit = () => {
    console.log({mentionedUsersDetected});
    setLoading(true);
    const hashtags = detectAllHashtagsInText(textMessage, selectedSport);
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
          selectedMediaFile?.fullImageSource?.length > 0
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_WITH_TEXT
            : textMessage && textMessage.trim() !== ''
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.TEXT_ONLY
            : selectedMediaFile?.fullImageSource.length > 0
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_ONLY
            : 'NONE',
        takesUuid: uuid.v4(),
        takesParentId: null,
        sport: selectedSport,
        hashtags: hashtags,
        mentionedUsers: mentionedUsersDetected,
        senderData: {
          user: user.id,
          username: user.username,
          profile_image: user.profile_image_url,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      },
      async () => {
        setLoading(false);
        const mentionedUsersInTextMessage = await detectAllMentionedUsersInText(
          textMessage,
        );
        if (mentionedUsersInTextMessage) {
          dispatch(
            TASKS.notifyMentionedUsers({
              sender_auth_token: user.id,
              receiver_slug: 'all',
              notification_type: 'create',
              takes_message: textMessage,
              // sendNotificationsToAll: true,
            }),
          );
        } else {
          console.log({mentionedUsersInTextMessage});
          mentionedUsersDetected &&
            mentionedUsersDetected.length > 0 &&
            Promise.all(
              mentionedUsersDetected.map(({slug}) => {
                console.log({slug});
                return new Promise((resolve, reject) => {
                  try {
                    resolve(
                      dispatch(
                        TASKS.notifyMentionedUsers({
                          sender_auth_token: user.id,
                          receiver_slug: slug,
                          notification_type: 'create',
                          takes_message: textMessage,
                          sendNotificationsToAll: false,
                        }),
                      ),
                    );
                  } catch (err) {
                    reject(err);
                  }
                });
              }),
            );
        }
        props.closeHandler();
      },
    );
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.closeHandler}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 10}>
            <View>
              <TouchableOpacity
                style={styles.modalCloser}
                onPress={props.closeHandler}>
                <Image
                  source={APPLICATION_IMAGES.close}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <View style={styles.subContainer}>
                <View style={styles.topLeftBorder} />
                <View style={styles.topRightBorder} />
                <View style={styles.leftTriangle} />
                <View style={styles.rightTriangle} />
                {props?.isDisconnected ? (
                  <MeButton
                    onPress={props?.reConnectSocket}
                    title="Refresh Take"
                  />
                ) : !shouldShowSportSelection ? (
                  <View style={styles.card}>
                    <View style={styles.mainContent}>
                      <View style={styles.take}>
                        <Image
                          source={{uri: user && user.profile_image_url}}
                          alt="user"
                          style={styles.userImage}
                        />
                        <MeButton
                          title={selectedSport}
                          containerStyles={styles.sportSelectionBtnContainer}
                          textStyles={styles.sportSelectionBtnText}
                          onPress={() => {
                            setShouldShowSportSelection(
                              !shouldShowSportSelection,
                            );
                          }}
                        />
                      </View>
                      <View
                        style={{
                          overflow: 'hidden',
                          paddingHorizontal: 15,
                          paddingTop: 10,
                          paddingBottom: 40,
                          height:
                            showHashtagsSuggestions || showMentionSuggestions
                              ? '100%'
                              : selectedMediaFile.fullImageSource?.length > 0
                              ? '50%'
                              : isMediaUploadLoading
                              ? '50%'
                              : '100%',
                        }}>
                        <MeInputField
                          ref={textInputRef}
                          placeholder="What’s your Take? "
                          multiline={true}
                          onFocus={() => {
                            if (isEmojiOpen) {
                              setEmoji(false);
                            }
                          }}
                          style={
                            showHashtagsSuggestions || showMentionSuggestions
                              ? styles.takeMessageFieldwithList
                              : styles.takeMessageField
                          }
                          onChange={text => onChangeTakes(text)}
                          onSelectionChange={handleSelectionChange}
                          value={textMessage}
                          numberOfLines={6}
                        />
                        <View style={styles.listContainer}>
                          {showHashtagsSuggestions && (
                            <CreateTakeList
                              data={hashtags}
                              flag="CreateTakes"
                              onSelectHashTag={onSelectHashTag}
                            />
                          )}
                          {showMentionSuggestions && (
                            <MentionedUsersList_CreateTake
                              data={mentionedUsers}
                              flag="CreateTakes"
                              onSelectMentionedUser={onSelectMentionedUser}
                              // setCurrentHashtag={setCurrentHashtag}
                            />
                          )}
                        </View>
                      </View>
                      {(!showHashtagsSuggestions || !showMentionSuggestions) &&
                      selectedMediaFile &&
                      selectedMediaFile.fullImageSource &&
                      selectedMediaFile.fullImageSource?.length > 0 ? (
                        <View style={styles.uploadedImageContainer}>
                          {selectedMediaFile.fullImageSource.map(
                            ({uri, type}, index) => (
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

                                {type === 'image' && (
                                  <Image
                                    source={{uri: uri}}
                                    style={styles.imageContainer}
                                  />
                                )}
                                {type === 'video' && (
                                  <Image
                                    source={{
                                      uri: 'https://undefeatedimages.s3.amazonaws.com/takes/parentTake/thumbnails/video-thumbnail.png',
                                    }}
                                    style={styles.imageContainer}
                                  />
                                )}
                              </View>
                            ),
                          )}
                          {isMediaUploadLoading && (
                            <View style={styles.uploadedImage}>
                              <ActivityIndicator
                                style={styles.imageContainer}
                              />
                            </View>
                          )}
                        </View>
                      ) : isMediaUploadLoading ? (
                        <View style={styles.uploadedImageContainer}>
                          <View style={styles.uploadedImage}>
                            <ActivityIndicator style={styles.imageContainer} />
                          </View>
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.footer}>
                      <View style={styles.footerLeftTriangle} />
                      <View style={styles.footerRightTriangle} />
                      <View style={styles.addAttachments}>
                        <TouchableOpacity
                          onPress={uploadImage}
                          style={[styles.attachmentImage, {paddingRight: 8}]}
                          disabled={
                            selectedMediaFile.fullImageSource?.length >= 4
                              ? true
                              : false
                          }>
                          {selectedMediaFile?.fullImageSource?.length >= 4 ? (
                            <Image
                              source={APPLICATION_IMAGES.disableImage}
                              alt="image"
                              style={styles.attachmentIconImage}
                            />
                          ) : (
                            <Image
                              source={APPLICATION_IMAGES.ImagePicker_white}
                              alt="image"
                              style={styles.attachmentIconImage}
                            />
                          )}
                        </TouchableOpacity>

                        <View
                          style={{
                            width: 0.5,
                            height: '60%',
                            backgroundColor: COLORS.white,
                            transform: [{skewY: '-10deg'}],
                          }}
                        />
                        <TouchableOpacity
                          onPress={uploadVideo}
                          style={[
                            styles.attachmentImage,
                            {paddingHorizontal: 8},
                          ]}
                          disabled={
                            selectedMediaFile.fullImageSource?.length >= 4
                              ? true
                              : false
                          }>
                          {selectedMediaFile?.fullImageSource?.length >= 4 ? (
                            <Image
                              source={APPLICATION_IMAGES.disableImage}
                              alt="image"
                              style={styles.attachmentIconImage}
                            />
                          ) : (
                            <Image
                              source={APPLICATION_IMAGES.sendVideoWhiteIcon}
                              alt="image"
                              style={styles.attachmentIconImage}
                            />
                          )}
                        </TouchableOpacity>

                        <View
                          style={{
                            width: 0.5,
                            height: '60%',
                            backgroundColor: COLORS.white,
                            transform: [{skewY: '-10deg'}],
                          }}
                        />
                        {/* <TouchableOpacity
                          style={[styles.attachmentImage, {paddingLeft: 12}]}
                          onPress={() => {
                            Keyboard.dismiss();
                            setEmoji(!isEmojiOpen);
                          }}> */}
                          <Image
                            source={APPLICATION_IMAGES.emoji_white}
                            style={styles.attachmentIconImage}
                            onPress={() => {
                              Keyboard.dismiss();
                              setEmoji(!isEmojiOpen);
                            }}
                          />
                        {/* </TouchableOpacity> */}
                      </View>
                      <MeButton
                        title="Drop Take"
                        disabled={
                          textMessage?.length > 0
                            ? false
                            : selectedMediaFile?.fullImageSource &&
                              selectedMediaFile?.fullImageSource?.length > 0
                            ? false
                            : true
                        }
                        containerStyles={styles.createTakebtnContainer}
                        textStyles={styles.createTakebtnText}
                        onPress={handleCreateTakeSubmit}
                        lumper={loading}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.sportSelectionContainer}>
                    <SportsList
                      itemHeight={50}
                      sportsList={
                        sportsList && sportsList?.length > 0
                          ? sportsList.reduce((acc, item) => {
                              acc[item.value] = item.value;
                              return acc;
                            }, {})
                          : {}
                      }
                      selectedSport={selectedSport}
                      setSport={sport => onChangeSportsType(sport)}
                      hideSportSelection={() =>
                        setShouldShowSportSelection(false)
                      }
                    />
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
          <View
            style={
              isEmojiOpen
                ? {
                    height: HP('30'),
                    width: '100%',
                    backgroundColor: COLORS.white,
                    position: 'absolute',
                    bottom: 0,
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
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </>
  );
};

const borderColor = COLORS.appColour;

export default CreateTakes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    backgroundColor: '#000000AA',
  },
  modalCloser: {
    justifyContent: 'flex-end',
    width: '99%',
    alignItems: 'flex-end',
    marginBottom: 10,
    // position: 'absolute',
    // top: -50,
    // right: 0,
  },
  listContainer: {
    marginBottom: 100,
    width: '100%',
    // maxHeight:'55%',
  },
  ModalContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  icons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  keyboardicons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  emojiIconContainer: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  topLeftBorder: {
    position: 'absolute',
    top: -22,
    left: -8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderLeftWidth: WP('50'),
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: borderColor,
    borderLeftColor: 'transparent',
  },
  topRightBorder: {
    position: 'absolute',
    top: -22,
    right: -8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: WP('50'),
    borderLeftWidth: 0,
    borderBottomWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: borderColor,
    borderLeftColor: 'transparent',
  },
  subContainer: {
    backgroundColor: COLORS.white,
    borderColor: borderColor,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    height: 350,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTriangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 400 - 65,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: borderColor,
    borderLeftColor: 'transparent',
  },
  rightTriangle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 15,
    borderBottomWidth: 400 - 65,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: borderColor,
    borderLeftColor: 'transparent',
  },
  card: {
    width: '90%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  mainContent: {
    flex: 1,
  },
  take: {
    paddingHorizontal: 8,
    paddingTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 0,
  },
  userImage: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 50,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeMessageField: {
    color: COLORS.black,
    height: '90%',
    width: '100%',
    textAlignVertical: 'top',
    margin: 0,
    borderRadius: 8,
    paddingTop: 10,
    fontFamily: FONTS.appFont,
    fontSize: 14,
  },
  takeMessageFieldwithList: {
    color: COLORS.black,
    maxHeight: 100,
    width: '100%',
    textAlignVertical: 'top',
    borderRadius: 8,
    margin: 0,
    paddingTop: 10,
    fontFamily: FONTS.appFont,
    fontSize: 14,
  },
  addAttachments: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
  },
  attachmentImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: WP('1'),
    maxHeight:25
  },
  attachmentIconImage: {
    width: 25,
    aspectRatio: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.appColour,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  footerLeftTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 40,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.white,
    borderLeftColor: 'transparent',
  },
  footerRightTriangle: {
    position: 'absolute',
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 40,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.white,
    borderLeftColor: 'transparent',
  },
  sportSelectionBtnContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.appColour,
    backgroundColor: COLORS.white,
  },
  sportSelectionBtnText: {
    color: COLORS.appColour,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
  },
  sportSelectionContainer: {
    width: '80%',
  },
  createTakebtnContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  createTakebtnText: {
    color: COLORS.appColour,
    fontSize: WP('4.5'),
    fontFamily: FONTS.appFont,
  },
  uploadedImage: {
    borderColor: COLORS.appColour,
    borderWidth: 1,
    // width: '100%',
    marginRight: 10,
    position: 'relative',
  },
  uploadedImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  deleteImage: {
    width: 20,
    height: 20,
  },
  deleteIconParent: {
    position: 'absolute',
    top: -5,
    right: -10,
    zIndex: 10,
  },
});
