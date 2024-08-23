import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../../../../services';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import * as TASKS from '../../../../store/actions/index';
import {styles} from './styles';
import Home from './components/TabScreens/home';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  WP,
  navigate,
} from '../../../../services';
import {MeImageHeader} from '../../../../components/MeHeader';
import {STORE} from '../../../../store/storeConfig';
// import firebase from '../../../firebase/config';
import ShareButton from '../../../../components/ShareButton';

let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
class GroupDetails extends Component {
  state = {
    page: 0,
    navGroupParams: {},
    enable: null,
    isUnread: false,
    gameSport: null,
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
            navigate('ContestWatchParty');
          }
          let params = {
            auth_token: props?.user?.auth_token,
            limit: 30,
            page: 0,
          };
          // console.log('dispatching contestwatchpartydetails onreceived refresh from ');
          STORE.dispatch(TASKS.getContestWatchParty(params));
          STORE.dispatch(TASKS.getPickemWatchParty(params));
        }
        notificationReceivedEvent.complete(notification);
      },
    ); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    // OneSignal.addEventListener('received', data =>
    //   this.onReceived(data, this.props),
    // );
  }
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', data =>
  //     this.onReceived(data, this.props),
  //   );
  // }

  async componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('INSIDE componentDidMount PROPS ', this.props);
    // await dispatch(TASKS.getPickemWatchParty(params));
    try {
      const {groupData} = this.props.route.params;
      // this.setState({ navGroupParams: groupData });
      if (this.props.sportList && this.props.sportList.length > 0) {
        const sportsIndex = this.props.sportList.findIndex(
          sport =>
            sport.sport_name.toLowerCase() ===
            groupData?.sport_name.toLowerCase(),
        );
        sportsIndex >= 0 &&
          this.setState({
            gameSport: this.props.sportList[sportsIndex],
          });
      }

      await this.props.getAwards({
        auth_token: this?.props?.user?.auth_token,
        contest_watch_party_id: groupData.id,
      });

      console.log('firebase groupdata', groupData);
      // this.ref = firebase
      //   .database()
      //   .ref(`groupChat/${groupData.slug}`)
      //   .child('messages');

      if (
        this.props.user &&
        this.props.user.role === APPLICATION_CONSTANTS.USER_ADMIN
      ) {
        let params = {
          sports_name: groupData.sport_name,
          auth_token: this.props.user.auth_token,
          contest_watch_party_id: groupData.id,
        };
        await this.props.getContestAllQuestion(params);
      }
      console.log('groupData.slug', groupData.slug);
      this.addChildListener(groupData);

      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.setState({isUnread: false});

        console.log('in focus listener');

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
          if (!Object.values(seenBy).includes(this.props.user?.auth_token))
            this.setState({isUnread: true});
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {groupData} = nextProps.route.params;
    console.log('INSIDE NEXT PROPS ', nextProps, this.props);
    if (
      this.props.myContest &&
      this.props.myContest.length > 0 &&
      groupData.type != 3
    ) {
      const index = this.props.myContest.findIndex(
        item => item.id === groupData.id,
      );
      this.setState({
        navGroupParams: this.props.myContest[index],
      });
    } else if (
      this.props.myPickemContest &&
      this.props.myPickemContest.length > 0 &&
      groupData.type == 3
    ) {
      const index = this.props.myPickemContest.findIndex(
        item => item.id === groupData.id,
      );
      this.setState({
        navGroupParams: this.props.myPickemContest[index],
      });
    }
  }

  componentWillUnmount() {
    // if (this.ref) {
    //   console.log('in firebase component unmount');
    //   this.ref.off();
    // }
    this.focusListener &&
      this.focusListener.romove &&
      this.focusListener.remove();

    let params = {
      auth_token: this.props?.user?.auth_token,
      limit: 30,
      page: 0,
    };
    this.props.getContestWatchParty(params);
    this.props.getPickemWatchParty(params);
  }

  async NotifyBtn() {
    const {groupData} = this.props.route.params;
    const {user} = this.props;

    let obj = {
      auth_token: user?.auth_token,
      slug: groupData.slug,
      contest_watch_party_id: groupData.id,
    };
    console.log('CLICKED ON NOTIFY', obj);
    await this.props.notifyBtnPress(obj);
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
  // componentWillReceiveProps(nextProps,nextState) {
  //   console.log('[ContestPartyDetails] params2', nextProps,nextState);
  // }
  // async componentDidUpdate (){
  //   const { params } = this.props.route.params;

  // }
  render() {
    // const { params } = this.props.route.params;
    const params = {groupData: this.state.navGroupParams};
    // const { sportList } = this.props;
    console.log('CHANGES', params);
    console.log('params.groupdata####', params.groupData);
    console.log('params.PROPS####', this.props);
    console.log('params.state####', this.state);
    const {user} = this.props;

    const backgroudImageHolder =
      params?.groupData?.type == 3
        ? APPLICATION_IMAGES.pickemAws
        : APPLICATION_IMAGES.contestAws;
    // let profileImageHolder =
    //   params && params.groupData
    //     ? params.groupData.sport_name === 'basketball'
    //       ? {uri: sportList[1].sport_image}
    //       : params.groupData.sport_name === 'football'
    //       ? {uri: sportList[0].sport_image}
    //       : params.groupData.sport_name === 'tennis'
    //       ? {uri: sportList[3].sport_image}
    //       : params.groupData.sport_name === 'golf'
    //       ? {uri: sportList[2].sport_image}
    //       : params.groupData.sport_name === 'soccer'
    //       ? {uri: sportList[4].sport_image}
    //       : params.groupData.sport_name === 'hockey'
    //       ? {uri: sportList[6].sport_image}
    //       : params.groupData.sport_name === 'baseball'
    //       ? {uri: sportList[7].sport_image}
    //       : params.groupData.sport_name === 'nascar'
    //       ? {uri: sportList[5].sport_image}
    //       : null
    //     : null;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageHeader}
          source={
            params.groupData?.profile_image
              ? {uri: params.groupData?.profile_image}
              : {uri: backgroudImageHolder}
          }
          resizeMode={'cover'}>
          <MeImageHeader
            title={''}
            showProfilePic={false}
            showlogo={false}
            style={{borderWidth: 'none'}}
            hideBackBtn={false}
            styles={{backgroundColor: 'white'}}
            groups={true}
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
                {params.groupData &&
                params.groupData.members_list &&
                params.groupData.members_list.length > 0
                  ? params.groupData.members_list.length
                  : 0}
              </Text>
            </View>
            {params.groupData &&
              params.groupData.members_list &&
              params.groupData.members_list.length > 0 &&
              params.groupData.members_list.slice(0, 7).map(member => {
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
          {/* <TouchableOpacity
            style={styles.promoteBtn}
            onPress={() =>
              this.props.navigation.navigate('FriendLists', params)
            }>
            <Text style={styles.promoteTitle} allowFontScaling={false}>
              Promote
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.promoteBtn}>
            <ShareButton
              message={`Let’s meet up at https://undefeated.live/ ${params.groupData.title}. The largest online sports bar on the internet. Where you can play games, win cash, prizes and give your sports takes all the time. What’s your Take?`}
            />
          </TouchableOpacity>
          {user && user.role === 2 && (
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
        </ImageBackground>

        {user && user.role === 2 && params?.groupData?.is_private !== 1 ? (
          <TouchableOpacity
            style={styles.NotifyBtn}
            onPress={() => this.NotifyBtn()}>
            <Text style={styles.promoteTitle} allowFontScaling={false}>
              Notify
            </Text>
          </TouchableOpacity>
        ) : null}
        {user && user.role === 2 ? (
          <TouchableOpacity
            style={styles.NotifyContestMembersBtn}
            onPress={() => this.NotifyContestMembersBtn()}>
            <Text style={styles.notifyContestTitle} allowFontScaling={false}>
              Notify Contest
            </Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.tabs}>
          <Home
            props={this.props}
            group={{
              groupData: {
                ...this.state.navGroupParams,
                gameSportImage: this.state?.gameSport?.sport_image,
              },
            }}
            getContestAllQuestion={this.props.getContestAllQuestion}
            enableDisableQuesnContest={this.props.enableDisableQuesnContest}
            contextAllQuestion={this.props.contextAllQuestion}
            contestNotification={this.props.contestNotification}
            awards={this.props.awards}
            isUnread={this.state.isUnread}
          />
        </View>
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
    myPickemContest: state.story.myPickemContest,
    sportList: state.story.getSportsList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    enableDisableQuestion: params =>
      dispatch(TASKS.enableDisableQuestion(params)),
    enableDisableContest: params =>
      dispatch(TASKS.enableDisableContest(params)),
    getContestAllQuestion: params =>
      dispatch(TASKS.getContestAllQuestion(params)),
    getAwards: params => dispatch(TASKS.getAwards(params)),
    getContestWatchParty: params =>
      dispatch(TASKS.getContestWatchParty(params)),
    getPickemWatchParty: params => dispatch(TASKS.getPickemWatchParty(params)),
    contestNotification: params => dispatch(TASKS.contestNotification(params)),
    notifyBtnPress: params => dispatch(TASKS.notifyBtnPress(params)),
    notifyContestMembers: params =>
      dispatch(TASKS.notifyContestMembers(params)),
    enableDisableQuesnContest: params =>
      dispatch(TASKS.enableDisableQuesnContest(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
