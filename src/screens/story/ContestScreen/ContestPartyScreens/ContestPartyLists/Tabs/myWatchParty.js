//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {COLORS, showToast} from '../../../../../../services';
import WatchPartyListings from '../components/watchPartyListings';
import * as TASKS from '../../../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
// create a component
const MyWatchParty = props => {
  let dispatch = useDispatch();
  let myContest = useSelector(state => state.story.myContest);
  const {user} = useSelector(state => state.auth);
  myContest &&
    myContest.length > 0 &&
    myContest.map(group => {
      group.join = false;
    });
  let loader = false;

  useEffect(() => {
    let params = {
      auth_token: user && user.auth_token,
      limit: 30,
      page: 0,
    };
    console.log('dispatching mywatchparty  from ');
    if (user && user.auth_token) {
      dispatch(TASKS.getContestWatchParty(params));
    }
  }, []);

  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching mywatch party onrefresh from ');
    await dispatch(TASKS.getContestWatchParty(params));
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
      <WatchPartyListings groups={myContest} />
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
export default MyWatchParty;
