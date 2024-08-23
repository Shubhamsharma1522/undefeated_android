import React, {
  Component,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {COLORS, HP, getPicture} from '../../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {MeHeader} from '../../../../../components/MeHeader';
import ChatBox from '../../../../../components/chatBox';
import {APPLICATION_CONSTANTS, APPLICATION_IMAGES} from '../../../../../services';
import {styles} from './styles';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import useChatSocket from '../../../../../hooks/useChatSocket';
import {sendMessage} from '../../../../../services/utilities/sockets/index';
import uuid from 'react-native-uuid';
import * as TASKS from '../../../../../store/actions/index';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import ShowFullImg from '../../../showFullImg';
import {MeButton} from '../../../../../components/MeButton';
import useChatCache from '../../../../../hooks/useChatCache';

// import EmojiPicker from 'rn-emoji-keyboard';
const ChatAndNewsScreen = props => {
  console.log("props>>ChatAndNewsScreen",props)
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const textInputRef = useRef(null);
  const [isEmojiOpen, setEmoji] = React.useState(false);
  const [imageInFullScreen, showImageInFullScreen] = React.useState({
    state: false,
    fullImageSource: '',
    loading: '',
    uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  });
  const [selection, setSelection] = useState({start: 0, end: 0});

  const {params} = props.route.params;
  const {isDisconnected, socket} = useChatSocket(
    params?.groupData ? params?.groupData.slug : null,
    false,
    'Contest',
  );
  useChatCache(socket, params?.groupData?.slug, isDisconnected);

  const {user} = useSelector(state => state.auth);
  // let chatMessages = useSelector(state => state.story.messages);
  let messages = useSelector(state => state.story.messages);
  console.log({messages});
  const chatLoading = useSelector(state => state.story.chatLoading);

  const [textMessage, setTextMessage] = useState('');

  const scrollToBottom = () => {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }
  };
  useMemo(() => {
    if (messages && messages?.length > 0 && !chatLoading) {
      setTimeout(() => scrollToBottom(), 1000);
    }
  }, [chatLoading, messages, messages?.length]);
  useEffect(() => {
    // scrollToBottom();
    setTimeout(() => scrollToBottom(), 1000);
  }, []);

  const handleOnChange = text => {
    setTextMessage(text);
    // this.setState({
    //   msgValue: text,
    // });
  };
  const changeImage = () => {
    // generatePresingedUrl
    console.log('contest upload image ==>');
    getPicture(
      async image => {
        console.log('showing getted image', image);
        let chatImage = 'data:image/jpeg;base64,' + image.uri.data;

        showImageInFullScreen(prevState => ({
          ...prevState,
          state: true,
          loading: 'STARTED',
          uploadMode: true,
        }));
        const presignedUri = await dispatch(
          TASKS.generatePresingedUrl({
            auth_token: user.auth_token,
            imageData: chatImage,
            filePath: `chat/${params?.groupData.slug}/images/${uuid.v4()}`,
          }),
        );
        console.log({presignedUri});
        showImageInFullScreen({
          state: true,
          fullImageSource: presignedUri?.Location
            ? presignedUri?.Location
            : chatImage,
          uploadMode: true,
          loading: 'STOPED',
        });
      },
      error => {
        // showToast(APPLICATION_CONSTANTS.imageNotPossible);
      },
    );
  };
  console.log({imageInFullScreen});
  const imgTap = chatImg => {
    // props.navigation.navigate('ShowFullImg', {
    //   img: chatImg,
    // });
    showImageInFullScreen({
      state: true,
      fullImageSource: chatImg,
      uploadMode: false,
    });
  };
  // console.log('UUID>>', imageInFullScreen);

  const onSend = (chatImage = '') => {
    const messageContainsImage =
      imageInFullScreen.state === true &&
      imageInFullScreen.uploadMode === true &&
      imageInFullScreen.fullImageSource;

    console.log('auth data role', user, textMessage, chatImage);
    if (textMessage.trim() !== '' || chatImage !== '' || messageContainsImage) {
      setTextMessage('');
      const msgObject = {
        user: user.id,
        role: user.role,
        message: textMessage,
        img: messageContainsImage
          ? imageInFullScreen.fullImageSource
          : chatImage,
        messageType:
          textMessage && textMessage.trim() !== '' && messageContainsImage
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_WITH_TEXT
            : textMessage && textMessage.trim() !== ''
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.TEXT_ONLY
            : messageContainsImage
            ? APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_ONLY
            : 'NONE',
        isDelivered: false,
        createdAt: new Date(),
        id: uuid.v4(),
        chatId: params?.groupData.slug,
        senderData: {
          user: user.id,
          username: user.username,
          profile_image: user.profile_image_url,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      };
      dispatch({
        type: 'GET_MESSAGE',
        payload: msgObject,
      });
      console.log(
        '🚀 ~ file: index.tsx:75 ~ onSend ~ isDisconnected',
        isDisconnected,
        {...msgObject, dispatch},
      );
      if (!isDisconnected) {
        sendMessage({...msgObject, dispatch});
        showImageInFullScreen({
          state: false,
          fullImageSource: '',
          uploadMode: false,
        });
        setEmoji(false);
      }
      setTimeout(() => scrollToBottom(), 1000);
      // scrollToBottom();
      // handleScrollToElement();
      // }, 2000);
    } else {
      return;
    }
  };
  let prevSenderId = null;
  const handleEmojiSelected = emoji => {
    // setCount();
    // setCount(prevState => {
    //   // Update state based on previous state
    //   return count + 1;
    // });
    // const deepCopy = {...selection};
    // setSelection(prev => ({
    //   ...prev,
    //   start: deepCopy.start + 1,
    //   end: deepCopy.end + 1,
    // }));
    // console.log(
    //   {selection: selection},
    //   selection.start,
    //   Number(selection.start) + 1,
    //   count + 1,
    // );
    // setCurrentlySelectedEmojis(prev => [...prev, emoji.name]);
    // Keyboard.dismiss();
    const text = textMessage || '';
    const newText = `${text.slice(
      0,
      Number(selection.start),
    )}${emoji}${text.slice(Number(selection.end))}`;
    setTextMessage(newText);
  };
  // console.log({Em: currentlySelectedEmojis});
  const handleSelectionChange = event => {
    console.log({selection_2: selection, s: event.nativeEvent.selection});
    setSelection(event.nativeEvent.selection);
  };
  const showChatFooter = () => (
    <View
      style={
        isEmojiOpen
          ? {height: HP('40'), width: '100%', backgroundColor: COLORS.white}
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
      <View style={styles.toolBarContainer}>
        <View style={styles.toolBar}>
          <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <TextInput
                ref={textInputRef}
                placeholder={"What's Your Take?"}
                style={[styles.inputContainer]}
                multiline={true}
                numberOfLines={6}
                value={textMessage}
                onChangeText={text => {
                  handleOnChange(text);
                }}
                onSelectionChange={handleSelectionChange}
                onFocus={() => {
                  if (isEmojiOpen) {
                    setEmoji(false);
                  }
                }}
              />
            </TouchableWithoutFeedback>
          </View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setEmoji(!isEmojiOpen);
            }}>
            <View style={styles.emojiIconContainer}>
              {isEmojiOpen ? (
                <View style={styles.emojiIconContainer}>
                  <Image
                    source={APPLICATION_IMAGES.keyboardIcon}
                    style={styles.keyboardicons}
                  />
                </View>
              ) : (
                <Image
                  source={APPLICATION_IMAGES.smileImage}
                  style={styles.icons}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmoji(false);
              changeImage();
            }}>
            <View style={styles.ImageIconContainer}>
              <Image
                source={APPLICATION_IMAGES.sendImage}
                style={styles.icons}
              />
            </View>
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
  );
  // console.log({chatMessages, messages});
  const onRefresh = () => {
    props.navigation.replace('ChatAndNewsScreen', {
      groupData: params?.groupData,
      standings: 'private',
    });
    // socket ? socket.connect() : establishSocketConnection();
  };
  const showRefreshChat = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: HP('8'),
          borderTopWidth: 1,
          borderTopColor: COLORS.black,
        }}>
        <MeButton
          title={'Refresh Chat'}
          onPress={onRefresh}
          // lumper={true}
          // containerStyles={styles.btnContainer}
          // textStyles={styles.buttonTitle}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10}>
      <MeHeader
        showlogo={true}
        showNotficaion={false}
        showProfilePic={true}
        profilePicUrl={user ? user.profile_image : null}
        title={'Undefeated.Live'}
      />
      <View>
        <View style={styles.chatCardHeader}>
          <View style={styles.chatCardHeaderText}>
            <Text allowFontScaling={false} style={styles.chatHeaderTitle}>
              {params?.standings === 'private'
                ? params?.groupData?.title
                : params?.person?.username}
            </Text>
            {params?.groupData?.team_one && params?.groupData?.team_two ? (
              <Text allowFontScaling={false} style={styles.chatHeaderSubTitle}>
                {params?.groupData?.team_one +
                  ' V/S ' +
                  params?.groupData?.team_two}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      {imageInFullScreen.state ? (
        <React.Fragment>
          <ScrollView>
            {imageInFullScreen?.loading === 'STARTED' ? (
              <View
                style={{
                  height:
                    user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
                      ? HP('90')
                      : HP('75'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Loading Image..</Text>
              </View>
            ) : (
              <ShowFullImg
                img={imageInFullScreen.fullImageSource}
                onPressCancel={() => {
                  showImageInFullScreen(false);
                  setTimeout(() => scrollToBottom(), 1000);
                }}
              />
            )}
          </ScrollView>
          {imageInFullScreen.uploadMode && showChatFooter()}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {chatLoading ? (
            <View
              style={{
                height:
                  user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
                    ? HP('90')
                    : HP('70'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Loading Chat..</Text>
            </View>
          ) : (
            <React.Fragment>
              <ScrollView ref={scrollViewRef}>
                <View style={{padding: 10}}>
                  {messages && messages?.length > 0 ? (
                    messages.map((item, index) => {
                      // console.log({item});
                      const isSameSender = item.user === prevSenderId;
                      prevSenderId = item.user;

                      if (item?.connection === params?.groupData?.slug) {
                        return (
                          <ChatBox
                            messageObject={item}
                            key={index}
                            msg={item.message}
                            isCurrentUser={item.user === user.id}
                            userName={item?.senderData?.username}
                            profileImage={item?.senderData?.profile_image}
                            img={item?.img}
                            onImgTap={() => {
                              imgTap(item.img);
                            }}
                            continueMsg={isSameSender}
                            index={index}
                            messages={messages}
                            uuid={user.auth_token}
                            // uuid={item?.senderData?.id}
                            userId={item?.senderData?.user}
                          />
                        );
                      }
                    })
                  ) : (
                    <View
                      style={{
                        height:
                          user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
                            ? HP('90')
                            : HP('75'),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>No Message Yet</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
              {!chatLoading && isDisconnected && showRefreshChat()}
              {showChatFooter()}
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatAndNewsScreen;
