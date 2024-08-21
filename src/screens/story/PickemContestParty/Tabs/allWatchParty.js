//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {COLORS, FONTS, showToast} from '../../../../services';
import WatchPartyListings from '../components/watchPartyListings';
import * as TASKS from '../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
// create a component
const AllWatchParty = props => {
  let dispatch = useDispatch();
  const allPickemContest = useSelector(state => state.story.allPickemContest);

  // const allContest = useSelector(state => state.story.allPickemContest);
  const {user} = useSelector(state => state.auth);
  let loader = false;
  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching all watch party from ');
    await dispatch(TASKS.getPickemWatchParty(params));
    setTimeout(() => {
      loader = false;
      showToast('Refreshed!');
    }, 2000);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl enabled refreshing={loader} onRefresh={onRefresh} />
      }>
      {allPickemContest && allPickemContest.length > 0 ? (
        <WatchPartyListings groups={allPickemContest} allGroups={true} />
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
            No Pick'em Found
          </Text>
        </View>
      )}
    </ScrollView>
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
export default AllWatchParty;
