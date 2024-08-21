import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {useNavigationState} from '@react-navigation/native';
import {MeHeader, MeSettingsHeader} from '../../../components/MeHeader';
import {MeButton} from '../../../components/MeButton';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  showToast,
  WP,
} from '../../../services';
import {styles} from './styles';
import {Switch} from 'react-native-switch';
import * as TASKS from '../../../store/actions/index';
import {getCurrentDate, getPicture} from '../../../services';
import * as TYPES from '../../../store/actions/types';
// import RNRestart from 'react-native-restart'; // Import package from node modules
import {editProfile} from '../../../services/api/methods/storyMethods';
import MeBottomNavbar from '../../../components/BottomNavbar';

import {
  ShowActivityIndicator,
  formatPhoneNumber,
} from '../../../services/helpers';
import ProfileContainer from '../../../components/Profile/ProfileContainer';
import FieldWithEditButton from '../../../components/FieldWithEditButton';
import {useGetUserProfile} from '../../../hooks/react-query/useGetUserProfile';
import {useGetUserFollowersAndFollowings} from '../../../hooks/react-query/useGetUserFollowersAndFollowings';

const SCREEN = {
  CHANGE_NAME: 'ChangeName',
  CHANGE_EMAIL: 'ChangeEmail',
  CHANGE_NUMBER: 'ChangeNumber',
  CHANGE_BIO: 'ChangeBio',
  CHANGE_WEBSITE: 'ChangeWebsite',
  CHANGE_FAVORITE_TEAMS: 'ChangeFavoriteTeams',
  FRIENDLIST: 'FriendList',
  APPPRIVACYPOLICY: 'AppPrivacyPolicy',
};

