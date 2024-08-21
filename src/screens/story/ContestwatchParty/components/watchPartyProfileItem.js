import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform,
} from 'react-native';
import {
  FONTS,
  WP,
  COLORS,
  APPLICATION_IMAGE_CONSTANTS,
  APPLICATION_CONSTANTS,
} from '../../../../services';
// import TimeAgo from 'react-native-timeago';

export const UserListItem = props => {
  // console.log('props m kya h', props);
  const {sportList} = props;
  const {group} = props;

  const [index, setIndex] = useState(0);
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
  let profileImageHolder =
    group?.sport_name === 'basketball'
      ? {uri: sportList && sportList[1] && sportList[1].sport_image}
      : group.sport_name === 'football'
      ? {uri: sportList && sportList[0] && sportList[0].sport_image}
      : group.sport_name === 'soccer'
      ? {uri: sportList && sportList[4] && sportList[4].sport_image}
      : group.sport_name === 'hockey'
      ? {uri: sportList && sportList[6] && sportList[6].sport_image}
      : group.sport_name === 'baseball'
      ? {uri: sportList && sportList[7] && sportList[7].sport_image}
      : group.sport_name === 'nascar'
      ? {uri: sportList && sportList[5] && sportList[5].sport_image}
      : group.sport_name === 'tennis'
      ? {uri: sportList && sportList[3] && sportList[3].sport_image}
      : group.sport_name === 'golf'
      ? {uri: sportList && sportList[2] && sportList[2].sport_image}
      : null;
  return (
    <View style={styles.rowContainer}>
      <Image source={profileImageHolder} style={styles.profile_image} />
      <View style={styles.detailsContainer}>
        <Text
          allowFontScaling={false}
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {group.title}
        </Text>
        <Text
          allowFontScaling={false}
          style={styles.subTitle}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {group.team_one ? group.team_one : null} V/S{' '}
          {group.team_two ? group.team_two : null}
        </Text>
        <Text
          allowFontScaling={false}
          style={styles.details}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {group.description}
        </Text>
        <Text
          allowFontScaling={false}
          style={styles.details}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {group.sport_name === 'basketball'
            ? APPLICATION_CONSTANTS.Basketball
            : group.sport_name === 'football'
            ? APPLICATION_CONSTANTS.Football
            : group.sport_name === 'tennis'
            ? APPLICATION_CONSTANTS.Tennis
            : group.sport_name === 'golf'
            ? APPLICATION_CONSTANTS.Golf
            : null}
        </Text>
      </View>
      {/* <TimeAgo time={group.created_at} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: WP('3'),
    alignItems: 'center',
  },
  profile_image: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    borderRadius: 100,
  },

  title: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    fontFamily: FONTS.appFont,
    width: WP('50'),
  },
  subTitle: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3'),
    fontFamily: FONTS.appFont,
    width: WP('50'),
  },
  details: {
    color: COLORS.grey,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('2.5'),
    fontFamily: FONTS.appFont,
    width: WP('50'),
  },
  detailsContainer: {
    marginLeft: WP('3'),
    width: WP('56'),
  },
});
