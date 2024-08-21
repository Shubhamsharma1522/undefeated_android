//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {WP, COLORS, FONTS, APPLICATION_IMAGES} from '../../../../services';

// create a component
const CustomButton = props => {
  return (
    <TouchableOpacity
      style={[styles.addGroup, {marginTop: props.marginTop}]}
      onPress={props.onPress}>
      {props.description ? (
        <View>
          <Text allowFontScaling={false} style={styles.createGroup}>
            {props.title}
          </Text>
          <Text allowFontScaling={false} style={styles.createGroupSubTitle}>
            {props.description}
          </Text>
        </View>
      ) : (
        <Text allowFontScaling={false} style={styles.createGroup}>
          {props.title}
        </Text>
      )}

      <Image source={APPLICATION_IMAGES.rightArrow} style={styles.arrowImage} />
    </TouchableOpacity>
  );
};
// define your styles
const styles = StyleSheet.create({
  createGroup: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontSize: WP('4'),
    fontWeight: Platform.OS === 'ios' ? '500' : null,
  },
  createGroupSubTitle: {
    color: COLORS.white,
    fontFamily: FONTS.appFont,
    fontWeight: Platform.OS === 'ios' ? '500' : null,
  },
  arrowImage: {
    height: WP('8'),
    width: WP('8'),
    borderRadius: 100,
    overflow: 'hidden',
  },
  addGroup: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.appColour,
    // marginTop: WP('8'),
    height: WP('14'),
    width: WP('90'),
    borderRadius: WP('2'),
    alignItems: 'center',
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default CustomButton;
