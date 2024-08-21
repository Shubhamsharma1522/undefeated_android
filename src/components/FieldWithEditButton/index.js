import React from 'react';
import {View, StyleSheet} from 'react-native';
import EditButton from '../EditButton';
import {WP} from '../../services';

const FieldWithEditButton = ({
  children,
  onPress,
  style,
  hideEditButton = false,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={{flexShrink: 1}}>{children}</View>
      {!hideEditButton && (
        <EditButton style={styles.editButton} onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    // top: WP('-1'),
    marginLeft: 10,
    // left: WP('1'),
  },
});

export default FieldWithEditButton;
