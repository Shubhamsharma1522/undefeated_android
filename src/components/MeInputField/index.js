import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import {WP, COLORS, FONTS} from '../../services';
export const MeInputField = props => {
  return (
    <View>
      {props.showDate ? (
        <View style={styles.container}>
          <TextInput
            onChangeText={props.onChange}
            allowFontScaling={false}
            style={
              Platform.OS === 'ios' ? styles.iosContainer : styles.container
            }
            placeholderTextColor={COLORS.lightGrey}
            {...props}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            onChangeText={props.onChange}
            ref={props?.ref}
            allowFontScaling={false}
            style={
              Platform.OS === 'ios' ? styles.iosContainer : styles.container
            }
            placeholderTextColor={COLORS.lightGrey}
            {...props}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // borderBottomWidth: 1,
    // borderColor: COLORS.textFieldBorder,
    width: WP('70'),
    fontWeight: 'bold',
    width: '100%',
  },
  iosContainer: {
    display: 'flex',
    height: WP('12'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    color: '#000',
  },
});
