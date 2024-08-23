import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Switch,
} from 'react-native';
import {COLORS, FONTS} from '../../../../services';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import * as TASKS from '../../../../store/actions/index';
import {styles} from './styles';
import {MeButton} from '../../../../components/MeButton';
// import Home from './components/TabScreens/home';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  back,
  WP,
  APPLICATION_IMAGE_CONSTANTS,
  navigate,
} from '../../../../services';
import {MeHeader, MeImageHeader} from '../../../../components/MeHeader';
import {StackActions, NavigationActions} from 'react-navigation';
import {STORE} from '../../../../store/storeConfig';
// import firebase from '../../../firebase/config';
import ChatAndNews from './chatAndNews';
import MeBottomNavbar from '../../../../components/BottomNavbar';
import ShareButton from '../../../../components/ShareButton';

let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
class ChatRoomDetails extends Component {
  state = {
    page: 0,
    navGroupParams: {},
    enable: null,
    isUnread: false,
    gameSport: null,
    navGroupParams1: {},
  };
  constructor(props) {
    super(props);
    this.onChildAddedListenerr;
    this.ref = null;

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('febc750b-3bd4-48b0-a12b-3daa58319468');
    // OneSignal.inFocusDisplaying(2);
    // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground in contestDetails File:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        console.log('PropsData', props);
        if (data.notification_type === 5) {
          // navigate('CompleteBets', {bet_id: betData.bet_id, isNotification: 1});7
          if (
            props?.route.routeName === 'GroupDetails' &&
            data.enable == 'false' &&
            props.user?.role !== 2
          ) {
            navigate('ChatRooms');
          }
          let params = {
            auth_token: props.user.auth_token,
            limit: 30,
            page: 0,
          };
          // console.log('dispatching contestwatchpartydetails onreceived refresh from ');
          STORE.dispatch(TASKS.getChatRooms(params));
          // STORE.dispatch(TASKS.getPickemWatchParty(params));
        }
        notificationReceivedEvent.complete(notification);
      },
    ); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    // OneSignal.addEventListener('received', data =>
    //   this.onReceived(data, this.props),
    // );
    console.log('CUSTMMMM', props?.route, {props});
  }

  async componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log(
      'INSIDE componentDidMount PROPS in chat room details',
      this.props,
      this.props.sportList,
    );
    // await dispatch(TASKS.getPickemWatchParty(params));
    try {
      let {groupData} = this.props.route.params;
      if (this.props.route.params.fromNotification == 1) {
        console.log('ChatRoomDetails componentDidMount from Notification');
        let params1 = {
          room_id: this.props.route.params?.groupData.id,
          auth_token: this.props.user.auth_token,
        };
        console.log(
          'ChatRoomDetails this.props.user',
          this.props.user,
          this.props,
          params1,
        );

        console.log(
          '🚀 ~ file: index.js:111 ~ ChatRoomDetails ~ componentDidMount ~ params1:',
          params1,
        );
        const getChatRoomByIdData = await this.props.getChatRoomById(params1);
        console.log(
          '🚀 ~ file: index.js:110 ~ ChatRoomDetails componentDidMount ~ getChatRoomByIdData:',
          getChatRoomByIdData,
        );
        groupData = getChatRoomByIdData?.data;

        // this.props.route.params?.groupData = groupData;
        this.setState({
          navGroupParams1: groupData,
        });
        console.log(
          '🚀 ~ file: index.js:129 ~ ChatRoomDetails ~ componentDidMount ~ this.props.sportList:',
          this.props,
        );
        // await dispatch(TASKS.getSportList('CONTEST'));

        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, nextProps.navigation.state.params.message),
        // }))
      }

      console.log(
        '🚀 ~ file: index.js:109 ~ ChatRoomDetails ~ componentDidMount ~ this.props.sportList:',
        this.props.sportList,
      );

      this.setState({navGroupParams: groupData});
      if (this.props.sportList && this.props.sportList.length > 0) {
        const sportsIndex = this.props.sportList.findIndex(
          sport =>
            sport.sport_name.toLowerCase() ===
            groupData?.sport_name.toLowerCase(),
        );
        console.log(
          '🚀 ~ file: index.js:165 ~ ChatRoomDetails ~ componentDidMount ~ sportsIndex:',
          sportsIndex,
        );

        sportsIndex >= 0 &&
          this.setState({
            gameSport: this.props.sportList[sportsIndex],
          });
      }

      await this.props.getAwards({
        auth_token: this.props.user.auth_token,
        contest_watch_party_id: groupData.id,
      });

      console.log('firebase groupdata', groupData);
      // this.ref = firebase
      //   .database()
      //   .ref(`groupChat/${groupData.slug}`)
      //   .child('messages');

      console.log('groupData.slug', groupData.slug);
      this.addChildListener(groupData);

      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.setState({isUnread: false});

        console.log('in focus listener');
        // this.onChildAddedListenerr = this.ref
        //   .orderByKey()
        //   .limitToLast(1)
        //   .on('child_added', (snapshot, prevChildKey) => {
        //     const lastMessage = snapshot.val();
        //     console.log('FB##$$', snapshot, groupData.slug);

        //     const seenBy = lastMessage.seenBy;
        //     console.log('firebase child_added', lastMessage, seenBy);

        //     if (seenBy) {
        //       if (!Object.values(seenBy).includes(this.props.user.auth_token))
        //         this.setState({ isUnread: true });
        //     }
        //   });
        this.addChildListener(groupData);
      });

      //     const { params } = this.props.route.params;
      // this.setState({ navGroupParams:params})
    } catch (error) {
      this.setState({loading: false});
    }
  }
  addChildListener(groupData) {
    console.log('in addListener');
    this.onChildAddedListenerr = this.ref
      .orderByKey()
      .limitToLast(1)
      .on('child_added', (snapshot, prevChildKey) => {
        const lastMessage = snapshot.val();
        // console.log('FB##$$', snapshot, groupData.slug);

        const seenBy = lastMessage.seenBy;
        // console.log('firebase child_added', lastMessage, seenBy);

        if (seenBy) {
          if (!Object.values(seenBy).includes(this.props.user.auth_token))
            this.setState({isUnread: true});
        }
      });
  }

  componentWillUnmount() {
    if (this.ref) {
      console.log('in firebase component unmount');
      this.ref.off();
    }
    this.focusListener &&
      this.focusListener.romove &&
      this.focusListener.remove();

    let params = {
      auth_token: this.props.user.auth_token,
      limit: 30,
      page: 0,
    };
    // this.props.getContestWatchParty(params);
    // this.props.getPickemWatchParty(params);
    this.props.getChatRooms(params);
  }

  async NotifyBtn() {
    const {groupData} = this.props.route.params;
    const {user} = this.props;

    let obj = {
      auth_token: user.auth_token,
      slug: groupData.slug,
      chat_room_id: groupData.id,
    };
    console.log('CLICKED ON NOTIFY', obj);
    await this.props.notifyBtnPressChatRoom(obj);
  }
  async NotifyContestMembersBtn() {
    const {groupData} = this.props.route.params;
    const {user} = this.props;

    let obj = {
      auth_token: user.auth_token,
      slug: groupData.slug,
      contest_watch_party_id: groupData.id,
    };

    await this.props.notifyContestMembers(obj);
  }
  async componentWillReceiveProps(nextProps) {
    console.log('inside componentWillReceiveProps', nextProps, this.props);

    const {groupData} = nextProps.navigation.state.params;
    console.log('INSIDE NEXT PROPS ', nextProps, this.props);
    if (
      this.props.myChatRooms &&
      this.props.myChatRooms.length > 0
      // &&
      // groupData.type != 3
    ) {
      const index = this.props.myChatRooms.findIndex(
        item => item.id === groupData.id,
      );
      this.setState({
        navGroupParams: this.props.myChatRooms[index],
      });
    }
    if (nextProps.sportList && nextProps.sportList.length > 0) {
      const sportsIndex = nextProps.sportList.findIndex(
        sport =>
          sport.sport_name.toLowerCase() ===
          groupData?.sport_name.toLowerCase(),
      );

      sportsIndex >= 0 &&
        this.setState({
          gameSport: nextProps.sportList[sportsIndex],
        });
    }
  }
  // render(){
  //   return <Text></Text>
  // }
  render() {
    // const { params } = this.props.route.params;
    console.log('INSIDE<><>', this.props);
    const params = {groupData: this.props.route.params?.groupData};

    //   params = {groupData: this.state.navGroupParams1};
    // else params = {groupData: this.props.route.params.params?.groupData};
    // const params = {groupData: this.state.navGroupParams};
    const {sportList} = this.props;
    // const {navGroupParams1} = this.state;
    console.log(
      '🚀 ~ file: index.js:277 ~ ChatRoomDetails ~ render ~ params:',
      params,
    );

    console.log('params?.groupData####', params?.groupData);
    console.log('params.PROPS####', this.props);
    console.log('params.state####', this.state);
    const {user} = this.props;

    let backgroudImageHolder = APPLICATION_IMAGES.huddleAws;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageHeader}
          source={
            params?.groupData?.profile_image
              ? {uri: params?.groupData?.profile_image}
              : {uri: backgroudImageHolder}
          }
          resizeMode={'cover'}>
          <MeImageHeader
            title={''}
            showProfilePic={false}
            hideBackBtn={false}
            styles={{backgroundColor: 'white'}}
            groups={true}
            showlogo={false}
          />

          <View style={styles.groupContainer}>
            {this.state.gameSport && (
              <Image
                style={styles.groupImage}
                source={{uri: this.state.gameSport.sport_image}}
                resizeMode={'cover'}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.imagesContainer}
            onPress={() => {
              this.props.navigation.navigate('UsersListings', {
                params: params,
              });
            }}>
            <View
              style={{
                height: WP('8.5'),
                width: WP('8.5'),
                resizeMode: 'cover',
                borderRadius: 100,
                overflow: 'hidden',
                marginLeft: WP('-4'),
                backgroundColor: COLORS.appColour,
                borderRadius: 50,
                marginRight: 10,
                borderColor: 'white',
                borderWidth: 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: WP('4.6'),
                }}>
                {params?.groupData &&
                params?.groupData.members_list &&
                params?.groupData.members_list.length > 0
                  ? params?.groupData.members_list.length
                  : 0}
              </Text>
            </View>
            {params?.groupData &&
              params?.groupData.members_list &&
              params?.groupData.members_list.length > 0 &&
              params?.groupData.members_list.slice(0, 7).map(member => {
                return (
                  <Image
                    source={{
                      uri:
                        member.profile_image_url != null
                          ? member.profile_image_url
                          : placeHolder,
                    }}
                    style={styles.profile_image}
                  />
                );
              })}
          </TouchableOpacity>

          <TouchableOpacity style={styles.promoteBtn}>
            <ShareButton
              message={`Let’s meet up at https://undefeated.live/ ${params?.groupData.title}. The largest online sports bar on the internet. Where you can play games, win cash, prizes and give your sports takes all the time. What’s your Take?`}
            />
          </TouchableOpacity>
          {user && user.slug === params?.groupData?.owner_information?.slug && (
            <TouchableOpacity
              style={styles.inviteBtn}
              onPress={() =>
                this.props.navigation.navigate('InviteUsersList', params)
              }>
              <Text style={styles.title} allowFontScaling={false}>
                Invite
              </Text>
            </TouchableOpacity>
          )}
          {user && params?.groupData?.owner_information?.slug === user.slug ? (
            <TouchableOpacity
              style={styles.NotifyBtn}
              onPress={() => this.NotifyBtn()}>
              <Text style={styles.promoteTitle} allowFontScaling={false}>
                Notify
              </Text>
            </TouchableOpacity>
          ) : null}
        </ImageBackground>

        <View style={styles.tabs}>
          <ChatAndNews
            groupData={this.props.route.params?.groupData}
            standings={'private'}
            navigation={this.props.navigation}
            navGroupParams1={this.state.navGroupParams1}
          />
        </View>
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    user: state.auth.user,
    messages: state.story.messages,
    contextAllQuestion: state.story.contextAllQuestion,
    awards: state.story.awards,
    myContest: state.story.myContest,
    myChatRooms: state.story.myChatRooms,
    myPickemContest: state.story.myPickemContest,
    sportList: state.story.getSportsList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    // notifyBtnPress: params => dispatch(TASKS.notifyBtnPress(params)),
    notifyBtnPressChatRoom: params =>
      dispatch(TASKS.notifyBtnPressChatRoom(params)),
    notifyContestMembers: params =>
      dispatch(TASKS.notifyContestMembers(params)),
    getChatRooms: params => dispatch(TASKS.getChatRooms(params)),
    getContestAllQuestion: params =>
      dispatch(TASKS.getContestAllQuestion(params)),
    getChatRoomById: params => dispatch(TASKS.getChatRoomById(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomDetails);
