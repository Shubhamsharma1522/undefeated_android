//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  showToast,
} from '../../../../../services';
import WatchPartyListings from '../components/watchPartyListings';
import * as TASKS from '../../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';

// create a component
const AllData = props => {
  let dispatch = useDispatch();

  const allData = useSelector(state => state.story.allChatRooms);
  const user = useSelector(state => state.auth.user);
  console.log('Chat Rooms user all data.js', user);
  console.log('🚀 ~ file: allData.js:13 ~ AllData ~ allData:', allData);
  let loader = false;
  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching all watch party from ');
    await dispatch(TASKS.getChatRooms(params));
    setTimeout(() => {
      loader = false;
      showToast('Refreshed!');
    }, 2000);
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl enabled refreshing={loader} onRefresh={onRefresh} />
        }>
        {allData && allData.length > 0 ? (
          <WatchPartyListings groups={allData} allGroups={true} />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FONTS.appFont,
                color: COLORS.appColour,
              }}>
              No Huddle Found.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
});

//make this component available to the app
export default AllData;
