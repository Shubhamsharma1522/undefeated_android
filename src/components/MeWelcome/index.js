import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  WP,
  COLORS,
  APPLICATION_CONSTANTS,
  FONTS,
  APPLICATION_IMAGES,
} from '../../services';
import {MeButton} from '../MeButton';

export const MeWelcome = props => {
  return (
    <View style={styles.container}>
      {props.image ? (
        <View>
          {/* <Text allowFontScaling = {false}style={styles.welcome}></Text> */}

          <View style={styles.imageContainer}>
            <Text allowFontScaling={false} style={styles.welcome}></Text>
            <TouchableOpacity onPress={props.onPress}>
              <Image
                source={APPLICATION_IMAGES.chatIcon}
                style={styles.chatStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : props.title ? (
        <View>
          <Text allowFontScaling={false} style={styles.welcome}>
            {APPLICATION_CONSTANTS.welcome}
          </Text>

          <View style={styles.imageContainer}>
            <Text
              allowFontScaling={false}
              style={styles.userHi}
              ellipsizeMode="tail">
              {props.userName}
            </Text>
            <MeButton
              title={props.title}
              onPress={props.onPress}
              containerStyles={styles.btnContainer}
            />
          </View>
        </View>
      ) : (
        <View style={styles.welcomeMessage}>
          <Text allowFontScaling={false} style={styles.welcome}>
            {/* {APPLICATION_CONSTANTS.welcome} */}
            Hi
          </Text>
          <Text allowFontScaling={false} style={styles.welcome}>
            {props.userName}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // height: WP('20'),
    // marginTop: WP('8'),
    marginBottom: WP('4'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    flexDirection: 'row',
    // width: '100%',
    // justifyContent: 'space-between',
    textAlign: 'center',
  },
  welcome: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : '700',
    fontSize: WP('6'),
    fontFamily: Platform.OS === 'ios' ? FONTS.sfFont : FONTS.appFont,
    // fontFamily: FONTS.appFont,
    paddingRight: 10,
  },
  userHi: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8'),
    fontFamily: FONTS.appFont,
    width: WP('60'),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatStyle: {
    height: WP('15'),
    width: WP('15'),
    resizeMode: 'contain',
  },
  btnContainer: {
    height: WP('12'),
    width: WP('30'),
  },
});
