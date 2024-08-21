import {StyleSheet, Platform} from 'react-native';
import {FONTS, WP, COLORS} from '../../../services';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageHeader: {
    display: 'flex',
    height: WP('40'),
    width: '100%',
    position: 'relative',
  },
  groupImage: {
    display: 'flex',
    height: WP('22'),
    width: WP('22'),
    borderRadius: 100,
  },
  groupContainer: {
    display: 'flex',
    height: WP('24'),
    width: WP('24'),
    borderRadius: 100,
    borderWidth: WP('1'),
    borderColor: COLORS.white,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: WP('-12'),
    left: WP('3'),
  },
  btn: {
    height: WP('6'),
    width: WP('18'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.appColour,
    bottom: WP('-3'),
    right: WP('3'),
    borderRadius: WP('5'),
  },
  promoteBtn: {
    width: WP('20'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.appColour,
    top: WP('3'),
    right: WP('3'),
    borderRadius: WP('5'),
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  NotifyBtn: {
    height: WP('7'),
    width: WP('20'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.appColour,
    top: WP('60'),
    left: WP('4'),
    // top: WP('55'),
    // right: WP('3'),
    borderRadius: WP('5'),
    zIndex: 999999,
  },
  NotifyContestMembersBtn: {
    height: WP('8'),
    width: WP('29'),
    // width: WP('18'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.appColour,
    top: WP('43'),
    right: WP('0'),
    borderRadius: WP('5'),
    marginRight: 10,
  },
  notifyContestTitle: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3.2'),
    fontFamily: FONTS.appFont,
    padding: 1,
  },
  promoteTitle: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3.6'),
    fontFamily: FONTS.appFont,
    padding: 4,
  },
  title: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
  },
  groupName: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('7'),
    fontFamily: FONTS.appFont,
    position: 'absolute',
    bottom: WP('15'),
    left: WP('6'),
    width: WP('80'),
    textAlign: 'center',
  },
  sportsName: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3.5'),
    fontFamily: FONTS.appFont,
    position: 'absolute',
    bottom: WP('8'),
    left: WP('6'),
    width: WP('80'),
    textAlign: 'center',
  },
  headerImage: {
    height: WP('8'),
    width: WP('8'),
    resizeMode: 'contain',
    position: 'absolute',
    top: WP('5'),
    left: WP('5'),
    elevation: 2,
    shadowOpacity: 2,
  },
  tabs: {
    marginTop: WP('12'),
    flex: 1,
  },
  addFeatures: {
    display: 'flex',
    position: 'absolute',
    bottom: WP('20'),
    left: WP('50'),
    zIndex: 99999,
  },
  image: {
    height: WP('15'),
    width: WP('15'),
    borderRadius: 100,
    overflow: 'hidden',
  },
  imagesContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: WP('-3'),
    left: WP('32'),
  },
  profile_image: {
    height: WP('8'),
    width: WP('8'),
    resizeMode: 'cover',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: WP('-3'),
  },
  privateText: {
    // marginTop: 10,
    top: WP('15'),
    left: WP('7'),
    color: 'red',
    fontSize: WP('4'),
    fontWeight: '600',
  },
  ccCodeText: {
    top: WP('16'),
    left: WP('7'),
    fontSize: WP('3.5'),
    fontWeight: '700',
  },
  inviteBtn: {
    // height: WP('6'),
    width: WP('20'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.appColour,
    top: WP('15'),
    right: WP('3'),
    borderRadius: WP('5'),
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
