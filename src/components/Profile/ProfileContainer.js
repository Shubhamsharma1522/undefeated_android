import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MeButton} from '../MeButton';
import {APPLICATION_IMAGES, COLORS, WP, FONTS, navigate} from '../../services';
import {convertUtcToLocalDate} from '../../services/helpers';
import EditButton from '../EditButton';
import FieldWithEditButton from '../FieldWithEditButton';
import {FOLLOW_ROUTES} from '../../screens/story/FollowerAndFollowing';
import {useUpdateUserFollowerAndFollowing} from '../../hooks/react-query/useUpdateUserFollowerAndFollowing';

import useUserImages from '../../hooks/useProfileCoverImage';

const getFollowButtonText = isFollowing =>
  isFollowing ? 'Unfollow' : 'Follow';

const ProfileContainer = ({
  userProfile,
  userFollowersAndFollowings,
  defaultImage,
  onChangeProfileImage,
  onChangeCoverImage,
  onChangeName,
  onChangePhoneNumber,
  onChangeEmail,
  onChangeWebsite,
  onChangeBio,
  onChangeFavoriteTeams,
  isFetchingUserProfile,
  ...props
}) => {
  const {userProfileSection, userCoverImageSection} = useUserImages({
    userProfile: userProfile,
    styles: styles,
  });
  const imageKey = Date.now();
  const loggedInUser = useSelector(state => state.auth.user);

  console.log(userProfile?.profile_image_url, {loggedInUser, userProfile});
  const isOwnProfile = loggedInUser.id === userProfile.id;

  const {
    mutate: updateUserFollowerAndFollowing,
    isLoading: isUpdatingUserFollowerAndFollowing,
  } = useUpdateUserFollowerAndFollowing();

  const [followButtonText, setFollowButtonText] = useState(
    getFollowButtonText(userProfile.isFollowing),
  );

  const onSuccess = ({isFollowing}) => {
    setFollowButtonText(getFollowButtonText(isFollowing));
  };

  useEffect(() => {
    setFollowButtonText(getFollowButtonText(userProfile.isFollowing));
  }, [userProfile.isFollowing]);

  if (!userProfile) {
    return;
  }

  return (
    <View {...props}>
      <TouchableOpacity onPress={onChangeCoverImage}>
        <View style={styles.coverImageContainer}>
          {userCoverImageSection()}

          {isOwnProfile && (
            <EditButton
              shouldShowWhiteBackground
              style={styles.coverImageEditIcon}
              onPress={onChangeCoverImage}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={{paddingHorizontal: WP('3'), marginTop: -50}}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={onChangeProfileImage}>
          {userProfileSection()}
          {isOwnProfile && (
            <EditButton
              shouldShowWhiteBackground
              style={styles.profileImageEditIcon}
              onPress={onChangeProfileImage}
            />
          )}
        </TouchableOpacity>

        <View
          style={[
            styles.userPersonalInfoContainer,
            styles.commonSmallBottomMargin,
          ]}>
          <View>
            <FieldWithEditButton
              hideEditButton={!isOwnProfile}
              onPress={onChangeName}
              style={{alignItems: 'center'}}>
              <Text
                allowFontScaling={false}
                style={[styles.commonText, styles.fullName]}>
                {userProfile
                  ? userProfile.firstname + ' ' + userProfile.lastname
                  : ''}
              </Text>
            </FieldWithEditButton>
            <Text allowFontScaling={false} style={styles.commonText}>
              {'@' + userProfile.username}
            </Text>
          </View>
          {!isOwnProfile && (
            <MeButton
              title={followButtonText}
              onPress={() =>
                updateUserFollowerAndFollowing(
                  {userId: userProfile.id},
                  {onSuccess},
                )
              }
              containerStyles={styles.followButtonContainer}
              lumper={isUpdatingUserFollowerAndFollowing}
            />
          )}
        </View>
        <View
          style={[
            styles.followersAndFollowings,
            styles.commonSmallBottomMargin,
          ]}>
          <TouchableOpacity
            onPress={() =>
              navigate('FollowerAndFollowing', {
                userId: userProfile.id,
                initialScreen: FOLLOW_ROUTES.FOLLOWERS,
              })
            }>
            <Text
              allowFontScaling={false}
              style={[styles.commonText, {fontWeight: 'bold'}]}>
              {userFollowersAndFollowings.followers.length + ' '}
              <Text allowFontScaling={false} style={{fontWeight: 'normal'}}>
                {'Followers'}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: WP('4')}}
            onPress={() =>
              navigate('FollowerAndFollowing', {
                userId: userProfile.id,
                initialScreen: FOLLOW_ROUTES.FOLLOWINGS,
              })
            }>
            <Text
              allowFontScaling={false}
              style={[styles.commonText, {fontWeight: 'bold'}]}>
              {userFollowersAndFollowings.followings.length + ' '}
              <Text allowFontScaling={false} style={{fontWeight: 'normal'}}>
                {'Followings'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.joinedDateContainer, styles.commonSmallBottomMargin]}>
          <Image
            style={{aspectRatio: 1 / 1}}
            source={{uri: APPLICATION_IMAGES.calendar}}
          />
          <Text
            allowFontScaling={false}
            style={[styles.commonText, {marginLeft: WP('2')}]}>
            {'Joined ' + convertUtcToLocalDate(userProfile.created_at)}
          </Text>
        </View>

        <FieldWithEditButton
          style={styles.commonSmallBottomMargin}
          onPress={onChangeBio}
          hideEditButton={!isOwnProfile}>
          <Text
            // numberOfLines={2}
            allowFontScaling={false}
            style={[
              styles.commonText,
              {fontWeight: 'bold', marginBottom: 0, fontSize: WP('4.5')},
            ]}>
            {'Bio:' + ' '}
            <Text
              allowFontScaling={false}
              style={[styles.commonText, {fontWeight: 'normal'}]}>
              {userProfile.bio || '  '}
            </Text>
          </Text>
        </FieldWithEditButton>

        <FieldWithEditButton
          style={styles.commonSmallBottomMargin}
          onPress={onChangeFavoriteTeams}
          hideEditButton={!isOwnProfile}>
          <Text
            allowFontScaling={false}
            style={[
              styles.commonText,
              {fontWeight: 'bold', marginBottom: 0, fontSize: WP('4.5')},
            ]}>
            {'Favorite Teams:' + ' '}
            <Text
              allowFontScaling={false}
              style={[styles.commonText, styles.discription]}>
              {userProfile.favorite_teams || '  '}
            </Text>
          </Text>
        </FieldWithEditButton>

        {isOwnProfile && <View style={styles.divider} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullSizeImage: {
    width: '100%',
    height: '100%',
  },
  discription: {
    fontSize: WP('4'),
    fontWeight: 'normal',
  },
  commonSmallBottomMargin: {
    marginBottom: WP('3'),
  },
  coverImageContainer: {
    height: WP('30'),
  },
  coverImageEditIcon: {
    position: 'absolute',
    bottom: WP('1'),
    right: WP('1'),
  },
  profileImageContainer: {
    height: WP('25'),
    aspectRatio: 1 / 1,
  },
  profileImage: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderWidth: WP('1'),
    borderColor: COLORS.appColour,
  },
  profileImageEditIcon: {
    position: 'absolute',
    bottom: WP('3'),
    right: WP('1'),
  },
  userPersonalInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonText: {
    fontFamily: FONTS.appFont,
    color: COLORS.white,
    fontSize: WP('4'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    // padding: 0,
    includeFontPadding: false,
  },
  fullName: {
    fontSize: WP('6'),
    fontWeight: 'bold',
  },
  followButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: COLORS.white,
    width: WP('35'),
    alignSelf: 'stretch',
  },
  joinedDateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  followersAndFollowings: {
    display: 'flex',
    flexDirection: 'row',
  },
  divider: {
    height: WP('0.5'),
    width: '100%',
    alignSelf: 'center',
    marginTop: WP('2'),
    backgroundColor: COLORS.white,
  },
});

export default ProfileContainer;
