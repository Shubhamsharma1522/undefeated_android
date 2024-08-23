//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  APPLICATION_IMAGES,
  COLORS,
  WP,
  FONTS,
  APPLICATION_IMAGE_CONSTANTS,
} from '../../../../../../services';
import {MeButton} from '../../../../../../components/MeButton';


// create a component
const JoinModal = props => {
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
  let {group} = props;
  let profileImageHolder =
    group.sport_name === 'basketball'
      ? APPLICATION_IMAGE_CONSTANTS.basketballImg
      : group.sport_name === 'football'
      ? APPLICATION_IMAGE_CONSTANTS.footballImg
      : group.sport_name === 'tennis'
      ? APPLICATION_IMAGE_CONSTANTS.tennisImg
      : group.sport_name === 'golf'
      ? APPLICATION_IMAGE_CONSTANTS.golfImg
      : null;
  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.onBackdropPress}>
        <View style={styles.Modal}>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={props.onClosePress}>
            <Image
              source={APPLICATION_IMAGES.closeModal}
              style={styles.close}
            />
          </TouchableOpacity>
          <Image source={profileImageHolder} style={styles.image} />
          <MeButton
            title={'Join'}
            onPress={props.onJoinPress}
            containerStyles={styles.btnContainer}
            textStyles={styles.btnText}
          />
          <View style={styles.detailsContainer}>
            <Text
              allowFontScaling={false}
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {props.group.title}
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.details}
              numberOfLines={4}
              ellipsizeMode={'tail'}>
              {props.group.description}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Modal: {
    display: 'flex',
    height: WP('50'),
    backgroundColor: COLORS.white,
    borderRadius: WP('5'),
    position: 'relative',
  },
  image: {
    position: 'absolute',
    height: WP('25'),
    width: WP('25'),
    borderRadius: 100,
    alignSelf: 'center',
    top: WP('-12'),
  },
  btnContainer: {
    height: WP('7'),
    width: WP('15'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: WP('5'),
    top: WP('5'),
  },
  btnText: {
    fontWeight: '100',
    fontSize: WP('4'),
  },
  close: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  closeContainer: {
    position: 'absolute',
    top: WP('5'),
    left: WP('5'),
    height: WP('5'),
    width: WP('5'),
  },
  detailsContainer: {
    position: 'absolute',
    top: WP('20'),
    alignSelf: 'center',
  },
  title: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    width: WP('80'),
    textAlign: 'center',
  },
  details: {
    color: COLORS.grey,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    width: WP('80'),
    textAlign: 'center',
  },
});

//make this component available to the app
export default JoinModal;
