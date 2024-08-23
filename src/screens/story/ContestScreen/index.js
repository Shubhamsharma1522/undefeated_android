import {Dimensions, Image, Platform, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  HP,
  WP,
  navigate,
} from '../../../services';
import React from 'react';
import {StyleSheet} from 'react-native';
import {MeHeader} from '../../../components/MeHeader';
import MeBottomNavbar from '../../../components/BottomNavbar';
import {MeWrapper} from '../../../components/MeWrapper';
import {useSelector} from 'react-redux';
const Contest = () => {
  const user = useSelector(state => state.auth.user);
  console.log('this is username', user);
  return (
    <>
      <MeHeader
        showProfilePic={true}
        showlogo={true}
        profilePicUrl={user ? user.profile_image : null}
      />
      <MeWrapper style={styles.contest}>
        <Text style={styles.heading}>Contests</Text>
        <TouchableOpacity
          style={styles.contestParty}
          onPress={() => navigate('ContestWatchParty')}>
          {Platform.OS === 'ios' ? (
            <Image
              source={{uri: APPLICATION_IMAGES.contestAws}}
              style={styles.image}
            />
          ) : (
            <Image
              source={{uri: APPLICATION_IMAGES.contestAws}}
              style={styles.image}
            />
          )}
          <View style={styles.navigationPanel}>
            <Text style={styles.subHeading}>Contest Parties</Text>
            <Image
              source={APPLICATION_IMAGES.rightArrowIcon}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contestParty}
          onPress={() => navigate('PickemContestParty')}>
          {Platform.OS === 'ios' ? (
            <Image
              style={styles.image}
              source={{uri: APPLICATION_IMAGES.pickemAws}}
              // resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            // <Image
            //   key={Math.random()}
            //   source={{uri: APPLICATION_IMAGES.pickemAws, cache: 'reload'}}
            //   style={styles.image}
            // />
            <Image
              key={Math.random()}
              style={styles.image}
              source={{uri: APPLICATION_IMAGES.pickemAws}}
              // resizeMode={FastImage.resizeMode.contain}
            />
          )}

          <View style={styles.navigationPanel}>
            <Text style={styles.subHeading}>Pick'em Parties</Text>
            <Image
              source={APPLICATION_IMAGES.rightArrowIcon}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
      </MeWrapper>
      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};
export default Contest;
const styles = StyleSheet.create({
  contest: {
    width: Dimensions.get('window').width,
    padding: 0,
  },
  contestParty: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 30,
    overflow: 'hidden',
  },
  subHeading: {
    color: COLORS.appColour,
    fontWeight: '600',
    fontFamily: FONTS.appFont,
    fontSize: WP('4'),
    paddingVertical: 15,
  },
  image: {
    width: WP('90'),
    height: HP('18'),
    resizeMode: 'contain',
  },
  pickemImage: {
    width: WP('100'),
    height: HP('22'),
    resizeMode: 'contain',
  },
  arrow: {
    width: WP('8'),
    height: HP('3'),
  },
  navigationPanel: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    color: COLORS.appColour,
    fontSize: WP('6'),
    fontWeight: 'bold',
    paddingBottom: 15,
    fontFamily: FONTS.appFont,
  },
});
