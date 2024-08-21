import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { WP, COLORS } from '../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export const MeWrapper = props => {
  return (
    <View style={props.settings ? styles.containerSettings : styles.container}>
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WP('5'),
    paddingBottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  containerSettings: {
    flex: 1,
    padding: WP('5'),
    paddingBottom: 0,
    backgroundColor: COLORS.appColour,
    width: '100%',
  },
});
