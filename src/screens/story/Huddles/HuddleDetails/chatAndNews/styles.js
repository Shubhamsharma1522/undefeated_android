import {StyleSheet, Platform} from 'react-native';
import {FONTS, WP, COLORS, HP} from '../../../../../services';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: COLORS.white,
    // borderTopColor: COLORS.lightGrey,
    // marginHorizontal: 15,
  },
  groupTitle: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    marginTop: WP('1'),
    marginBottom: WP('1'),
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  message: {
    color: COLORS.appColour,
    fontWeight: '600',
    fontSize: WP('7'),
    fontFamily: FONTS.appFont,
    marginTop: WP('1'),
    marginBottom: WP('1'),
    // alignContent: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // borderBottomWidth: 5,
    // borderWidth: 1,
    textAlign: 'left',
  },
  chatHeaderTitle: {
    color: COLORS.appColour,
    fontWeight: '700',
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  chatHeaderSubTitle: {
    color: COLORS.appColour,
    fontWeight: '700',
    fontSize: WP('3.5'),
    fontFamily: FONTS.appFont,
    textAlign: 'left',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  recTxt: {
    backgroundColor: 'red',
  },
  chatIcon: {
    display: 'flex',
    height: WP('12'),
    width: WP('12'),
    // marginVertical:10,
    // borderRadius: 100,
    marginHorizontal: WP('2'),
  },
  ImageIconContainer: {
    height: WP('8'),
    width: WP('8'),
    margin: WP('1'),
    marginRight: WP('2'),
  },
  emojiIconContainer: {
    height: WP('10'),
    width: WP('10'),
    // margin: WP('1'),
  },
  icons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    display: 'flex',
    width: WP('55'),
    // margin: WP('1'),
    marginLeft: WP('5'),
    backgroundColor: COLORS.white,
    color: COLORS.black,
    padding: 0,
    // paddingTop: WP('1'),
    // overflow: 'hidden',
    fontSize: 16,
    maxHeight: HP('10'),
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    // borderColor: COLORS.white,
    borderColor: COLORS.lightGrey,
    paddingVertical: 2,
    borderRadius: 50,
    marginLeft: 5,
  },
  footerContainer: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: WP('5'),
  },
  won: {
    fontFamily: FONTS.appFont,
    fontSize: WP('5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
  },
  chatStyle: {
    height: WP('10'),
    width: WP('15'),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: WP('5'),
  },
  chatCardHeader: {
    // flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: COLORS.appColour,
    borderBottomWidth: 1,
    // borderTopWidth: 2,
    // borderTopColor: COLORS.appColour,
    padding: 10,
  },
  profileImageContainer: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.appColour,
  },
});
