import React from 'react';
import {
  Alert,
  Share,
  View,
  //   Button,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import {COLORS, FONTS, WP} from '../../services';

const ShareButton = ({message}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result in if SHare', result);
          // shared with activity type of result.activityType
        } else {
          console.log('result in else SHare', result);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('result in else if dismissed action SHare', result);
        // dismissed
      }
    } catch (error) {
      console.log('error message', error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.btnContainer}>
      <Text style={styles.shareBtn} onPress={onShare}>
        Share
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('3.6'),
    fontFamily: FONTS.appFont,
    padding: 1,
  },
  shareBtn: {
    color: COLORS.white,
  },
});

export default ShareButton;
