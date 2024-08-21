//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {
  COLORS,
  showToast,
  WP,
  FONTS,
  navigate,
  APPLICATION_IMAGES,
} from '../../../../../services';
import WatchPartyListings from '../components/watchPartyListings';
import * as TASKS from '../../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import CustomButton from '../../../Home/Components';

import {MeButton} from '../../../../../components/MeButton';
// create a component
const MyData = props => {
  let dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log({props});
  let myChatRooms = useSelector(state => state.story.myChatRooms);
  myChatRooms &&
    myChatRooms.length > 0 &&
    myChatRooms.map(group => {
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
      dispatch(TASKS.getChatRooms(params));
    }
  }, []);
  const handleCreateNewChatRoom = () => {
    navigate('NewChatRoom');
  };
  // useEffect(() => {
  //   let params = {
  //     auth_token: props && props.user && props.user.auth_token,
  //     limit: 30,
  //     page: 0,
  //   };
  //   dispatch(TASKS.getContestWatchParty(params))
  // }, [props.groups]);

  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching mywatch party onrefresh from ');
    await dispatch(TASKS.getChatRooms(params));
    setTimeout(() => {
      loader = false;
      showToast('Refreshed!');
    }, 2000);
  };
  const handleCreateHuddleRedirection = () => {
    navigate('NewChatRoom');
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl enabled refreshing={loader} onRefresh={onRefresh} />
        }>
        <WatchPartyListings groups={myChatRooms} />
      </ScrollView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flexGrow: 1,
    // backgroundColor: COLORS.white,
  },
  btnContainer: {
    height: WP('12'),
    width: WP('35'),
    borderRadius: 6,
    // position:'absolute',
    // bottom:0,
    // zIndex:10,
    marginTop: WP('3'),
  },
  buttonTitle: {
    color: COLORS.white,
    fontSize: WP('3.5'),
    fontFamily: FONTS.appFont,
  },
});

//make this component available to the app
export default MyData;
