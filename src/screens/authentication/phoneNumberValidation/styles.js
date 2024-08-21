import {StyleSheet, Platform} from 'react-native';
import {WP, COLORS, FONTS} from '../../../services';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeBanner: {
    display: 'flex',
    height: WP('100'),
    width: '100%',
    backgroundColor: COLORS.appColour,
    borderBottomRightRadius: WP('40'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dontHaveAccount: {
    alignSelf: 'flex-end',
    marginLeft: WP('5'),
    width: '100%',
    marginTop: 10,
  },

  webContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    // marginTop: 10,
  },
  sprtWebsite: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: FONTS.appFont,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('10'),
  },
  frineds: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8.5'),
    marginBottom: WP('30'),
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginRight: WP('12'),
  },
  welcomeContainer: {
    display: 'flex',
    paddingHorizontal: WP('15'),
    paddingVertical: WP('8'),
  },
  welcomeText: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8'),
    fontFamily: FONTS.appFont,
    textAlign: 'center',
  },
  privacyPolicyText: {
    color: COLORS.appColour,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'bold',
    fontSize: WP('4'),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.appColour,
    // marginTop: WP('10'),
    // textAlign: 'center'
  },
  inputContainer: {
    display: 'flex',
    height: WP('11'),
    width: WP('75'),
    borderRadius: WP('5'),
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    marginTop: WP('5'),
    marginBottom: WP('4'),
    justifyContent: 'center',
  },
  placeholder: {
    marginLeft: WP('3'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    justifyContent: 'center',
    color: '#000',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    // marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: WP('4'),
  },
  checkbox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  label: {
    flexDirection: 'row',
    // marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginLeft: 10,
  },
  loginLabel: {
    flexDirection: 'row',
    marginTop: WP('3'),
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
});
