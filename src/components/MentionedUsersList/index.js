import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {APPLICATION_IMAGES, HP} from '../../services';

const MentionedUsersList = props => {
  const {data, closeHandler, onSelectMentionedUser} = props;
  return (
    <TouchableOpacity
      style={styles.modalContainer}
      activeOpacity={1}
      onPress={closeHandler}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        enabled>
        <View style={styles.modal}>
          <View style={styles.header}>
            {/* <Image
              source={require('../../assets/question.png')} // Adjust the path as needed
              style={styles.closeImage}
            /> */}
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => onSelectMentionedUser(item)}>
                <Image
                  source={
                    item.profile_image_url
                      ? {uri: item.profile_image_url}
                      : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                  }
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.fullName}>{item.fullname}</Text>
                  <Text style={styles.username}>@{item.username}</Text>
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
};

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

export default MentionedUsersList;

// import React from 'react';
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {APPLICATION_IMAGES, COLORS, HP} from '../../services';
// import {TouchableOpacity} from 'react-native';
// import {KeyboardAvoidingView} from 'react-native';
// 

// const MentionedUsersList = props => {
//   return (
//     <TouchableOpacity
//       style={
//         props.imageSelected
//           ? {
//               ...styles.modalContainer,
//               bottom: Platform.OS === 'ios' ? 320 : 130,
//             }
//           : styles.modalContainer
//       }
//       onPress={props.closeHandler}>
//       <KeyboardAvoidingView
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           justifyContent: 'center',
//           height: Dimensions.get('window').height,
//           paddingBottom: 50,
//         }}
//         behavior={Platform.OS === 'ios' ? 'padding' : null}
//         enabled
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 10}>
//         <TouchableOpacity style={styles.modal} activeOpacity={1}>
//           <View style={{alignItems: 'center', paddingTop: 5}}>
//             <Image
//               source={APPLICATION_IMAGES.question}
//               style={styles.closeImage}
//             />
//             {/* <Text style={styles.headingTitle}>Users</Text> */}
//           </View>
//           <View style={styles.listItem}>
//             <FlatList
//               data={props.data}
//               renderItem={({item, index}) => (
//                 <TouchableOpacity
//                   style={styles.container}
//                   onPress={() => onSelectMentionedUser(item)}>
//                   <Image
//                     source={
//                       item?.profile_image_url
//                         ? {uri: item?.profile_image_url}
//                         : APPLICATION_IMAGES.profilePicPlaceHolder
//                     }
//                     style={styles.profileImage}
//                   />
//                   <View style={styles.textContainer}>
//                     <Text style={styles.fullName}>{item.fullname}</Text>
//                     <Text style={styles.username}>@{item.username}</Text>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={item => item._id}
//               style={{width: '100%'}}
//               persistentScrollbar={true}
//             />
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </TouchableOpacity>
//   );
// };
// // define your styles
// const styles = StyleSheet.create({
//   items: {
//     color: COLORS.black,
//     fontSize: 15,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//   },
//   modalContainer: {
//     width: '100%',
//     // height
//     position: 'absolute',
//     top: 0,
//     // bottom: 25,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     // flex:1
//   },
//   headingTitle: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     color: COLORS.appColour,
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   modal: {
//     flex: 1,
//     width: '100%',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     backgroundColor: COLORS.white,
//     zIndex: 0,
//     // maxHeight: '50%',
//     // elevation: 5,
//     paddingBottom: Platform.OS === 'ios' ? HP('15') : HP('0'),
//     marginTop: 40,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
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
//   closeImage: {height: 20, width: 20, marginVertical: 10},
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25, // make it round if images are square
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   fullName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   username: {
//     fontSize: 14,
//     color: '#555',
//   },
// });
// export default MentionedUsersList;
