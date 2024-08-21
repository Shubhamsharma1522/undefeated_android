import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {APPLICATION_IMAGES, COLORS} from '../../services';


const CreateMentionedUsersList = props => {
  console.log('hashtags', 'inside hashtags list');
  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              props?.onSelectMentionedUser(item);
            }}>
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

            {/* <Image
              style={{width: 10, height: 10}}
              source={{uri: item?.image}}
            /> */}
            <View style={styles.hr}></View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.appColour,
    marginTop: 10, // Adjust this margin as per your layout
    marginBottom: 60,
  },
  hr: {
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
  },
  items: {
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.black,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 30,
    height: 30,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CreateMentionedUsersList;
