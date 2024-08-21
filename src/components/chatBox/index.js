import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  Dimensions,
} from 'react-native';
import {
  deviceHeight,
  deviceWidth,
} from '../../services/utilities/styleHelper/appStyle';
import styles from './styles';
import {
  COLORS,
  APPLICATION_IMAGES,
  WP,
  APPLICATION_CONSTANTS,
} from '../../services';
import MeModal from '../MeModal';
import {
  ValidURL,
  convertLocalTimeStamptoReadableTimeStamp,
  convertUtcToLocalDate,
  convertUtcToLocalTimeStamp,
} from '../../services/helpers';
import moment from 'moment-timezone';
const ChatBox = ({
  userId,
  uuid,
  img,
  profileImage,
  onImgTap,
  continueMsg,
  isCurrentUser,
  messageObject,
  index,
  messages,
}) => {
  // console.log('item in chatbox', item);
  // let isCurrentUser = userId === uuid ? true : false;
  console.log(
    'video-or-imagemessageObject',
    messageObject?.senderData?.username,
    isCurrentUser,
    messageObject,
  );

  // img = 'img';
  const [showSendModal, setShowSendModal] = useState({
    state: false,
    profile_image: '',
    username: '',
  });

  const splitIntoText = msg => {
    let splitMsg = msg.split(' ');
    let messages = splitMsg.map(msg => {
      let isValid = ValidURL(msg);
      if (isValid) {
        return (
          <Text
            style={[styles.chatTxtLink]}
            onPress={() => {
              if (
                msg.toLowerCase().includes('http') ||
                msg.toLowerCase().includes('https')
              ) {
                Linking.openURL(msg.trim());
              } else {
                Linking.openURL('https://' + msg.trim());
              }
            }}>
            {msg}{' '}
          </Text>
        );
      } else {
        return <>{msg} </>;
      }
    });
    return <Text>{messages}</Text>;
  };
  // console.log({messageObject, continueMsg});
  const renderMessageProfileImage = ({profile_image, username}) => {
    if (!continueMsg) {
      return (
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
            // alignItems: 'center',
          }}
          onPress={() => {
            // setShowSendModal(true);
            setShowSendModal({
              state: true,
              profile_image: profile_image,
              username: username,
            });
          }}>
          {isCurrentUser ? (
            <React.Fragment>
              {/* <Text style={styles.userNameText}>You</Text>
              <Image
                source={
                  profileImage
                    ? {uri: profileImage}
                    : APPLICATION_IMAGES.profilePicPlaceHolder
                }
                style={styles.profileImageContainerChat}
              /> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Image
                source={
                  profileImage
                    ? {uri: profileImage}
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
                style={styles.profileImageContainerChat}
              />
              <Text style={styles.userNameText}>
                {messageObject?.senderData?.username}
              </Text>
            </React.Fragment>
          )}
        </TouchableOpacity>
      );
    } else return null;
  };
  const renderImageMessage = useCallback(
    img => {
      return (
        <TouchableOpacity onPress={onImgTap}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <View style={styles.card}> */}
            {/* <Image
              source={{uri: img}}
              // style={styles.image}
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').width * 0.5,
                width: Dimensions.get('window').width * 0.6,
              }}
            /> */}
            <Image
              style={{
                height: Dimensions.get('window').width * 0.5,
                width: Dimensions.get('window').width * 0.6,
              }}
              source={{
                uri: img,
                // priority: FastImage.priority.normal,
              }}
            
            />
          </View>
        </TouchableOpacity>
      );
    },
    [messageObject?.img, img],
  );

  const renderTextMessage = useCallback(
    msg => {
      return (
        <View
          style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
          <Text
            style={{
              fontSize: 18,
              color: isCurrentUser ? COLORS.white : COLORS.black,
            }}>
            {splitIntoText(msg)}
          </Text>
        </View>
      );
    },
    [messageObject?.message],
  );

  const renderDate = () => {
    console.log({date: messageObject.createdAt});
    return (
      <View style={styles.localDateContainer}>
        <Text style={styles.localDate}>
          {moment.utc(messageObject.createdAt).local().isSame(moment(), 'day')
            ? 'Today'
            : convertUtcToLocalDate(messageObject.createdAt)}
        </Text>
      </View>
    );
  };
  // return <Text style={{marginTop: 20}}>{messageObject?.message}</Text>;
  return (
    <View style={{paddingHorizontal: 10}}>
      {/* {index === 0 && renderDate()} */}
      {messages &&
      messages?.length > 0 &&
      convertUtcToLocalDate(
        messages[index === 0 ? index : index - 1]?.createdAt,
      ) === convertUtcToLocalDate(messageObject.createdAt)
        ? null
        : renderDate()}
      {renderMessageProfileImage({
        profile_image: messageObject?.senderData?.profileImage,
        username: messageObject?.senderData?.username,
      })}
      <View
        style={[
          styles.container,
          isCurrentUser ? styles.senderContainer : styles.receiverContainer,
        ]}>
        <View
          style={[
            isCurrentUser ? styles.senderBubble : styles.receiverBubble,
            img ? styles.imgMessageBubble : styles.messageBubble,
          ]}>
          {messageObject?.messageType ===
          APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_WITH_TEXT ? (
            <>
              <>{renderImageMessage(img)}</>
              <>{renderTextMessage(messageObject.message)}</>
            </>
          ) : messageObject?.messageType ===
            APPLICATION_CONSTANTS.MESSAGE_TYPE.TEXT_ONLY ? (
            renderTextMessage(messageObject.message)
          ) : messageObject?.messageType ===
            APPLICATION_CONSTANTS.MESSAGE_TYPE.IMAGE_ONLY ? (
            renderImageMessage(img)
          ) : null}
          <Text
            style={[
              styles.timestamp,
              isCurrentUser ? {color: COLORS.white} : {color: COLORS.black},
            ]}>
            {convertLocalTimeStamptoReadableTimeStamp(messageObject?.createdAt)}
          </Text>
        </View>
        <MeModal
          isVisible={showSendModal.state}
          member={{
            default_auth_token: userId,
            reported_by_auth_token: uuid,
            ...showSendModal,
          }}
          onClosePress={() => {
            setShowSendModal({
              state: false,
              profile_image: '',
              username: '',
            });
          }}
          reportUserOnly={true}
        />
      </View>
    </View>
  );
};

export default ChatBox;
