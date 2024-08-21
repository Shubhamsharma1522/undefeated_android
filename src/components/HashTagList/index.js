import React from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, HP} from '../../services';
import {TouchableOpacity} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

const HashTagList = props => {
  return (
    <TouchableOpacity
      style={styles.modalContainer}
      activeOpacity={1}
      onPress={props.closeHandler}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        enabled>
        <View style={styles.modal}>
          <View style={styles.header}></View>
          <FlatList
            data={props?.data}
            renderItem={({item}, index) => (
              <TouchableOpacity
                style={styles.listItem}
                key={index}
                onPress={() => {
                  props?.onSelectHashTag(item);
                }}>
                <View style={styles.textContainer}>
                  <Text style={styles.fullName}>{item?.hashtag}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
  // return (
  //   <TouchableOpacity
  //     style={
  //       props.imageSelected
  //         ? {
  //             ...styles.modalContainer,
  //             bottom: Platform.OS === 'ios' ? 320 : 130,
  //           }
  //         : styles.modalContainer
  //     }
  //     onPress={props.closeHandler}>
  //     <KeyboardAvoidingView
  //       // eslint-disable-next-line react-native/no-inline-styles
  //       style={{
  //         flex: 1,
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         height: Dimensions.get('window').height,
  //         paddingBottom: 50,
  //       }}
  //       behavior={Platform.OS === 'ios' ? 'padding' : null}
  //       enabled
  //       keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 10}>
  //       <TouchableOpacity style={styles.modal} activeOpacity={1}>
  //         <View style={styles.listItem}>
  //           <FlatList
  //             data={props.data}
  //             renderItem={({item, index}) => (
  // <TouchableOpacity
  //   key={index}
  //   onPress={() => {
  //     props?.onSelectHashTag(item);
  //   }}>
  //   <Text style={styles.items}>{item?.hashtag}</Text>
  //   <View style={styles.hr}></View>
  // </TouchableOpacity>
  //             )}
  //             keyExtractor={item => item._id}
  //             style={{width: '100%'}}
  //             persistentScrollbar={true}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     </KeyboardAvoidingView>
  //   </TouchableOpacity>
  // );
};
// define your styles
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 550,
    paddingHorizontal: 20,
    height: HP('100'),
    maxHeight: HP('100'), // Adjust max height as needed
  },
  header: {
    alignItems: 'center',
  },
  closeImage: {
    width: 20,
    height: 20,
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#555',
  },
  listContent: {
    flexGrow: 1,
  },
});
// const styles = StyleSheet.create({
//   items: {
//     color: COLORS.black,
//     fontSize: 15,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//   },
//   modalContainer: {
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     bottom: 25,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',

//     // justifyContent: 'flex-end',
//   },
//   modal: {
//     width: '100%',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     backgroundColor: COLORS.white,
//     zIndex: 0,
//     // maxHeight: '50%',
//     // elevation: 5,
//     paddingBottom: Platform.OS === 'ios' ? HP('15') : HP('0'),
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.bgColor,
//     fontFamily: 'Poppins',
//     textAlign: 'center',
//     width: '100%',
//   },
//   listItem: {
//     width: '100%',
//     alignItems: 'center',
//     // flex:1,
//   },

//   hr: {
//     borderBottomColor: COLORS.lightGrey,
//     borderBottomWidth: 0.5,
//   },
// });
export default HashTagList;
