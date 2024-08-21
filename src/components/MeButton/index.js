import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {WP, COLORS, FONTS} from '../../services';

export const MeButton = props => {
  return (
    <View>
      {props.icon ? (
        <TouchableOpacity
          disabled={ props.disabled}
          style={[styles.containerWithIcon, props.containerStyles]}
          onPress={props.onPress}>
          <Text
            allowFontScaling={false}
            style={[styles.buttonText, props.buttonTextIcon]}>
            {props.title}
          </Text>
          <Image source={props.icon} style={styles.iconStyles} />
        </TouchableOpacity>
      ) : props.lumper ? (
        <View style={[styles.container, props.containerStyles]}>
          <ActivityIndicator color={COLORS.white} />
        </View>
      ) : (
            <TouchableOpacity
              disabled={ props.disabled}
          style={[styles.container, props.containerStyles]}
              onPress={props.onPress}>
          <Text
            allowFontScaling={false}
            style={[styles.buttonText, props.textStyles]}>
            {props.title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: WP('10'),
    width: WP('40'),
    borderRadius: WP('5'),
    backgroundColor: COLORS.appColour,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerWithIcon: {
    display: 'flex',
    height: WP('15'),
    width: WP('80'),
    borderRadius: 100,
    backgroundColor: COLORS.appColour,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: WP('6'),
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    fontFamily: FONTS.appFont,
  },
  buttonTextIcon: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
  },
  iconStyles: {
    display: 'flex',
    height: WP('5'),
    width: WP('5'),
    resizeMode: 'contain',
    marginLeft: WP('3'),
  },
});
