import React, {useMemo, useState} from 'react';

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
} from '../../../../../../services';
// import TimeAgo from 'react-native-timeago';


export const UserListItem = props => {
  const {getSportsList} = useSelector(state => state.story);
  // console.log('props m kya h', props);
  const {sportList} = props;
  const {group} = props;

  const [index, setIndex] = useState(0);
  const [gameSports, setGameSport] = useState(null);
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';

  useMemo(() => {
    if (getSportsList && getSportsList.length > 0) {
      const sportsIndex = getSportsList.findIndex(
        sport =>
          sport.sport_name.toLowerCase() === group?.sport_name.toLowerCase(),
      );

      sportsIndex >= 0 && setGameSport(sportList[sportsIndex]);
    }
  }, [group?.sport_name]);

  // let profileImageHolder =
  //   group?.sport_name === 'basketball'
  //     ? {uri: sportList[1].sport_image}
  //     : group.sport_name === 'football'
  //     ? {uri: sportList[0].sport_image}
  //     : group.sport_name === 'soccer'
  //     ? {uri: sportList[4].sport_image}
  //     : group.sport_name === 'hockey'
  //     ? {uri: sportList[6].sport_image}
  //     : group.sport_name === 'baseball'
  //     ? {uri: sportList[7].sport_image}
  //     : group.sport_name === 'nascar'
  //     ? {uri: sportList[5].sport_image}
  //     : group.sport_name === 'tennis'
  //     ? {uri: sportList[3].sport_image}
  //     : group.sport_name === 'golf'
  //     ? {uri: sportList[2].sport_image}
  //     : null;
  return (
    <View style={styles.rowContainer}>
      {gameSports && (
        <Image
          source={{uri: gameSports.sport_image}}
          style={styles.profile_image}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text
          allowFontScaling={false}
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {group.title}
        </Text>
        {group.team_one && group.team_two && (
          <Text
            allowFontScaling={false}
            style={styles.subTitle}
            numberOfLines={1}
            ellipsizeMode={'ta1il'}>
            {group.team_one + ' V/S ' + group.team_two}
          </Text>
        )}

        {group.description && (
          <Text
            allowFontScaling={false}
            style={styles.details}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {group.description}
          </Text>
        )}
        <Text
          allowFontScaling={false}
          style={styles.details}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {gameSports && gameSports.value}
          {/* {group.sport_name === 'basketball'
            ? APPLICATION_CONSTANTS.Basketball
            : group.sport_name === 'football'
            ? APPLICATION_CONSTANTS.Football
            : group.sport_name === 'tennis'
            ? APPLICATION_CONSTANTS.Tennis
            : group.sport_name === 'golf'
            ? APPLICATION_CONSTANTS.Golf
            : null} */}
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
