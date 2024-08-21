import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  Platform,
} from 'react-native';

const initialLayout = {width: Dimensions.get('window').width};
import CustomButton from '../../../../Home/Components';
import {
  APPLICATION_CONSTANTS,
  COLORS,
  WP,
  FONTS,
} from '../../../../../../services';
export const WatchParty = props => {
  console.log('[WatchParty.js]showing props here ', props);

  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setmessage] = useState('');

  return (
    <View style={styles.scene}>
      <View style={styles.newBetContainer}>
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.watchPartyTitle}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.firstMessage}
            placeholderTextColor={COLORS.black}
            style={styles.welcomePlaceholder}
            value={message}
            onChangeText={setmessage}
            multiline={true}
          />
        </View>
      </View>
      <CustomButton title={'Host a watch party'} marginTop={WP('5')} />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  newBetContainer: {
    display: 'flex',
    marginTop: WP('10'),
  },
  titleContainer: {
    display: 'flex',
    borderWidth: WP('0.2'),
    borderColor: COLORS.appColour,
    height: WP('15'),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowOpacity: 0.2,
    width: WP('90'),
  },
  welcomeContainer: {
    display: 'flex',
    borderWidth: WP('0.2'),
    borderColor: COLORS.appColour,
    height: WP('25'),
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowOpacity: 0.2,
    marginTop: WP('5'),
  },
  welcomePlaceholder: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginLeft: WP('3'),
    marginRight: WP('3'),
    fontFamily: FONTS.appFont,
    color: '#000',
  },
  titlePlaceholder: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginLeft: WP('3'),
    marginRight: WP('3'),
    fontFamily: FONTS.appFont,
    color: '#000',
  },
});
