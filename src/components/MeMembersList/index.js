//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {WP} from '../../services';

// create a component
let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
const MembersList = props => {
  return (
    <ScrollView
      style={styles.imagesContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {props.group ? (
        props.group.members_list.length > 0 ? (
          props.group.members_list.map((group, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri:
                    group.profile_image != null
                      ? group.profile_image
                      : placeHolder,
                }}
                style={styles.profile_image}
              />
            );
          })
        ) : (
          <Text>No members</Text>
        )
      ) : (
        <Text>No members</Text>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
  },
  profile_image: {
    height: WP('10'),
    width: WP('10'),
    resizeMode: 'cover',
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: WP('2'),
  },
});

//make this component available to the app
export default MembersList;
