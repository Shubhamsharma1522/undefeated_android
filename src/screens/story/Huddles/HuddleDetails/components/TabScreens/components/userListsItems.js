import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FONTS, WP, COLORS} from '../../../../../../../services';
import {APPLICATION_IMAGES} from '../../../../../../../services';
import {useSelector} from 'react-redux';

import uuid from 'react-native-uuid';
const initialLayout = {width: Dimensions.get('window').width};

export const UserListItem = props => {
  console.log('[UserListItem.js]showing props here ', props);

  const {member, owner} = props;
  // console.log(props)
  const {user} = useSelector(state => state.auth);
  return (
    <View
      style={styles.rowContainer}
      key={props?.index > 0 ? props?.index : uuid.v4()}>
      <View>
        <TouchableOpacity
          onPress={props.onMemberTapped}
          style={styles.memberDetail}>
          <Image
            source={
              member.profile_image_url
                ? {uri: member.profile_image_url}
                : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
            }
            style={styles.profile_image}
          
          />
          <View style={styles.detailsContainer}>
            <Text
              allowFontScaling={false}
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {member.username}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {user && user.role === 2 && member.id !== owner.id ? (
        <View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              props.onMemberRemoveTapped(member);
            }}>
            <Image source={APPLICATION_IMAGES.cancel} style={styles.image} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: WP('3'),
    alignItems: 'center',
    // width:"100%",
    // alignItems:'stretch',
    justifyContent: 'space-between',
    // padding:WP('2'),
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    // elevation: 2,
    // shadowOpacity: Platform.OS === 'ios' ? 1 : null,
    margin: WP('3'),
  },
  memberDetail: {
    flexDirection: 'row',
  },
  profile_image: {
    display: 'flex',
    height: WP('10'),
    width: WP('10'),
    borderRadius: 100,
  },
  title: {
    // color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    display: 'flex',
    height: WP('7'),
    width: WP('7'),
    borderRadius: 100,
    // position:'absolute',
    right: WP('3'),
  },
  image: {
    height: WP('7'),
    width: WP('7'),
    // resizeMode:'contain'
  },
});
