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
} from 'react-native';
import {COLORS, HP, getPicture} from '../../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import ChatBox from '../../../../../components/chatBox';
import {APPLICATION_CONSTANTS, APPLICATION_IMAGES} from '../../../../../services';
import {styles} from './styles';
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
  // const [count, setCount] = useState(0);
  const params = props?.navigation?.state?.params
    ? props.route.params.params
    : props.params;
  console.log('PARAMS INSIDE>>> HUDDLE', {params: params});
  const {isDisconnected, socket} = useChatSocket(
    params.groupData ? params.groupData.slug : null,
    false,
    'Huddle',
  );
  useChatCache(socket, params?.groupData?.slug, isDisconnected);
  console.log({params: params});
  console.log('SCOKET GETING DATA >> DISCONECTED', isDisconnected);
  // const [chatMessages, setMessages] = useState([]);
  // const [currentlySelectedEmojis, setCurrentlySelectedEmojis] = useState([]);

  // useChatReceivers({ chatId });
  const {user} = useSelector(state => state.auth);
  console.log({user});
  let messages = useSelector(state => state.story.messages);
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
            filePath: `chat/${params.groupData.slug}/images/${uuid.v4()}`,
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
  // const changeImage = () => {
  //   // generatePresingedUrl
  //   console.log('contest upload image ==>');
  //   getPicture(
  //     async image => {
  //       console.log('showing getted image', image);
  //       // const presignedUri = await dispatch(
  //       //   TASKS.generatePresingedUrl({
  //       //     auth_token: user.auth_token,
  //       //     fileName: image.uri.fileName,
  //       //     fileType: image.uri.type,
  //       //   }),
  //       // );
  //       // console.log({presignedUri});
  //       // const formData = new FormData();
  //       // formData.append('file', {
  //       //   uri: image.uri.uri,
  //       //   type: image.uri.type, // Set the appropriate content type here, like 'image/jpeg' or 'video/mp4'
  //       //   name: image.fileName, // Set the filename here
  //       // });
  //       // const myHeaders = new Headers({'Content-type': image.uri.type});
  //       // const response = await fetch(presignedUri, {
  //       //   method: 'PUT',
  //       //   // headers: myHeaders,
  //       //   body: formData,
  //       // });
  //       // console.log({response});
  //       // this.setState({
  //       //   image: image.uri.uri,
  //       //   uploadingPath: 'data:image/jpeg;base64,' + image.uri.data,
  //       // });

  //       let chatImage = 'data:image/jpeg;base64,' + image.uri.data;

  //       // onSend(chatImage);
  //       showImageInFullScreen({
  //         state: true,
  //         fullImageSource: chatImage,
  //         uploadMode: true,
  //       });
  //       // const {params} = this.props.route.params;

  //       // // console.log('showing params before sending in on send method', params);
  //       // let messagePrivateBody = {
  //       //   auth_token: user.auth_token,
  //       //   receiver_id: params.groupData ? params.groupData.slug : null,
  //       //   message: 'image',
  //       //   message_type: 2, // Individual = 1, Group = 2,
  //       // };

  //       // let auth_token = user.auth_token;
  //       // let receiver_id = params.groupData ? params.groupData.slug : null;

  //       // // let imageUrl = this.user?.profile_image;
  //       // let username = user.username;
  //       // if (msgType === 'group') {
  //       // groupsenderMsg(
  //       //   this.state.msgValue,
  //       //   auth_token,
  //       //   receiver_id,
  //       //   source,
  //       //   imageUrl,
  //       //   username,
  //       // )
  //       //   .then(() => {
  //       //     this.props.sendMessage(messagePrivateBody); //for oneSignal notification
  //       //   })
  //       //   .catch(err => console.log(err));
  //     },
  //     error => {
  //       // showToast(APPLICATION_CONSTANTS.imageNotPossible);
  //     },
  //   );
  // };

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
  console.log('UUID>>', imageInFullScreen);
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
        chatId: params.groupData.slug,
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
        '🚀  file: index.tsx:75  onSend ~ isDisconnected',
        isDisconnected,
        {...msgObject, dispatch},
      );
      if (!isDisconnected) {
        sendMessage({...msgObject, dispatch, notifyOnMessageSent});
        showImageInFullScreen({
          state: false,
          fullImageSource: '',
          uploadMode: false,
          loading: '',
        });
        setEmoji(false);
      }
      scrollToBottom();
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
          // containerStyles={styles.btnContainer}
          // textStyles={styles.buttonTitle}
        />
      </View>
    );
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
      <View>
        <View style={styles.toolBarContainer}>
          <View style={styles.toolBar}>
            <View>
              <TextInput
                ref={textInputRef}
                placeholder={"What's Your Take?"}
                style={[styles.inputContainer]}
                multiline={true}
                numberOfLines={1}
                value={textMessage}
                onChangeText={text => handleOnChange(text)}
                onSelectionChange={handleSelectionChange}
              />
            </View>
            <TouchableOpacity onPress={() => setEmoji(!isEmojiOpen)}>
              <View style={styles.emojiIconContainer}>
                <Image
                  source={APPLICATION_IMAGES.smileImage}
                  style={styles.icons}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeImage()}>
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
    </View>
  );
  const notifyOnMessageSent = async ({message}) => {
    console.log('message sent: inside notification', message);
    let messagePrivateBody = {
      auth_token: user.auth_token,
      userName: user.username,
      receiver_id: params.groupData ? params.groupData.slug : null,
      // message: messages[0].text,
      message: message,
      message_type: 2, // Individual = 1, Group = 2,
      group_type: 'chat',
    };

    await dispatch(TASKS.sendMessageLiveChat(messagePrivateBody));
  };
  const onRefresh = () => {
    // socket ? socket.connect() :
    // establishSocketConnection();
    // socket ? socket.connect() : establishSocketConnection();
    props.navigation.replace('ChatAndNewsScreen', {
      groupData: params.groupData,
      standings: 'private',
    });
  };
  return (
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 10}>
      <View
        style={[
          {
            borderBottomWidth: 1,
            borderColor: '#c6c6c6',
          },
          styles.chatCardHeader,
        ]}>
        <Text allowFontScaling={false} style={styles.chatHeaderTitle}>
          {params?.groupData?.title != '' ? params?.groupData?.title : 'Huddle'}
        </Text>
        {params.groupData.team_one && params.groupData.team_two ? (
          <Text style={styles.chatHeaderTitle}>
            {params.groupData.team_one} V/S {params.groupData.team_two}
          </Text>
        ) : null}
        {
          // user &&
          // user.role === APPLICATION_CONSTANTS.USER_ADMIN &&
          user &&
          user.slug === params?.groupData?.owner_information?.slug &&
          params.groupData &&
          params.groupData.is_private === 1 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.privateText}>Private</Text>
              <Text style={styles.subTitle}>
                {params.groupData && params.groupData.code
                  ? ` | Contest Code: ${params.groupData.code} `
                  : null}
              </Text>
            </View>
          ) : null
        }
      </View>
      {imageInFullScreen.state ? (
        <React.Fragment>
          <ScrollView ref={scrollViewRef}>
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
                  scrollToBottom();
                }}
              />
            )}
          </ScrollView>
          {imageInFullScreen.uploadMode && showChatFooter()}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ScrollView ref={scrollViewRef}>
            <View style={{padding: 10}}>
              {chatLoading ? (
                <View
                  style={{
                    height: HP('50'),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Loading Chat..</Text>
                </View>
              ) : messages && messages?.length > 0 ? (
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
                        userId={item?.senderData?.user}
                        // userId={user.auth_token}
                      />
                    );
                  }
                })
              ) : (
                <View
                  style={{
                    height:
                      user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
                        ? HP('70')
                        : HP('60'),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No Messages Found</Text>
                </View>
              )}
            </View>
          </ScrollView>
          {!chatLoading && isDisconnected && showRefreshChat()}
          {showChatFooter()}
        </React.Fragment>
      )}
    </KeyboardAvoidingView>
  );
};

export default React.memo(ChatAndNewsScreen);
