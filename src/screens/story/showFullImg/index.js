import React, {Fragment} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {APPLICATION_IMAGES, COLORS, HP, WP} from '../../../services';
import {TouchableOpacity} from 'react-native';

const ShowFullImg = ({img, onPressCancel}) => {
  // const {params} = navigation.state;
  // const {name, img, imgText} = params;
  // console.log(name, img);
  return (
    <Fragment>
      <TouchableOpacity onPress={onPressCancel}>
        <View style={styles.cancelParent}>
          <Image
            source={APPLICATION_IMAGES.close}
            style={styles.cancel}
          />
        </View>
      </TouchableOpacity>
      {img ? (
        // <Image
        //   source={{uri: img}}
        //   style={{maxHeight: HP('80'), height: HP('50')}}
        //   resizeMode="contain"
        // />
        <Image
          style={{maxHeight: HP('80'), height: HP('50')}}
          source={{
            uri: img          }}
        
        />
      ) : (
        <View style={styles.failedImage}>
          <Text style={styles.text}>Failed to load image</Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
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

export default ShowFullImg;
