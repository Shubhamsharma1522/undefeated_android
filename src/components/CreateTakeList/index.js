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
import {COLORS} from '../../services';

const CreateTakeList = props => {
  console.log('hashtags', 'inside hashtags list');
  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props?.onSelectHashTag(item);
            }}>
            <Text style={styles.items}>{item?.hashtag}</Text>
            {/* {item && item?.image && item?.image != '' && ( */}
            <Image
              style={{width: 10, height: 10}}
              source={{uri: item?.image}}
            />
            {/* )} */}
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
});

export default CreateTakeList;
