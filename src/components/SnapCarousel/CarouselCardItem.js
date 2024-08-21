import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, WP, navigate} from '../../services';

export const SLIDER_WIDTH = Dimensions.get('window').width + -55;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({item, index}) => {
  const handleOpenLink = () => {
    navigate('CarousalLink', {
      link: item.link,
    });
  };

  return (
    <>
      <View key={index} style={styles.cardItemContainer}>
        <TouchableOpacity onPress={handleOpenLink}>
          {item.image ? (
            <Image source={{uri: item.image}} style={styles.cardImage} />
          ) : (
            <Text style={styles.cardText}>{item.promotional_text}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: {
    // height: WP('19'),
    width: WP('86'),
    justifyContent: 'center',
    aspectRatio: 5 / 1,
    alignItems: 'center',
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    // borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    resizeMode: 'contain',
    width: WP('90'),
    height: WP('50'),
  },
  cardText: {
    fontFamily: FONTS.appFont,
    fontSize: WP('5.5'),
    color: COLORS.appColour,
    fontWeight: 'bold',
    textAlign: 'center',
    // maxWidth: WP('35'),
    alignItems: 'center',
    justifyContent: 'center',
    // height: WP('20'),
    flexWrap: 'wrap',
    // paddingLeft: 10,
    // paddingTop: 5,
  },
});

export default CarouselCardItem;
