import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, ScrollView, RefreshControl} from 'react-native';
import OneSignal from 'react-native-onesignal';
import WatchPartyListings from './components/watchPartyListings';
import {TabView, TabBar} from 'react-native-tab-view';
import MyWatchParty from './Tabs/myWatchParty';
import AllWatchParty from './Tabs/allWatchParty';
import {MeHeader} from '../../../../../components/MeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, APPLICATION_CONSTANTS, showToast} from '../../../../../services';
import * as TASKS from '../../../../../store/actions/index';
import {STORE} from '../../../../../store/storeConfig';
import {Text} from 'react-native';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import MeCustomTabView from '../../../../../components/MeTabView'
const initialLayout = {width: Dimensions.get('window').width};
const ContestWatchParty = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  let loader = false;

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
          STORE.dispatch(TASKS.getContestWatchParty(params));
        }
      } catch (error) {
        console.log('showing error in notificaiton', error);
      }
      notificationReceivedEvent.complete(notification);
    },
  );

  const onRefresh = async () => {
    loader = true;
    let params = {
      auth_token: props.user.auth_token,
      limit: 30,
      page: 0,
    };
    // console.log('dispatching contestwatchparty refresh from ');
    await dispatch(TASKS.getContestWatchParty(params));
    setTimeout(() => {
      loader = false;
      showToast('Refreshed!');
    }, 2000);
  };

  // console.log('user', user);

  // const contextWatchParty = useSelector(state => state.story.contextWatchParty);
  const allContest = useSelector(state => state.story.allContest);
  const myContest = useSelector(state => state.story.myContest);

  // useSelector(state => console.log("+++++",state))

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {key: 'MyWatchParty', title: 'My Contest Parties'},
    {key: 'AllWatchParty', title: 'All Contest Parties'},
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

  // const onReceived = async (notification, props) => {
  //   // console.log("PPPPPPPPPPPPPPPPpp",notification,props);
  //   try {
  //     const betData = notification.payload.additionalData;

  //     if (betData.notification_type === 5) {
  //       let params = {
  //         auth_token: props.auth_token,
  //         limit: 30,
  //         page: 0,
  //       };

  //       // console.log('dispatching contestwatchparty onreceived from ');
  //       await STORE.dispatch(TASKS.getContestWatchParty(params));
  //     }
  //   } catch (error) {
  //     console.log('showing error in notificaiton', error);
  //   }
  // };
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
    dispatch(TASKS.getSportList('CONTEST'));
  }, []);
  // const renderScene = ({route}) => {
  //   switch (route.key) {
  //     case 'AllWatchParty':
  //       return <AllWatchParty groups={allContest} user={user} />;
  //     case 'MyWatchParty':
  //       return <MyWatchParty groups={myContest} user={user} />;
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
    {key: 'MyRooms', label: "My Contest Parties"},
    {key: 'AllRooms', label: "All Contest Parties"},
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
        showlogo={true}
        // showNotficaion={true}ques
        showAboutUs={false}
        onAboutInfo={() => {
          props.navigation.navigate('AboutUs');
        }}
      />
      {/* <MeWelcome
        userName={user ? user.username : ''}
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
            Contest Parties
          </Text>
          <WatchPartyListings groups={myContest} allGroups={true} />
        </ScrollView>
      ) : ( <MeCustomTabView
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
