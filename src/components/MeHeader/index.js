import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  APPLICATION_IMAGES,
  WP,
  COLORS,
  FONTS,
  navigate,
  back,
  APPLICATION_CONSTANTS,
} from '../../services';
import {useSelector} from 'react-redux';

import useUserImages from '../../hooks/useProfileCoverImage';
export const MeHeader = props => {
  const user = useSelector(state => state.auth.user);
  const {userProfileSection} = useUserImages({
    userProfile: user,
    styles: {profileImage: styles.profileImageContainer},
  });
  const onPressProfileImage = () => {
    navigate('Settings', {});
  };
  return (
    <View
      style={[
        user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
          ? {borderBottomWidth: 0, paddingHorizontal: 10, paddingVertical: 5}
          : styles.container,
      ]}>
      <View style={[styles.header]}>
        {props.hideBackBtn ? null : (
          <TouchableOpacity
            onPress={
              props.onBackBtn
                ? props.onBackBtn
                : () => {
                    back();
                  }
            }>
            <Image
              source={APPLICATION_IMAGES.headerLogo}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        )}
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? (
          <>
            <Text allowFontScaling={false} style={styles.headingTitle}>
              {props.title}
            </Text>
            <View style={styles.notificationBar}>
              <TouchableOpacity
                style={styles.notification}
                onPress={props?.onAboutInfo}>
                <Image
                  source={APPLICATION_IMAGES.Information}
                  style={styles.infoImage}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={
              props.showAboutUs ? styles.notificationBar : {display: 'none'}
            }>
            <TouchableOpacity
              style={styles.notification}
              onPress={props?.onAboutInfo}>
              <Image
                source={APPLICATION_IMAGES.Information}
                style={styles.infoImage}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        )}

        {user &&
        user.role !== APPLICATION_CONSTANTS.USER_ADMIN &&
        props.showlogo ? (
          <View style={[styles.headerLogo, props.centerLogo]}>
            <Image
              source={APPLICATION_IMAGES.Black_logo}
              style={styles.logo}
            />
          </View>
        ) : null}

        {props.showNotficaion ? (
          <View
            style={
              props.showNotficaion ? styles.notificationBar : {display: 'none'}
            }>
            <TouchableOpacity
              style={styles.notification}
              onPress={props.onNotificationPress}></TouchableOpacity>
            <TouchableOpacity onPress={onPressProfileImage}>
              {userProfileSection()}
              {/* <Image
                source={
                  props.profilePicUrl
                    ? {uri: `${props.profilePicUrl}?${imageKey}`}
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
                style={styles.profileImageContainer}
                key={imageKey}
                cacheControl={{
                  public: true, // Cache image publicly
                  maxAge: 86400, // Cache for 24 hours
                }}
              /> */}
            </TouchableOpacity>
          </View>
        ) : null}
        {props.showProfilePic ? (
          <TouchableOpacity onPress={onPressProfileImage}>
            {userProfileSection()}
            {/* <Image
              source={
                props.profilePicUrl
                  ? {uri: `${props.profilePicUrl}?${imageKey}`}
                  : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
              }
              style={styles.profileImageContainer}
              key={imageKey}
              cacheControl={{
                public: true, // Cache image publicly
                maxAge: 86400, // Cache for 24 hours
              }}
            /> */}
          </TouchableOpacity>
        ) : null}

        {props && props.enable ? (
          <TouchableOpacity>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={COLORS.appColour}
              ios_backgroundColor="#fff"
              value={props.enableValue}
              onValueChange={e => props.toggleSwitch(e)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
export const MeImageHeader = props => {
  const user = useSelector(state => state.auth.user);
  const {userProfileSection} = useUserImages({
    userProfile: user,
    styles: {profileImage: styles.profileImageContainer},
  });
  const onPressProfileImage = () => {
    // props.navigation.replace('Settings', {});
    navigate('Settings', {});
  };
  return (
    <View
      style={[
        styles.containerImage,
        {
          justifyContent: props.showProfilePic
            ? 'space-between'
            : 'space-between',
          // padding: props.groups ? WP('5') : null,
        },
        styles.shadowProp,
      ]}>
      <View style={[styles.header]}>
        {props.hideBackBtn ? null : (
          <TouchableOpacity
            onPress={
              props.onBackBtn
                ? props.onBackBtn
                : () => {
                    back();
                  }
            }>
            <Image
              source={APPLICATION_IMAGES.headerLogo}
              style={styles.headerImage}
            
            />
          </TouchableOpacity>
        )}
        {props.showAboutUs ? (
          <View style={styles.notificationBar}>
            <TouchableOpacity
              style={styles.notification}
              onPress={props?.onAboutInfo}>
              <Image
                source={APPLICATION_IMAGES.Information}
                style={styles.infoImage}
              
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {props.showlogo ? (
          <View style={styles.headerLogo}>
            <Image
              source={APPLICATION_IMAGES.Black_logo}
              style={styles.logo}
            
            />
            {/* <Image source={APPLICATION_IMAGES.Black_logo} style={styles.logo} /> */}
          </View>
        ) : null}

        {props.showNotficaion ? (
          <View
            style={
              props.showNotficaion ? styles.notificationBar : {display: 'none'}
            }>
            <TouchableOpacity
              style={styles.notification}
              onPress={props.onNotificationPress}></TouchableOpacity>
            <TouchableOpacity onPress={onPressProfileImage}>
              {userProfileSection()}
              {/* <Image
                source={
                  props.profilePicUrl
                    ? {uri: `${props.profilePicUrl}?${imageKey}`}
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
                style={styles.profileImageContainer}
                key={imageKey}
                cacheControl={{
                  public: true, // Cache image publicly
                  maxAge: 86400, // Cache for 24 hours
                }}
              /> */}
            </TouchableOpacity>
          </View>
        ) : null}
        {props.showProfilePic ? (
          <TouchableOpacity onPress={onPressProfileImage}>
            {userProfileSection()}
            {/* <Image
              source={
                props.profilePicUrl
                  ? {uri: `${props.profilePicUrl}?${imageKey}`}
                  : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
              }
              style={styles.profileImageContainer}
              key={imageKey}
              cacheControl={{
                public: true, // Cache image publicly
                maxAge: 86400, // Cache for 24 hours
              }}
            /> */}
          </TouchableOpacity>
        ) : null}

        {props && props.enable ? (
          <TouchableOpacity>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={COLORS.appColour}
              ios_backgroundColor="#fff"
              value={props.enableValue}
              onValueChange={e => props.toggleSwitch(e)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
export const MeSettingsHeader = props => {
  const user = useSelector(state => state.auth.user);
  return (
    <View
      style={[
        user && user.role === APPLICATION_CONSTANTS.USER_ADMIN
          ? {
              borderBottomWidth: 0,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: '50%',
            }
          : styles.container,
      ]}>
      <View style={[styles.header]}>
        <TouchableOpacity
          onPress={() => {
            back();
          }}>
          <Image
            source={APPLICATION_IMAGES.settingsLogo}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.headingTitleSettings}>
          {props.title}
        </Text>
        {/* <Text> {props.title}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginBottom: WP('3'),
    alignItems: 'center',
    borderBottomColor: COLORS.lightGrey,
    // borderTopColor: COLORS.white,
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  containerImage: {
    flexDirection: 'row',
    // marginBottom: WP('3'),
    alignItems: 'center',
    // borderBottomColor: COLORS.lightGrey,
    // borderTopColor: COLORS.white,
    // borderBottomWidth:1,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: -10, height: 14},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  headerLogo: {
    flexDirection: 'column',
    // gap:1,
    // alignItems:'center',
  },
  headerImage: {
    height: WP('8'),
    width: WP('8'),
    resizeMode: 'contain',
    paddingTop: 45,
  },
  logo: {
    width: WP('17'),
    height: WP('17'),
    resizeMode: 'contain',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  headingTitle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('6'),
    // marginLeft: WP('3'),
    fontFamily: FONTS.appFont,
  },
  headingTitleSettings: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    marginLeft: WP('3'),
    color: COLORS.white,
    fontFamily: FONTS.appFont,
  },
  profileImageContainer: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.appColour,
  },
  containerChat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    // shadowOffset: { width: -10, height: 14 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    elevation: 1,
  },
  headerImageChat: {
    height: WP('8'),
    width: WP('8'),
    resizeMode: 'contain',
  },
  headerChat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitleChat: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginLeft: WP('3'),
    fontFamily: FONTS.appFont,
  },
  profileImageContainerChat: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.appColour,
    marginRight: WP('3'),
  },
  public: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
  },
  privateText: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3.5'),
    fontFamily: FONTS.appFont,
    marginRight: WP('2'),
    // width: WP('34'),
  },
  privateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notification: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    // marginRight: WP('5'),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoImage: {
    height: '80%',
    width: '80%',
  },
  notificationBar: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'pink'
  },
});
