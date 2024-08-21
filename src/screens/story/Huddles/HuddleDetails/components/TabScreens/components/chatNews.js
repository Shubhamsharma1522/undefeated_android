import React, {useState} from 'react';
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
  APPLICATION_IMAGES,
} from '../../../../../../../services';

const initialLayout = {width: Dimensions.get('window').width};

export const ChatNewsitems = props => {
  console.log('[UserListItem.js]showing props here ', props);

  const {member} = props;

  const [index, setIndex] = useState(0);
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';

  return (
    <View style={styles.rowContainer}>
      <View style={styles.profile_image}>
        {
          (props.contentType = 'chat' ? (
            <Text allowFontScaling={false} style={styles.heading}>
              C
            </Text>
          ) : (
            (props.contentType = 'news' ? (
              <Text allowFontScaling={false} style={styles.heading}>
                N
              </Text>
            ) : (
              (props.contentType = 'watchParty' ? (
                <Text allowFontScaling={false} style={styles.heading}>
                  WP
                </Text>
              ) : null)
            ))
          ))
        }
      </View>
      <View style={styles.detailsContainer}>
        <Text
          allowFontScaling={false}
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {props.MessageTitle}
        </Text>
        <Text
          allowFontScaling={false}
          style={styles.details}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {props.MessageDescripton}
        </Text>
      </View>
      {/* <TimeAgo time={member.created_at} /> */}
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
    backgroundColor: COLORS.appColour,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    width: WP('50'),
  },
  heading: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
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
