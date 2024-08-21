//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {APPLICATION_IMAGES, WP} from '../../../../../services';


// create a component
const MembersList = props => {
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
  return (
    <View style={styles.imagesContainer}>
      {props.group && props.group.members_list ? (
        props.group.members_list.length > 0 ? (
          props.group.members_list.slice(0, 7).map(group => {
            return (
              <Image
                source={
                  group.profile_image_url != null
                    ? {
                        uri: group.profile_image_url,
                      }
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
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
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    paddingLeft: WP('7'),
  },
  profile_image: {
    height: WP('6'),
    width: WP('6'),
    resizeMode: 'cover',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: WP('-3'),
  },
});

//make this component available to the app
export default MembersList;
