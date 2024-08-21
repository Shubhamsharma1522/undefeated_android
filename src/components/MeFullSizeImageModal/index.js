import {Modal, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {APPLICATION_IMAGES, COLORS, HP, WP} from '../../services';

const MeFullImageModal = ({image, isVisible, closeHandler}) => {
  return (
    // <Modal
    // animationType="fade"
    // transparent={true}
    //   visible={isVisible}
    //   onRequestClose={closeHandler}>
    <View style={styles.container} activeOpacity={1}>
      <TouchableOpacity onPress={closeHandler}>
        <View style={styles.subContainer}>
          <View style={styles.cancelParent}>
            <Image
              source={APPLICATION_IMAGES.close}
              style={styles.cancel}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
      {image ? (
        <Image
          style={{maxHeight: HP('80'), height: HP('50')}}
          source={{
            uri: image,
            // priority: FastImage.priority.high,
          }}
        
        />
      ) : (
        <View style={styles.failedImage}>
          <Text style={styles.text}>Failed to load image</Text>
        </View>
      )}
    </View>
    // </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  subContainer: {
    // height: 350,
    // height: Dimensions.get('window').height,
    // zIndex: 2,
    display: 'flex',
    alignItems: 'flex-end',
  },
  failedImage: {
    backgroundColor: COLORS.white,
    height: HP('40'),
    // textAlign: 'center',
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
  },
  cancel: {
    height: WP('5'),
    width: WP('5'),
  },
  cancelParent: {
    // height: WP('6'),
    width: WP('10'),
    backgroundColor: COLORS.appColour,
    marginLeft: WP('4'),
    marginTop: WP('4'),
    padding: 10,
    borderRadius: 20,
    // marginHorizonal: WP('2'),
    // marginVertical: WP('2'),
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 4,
//     justifyContent: 'center',
//     // backgroundColor: '#000000AA',
//     backgroundColor: COLORS.white,
//   },
// });

export default MeFullImageModal;
