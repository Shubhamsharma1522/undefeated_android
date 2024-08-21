// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {COLORS, WP, FONTS} from '../../../../../services';
// import React from 'react';
// import {MeButton} from '../../../../../components/MeButton';

// const RenderItem = ({
//   sport,
//   index,
//   itemHeight,
//   isSelected,
//   scrollY,
//   setSport,
// }) => {
//   const inputRange = [
//     (index - 2) * itemHeight,
//     (index - 1) * itemHeight,
//     index * itemHeight,
//   ];

//   const scale = scrollY.interpolate({
//     inputRange,
//     outputRange: [0.8, 1, 0.8],
//   });

//   return (
//     <TouchableOpacity activeOpacity={1} onPress={setSport}>
//       <Animated.View
//         style={[styles.sport, {height: itemHeight, transform: [{scale}]}]}>
//         <Text style={[styles.item, isSelected && styles.selectedItem]}>
//           {sport}
//         </Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const SportsList = props => {
//   const itemHeight = props.itemHeight;
//   const sportsList = props.sportsList;
//   const scrollY = React.useRef(new Animated.Value(0)).current;
//   const flatlistRef = React.useRef();
//   //   const sportsList = Object.values(props.sportsList);
//   //   const modifiedItems = [null, ...sportsList, null];
//   // const initialScrollIndex = sportsList.indexOf(props.selectedSport);

//   const [selectedSport, setSelectedSport] = React.useState(props.selectedSport);
//   const initialScrollIndex = sportsList.findIndex(
//     sportItem => sportItem.value === selectedSport,
//   );
//   const momentumScrollEnd = event => {
//     const y = event.nativeEvent.contentOffset.y;
//     const index = Math.round(y / itemHeight);
//     setSelectedSport(sportsList[index]);
//   };
//   return (
//     <View style={{ display:'flex',height:'100%', alignItems:'center', justifyContent:'space-between'}}>
//       <View style={{height: itemHeight * 3, alignItems:'center', marginTop:70}}>
//         <Animated.FlatList
//           ref={flatlistRef}
//           data={sportsList}
//           snapToInterval={itemHeight}
//           keyExtractor={(_, index) => index}
//           showsVerticalScrollIndicator={false}
//           onMomentumScrollEnd={momentumScrollEnd}
//           scrollEventThrottle={16}
//           // initialScrollIndex={initialScrollIndex}
//           renderItem={({item: sport, index}) => {
//             console.log('CREATE SPORT ITEM', sport);
//             return (
//               <RenderItem
//                 index={index}
//                 sport={sport.sport_name}
//                 itemHeight={itemHeight}
//                 isSelected={sport.sport_name === selectedSport}
//                 setSport={() => {
//                   if (!sport) return;
//                   setSelectedSport(sport.sport_name);
//                   // flatlistRef.current.scrollToIndex({
//                   //   animated: true,
//                   //   index: sportsList.findIndex(
//                   //     sportItem => sportItem.value === sport.sport_name,
//                   //   ),
//                   // });
//                 }}
//                 scrollY={scrollY}
//               />
//             );
//           }}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {y: scrollY}}}],
//             {useNativeDriver: true},
//           )}
//           getItemLayout={(_, index) => ({
//             length: itemHeight,
//             offset: itemHeight * index,
//             index,
//           })}
//         />
//         <View style={[styles.indicatorHolder, {top: itemHeight}]}>
//           <View style={[styles.indicator]} />
//           <View style={[styles.indicator, {top: itemHeight}]} />
//         </View>
//       </View>
// <View style={styles.actionButtons}>
//   <MeButton
//     title="CANCEL"
//     containerStyles={styles.actionBtnContainer}
//     textStyles={styles.actionBtnText}
//     onPress={props.hideSportSelection}
//   />
//   <View style={{marginHorizontal: 6}} />
//   <MeButton
//     title="SET"
//     containerStyles={styles.BtnContainer}
//     textStyles={styles.BtnText}
//     onPress={() => {
//       props.setSport(selectedSport);
//       props.hideSportSelection();
//     }}
//   />
// </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sport: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     fontSize: WP('6'),
//     fontFamily: FONTS.appFont,
//     color: COLORS.lightGrey,
//   },
//   selectedItem: {
//     color: COLORS.appColour,
//   },
//   indicatorHolder: {
//     position: 'absolute',
//     left: '-30%',
//     width: '100%',
//   },
//   indicator: {
//     height: 1,
//     backgroundColor: COLORS.lightGrey,
//   },
//   actionButtons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//     width:'100%',
//     marginBottom: 16,
//   },
//   actionBtnContainer: {
//     width: '100%',
//     height: 'auto',
//     paddingHorizontal: 20,
//     paddingVertical: 4,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: COLORS.appColour,
//     backgroundColor: 'transparent',
//   },
//   BtnContainer: {
//     width: '100%',
//     height: 'auto',
//     paddingHorizontal: 20,
//     paddingVertical: 4,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: COLORS.appColour,
//     backgroundColor: COLORS.appColour,
//     color: 'white',
//   },
//   actionBtnText: {
//     color: COLORS.appColour,
//     fontSize: WP('4'),
//     fontFamily: FONTS.appFont,
//   },
//   BtnText: {
//     color: COLORS.white,
//     fontSize: WP('4'),
//     fontFamily: FONTS.appFont,
//   },
// });
// export default SportsList;
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, WP, FONTS} from '../../../../../services';
import React from 'react';
import {MeButton} from '../../../../../components/MeButton';

