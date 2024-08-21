import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';

const SnapCarousel = ({slides}) => {
  const [index, setIndex] = useState(0);
  const isCarousel = React.useRef(null);

  const slideList =
    slides &&
    slides.length > 0 &&
    slides?.map(slide => {
      return {
        id: slide.id,
        link: slide.link,
        image: slide.image,
        promotional_text: slide.promotional_text,
      };
    });

  return (
    <View style={{paddingLeft: 10}}>
      {/* <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={slideList}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        onSnapToItem={idx => setIndex(idx)}
      /> */}
      {/* <Pagination
        dotsLength={slideList?.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});

export default SnapCarousel;
