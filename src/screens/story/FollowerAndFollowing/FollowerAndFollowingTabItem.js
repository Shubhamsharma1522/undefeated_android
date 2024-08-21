import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {MeButton} from '../../../components/MeButton';
import {WP, APPLICATION_IMAGES} from '../../../services';
import styles from './FollowerAndFollowingTabItemstyles';
import {useUpdateUserFollowerAndFollowing} from '../../../hooks/react-query/useUpdateUserFollowerAndFollowing';
import {useSelector} from 'react-redux';

const FollowerAndFollowingTabItem = ({user}) => {
  const loggedInUser = useSelector(state => state.auth.user);
  const [followButtonText, setFollowButtonText] = useState(
    user.isFollowing ? 'Unfollow' : 'Follow',
  );

  const hideFollowButton = user.id === loggedInUser.id;

  const {
    mutate: updateUserFollowerAndFollowing,
    isLoading: isUpdatingUserFollowerAndFollowing,
  } = useUpdateUserFollowerAndFollowing();

  const onSuccess = ({isFollowing}) => {
    setFollowButtonText(isFollowing ? 'Unfollow' : 'Follow');
  };

  return (
    <View style={styles.listItem}>
      <Image
        style={styles.profileImage}
        source={
          user && user.profile_image_url
            ? {uri: user.profile_image_url}
            : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
        }
      />
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.userFullName}>
              {user.firstname + ' ' + (user.lastname || '')}
            </Text>
            <Text style={styles.username}>{'@' + user.username}</Text>
          </View>
          {!hideFollowButton && (
            <MeButton
              title={followButtonText}
              onPress={() =>
                updateUserFollowerAndFollowing({userId: user.id}, {onSuccess})
              }
              containerStyles={styles.actionButtonContainerStyle}
              textStyles={{fontSize: WP('4')}}
              lumper={isUpdatingUserFollowerAndFollowing}
            />
          )}
        </View>
        {user.bio && (
          <Text numberOfLines={2} style={{fontSize: WP('4')}}>
            {user.bio}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FollowerAndFollowingTabItem;