const RenderItem = ({
  sport,
  index,
  itemHeight,
  isSelected,
  scrollY,
  setSport,
}) => {
  const inputRange = [
    (index - 2) * itemHeight,
    (index - 1) * itemHeight,
    index * itemHeight,
  ];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={setSport}>
      <Animated.View
        style={[styles.sport, {height: itemHeight, transform: [{scale}]}]}>
        <Text style={[styles.item, isSelected && styles.selectedItem]}>
          {sport}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const SportsList = props => {
  const itemHeight = props.itemHeight;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = React.useRef();
  const sportsList = Object.values(props.sportsList);
  const modifiedItems = [null, ...sportsList, null];
  const initialScrollIndex = sportsList.indexOf(props.selectedSport);

  const [selectedSport, setSelectedSport] = React.useState(props.selectedSport);

  const momentumScrollEnd = event => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    setSelectedSport(sportsList[index]);
  };

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{height: itemHeight * 3, alignItems: 'center', marginTop: 70}}>
        <Animated.FlatList
          ref={flatlistRef}
          data={modifiedItems}
          snapToInterval={itemHeight}
          keyExtractor={(_, index) => index}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={momentumScrollEnd}
          scrollEventThrottle={50}
          initialScrollIndex={initialScrollIndex}
          renderItem={({item: sport, index}) => (
            <RenderItem
              index={index}
              sport={sport}
              itemHeight={itemHeight}
              isSelected={sport === selectedSport}
              setSport={() => {
                if (!sport) return;
                setSelectedSport(sport);
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: sportsList.indexOf(sport),
                });
              }}
              scrollY={scrollY}
            />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
        />
        <View style={[styles.indicatorHolder, {top: itemHeight}]}>
          <View style={[styles.indicator]} />
          <View style={[styles.indicator, {marginTop: itemHeight}]} />
        </View>
      </View>
      <View style={styles.actionButtons}>
        <MeButton
          title="CANCEL"
          containerStyles={styles.actionBtnContainer}
          textStyles={styles.actionBtnText}
          onPress={props.hideSportSelection}
        />
        <View style={{marginHorizontal: 6}} />
        <MeButton
          title="SET"
          containerStyles={styles.BtnContainer}
          textStyles={styles.BtnText}
          onPress={() => {
            props.setSport(selectedSport);
            props.hideSportSelection();
          }}
        />
      </View>
      {/* <View style={styles.actionButtons}>
        <MeButton
          title="CANCEL"
          containerStyles={styles.actionBtnContainer}
          textStyles={styles.actionBtnText}
          onPress={props.hideSportSelection}
        />
        <View style={{marginHorizontal: 6}} />
        <MeButton
          title="SET"
          containerStyles={styles.actionBtnContainer}
          textStyles={styles.actionBtnText}
          onPress={() => {
            props.setSport(selectedSport);
            props.hideSportSelection();
          }}
        />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  sport: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    fontSize: WP('6'),
    fontFamily: FONTS.appFont,
    color: COLORS.lightGrey,
  },
  selectedItem: {
    color: COLORS.appColour,
  },
  indicatorHolder: {
    position: 'absolute',
    // left: '-30%',
    width: '100%',
  },
  indicator: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  actionBtnContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.appColour,
    backgroundColor: 'transparent',
  },
  BtnContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.appColour,
    backgroundColor: COLORS.appColour,
    color: 'white',
  },
  actionBtnText: {
    color: COLORS.appColour,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
  },
  BtnText: {
    color: COLORS.white,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
  },
});
// const styles = StyleSheet.create({
//   sport: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     fontSize: WP('6'),
//     fontFamily: FONTS.appFont,
//     color: COLORS.lightGrey,
//   },
//   selectedItem: {
//     color: COLORS.appColour,
//   },
//   indicatorHolder: {
//     position: 'absolute',
//     left: '25%',
//     width: '50%',
//   },
//   indicator: {
//     height: 1,
//     backgroundColor: COLORS.lightGrey,
//   },
//   actionButtons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//     marginTop: 16,
//   },
//   actionBtnContainer: {
//     width: '100%',
//     height: 'auto',
//     paddingHorizontal: 20,
//     paddingVertical: 4,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: COLORS.appColour,
//     backgroundColor: 'transparent',
//   },
//   actionBtnText: {
//     color: COLORS.appColour,
//     fontSize: WP('4'),
//     fontFamily: FONTS.appFont,
//   },
// });
export default SportsList;