const Settings = props => {
  const {user: loggedInUser} = useSelector(state => state.auth) || {};
  console.log('Settings', props);
  const validUserId = props.route.params.params?.userId || loggedInUser?.id;
  const isOwnProfile = validUserId === loggedInUser?.id;

  const {isLoading: isFetchingUserProfile, data: userProfile} =
    useGetUserProfile({userId: validUserId, isOwnProfile});
  console.log({userProfile});
  const {
    isLoading: isFetchingUserFollowersAndFollowings,
    data: userFollowersAndFollowings,
  } = useGetUserFollowersAndFollowings(validUserId);

  const [switchValue, setSwitchValue] = useState(false);
  const [image, setImage] = useState(
    'https://d1ysgguuwk00ms.cloudfront.net/images/user_image_nWzfIE6SlFZ64TEeqgrL2x6021YdxuzMOJiFqwk3MqH1Zw7jYN4e4nMNrDW2myMn.png',
  );

  const switchToggle = () => {
    setSwitchValue(!switchValue);
  };

  const androidSwitch = () => {
    return (
      <View style={styles.androidSwitchParent}>
        <Text
          allowFontScaling={false}
          style={switchValue ? styles.publicStyles : styles.inactive}>
          Private Only
        </Text>
        <Switch
          value={switchValue}
          onValueChange={switchToggle}
          disabled={false}
          activeText={''}
          inActiveText={''}
          circleSize={34}
          // barHeight={20}
          backgroundActive={COLORS.appColour}
          backgroundInactive={COLORS.appColour}
          changeValueImmediately={true}
          renderActiveText={false}
          renderInActiveText={false}
          circleActiveColor={'#FFF'}
        />
      </View>
    );
  };
  const iosSwitch = () => {
    return (
      <View style={styles.iosParentSwitch}>
        <Text
          allowFontScaling={false}
          style={switchValue ? styles.publicStyles : styles.inactive}>
          Private Only
        </Text>
        <Switch
          value={switchValue}
          onValueChange={switchToggle}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={38}
          barHeight={1}
          backgroundActive={COLORS.appColour}
          backgroundInactive={COLORS.appColour}
          changeValueImmediately={true}
          renderActiveText={false}
          renderInActiveText={false}
          circleActiveColor={'#FFF'}
        />
      </View>
    );
  };
  const logout = () => {
    const {user} = props;
    let params = {
      auth_token: user.auth_token,
      player_id: user.player_id,
    };
    // console.log('player id ', user.player_id);
    props.logout(params);
  };
  const navigationRoutes = screen => {
    switch (screen) {
      case SCREEN.CHANGE_NAME:
        props.navigation.navigate('ChangeName');
        break;
      case SCREEN.CHANGE_EMAIL:
        props.navigation.navigate('ChangeEmail');
        break;
      case SCREEN.CHANGE_NUMBER:
        props.navigation.navigate('ChangeNumber');
        break;
      case SCREEN.FRIENDLIST:
        props.navigation.navigate('FriendList');
        break;
      case SCREEN.CHANGE_BIO:
        props.navigation.navigate('ChangeBio');
        break;
      case SCREEN.CHANGE_WEBSITE:
        props.navigation.navigate('ChangeWebsite');
        break;
      case SCREEN.CHANGE_FAVORITE_TEAMS:
        props.navigation.navigate('ChangeFavoriteTeams');
        break;
      case 4:
        props.navigation.navigate('FriendList');
        break;
      case 5:
        props.navigation.navigate('AppPrivacyPolicy');
        break;
      default:
        break;
    }
  };
  const changeImage = ({image_type = 'profile_image'}) => {
    const isValidImageType = ['profile_image', 'cover_image'].includes(
      image_type,
    );
    if (!isValidImageType) {
      return;
    }
    getPicture(
      image => {
        console.log('showing getted image', image);
        // uploadingPath: 'data:image/jpeg;base64,' + image.uri.data,
        if (image_type === 'profile_image') {
          setImage(image.uri.uri);
          props.updateProfileImage(image.uri.uri);
          showToast('Updating profile picture ...');
        } else {
          props.updateCoverImage(image.uri.uri);
          showToast('Updating cover picture ...');
        }
        const UpdateProfile = {
          auth_token: props.user.auth_token,
          email: '',
          firstname: '',
          lastname: '',
          [image_type]: 'data:image/jpeg;base64,' + image.uri.data,
        };
        props.editProfileDatabase(UpdateProfile);
        // setTimeout(() => {
        //   RNRestart.Restart();
        // }, 1000);
      },
      error => {
        showToast(APPLICATION_CONSTANTS.imageNotPossible);
      },
    );
  };

  const openInstagram = () => {
    try {
      Linking.openURL(
        'https://www.instagram.com/textme.bet/?igshid=1xdhdfb9myyxp',
      );
    } catch (error) {}
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete you account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            const {user} = props;
            let params = {
              auth_token: user.auth_token,
              player_id: user.player_id,
            };
            // console.log('player id ', user.player_id);

            await props.deleteUserAccount(params);
            props.logout(params);
          },
        },
      ],
    );
  };

  return (
    <>
      {loggedInUser &&
        loggedInUser.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
          <View style={{backgroundColor: 'white'}}>
            <MeHeader
              title={/*'Textme.Bet'*/ 'Undefeated.Live'}
              showProfilePic={true}
              hideBackBtn={false}
              profilePicUrl={loggedInUser ? loggedInUser.profile_image : null}
              showNotficaion={false}
              showAboutUs={false}
              showlogo={true}
              style={{backgroundColor: 'white'}}
            />
          </View>
        )}
      <View style={styles.profileWrapper}>
        {loggedInUser &&
          loggedInUser.role === APPLICATION_CONSTANTS.USER_ADMIN && (
            <MeSettingsHeader title={'Undefeated.Live'} />
          )}
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {isFetchingUserProfile || isFetchingUserFollowersAndFollowings ? (
            ShowActivityIndicator(COLORS.white)
          ) : (
            <>
              <ProfileContainer
                userProfile={userProfile}
                isFetchingUserProfile={isFetchingUserProfile}
                userFollowersAndFollowings={userFollowersAndFollowings}
                defaultImage={image}
                onChangeProfileImage={() =>
                  changeImage({image_type: 'profile_image'})
                }
                onChangeCoverImage={() =>
                  changeImage({image_type: 'cover_image'})
                }
                onChangeName={() => navigationRoutes(SCREEN.CHANGE_NAME)}
                onChangeWebsite={() => navigationRoutes(SCREEN.CHANGE_WEBSITE)}
                onChangeBio={() => navigationRoutes(SCREEN.CHANGE_BIO)}
                onChangeFavoriteTeams={() =>
                  navigationRoutes(SCREEN.CHANGE_FAVORITE_TEAMS)
                }
              />

              {isOwnProfile && (
                <View style={{marginTop: WP('2')}}>
                  <View style={styles.accountInfoContainer}>
                    <Text
                      allowFontScaling={true}
                      style={[styles.commonText, styles.accountInfo]}>
                      {'Account Info'}
                    </Text>
                    <View>
                      <FieldWithEditButton
                        style={{marginBottom: WP('3')}}
                        onPress={() => navigationRoutes(SCREEN.CHANGE_NUMBER)}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            style={{aspectRatio: 1 / 1}}
                            source={{uri: APPLICATION_IMAGES.phone}}
                          />
                          <Text
                            allowFontScaling={false}
                            style={[styles.commonText, {marginLeft: WP('2')}]}>
                            {loggedInUser
                              ? formatPhoneNumber(loggedInUser.phone_number)
                              : ''}
                          </Text>
                        </View>
                      </FieldWithEditButton>
                      <FieldWithEditButton
                        style={{marginBottom: WP('1')}}
                        onPress={() => navigationRoutes(SCREEN.CHANGE_EMAIL)}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            style={{aspectRatio: 1 / 1}}
                            source={{uri: APPLICATION_IMAGES.email}}
                          />
                          <Text
                            allowFontScaling={false}
                            style={[styles.commonText, {marginLeft: WP('2')}]}>
                            {loggedInUser ? loggedInUser.email : ''}
                          </Text>
                        </View>
                      </FieldWithEditButton>
                    </View>
                  </View>
                  <MeButton
                    title={'Invite friends'}
                    containerStyles={styles.btnContainer}
                    textStyles={styles.textBtn}
                    onPress={() => navigationRoutes(4)}
                  />
                  <MeButton
                    title={'Delete Account'}
                    containerStyles={styles.btnContainer}
                    textStyles={styles.textBtn}
                    onPress={() => deleteAccount()}
                  />
                  <MeButton
                    title={APPLICATION_CONSTANTS.logout}
                    containerStyles={styles.btnContainer}
                    textStyles={styles.textBtn}
                    onPress={logout}
                  />
                </View>
              )}
              {/* {Platform.OS === 'ios' ? iosSwitch() : androidSwitch()} */}
              <View style={[styles.followContainer, {marginBottom: WP('5')}]}>
                <MeButton
                  title={'Privacy Policy'}
                  containerStyles={styles.btnLink}
                  textStyles={styles.textBtnLink}
                  onPress={() => navigationRoutes(5)}
                />
                <TouchableOpacity
                  style={[styles.followMeContainer, {marginTop: 0}]}
                  onPress={openInstagram}>
                  <Image
                    source={APPLICATION_IMAGES.instagram}
                    style={styles.instagramIcon}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[styles.commonText, {marginLeft: WP('2')}]}>
                    {APPLICATION_CONSTANTS.followText}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
      {loggedInUser &&
      loggedInUser.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: params => dispatch(TASKS.logout(params)),
    updateProfileImage: image =>
      dispatch({
        type: TYPES.UPDATE_PROFILE_IMAGE,
        image: image,
      }),
    updateCoverImage: image =>
      dispatch({
        type: TYPES.UPDATE_COVER_IMAGE,
        image: image,
      }),
    editProfileDatabase: params => dispatch(TASKS.editProfile(params)),
    deleteUserAccount: params => dispatch(TASKS.deleteUserAccount(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
