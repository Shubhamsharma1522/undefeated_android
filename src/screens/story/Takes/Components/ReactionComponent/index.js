import React from 'react';
import {Alert, Share, StyleSheet, TouchableOpacity, View,Image} from 'react-native';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  navigate,
} from '../../../../../services';
import * as TASKS from '../../../../../store/actions/index';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {TAKES_SERVICE_URL} from '../../../../../services/constants';
const ReactionComponent = ({
  parentTake,
  showCommentIcon,
  showFireIcon = true,
  showTrashIcon = true,
  Styles,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const {
    replies,
    _id,
    likesCount,
    dislikesCount,
    takesRootParentId,
    takesUserId,
    takesMessage,
  } = parentTake;
  console.log('ReactionComponent', {parentTake});
  const handleLikesDislikes = type => {
    dispatch(
      TASKS.likeDislikeTakes({
        type,
        takesId: _id,
        takesUserId: user.id,
        takesRootParentId,
        sender_auth_token: user.id,
        receiver_slug: takesUserId,
        takes_message: takesMessage,
      }),
    );
  };
  const showDeleteTakeAlert = () => {
    Alert.alert(
      'Are you sure you want to delete this take?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            //   openCamera(success, reject);
          },
        },
        {
          text: 'Yes, Delete',
          onPress: async () => {
            await axios.post(TAKES_SERVICE_URL + '/disable-take', {
              takesId: _id,
              takesRootParentId: takesRootParentId,
            });
          },
        },
      ],
      {cancelable: true},
    );
  };
  const shareTakeContent = async () => {
    try {
      const result = await Share.share({
        message: takesMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result in if SHare', result);
          // shared with activity type of result.activityType
        } else {
          console.log('result in else SHare', result);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('result in else if dismissed action SHare', result);
        // dismissed
      }
    } catch (error) {
      console.log('error message', error);
      Alert.alert(error.message);
    }
  };
  return (
    <View style={styles.commentContainer}>
      <View style={[Styles, styles.commentsec]}>
        {showCommentIcon && (
          <TouchableOpacity
            style={styles.reactionContainer}
            onPress={() => {
              navigate('AddTakeReply', {parentTake, takesRootParentId});
            }}>
            <Image
              source={APPLICATION_IMAGES.chaticon2}
              style={styles.chatIcon}
            />
            <Text>
              {replies && Array.isArray(replies) ? replies.length : 0}
            </Text>
          </TouchableOpacity>
        )}
        {showFireIcon && (
          <View style={styles.likeDislike}>
            <TouchableOpacity
              style={styles.reactionContainer}
              onPress={() => handleLikesDislikes('like')}>
              <Image
                source={APPLICATION_IMAGES.like}
                resizeMode="cover"
                style={[styles.like]}
              />
              <Text>{likesCount ? likesCount : 0}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showTrashIcon && (
          <View style={styles.likeDislike}>
            <TouchableOpacity
              style={styles.reactionContainer}
              onPress={() => handleLikesDislikes('dislike')}>
              <Image
                source={APPLICATION_IMAGES.dislike}
                style={styles.disLike}
              />
              <Text>{dislikesCount ? dislikesCount : 0}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showTrashIcon && (
          <View style={styles.likeDislike}>
            <TouchableOpacity
              style={styles.reactionContainer}
              onPress={() => shareTakeContent()}>
              <Image
                source={APPLICATION_IMAGES.share}
                style={styles.disLike}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN && (
        <View style={styles.deleteIconContainer}>
          <TouchableOpacity
            style={styles.reactionContainer}
            onPress={() => showDeleteTakeAlert()}>
            <Image
              source={APPLICATION_IMAGES.deleteIcon}
              style={styles.delete}
            />
            <Text style={styles.deleteIconText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  takeCompopnentContainer: {
    paddingVertical: 10,
  },
  deleteIconText: {
    color: 'red',
    fontFamily: FONTS.appFont,
  },
  commentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
    paddingVertical: 10,
    paddingHorizontal: 0,
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
    marginRight: 5,
  },
  postImagesContainer: {
    flexDirection: 'row',
    width: '100%',
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
  delete: {
    width: 20,
    height: 20,
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
  //   hr: {
  //     borderBottomColor: 'black',
  //     borderBottomWidth: 0.3,
  //     marginVertical: 20,
  //   },
});
export default ReactionComponent;
