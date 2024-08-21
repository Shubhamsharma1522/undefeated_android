import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {APPLICATION_IMAGES, COLORS, WP} from '../../services';

const EditButton = ({onPress, style, shouldShowWhiteBackground = false}) => {
  const imageURL = shouldShowWhiteBackground
    ? APPLICATION_IMAGES.editIconBlack
    : APPLICATION_IMAGES.editIconWhite;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.editButtonWrapper,
        shouldShowWhiteBackground && styles.whiteBackground,
        style,
      ]}>
      <Image style={styles.editButtonImage} source={{uri: imageURL}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButtonWrapper: {
    width: WP('5'),
    padding: WP('1'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  editButtonImage: {
    aspectRatio: 1 / 1,
  },
  whiteBackground: {
    borderWidth: 0,
    backgroundColor: COLORS.white,
  },
});

export default EditButton;
