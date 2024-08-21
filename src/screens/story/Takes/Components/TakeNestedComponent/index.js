import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking,Image} from 'react-native';

import {getPreviewData} from 'react-native-link-preview';
import Autolink from 'react-native-autolink';
// import RNUrlPreview from 'react-native-url-preview';
import MeVideoPlayer from '../../../../../components/MeVideoPlayer';
import {
  convertLocalTimeStamptoReadableTimeStamp,
  ValidURL,
} from '../../../../../services/helpers';
import ReactionComponent from '../ReactionComponent';
import {FlatList} from 'react-native';
import uuid from 'react-native-uuid';
import MeModal from '../../../../../components/MeModal';
import {useSelector} from 'react-redux';
const COLORS = {  borderColor: '#CBCBCB'}
const FONTS = {
  appFont: 'Arial',
  sfFont: 'SFNS Text',
};
const MESSAGE_TYPE = {
  IMAGE_ONLY: 'IMAGE_ONLY',
  TEXT_ONLY: 'TEXT_ONLY',
  IMAGE_WITH_TEXT: 'IMAGE_WITH_TEXT',
}
const TakeNestedComponent = ({
  parentTake,
  showSelectedImageInFullScreen,
  setShowFullImg,
}) => {
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
  const {takesMessage, takesType, senderData, createdAt, sport, takesImg} =
    parentTake;
  const user = useSelector(state => state.auth.user);
  const [showSendModal, setShowSendModal] = useState({
    state: false,
    profile_image: '',
    username: '',
  });

  const renderLinkPreview = async url => {
    try {
      const {title, description, image} = await getPreviewData(url);
      console.log({title, description, image});
      return (
        <View style={{padding: 10, backgroundColor: '#f0f0f0'}}>
          {image && (
            <Image
              source={{uri: image}}
              style={{width: 100, height: 100}}
            />
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
  return (
    <View style={styles.takeCompopnentContainer}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <React.Fragment>
            <TouchableOpacity
              onPress={() => {
                setShowSendModal({
                  state: true,
                  profile_image: senderData?.profile_image,
                  username: senderData?.username,
                });
              }}>
              <Image
                source={
                  senderData.profile_image
                    ? {uri: senderData?.profile_image}
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
                alt="user"
                style={styles.userImage}
              />
            </TouchableOpacity>
          </React.Fragment>

          <View
            style={styles.headerContent}
            // onPress={() => navigate('TakeDetails', {parentTake})}
          >
            <View style={styles.headerTagProfile}>
              <View style={styles.profileContainer}>
                <Text style={styles.userName}>
                  {senderData && senderData?.username}
                </Text>
              </View>
              <Text style={styles.tagName}>{sport}</Text>
            </View>
            <Text style={styles.time}>
              {/* {convertLocalTimeStamptoReadableTimeStamp(createdAt)} */}
            </Text>
          </View>
        </View>
      </View>
      {(takesType === MESSAGE_TYPE.TEXT_ONLY ||
        takesType === MESSAGE_TYPE.IMAGE_WITH_TEXT) && (
        <Autolink
          url={true}
          stripPrefix={false}
          textProps={{selectable: true}}
          text={takesMessage}
          // linkStyle={{color: 'blue', textDecorationLine: 'underline'}}
          // onPress={url => handleOnPressUrl(url)}
          // renderLinkPreview={renderLinkPreview}
          style={styles.postText}
          // selectable={true}

          onPress={(url, match) => {
            console.log(match.getType());
            switch (match.getType()) {
              case 'url':
                handleOnPressUrl(url);
              default:
                console.log('Link pressed!');
            }
          }}
          renderLinkPreview={renderLinkPreview}
          selectable={true}
          hashtag="twitter"
          mention="twitter"
        />
      )}
      <View style={styles.postImagesContainer}>
        {(takesType === MESSAGE_TYPE.IMAGE_ONLY ||
          takesType === MESSAGE_TYPE.IMAGE_WITH_TEXT) &&
          takesImg && (
            <>
              <FlatList
                data={
                  takesImg &&
                  takesImg?.length > 0 &&
                  takesImg?.filter(data => data.mediaType === 'image')
                }
                numColumns={2}
                keyExtractor={item => uuid.v4()}
                renderItem={({item, index}) => {
                  if (item?.mediaType === 'image') {
                    return (
                      <TouchableOpacity
                        style={
                          takesImg.length > 0
                            ? takesImg &&
                              takesImg?.length > 0 &&
                              takesImg?.filter(
                                data => data.mediaType === 'image',
                              )?.length === 1
                              ? // takesImg.length === 1
                                styles.singlePostImage
                              : styles.postImage
                            : styles.shimmerUI
                        }
                        onPress={() => {
                          setShowFullImg(true);
                          showSelectedImageInFullScreen({
                            state: true,
                            fullImageSource: item,
                            loading: false,
                            uploadMode: false,
                          });
                        }}
                        key={item}>
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
            </>
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
      <View style={styles.postContainer}>
        <ReactionComponent
          parentTake={parentTake}
          // takesRootParentId={parentTake?._id} //BUG
          showCommentIcon={true}
          Styles={{paddingHorizontal: 0}}
        />
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
          });
        }}
        reportUserOnly={true}
      />
    </View>
  );
};
export default React.memo(TakeNestedComponent);
const styles = StyleSheet.create({
  takeCompopnentContainer: {
    paddingVertical: 10,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
  },
  shimmerUI: {
    backgroundColor: 'lightgray',
    width: '100%',
    height: 250,
    flex: 1,
    // flexGrow:1,
    margin: 5,
  },
  postImagesContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
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
    // borderTopColor: COLORS.borderColor,
    // borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    margin: 0,
    paddingVertical: 0,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.appFont,
    paddingHorizontal: 10,
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
    marginVertical: 10,
    paddingHorizontal: 10,
    maxWidth: 650,
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
    backgroundColor: 'lightgrey',
  },
  singlePostImage: {
    width: '100%',
    height: 250,
    flex: 1,
    // flexGrow:1,
    margin: 5,
    // backgroundColor: 'lightgrey',
    flexBasis: '100%',
  },
  like: {
    width: 20,
    height: 28,
    marginRight: 5,
  },
  disLike: {
    width: 30,
    height: 30,
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
