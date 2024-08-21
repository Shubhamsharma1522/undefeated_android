import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {APPLICATION_IMAGES, COLORS, FONTS, HP, WP} from '../../services';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {isValidUrl} from '../../services/helpers';
import * as Util from '../../services';
import useAutoScroll from '../../hooks/useAutoScroll';

import {navigate} from '../../services';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

function Slide({data}) {
  console.log('datal in corousal in corousal', data);
  return (
    <>
      <View
        style={{
          // height: WP('19'),
          width: WP('90'),
          justifyContent: 'center',
          aspectRatio: 5 / 1,
          alignItems: 'center',
          borderColor: COLORS.borderColor,
          borderWidth: 1,
          // borderRadius: 10,
          overflow: 'hidden',
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('click on image', data);
            navigate('CarousalLink', {
              link: data.link,
            });
          }}>
          {data.image}
        </TouchableOpacity>
      </View>
    </>
  );
}
function Pagination({index, slideList}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList &&
        slideList.length > 0 &&
        slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
    </View>
  );
}
export default function Carousel({slides}) {
  console.log({slides});
  const carouselFlatListRef = useRef();
  const slideList =
    slides &&
    slides.length > 0 &&
    slides?.map(slide => {
      console.log('slide details', slide);
      return {
        id: slide.id,
        link: slide.link,
        image: slide.image ? (
          <Image
            source={{uri: slide.image}}
            style={{
              resizeMode: 'contain',
              width: WP('90'),
              height: WP('50'),
            }}
          />
        ) : (
          <Text
            style={{
              fontFamily: FONTS.appFont,
              fontSize: WP('6'),
              color: COLORS.appColour,
              fontWeight: 'bold',
              textAlign: 'center',
              // maxWidth: WP('35'),
              alignItems: 'center',
              justifyContent: 'center',
              // height: WP('20'),
              flexWrap: 'wrap',
              paddingLeft: 10,
              paddingTop: 5,
            }}>
            {slide.promotional_text}
          </Text>
        ),
      };
    });
  console.log('slide list', slideList);
  // const flatListRef = useRef();

  const [index, setIndex] = useState(0);

  // useAutoScroll({itemLength: slideList.length, flatListRef, index, setIndex});

  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    keyExtractor: useCallback(e => e.id, []),
  };
  const renderFlatlist = useCallback(() => {
    return (
      <FlatList
        key={index}
        ref={carouselFlatListRef}
        // getItemLayout={getItemLayout}
        data={slideList}
        style={{flex: 1}}
        renderItem={({item}) => {
          return <Slide key={index} data={item} />;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
    );
  }, [slideList]);
  return (
    <View style={styles.carouselContainer}>
      {renderFlatlist()}
      <Pagination index={index} slideList={slideList} />
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    height: WP('50'),
    width: WP('50'),
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
  },
  slideImage: {width: WP('50'), height: WP('50')},
  slideTitle: {fontSize: 24},
  slideSubtitle: {fontSize: 18},

  pagination: {
    // position: 'absolute',
    // top: 75,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {backgroundColor: 'lightblue'},
  paginationDotInactive: {backgroundColor: 'gray'},

  carousel: {flex: 1},
  promo: {
    fontFamily: FONTS.appFont,
    fontSize: WP('4'),
    position: 'absolute',
    top: 0,
    left: 0,
    color: COLORS.appColour,
    fontWeight: 'bold',
    // textAlign:'center',
    maxWidth: WP('35'),
    height: WP('20'),
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  carouselContainer: {
    margin: 'auto',
  },
});
