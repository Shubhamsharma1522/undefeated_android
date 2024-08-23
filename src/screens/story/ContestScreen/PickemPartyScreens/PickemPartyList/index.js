import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import WatchPartyListings from './components/watchPartyListings';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MyWatchParty from './Tabs/myWatchParty';
import AllWatchParty from './Tabs/allWatchParty';
import {MeHeader} from '../../../../../components/MeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, APPLICATION_CONSTANTS} from '../../../../../services';
import * as TASKS from '../../../../../store/actions/index';
import {STORE} from '../../../../../store/storeConfig';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import MeCustomTabView from '../../../../../components/MeTabView';
const initialLayout = {width: Dimensions.get('window').width};
const ContestWatchParty = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  let loader = false;
  useEffect(() => {
    let params = {
      auth_token: user && user.auth_token,
      limit: 30,
      page: 0,
    };
    console.log('dispatching mywatchparty  from ');
    if (user && user.auth_token) {
      dispatch(TASKS.getPickemWatchParty(params));
    }
    dispatch(TASKS.getSportList('PICKEM'));
  }, []);
  OneSignal.setLogLevel(6, 0);
  // OneSignal.init('febc750b-3bd4-48b0-a12b-3daa58319468', {
  //   kOSSettingsKeyAutoPrompt: true,
  //   kOSSettingsKeyInAppLaunchURL: true,
  //   kOSSettingsKeyInFocusDisplayOption: 2,
  // });

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
            auth_token: props?.route.params?.auth_token,
            limit: 30,
            page: 0,
          };

          // console.log('dispatching contestwatchparty onreceived from ');
          STORE.dispatch(TASKS.getPickemWatchParty(params));
        }
      } catch (error) {
        console.log('showing error in notificaiton', error);
      }
      notificationReceivedEvent.complete(notification);
    },
  );
  // useEffect(() => {
  //   let propsData = props?.route.params;

  //   OneSignal.addEventListener('received', data => onReceived(data, propsData));

  //   return () => {
  //     console.log('Removing Event Listeners');
  //     OneSignal.addEventListener('received', data =>
  //       onReceived(data, propsData),
  //     );
  //   };
  // }, []);

  // useMemo(() => {
  //   if (props && props.user && props.user.auth_token) {
  //     let params = {
  //       auth_token: props.user.auth_token,
  //       limit: 30,
  //       page: 0,
  //     };
  //     // console.log('dispatching contestwatchparty refresh from ');
  //     dispatch(TASKS.getPickemWatchParty(params));
  //   }
  // }, [props?.user]);
  // useFoucus

  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: props.user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching contestwatchparty refresh from ');
    await dispatch(TASKS.getPickemWatchParty(params));
    setTimeout(() => {
      loader = false;
      showToast('Refreshed!');
    }, 2000);
  };

  // console.log('user', user);

  // const contextWatchParty = useSelector(state => state.story.contextWatchParty);
  const allContest = useSelector(state => state.story.allPickemContest);
  const myContest = useSelector(state => state.story.myPickemContest);

  // useSelector(state => console.log("+++++",state))

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {key: 'MyRooms', title: "My Pick'em Parties"},
    {key: 'AllRooms', title: "All Pick'em Parties"},
  ]);

  // React.useEffect(() => {
  //   // console.log('Props in useEffect START', props);
  //   if (
  //     props.route.params.params &&
  //     props.route.params.params.hasOwnProperty('key')
  //   ) {
  //     // console.log('Props in useEffect CONDITION', props);
  //     const key = props.route.params.params.key;
  //     if (myContest.length !== 0) {
  //       setIndex(key);
  //     }
  //   }
  // }, [props.navigation]);

  // useEffect(() => {
  //   console.log('PROPS>NAV', props);
  //   const focusListener = props.navigation.addListener('didFocus', () => {
  //     // The screen is focused
  //     // Call any action
  //     // _getBusiness({id: business?.id}); // replace with your function
  //     console.log('LLLLL');
  //   });
  //   return () => {
  //     // clean up event listener
  //     focusListener.remove();
  //   };
  // });

  // useFocusEffect(
  //   React.useCallback(async () => {
  //     if (props && props.user) {
  //       let params = {
  //         auth_token: props.user.auth_token,
  //         limit: 30,
  //         page: 0,
  //       };

  //       await dispatch(TASKS.getPickemWatchParty(params));
  //     }
  //   }, [props.user]),
  // );
  // useMemo(() => {
  //   console.log('MOUNTTTTT');
  // }, [myContest]);
  // const renderScene = ({route}) => {
  //   switch (route.key) {
  //     case 'AllRooms':
  //       return <AllWatchParty groups={allContest} user={user?.user} />;
  //     case 'MyRooms':
  //       return <MyWatchParty groups={myContest} user={user?.user} />;
  //   }
  // };

  // const renderTabBar = props => (
  //   <TabBar
  //     {...props}
  //     style={{backgroundColor: COLORS.appColour}}
  //     indicatorStyle={{backgroundColor: COLORS.white}}
  //     getLabelText={({route}) => route.title}
  //   />
  // );
  const tabs = [
    {key: 'MyRooms', label: "My Pick'em Parties"},
    {key: 'AllRooms', label: "All Pick'em Parties"},
  ];
  return (
    <>
      <MeHeader
        title={/*'Textme.Bet'*/ 'Undefeated.Live'}
        showProfilePic={true}
        // hideBackBtn={user?.user?.role && user?.user?.role === 2 ? false : true}
        hideBackBtn={false}
        profilePicUrl={user ? user.profile_image : null}
        groups={true}
        // showNotficaion={true}
        showlogo={true}
        showAboutUs={false}
        onAboutInfo={() => {
          props.navigation.navigate('AboutUs');
        }}
      />
      {/* <MeWelcome
        userName={user ? user.username :''}
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
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Pick'em Contest
          </Text>
          <WatchPartyListings groups={myContest} allGroups={true} />
        </ScrollView>
      ) : (
        <MeCustomTabView
          tabs={tabs}
          initialTabKey="AllRooms" // Set the initial tab key here
          data={{
            allData: allContest,
            myData: myContest,
          }}
          user={user}
          AllData={AllWatchParty} // Pass the AllData component
          MyData={MyWatchParty}
        />
        // <TabView
        //   navigationState={{index, routes}}
        //   renderScene={renderScene}
        //   onIndexChange={setIndex}
        //   initialLayout={initialLayout}
        //   bounces={true}
        //   renderTabBar={renderTabBar}
        // />
      )}
      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};

export default ContestWatchParty;

const styles = StyleSheet.create({
  noLabel: {},
});
