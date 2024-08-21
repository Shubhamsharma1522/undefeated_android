import {StyleSheet} from 'react-native';
import {WP, FONTS} from '../../../services';

const FollowerAndFollowingTabItemStyles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: WP('5'),
  },
  profileImage: {
    width: WP('12'),
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  userInfoContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: WP('2'),
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: WP('1'),
  },
  userFullName: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    fontFamily: FONTS.appFont,
    includeFontPadding: false,
  },
  username: {
    fontSize: WP('4'),
    includeFontPadding: false,
    fontFamily: FONTS.appFont,
  },
  actionButtonContainerStyle: {
    width: WP('30'),
  },
});

export default FollowerAndFollowingTabItemStyles;
