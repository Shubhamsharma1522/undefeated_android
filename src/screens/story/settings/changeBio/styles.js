import {StyleSheet, Platform} from 'react-native';
import {WP, COLORS, FONTS, HP} from '../../../../services';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.appColour,
  },
  welcomeBanner: {
    display: 'flex',
    // height: '100%',
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('7'),
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
    alignSelf: 'center',
    paddingTop: WP('25'),
  },
  welcomeText: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8'),
    fontFamily: FONTS.appFont,
  },
  inputContainer: {
    display: 'flex',
    height: WP('50'),
    width: WP('75'),
    // borderColor: COLORS.white,
    // borderBottomWidth: WP('1'),
    // marginTop: WP('3'),
    marginBottom: WP('4'),
    justifyContent: 'center',
    maxHeight: HP('20'),
  },
  placeholder: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    color: COLORS.white,
    fontSize: 15,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 25,
    height: 100,
    paddingHorizontal: 10,
    // paddingVertical: 50,
  },
  loginBtn: {
    display: 'flex',
    borderColor: COLORS.white,
    borderWidth: WP('1'),
    marginTop: WP('10'),
  },
  forgetPassword: {
    alignSelf: 'flex-end',
  },
  signUp: {
    alignSelf: 'center',
    marginTop: WP('8'),
  },
  signUpText: {
    color: COLORS.white,
    fontSize: WP('4'),
    fontWeight: 'bold',
    // alignSelf: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
