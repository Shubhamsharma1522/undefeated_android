import { StyleSheet, Platform } from 'react-native';
import { WP, COLORS, FONTS, HP } from '../../../services';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.appColour,
  },
  dontHaveAccount:{
    alignSelf: 'flex-end',
    marginLeft: WP('5'),
    width: '100%',
    marginTop:10,
  },

  webContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 80,
  },
  sprtWebsite: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.appFont,
  },
  welcomeBanner: {
    display: 'flex',
    height: WP('80'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationColor:COLORS.white,
    textDecorationLine:'underline',

  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('10'),
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginRight: WP('12'),
  },
  privacyPolicyText: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginTop: WP('10'),
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.textFieldBorder,
  },
  welcomeContainer: {
    display: 'flex',
    alignSelf: 'center',
    //   padding:WP('15'),
  },
  welcomeText: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8'),
    fontFamily: FONTS.appFont,
  },
  inputContainer: {
    display: 'flex',
    height: HP('6'),
    width: WP('65'),
    borderColor: COLORS.white,
    borderWidth: WP('1'),
    marginTop: WP('3'),
    marginBottom: WP('2'),
    justifyContent: 'center',
    borderRadius: 100,
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
  },
  placeholder: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    color: COLORS.white,
  },
  loginBtn: {
    display: 'flex',
    borderColor: COLORS.white,
    borderWidth: WP('1'),
    marginTop: WP('10'),
  },
  forgetPassword: {
    alignSelf: 'flex-end',
    marginLeft: WP('5'),
    width: WP('50'),
  },
  signUp: {
    alignSelf: 'center',
    marginTop: WP('8'),
  },
  signUpText: {
    color: COLORS.white,
    fontSize: WP('5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
  },
});
