import {StyleSheet, Platform} from 'react-native';
import {COLORS, WP, FONTS} from '../../../services';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  settingsText: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('10'),
    fontFamily: FONTS.appFont,
  },
  btnContainer: {
    backgroundColor: 'transparent',
    borderColor: COLORS.white,
    height: WP('12'),
    width: WP('65'),
    borderWidth: 2,
    borderRadius: 100,
    marginTop: WP('5'),
  },
  btnLink: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    height: WP('12'),
    width: WP('65'),
    borderWidth: 2,
    marginTop: WP('5'),
  },
  textBtn: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  textBtnLink: {
    color: COLORS.white,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.lightGrey,
  },
  followContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  followMeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
  },
  instagramIcon: {
    height: WP('8'),
    width: WP('8'),
    resizeMode: 'contain',
  },
  commonText: {
    fontFamily: FONTS.appFont,
    color: COLORS.white,
    fontSize: WP('4'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    includeFontPadding: false,
  },
  logOut: {
    fontFamily: FONTS.appFont,
    color: COLORS.white,
    marginLeft: WP('3'),
    fontSize: WP('10'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    marginBottom: WP('5'),
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
    marginBottom: WP('3'),
  },
  imageProfile: {
    display: 'flex',
    height: WP('25'),
    width: WP('25'),
    borderRadius: 100,
    overflow: 'hidden',
  },
  innerImage: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    // marginLeft: WP("3"),
  },
  switchBtn: {
    display: 'flex',
    width: WP('40'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  publicStyles: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    elevation: 2,
    fontFamily: FONTS.appFont,
    fontSize: WP('4.5'),
  },
  inactive: {
    color: COLORS.white,
    elevation: 2,
    fontFamily: FONTS.appFont,
    fontFamily: FONTS.appFont,
    fontSize: WP('3.5'),
    // marginRight:WP('2')
  },
  androidSwitchParent: {
    display: 'flex',
    height: WP('12'),
    width: WP('50'),
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: WP('2'),
    overflow: 'hidden',
    paddingRight: WP('1'),
    alignSelf: 'center',
    marginTop: WP('5'),
  },
  iosParentSwitch: {
    display: 'flex',
    height: WP('12'),
    width: WP('50'),
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight:WP('5'),
    paddingLeft: WP('2'),
    alignSelf: 'center',
    marginTop: WP('5'),
  },
  personBtns: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: WP('3'),
  },
  optionBtnText: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3'),
    fontFamily: FONTS.appFont,
  },
  profileWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.appColour,
  },
  accountInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  accountInfo: {
    fontSize: WP('6'),
    marginBottom: WP('5'),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.white,
  },
});
