//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, HP, WP} from '../../../../../services';
import WatchPartyCard from './watchPartyItem';
// create a component
const WatchPartyListings = ({groups, allGroups, fromHome}) => {
  console.log('WatchPartyListings props here', groups);

  return (
    <View style={styles.container}>
      {groups && groups?.length > 0 ? (
        groups.map(group => {
          return <WatchPartyCard group={group} allGroups={allGroups} />;
        })
      ) : allGroups ? null : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: HP('80%'),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FONTS.appFont,
              color: COLORS.appColour,
            }}>
            Click on All Huddles to join a huddle.
          </Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: WP('5'),
    paddingTop: 5,
  },
});

//make this component available to the app
export default WatchPartyListings;
