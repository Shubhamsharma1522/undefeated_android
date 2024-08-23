import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
// import {
//   APPLICATION_CONSTANTS,
//   APPLICATION_IMAGES,
//   navigate,
// } from '../../../../../services';
import {APPLICATION_IMAGES} from '../../../../../services/utilities/images';
// import {APPLICATION_CONSTANTS}  from '../../../../../services/strings/index'
import {useSelector} from 'react-redux';
import ReactionComponent from '../ReactionComponent';
import uuid from 'react-native-uuid';
import Autolink from 'react-native-autolink';
import {getPreviewData} from 'react-native-link-preview';
// import RNUrlPreview from 'react-native-url-preview';
import MeModal from '../../../../../components/MeModal';
import MeVideoPlayer from '../../../../../components/MeVideoPlayer';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
const COLORS = {borderColor: '#CBCBCB'};
const FONTS = {
  appFont: 'Arial',
  sfFont: 'SFNS Text',
};
const MESSAGE_TYPE = {
  IMAGE_ONLY: 'IMAGE_ONLY',
  TEXT_ONLY: 'TEXT_ONLY',
  IMAGE_WITH_TEXT: 'IMAGE_WITH_TEXT',
};
const convertLocalTimeStamptoReadableTimeStamp = utcTimeStamp => {
  // If time is before the last 24 hours
  return moment.utc(utcTimeStamp).local().fromNow();
  // if (moment.utc(utcTimeStamp).isBefore(moment().subtract(24, 'hours'))) {
  //   // Format the timestamp to HH:mm AM/PM
  //   return moment.utc(utcTimeStamp).local().format('hh:mm A');
  // } else {
  //   return moment.utc(utcTimeStamp).local().fromNow();
  // }
};
const TakeComponent = ({
  parentTake,
  showReactionContainer,
  showSelectedImageInFullScreen,
  setShowFullImg,
  showCommentIcon,
  showFireIcon,
  showTrashIcon,
  isOnPressActive,
}) => {
  const constants = JSON.parse(JSON.stringify(APPLICATION_IMAGES));
  // console.log(
  //   'APPLICATION_IMAGES>>>',
  //   JSON.parse(JSON.stringify(APPLICATION_IMAGES)),
  // );
  const navigation = useNavigation();
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const onplay = useCallback(uuid => {
    setPlayingVideoId(uuid);
  }, []);
  const renderVideoPlayer = useCallback(
    item => {
      console.log('{}{}', item);
      return (
        <MeVideoPlayer
          uri={item.uri}
          uuid={item?.uuid}
          isPlaying={item.uuid === playingVideoId}
          onPlay={onplay}
        />
      );
    },
    [playingVideoId, onplay],
  );
  const {takesMessage, takesType, senderData, sport, takesImg, createdAt} =
    parentTake;
  const user = useSelector(state => state.auth.user);
  const [showSendModal, setShowSendModal] = useState({
    state: false,
    profile_image: '',
    username: '',
    userId: '',
  });

  console.log({parentTake, senderData});
  const renderLinkPreview = async url => {
    try {
      const {title, description, image} = await getPreviewData(url);
      console.log({title, description, image});
      return (
        <View style={{padding: 10, backgroundColor: '#f0f0f0'}}>
          {image && (
            <Image source={{uri: image}} style={{width: 100, height: 100}} />
          )}
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
          <Text>{description}</Text>
        </View>
      );
    } catch (error) {
      console.error('Error fetching preview:', error);
      return null;
    }
  };
  const handleOnPressUrl = url => {
    if (
      (url && url.toLowerCase().includes('http')) ||
      url.toLowerCase().includes('https')
    ) {
      Linking.openURL(url.trim());
    } else if (url) {
      Linking.openURL('https://' + url.trim());
    }
  };
  const handlePressHashtag = url => {
    // console.log({hashtag});
    let parts = url.split('/');
    // Get the last part of the URL
    let lastPart = parts[parts.length - 1];
    console.log(lastPart);
    return navigation.navigate('SearchedHashtagTakes', {
      searchedHashtag: lastPart,
    });
  };
  // const handlePressMenionedUser = url => {
  //   let parts = url.split('/');
  //   // Get the last part of the URL
  //   let lastPart = parts[parts.length - 1];
  //   console.log(lastPart);
  //   return navigate('SearchedHashtagTakes', {searchedHashtag: lastPart});
  // };
  return (
    <View style={styles.takeCompopnentContainer} key={uuid.v4()}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity
            onPress={() => {
              setShowSendModal({
                state: true,
                profile_image: senderData?.profile_image,
                username: senderData?.username,
                userId: senderData.user,
              });
            }}>
            <Image
              source={
                senderData?.profile_image
                  ? {uri: senderData?.profile_image}
                  : {uri: constants?.profilePicPlaceHolder}
              }
              style={styles.userImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerContent}
            onPress={() => {
              if (isOnPressActive) {
                navigation.navigate('TakeDetails', {parentTake});
              }
            }}>
            <View style={styles.headerTagProfile}>
              <View style={styles.profileContainer}>
                <Text style={styles.userName}>
                  {senderData && senderData?.username}
                </Text>
                <Text style={styles.time}>
                  {convertLocalTimeStamptoReadableTimeStamp &&
                    convertLocalTimeStamptoReadableTimeStamp(createdAt)}
                </Text>
              </View>
              <Text style={styles.tagName}>{sport}</Text>
            </View>

            {(takesType === MESSAGE_TYPE?.TEXT_ONLY ||
              takesType === MESSAGE_TYPE?.IMAGE_WITH_TEXT) && (
              <Autolink
                url={true}
                stripPrefix={false}
                textProps={{selectable: true}}
                text={takesMessage}
                onPress={(url, match) => {
                  console.log(match.getType());
                  switch (match.getType()) {
                    case 'url':
                      handleOnPressUrl(url);
                      break;
                    case 'hashtag':
                      handlePressHashtag(url);
                      break;
                    default:
                      console.log('Link pressed!');
                  }
                }}
                renderLinkPreview={renderLinkPreview}
                style={styles.postText}
                selectable={true}
                hashtag="twitter"
                mention="twitter"
              />
            )}

            <View style={styles.postImagesContainer}>
              {(takesType === MESSAGE_TYPE?.IMAGE_ONLY ||
                takesType === MESSAGE_TYPE?.IMAGE_WITH_TEXT) &&
                takesImg && (
                  <TouchableOpacity onPress={() => console.log('')}>
                    <FlatList
                      data={
                        takesImg &&
                        takesImg?.length > 0 &&
                        takesImg?.filter(data => data.mediaType === 'image')
                      }
                      numColumns={2}
                      keyExtractor={item => uuid.v4()}
                      removeClippedSubviews={true}
                      renderItem={({item, index}) => {
                        console.log('DOWNLOAD_GIF', item, index);
                        if (item?.mediaType === 'image') {
                          return (
                            <TouchableOpacity
                              style={
                                takesImg &&
                                takesImg?.length > 0 &&
                                takesImg?.filter(
                                  data => data.mediaType === 'image',
                                )?.length === 1
                                  ? styles.singlePostImage
                                  : styles.postImage
                              }
                              onPress={() => {
                                setShowFullImg(true);
                                showSelectedImageInFullScreen({
                                  state: true,
                                  fullImageSource: item?.uri,
                                  loading: false,
                                  uploadMode: false,
                                });
                              }}
                              key={uuid.v4()}>
                              <Image
                                source={{uri: item?.uri}}
                                alt="post"
                                style={{height: '100%', width: '100%'}}
                              />
                            </TouchableOpacity>
                          );
                        }
                      }}
                    />
                    <FlatList
                      data={
                        takesImg &&
                        takesImg?.length > 0 &&
                        takesImg?.filter(data => data.mediaType === 'video')
                      }
                      numColumns={2}
                      keyExtractor={item => uuid.v4()}
                      removeClippedSubviews={true}
                      renderItem={({item, index}) => {
                        return (
                          <View style={styles.singlePostImage}>
                            {/* <MeVideoPlayer
                              uri={item.uri}
                              width={item.width}
                              height={item.height}
                              index={index}
                            /> */}
                            {renderVideoPlayer({
                              uri: item.uri,
                              width: item.width,
                              height: item.height,
                              index: index,
                              ...item,
                            })}
                          </View>
                        );
                      }}
                    />
                  </TouchableOpacity>
                )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                borderRadius: 10, // Increase border radius for a smoother look
                // borderWidth: 1,
                // borderColor: '#E1E8ED', // Light gray border color similar to Twitter
                backgroundColor: '#FFFFFF', // White background color
                overflow: 'hidden', // Ensures content does not overflow the border
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1,
                elevation: 2, // Adds elevation for a slight shadow effect (Android)
              }}>
              {/* <RNUrlPreview
                text={takesMessage}
                containerStyle={{
                  flex: 1,
                  flexDirection: 'column', // Adjusted to row for better alignment
                  alignItems: 'center', // Center items vertically
                  justifyContent: 'flex-start',
                  padding: 10, // Padding for the whole preview container
                }}
                imageStyle={{
                  width: 300,
                  height: 150,
                  margin: 0,
                  padding: 0,
                  borderRadius: 10,
                }}
                textContainerStyle={{flex: 1, paddingLeft: 10}}
                descriptionStyle={{
                  fontSize: 12,
                  color: '#657786',
                  marginTop: 5,
                }}
                titleNumberOfLines={2} // Display up to 2 lines for the title
              /> */}
            </View>

            {showReactionContainer && (
              <ReactionComponent
                parentTake={parentTake}
                showCommentIcon={showCommentIcon}
                Styles={styles.reaction}
                showFireIcon={showFireIcon}
                showTrashIcon={showTrashIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <MeModal
        isVisible={showSendModal.state}
        member={{
          default_auth_token: senderData?.user,
          reported_by_auth_token: user?.auth_token,
          ...showSendModal,
        }}
        onClosePress={() => {
          setShowSendModal({
            state: false,
            profile_image: '',
            username: '',
            userId: '',
          });
        }}
        reportUserOnly={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takeCompopnentContainer: {
    paddingVertical: 10,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerContent: {
    flex: 1,
  },
  headerTagProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  follow: {
    color: COLORS.appColour,
    fontSize: 14,
  },
  likeDislike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  commentsec: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    fontFamily: FONTS.appFont,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.appFont,
    color: COLORS.borderColor,
  },
  userInfo: {
    flexDirection: 'row',
    fontFamily: FONTS.appFont,
    width: '100%',
  },
  tagName: {
    color: COLORS.appColour,
    paddingVertical: 5,
    fontSize: 14,
    fontFamily: FONTS.appFont,
    marginRight: 10,
  },
  postText: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: FONTS.appFont,
    lineHeight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    maxWidth: 600,
    flexWrap: 'wrap',
  },
  postContainer: {
    textAlign: 'justify',
  },
  postImage: {
    width: '100%',
    height: 250,
    flexBasis: '50%',
    flex: 1,
    flexGrow: 1,
    margin: 5,
    // borderWidth:2,
    // borderColor:'pink',
    backgroundColor: 'lightgrey',
  },
  singlePostImage: {
    // backgroundColor: 'lightgrey',
    width: '100%',
    height: 250,
    flexBasis: '100%',
    flex: 1,
    // flexGrow:1,
    margin: 5,
  },
  postImagesContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  like: {
    width: 18,
    height: 28,
    marginRight: 5,
  },
  filledLike: {
    width: 25,
    height: 25,
    marginRight: 3,
  },
  disLike: {
    width: 30,
    height: 30,
  },
  dislike_filled: {
    width: 25,
    height: 25,
  },
  chatIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginLeft: 5,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
  chatTxtLink: {
    color: '#0000ff',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  // hr: {
  //   borderBottomColor: 'black',
  //   borderBottomWidth: 0.3,
  //   marginVertical: 20,
  // },
});

export default React.memo(TakeComponent);
