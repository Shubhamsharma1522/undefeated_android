import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';

import OneSignal from 'react-native-onesignal';
import {MeWelcome} from '../../../../components/MeWelcome';
import WatchPartyListings from './components/watchPartyListings';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MeHeader} from '../../../../components/MeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  COLORS,
  APPLICATION_CONSTANTS,
  showToast,
  WP,
  APPLICATION_IMAGES,
} from '../../../../services';
import * as TASKS from '../../../../store/actions/index';
import {STORE} from '../../../../store/storeConfig';
import {Text} from 'react-native';
import AllData from './Tabs/allData';
import MyData from './Tabs/myData';
import MeBottomNavbar from '../../../../components/BottomNavbar';

const initialLayout = {width: Dimensions.get('window').width};
const ChatRoom = props => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  console.log('Chat Rooms unique', props);
  const user = useSelector(state => state.auth.user);
  console.log('Chat Rooms unique', user);
  OneSignal.setLogLevel(6, 0);

  OneSignal.setAppId('febc750b-3bd4-48b0-a12b-3daa58319468');
  // OneSignal.inFocusDisplaying(2);
  // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground in contestPage:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const betData = notification.additionalData;
      console.log('additionalData: ', betData);
      console.log('propsData', props);
      try {
        // const betData = notification.payload.additionalData;

        if (betData.notification_type === 5) {
          let params = {
            auth_token: user?.auth_token,
            limit: 30,
            page: 0,
          };

          // console.log('dispatching contestwatchparty onreceived from ');
          STORE.dispatch(TASKS.getChatRooms(params));
        }
      } catch (error) {
        console.log('showing error in notificaiton', error);
      }
      notificationReceivedEvent.complete(notification);
    },
  );
  // useEffect(() => {
  //   let propsData = props?.navigation?.state?.params;

  //   OneSignal.addEventListener('received', data => onReceived(data, propsData));

  //   return () => {
  //     console.log('Removing Event Listeners');
  //     OneSignal.addEventListener('received', data =>
  //       onReceived(data, propsData),
  //     );
  //   };
  // }, []);

  const onRefresh = async () => {
    console.log('ONREFRESH>>dispatching contestwatchparty refresh from ');
    setLoader(true);
    // loader = true;
    let params = {
      auth_token: user?.auth_token,
      limit: 30,
      page: 0,
    };

    await dispatch(TASKS.getChatRooms(params));

    setTimeout(() => {
      // loader = false;
      setLoader(false);
      showToast('Refreshed!');
    }, 2000);
  };

  // console.log('user', user);

  // const contextWatchParty = useSelector(state => state.story.contextWatchParty);
  const allData = useSelector(state => state.story.allChatRooms);
  const myData = useSelector(state => state.story.myChatRooms);

  // useSelector(state => console.log("+++++",state))

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {key: 'MyChatRooms', title: 'My Huddles'},
    {key: 'AllChatRooms', title: 'All Huddles'},
  ]);

  React.useEffect(() => {
    if (
      props.route?.params?.params &&
      props.route?.params?.params.hasOwnProperty('key')
    ) {
      // console.log('Props in useEffect CONDITION', props);
      const key = props.route.params.params.key;
      if (myData.length !== 0) {
        setIndex(key);
      }
    }
  }, [props.navigation]);

  useEffect(() => {
    let params = {
      auth_token: user?.auth_token,
      limit: 30,
      page: 0,
    };

    dispatch(TASKS.getChatRooms(params));
    dispatch(TASKS.getSportList('CONTEST'));
  }, []);
  const renderScene = ({route}) => {
   <View><Text>123</Text></View>
    // switch (route.key) {
    //   case 'AllChatRooms':
    //     return <AllData data={allData} user={user} />;
    //   case 'MyChatRooms':
    //     return <MyData data={myData} user={user} />;
    // }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{backgroundColor: COLORS.appColour}}
      indicatorStyle={{backgroundColor: COLORS.white}}
      getLabelText={({route}) => route.title}
    />
  );

  const handleCreateNewChatRoom = () => {
    props.navigation.navigate('NewChatRoom');
  };

  return (
    <>
      <MeHeader
        title={'Undefeated.Live'}
        showProfilePic={true}
        // hideBackBtn={user?.user?.role && user?.user?.role === 2 ? false : true}
        hideBackBtn={false}
        showlogo={true}
        profilePicUrl={user ? user.profile_image : null}
        groups={true}
        // showNotficaion={true}
        showAboutUs={false}
        onAboutInfo={() => {
          props.navigation.navigate('AboutUs');
        }}
      />
      {/* <MeWelcome
        userName={user ? user.username : 'No name'}
        // title={'All Bets'}
        onPress={this.renderAllBets}
      /> */}

      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl enabled refreshing={loader} onRefresh={onRefresh} />
          }>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.appColour,
              fontSize: WP('7'),
              fontWeight: '700',
              paddingTop: 10,
            }}>
            Huddles
          </Text>
          <WatchPartyListings groups={myData} allGroups={true} />
        </ScrollView>
      ) : (
        <>
          {/* <TouchableOpacity
            style={{
              margin: 16,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <CustomButton
              title={'Create Huddle'}
              onPress={handleCreateNewChatRoom}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.plusContainer}
            // onPress={() => setCreateTakes(true)}
            onPress={handleCreateNewChatRoom}>
            <Image source={APPLICATION_IMAGES.plus} style={styles.img} />
          </TouchableOpacity>
          <SafeAreaProvider>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              // bounces={true}
              renderTabBar={renderTabBar}
            />
          </SafeAreaProvider>
        </>
      )}
      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  noLabel: {},
  img: {
    width: 30,
    height: 30,
  },
  plusContainer: {
    width: '100%',
    maxWidth: 70,
    height: '100%',
    maxHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.appColour,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: '10%',
    right: '4%',
    zIndex: 10,
    elevation: 6, // Android shadow elevation

    // iOS shadow properties
    shadowColor: COLORS.lightGrey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
