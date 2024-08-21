// import React from "react";
// import { Text, View } from "react-native";
// const App=()=>{
// return(<View><Text>123123</Text></View>)
// }
// export default App

import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Linking,
  LogBox,
  View,
  Text,
} from 'react-native';
import NavigatorContainer from './src/routes/index';
import {Provider, useSelector} from 'react-redux';
import {STORE, PERSISTOR} from './src/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {setTopLevelNavigator, COLORS, WP} from './src/services';
import OneSignal from 'react-native-onesignal';
import {navigate} from './src/services/index'; // Import package from node modules
import VersionCheck from 'react-native-version-check';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/contexts/authContext';
const queryClient = new QueryClient({
  defaultOptions: {
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    queries: {
      retry: failureCount => {
        return failureCount < 3;
      },
    },
  },
});
const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    // myOwnColor: '#BADA55',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    // Ignore log notification by message:
    // LogBox.ignoreAllLogs()

    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    // OneSignal.init('febc750b-3bd4-48b0-a12b-3daa58319468', {
    //   kOSSettingsKeyAutoPrompt: true,
    //   kOSSettingsKeyInAppLaunchURL: true,
    //   kOSSettingsKeyInFocusDisplayOption: 2,
    // });
    // OneSignal.setAppId('febc750b-3bd4-48b0-a12b-3daa58319468');
    OneSignal.setAppId('febc750b-3bd4-48b0-a12b-3daa58319468');
    // OneSignal.inFocusDisplaying(2);  // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    // const state = OneSignal.getDeviceState();
    // let playerId = state.userId;
    // console.log('player Id from App Js', playerId, state);
    // Replacement for inFocusDisplaying
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let clearTimeoutHolder = null;
        console.log(
          'OneSignal: notification will show in foreground in App Js:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        const bet = data.bet;
        console.log('additionalData:', data);
        if (data.notification_type == 1) {
          navigate('CompleteBets', {
            bet_id: data.bet_id,
            isNotification: 1,
          });
        } else if (data.notification_type === 3) {
          // navigate('Messages',{messageObject:betData,isNotification:1})
          if (data && data.is_group && data.is_group === 1) {
            let groupData = {
              id: data.group_id,
              senderToken: data.sender_auth_token,
              title: data.group_title,
              profile_image: data.group_profile_image,
            };
            let message = {
              _id: Math.round(Math.random() * 1000000),
              text: data.message,
              createdAt: new Date(),
              user: {
                _id: 2, //1 sender 2 recver
                name: 'React Native',
                avatar: data.sender_profile_image,
              },
            };
            navigate('Messages', {
              standings: 'private',
              groupData,
              message,
              fromNotification: 1,
              onTap: false,
            });
          } else {
            // console.log('TESTT', data);
            try {
              // let person = {
              //   id: data.receiver_id,
              //   username: '',
              //   profile_image: '',
              // };
              let person = {
                id: data.receiver_id,
                username: 'M Sharma',
                default_auth_token: data.receiver_token,
                profile_image: 'https://placeimg.com/140/140/any',
                senderToken: data.sender_auth_token,
              };
              let message = {
                _id: Math.random(),
                text: data.message,
                createdAt: new Date(),
                user: {
                  _id: 2, //1 sender 2 recver
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              };
            } catch (err) {
              console.log('ON RECV ERRO', err);
            }
          }
        } else {
          // if (bet.title && bet.wager) {
          //   let bet_vs_sports_player = bet.vs_sports_player;
          //   Alert.alert(
          //     bet.title,
          //     `${bet.description} and wager is ${bet.wager}`,
          //     [
          //       {
          //         text: "Let's Do This",
          //         onPress: () => {
          //           navigate('Home', {data, answer: 1});
          //         },
          //         style: 'cancel',
          //       },
          //       {
          //         text: 'Discuss',
          //         onPress: () => {
          //           navigate('Home', {data, answer: 3});
          //         },
          //       },
          //       {
          //         text: "I'm Out",
          //         onPress: () => {
          //           navigate('Home', {data, answer: 2});
          //         },
          //       },
          //     ],
          //     {cancelable: false},
          //   );
          // }
        }
        notificationReceivedEvent.complete(notification);
      },
    );
    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse();

    // OneSignal.addEventListener('received', this.onReceived);

    // OneSignal.addEventListener('opened', this.onOpened);
    // Replacement for onOpened function in React native version 4.0.6

    OneSignal.setNotificationOpenedHandler(openedEvent => {
      console.log('OneSignal: notification opened:', openedEvent);
      const {action, notification} = openedEvent;
      console.log('Action, notification', action, notification);
      var clearTimeoutHolder = null;

      try {
        let bet = notification?.additionalData?.bet;
        console.log('bet', bet);
        const betData = notification.additionalData;
        console.log('showing bet on opened app.js', betData);
        // bet.fromNotification = true
        // betData.notification_type = 4
        // console.log('showing bet DATA Start', bet , betData);

        if (betData.notification_type === 1) {
          console.log('1st if block');
          navigate('CompleteBets', {bet_id: betData.bet_id, isNotification: 1});
        } else if (betData.notification_type == 5) {
          console.log('2nd if block');
          navigate('WatchPartyContestStacks', {
            standings: 'Private',
            groupData: betData.response,
          });
          this.navigatorRefDup?.current?.navigate('WatchPartyContestStacks', {
            standings: 'Private',
            groupData: betData.response,
          });
        } else if (this.betType == 4) {
          navigate('WatchParty', {});
          this.navigatorRefDup?.current?.navigate('WatchParty', {});
        } else if (betData && betData.notification_type === 3) {
          // navigate('Messages',{messageObject:betData,isNotification:1})
          if (betData && betData.is_group && betData.is_group === 1) {
            let groupData = {
              id: betData.group_id,
              senderToken: betData.sender_auth_token,
              title: betData.group_title,
              profile_image: betData.group_profile_image,
            };
            let message = {
              _id: Math.round(Math.random() * 1000000),
              text: betData.message,
              createdAt: new Date(),
              user: {
                _id: 2, //1 sender 2 recver
                name: 'React Native',
                avatar: betData.sender_profile_image,
              },
            };
            // this.navigatorRefDup.current.navigate('Messages',{
            //   standings: 'private',
            //   groupData,
            //   message,
            //   fromNotification: 1,
            //   onTap: true,
            // })
            // navigate('Messages', {
            //   standings: 'private',
            //   groupData,
            //   message,
            //   fromNotification: 1,
            //   onTap: true,
            // });

            if (clearTimeoutHolder !== null) {
              clearTimeout(clearTimeoutHolder);
            }
            clearTimeoutHolder = setTimeout(async () => {
              navigate('Messages', {
                standings: 'private',
                groupData,
                message,
                fromNotification: 1,
                onTap: true,
              });
            }, 500);
          } else {
            // let person = {
            //   id: betData.receiver_id,
            //   username: 'M Sharma',
            //   default_auth_token: betData.receiver_token,
            //   profile_image: 'https://placeimg.com/140/140/any',
            //   senderToken: betData.sender_auth_token,
            // };
            // let message = {
            //   _id: Math.random(),
            //   text: betData.message,
            //   createdAt: new Date(),
            //   user: {
            //     _id: 2, //1 sender 2 recver
            //     name: 'React Native',
            //     avatar: 'https://placeimg.com/140/140/any',
            //   },
            // };
            // navigate('Messages', {
            //   standings: 'public',
            //   person,
            //   message,
            //   fromNotification: 1,
            //   onTap: false,
            // });
          }
        } else if (betData && betData.notification_type === 7) {
          if (betData && betData.is_group && betData.is_group === 1) {
            let groupData = {
              id: betData.group_id,
              slug: betData.group_slug,
              senderToken: betData.sender_auth_token,
              title: betData.group_title,
              profile_image: betData.group_profile_image,
            };
            let message = {
              _id: Math.round(Math.random() * 1000000),
              text: betData.message,
              createdAt: new Date(),
              user: {
                _id: 2, //1 sender 2 recver
                name: 'React Native',
                avatar: betData.sender_profile_image,
              },
            };
            // this.navigatorRefDup.current.navigate('Messages',{
            //   standings: 'private',
            //   groupData,
            //   message,
            //   fromNotification: 1,
            //   onTap: true,
            // })
            // navigate('Messages', {
            //   standings: 'private',
            //   groupData,
            //   message,
            //   fromNotification: 1,
            //   onTap: true,
            // });

            if (clearTimeoutHolder !== null) {
              clearTimeout(clearTimeoutHolder);
            }
            clearTimeoutHolder = setTimeout(async () => {
              navigate('ChatRoomStacks', {
                standings: 'Private',
                groupData,
                message,
                fromNotification: 1,
                onTap: true,
              });
              // navigate('Messages', {
              //   standings: 'private',
              //   groupData,
              //   message,
              //   fromNotification: 1,
              //   onTap: true,
              // });
            }, 500);
          }
        } else if (betData && betData.notification_type === 10) {
          if (clearTimeoutHolder !== null) {
            clearTimeout(clearTimeoutHolder);
          }
          clearTimeoutHolder = setTimeout(async () => {
            return navigate('Takes');
          }, 500);
        } else {
          if (bet.title && bet.wager) {
            let bet_vs_sports_player;
            if (bet_vs_sports_player) {
              bet_vs_sports_player = bet.vs_sports_player;
            }
            Alert.alert(
              bet.title,
              `${bet.description} and wager is ${bet.wager}`,
              [
                {
                  text: "Let's Do This",
                  onPress: () => {
                    navigate('Home', {betData, answer: 1});
                  },
                  style: 'cancel',
                },
                {
                  text: 'Discuss',
                  onPress: () => {
                    navigate('Home', {betData, answer: 3});
                  },
                },
                {
                  text: "I'm Out",
                  onPress: () => {
                    navigate('Home', {betData, answer: 2});
                  },
                },
              ],
              {cancelable: false},
            );
          }
        }
      } catch (error) {
        console.log('showing error in notificaiton', error);
      }
    });
    // OneSignal.addEventListener('ids', this.onIds);
    this.navigatorRefDup;
    this.betType;
    this.getUserId();
  }
  checkApplicationVersion = async () => {
    console.log('CHECKER VERSION');
    try {
      // const latestVersion =
      //   Platform.OS === 'ios'
      //     ? await fetch(
      //         `https://itunes.apple.com/in/lookup?bundleId=com.undefeated.mk.app.live.app`,
      //       )
      //         .then(r => r.json())
      //         .then(res => {
      //           return res?.results[0]?.version;
      //         })
      //     : await VersionCheck.getLatestVersion({
      //         provider: 'playStore',
      //         packageName: 'com.undefeated.mk.app',
      //         ignoreErrors: true,
      //       });
      const androidPackageName = 'com.undefeated.mk.app'; // Add your Android package name here

      const latestVersion = await VersionCheck.getLatestVersion({
        provider: Platform.OS === 'android' ? 'playStore' : 'appStore', // Check store based on platform
        packageName: Platform.OS === 'android' ? androidPackageName : '',
      });

      const currentVersion = VersionCheck.getCurrentVersion();
      console.log(
        'CHECKER VERSION',
        latestVersion,
        typeof latestVersion,
        'currentVersion',
        currentVersion,
        typeof currentVersion,
      );
      let currentVersionConverted = parseFloat(currentVersion);
      let latestVersionConverted = parseFloat(latestVersion);
      console.log(
        'current',
        latestVersionConverted > currentVersionConverted,
        currentVersionConverted,
        latestVersionConverted,
      );
      if (latestVersionConverted > currentVersionConverted) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Cancel',
              // onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? 'https://apps.apple.com/in/app/undefeated-live/id1560463193'
                    : 'https://play.google.com/store/apps/details?id=com.undefeated.mk.app',
                );
              },
            },
          ],
          {
            cancelable: true,
          },
        );
      } else {
        // App is up-to-date; proceed with the app
      }
    } catch (error) {
      // Handle error while checking app version
      console.error('Error checking app version:', error);
    }
  };
  async componentDidMount() {
    this.checkApplicationVersion();
  }

  async getUserId() {
    const state = await OneSignal.getDeviceState();
    let playerId = state.userId;
    console.log('player Id from App Js', playerId, state);
  }

  render() {
    // console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL",this.props)
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={COLORS.appColour} />
        <QueryClientProvider client={queryClient}>
          <Provider store={STORE}>
            <PersistGate persistor={PERSISTOR}>
              <AuthProvider>
                <PaperProvider theme={theme}>
                  <NavigatorContainer />
                </PaperProvider>
              </AuthProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </SafeAreaView>
    );
  }
}

export default App;
