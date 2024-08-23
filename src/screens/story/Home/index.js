/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Platform,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader} from '../../../components/MeHeader';
import {MeWelcome} from '../../../components/MeWelcome';
import {MeButton} from '../../../components/MeButton';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  showToast,
  WP,
} from '../../../services';
import * as TASKS from '../../../store/actions/index';
import * as storyApi from '../../../services/api/methods/storyMethods';
// import CustomButton from './Components';
import {Share} from 'react-native';
import {Alert} from 'react-native';
import CustomButton from '../Home/Components';
import MeBottomNavbar from '../../../components/BottomNavbar';
import WatchPartyListingsContest from '../ContestScreen/ContestPartyScreens/ContestPartyLists/components/watchPartyListings';
import WatchPartyListingsPickem from '../ContestScreen/PickemPartyScreens/PickemPartyList/components/watchPartyListings';
import WatchPartyListingsChat from '../Huddles/HuddlesList/components/watchPartyListings';
import SnapCarousel from '../../../components/SnapCarousel';
// import { MeBottomNavbar } from '../../../components/BottomNavbar';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      groups: [
        {
          id: Math.random(),
          image: APPLICATION_IMAGES.groupImage1,
        },
        {
          id: Math.random(),
          image: APPLICATION_IMAGES.groupImage2,
        },
        {
          id: Math.random(),
          image: APPLICATION_IMAGES.groupImage3,
        },
      ],
      recentBets: [
        {
          id: Math.random(),
          title: 'Bet Title',
          subTitle: 'About the bet ',
        },
        {
          id: Math.random(),
          title: 'Bet Title',
          subTitle: 'About the bet ',
        },
      ],
      loader: false,
    };
  }

  async componentDidMount() {
    try {
      // console.log('auth token', this.props.user);
      let params = {
        auth_token: this.props.user.auth_token,
        player_id: this.props?.user.player_id,
        limit: 30,
        page: 0,
      };
      // player_id: user.player_id,
      console.log('auth token==================== 1', this.props, params);

      // Commenting groups functionality just for now
      // this.props.fetchUserGroups(params)
      this.props.getUserByAuthToken(params);
      this.props.getSportsFeed(params);
      this.props.getContestWatchParty(params);
      this.props.getPickemWatchParty(params);
      this.props.getChatRooms(params);
      this.props.getSportList(params);
      this.props.getPromotionalAds(params);
      const shareInviteMessage = await this.props.getShareInviteMessage();
      this.setState({
        shareInviteMessage,
      });
    } catch (error) {
      console.log('showing catched error', error);
    }
  }
  addNewBet = () => {
    this.props.navigation.navigate('NewBet');
  };
  async componentWillReceiveProps(nextProps) {
    if (this.props.navigation != nextProps.navigation) {
      try {
        const {params} = nextProps.navigation.state;
        // console.log('showing next props in case of accepting ', params);
        if (params.answer == 1) {
          //accept case where answer = 1 and reject = false
          let acceptParams = {
            auth_token: this.props.user.auth_token,
            rejected: false,
            bet_id: params.betData.bet_id,
            answer: 1,
          };
          this.props.submitStatus(acceptParams);
          let param = {
            auth_token: this.props.user.auth_token,
            limit: 10,
            page: 0,
          };
          setTimeout(() => {
            this.props.getMyBets(param);
          }, 2000);
        } else if (params.answer == 2) {
          let rejectParams = {
            auth_token: this.props.user.auth_token,
            rejected: true,
            bet_id: params.betData.bet_id,
            answer: 2,
          };
          this.props.submitStatus(rejectParams);
          let param = {
            auth_token: this.props.user.auth_token,
            limit: 10,
            page: 0,
          };
          setTimeout(() => {
            this.props.getMyBets(param);
          }, 2000);
        } else if (params.answer == 3) {
          let fetchBet = {
            auth_token: this.props.user.auth_token,
            bet_id: params.betData.bet_id,
          };
          let getBet = await storyApi.getBetById(fetchBet);
          if (getBet.status == true && getBet.code == 200) {
            console.log('private message showing bet status or jump ', getBet);
            let person = {
              id: getBet.data.bet_by[0].id,
              profile_image: getBet.data.bet_by[0].profile_image,
              username: getBet.data.bet_by[0].username,
            };
            this.props.navigation.navigate('Messages', {
              standings: 'public',
              person,
            });
          }
        }

        if (nextProps.navigation != this.props.navigation) {
          let params = {
            auth_token: this.props.user.auth_token,
            limit: 40,
            page: 0,
          };
          // this.props.fetchUserWatchParty(params);
          // Commenting groups functionality just for now
          // this.props.fetchUserGroups(params)

          this.props.getMyBets(params);
        }
        console.log('auth token==================== 2', this.props, params);
        this.props.getUserByAuthToken({
          auth_token: this.props.user.auth_token,
          player_id: this.props?.user.player_id,
          limit: 30,
          page: 0,
        });
      } catch (error) {}
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('get public groups', this.props.getPublicGroups);
  //   console.log('get user groups', this.props.getUserGroups);
  //   if (prevProps.getPublicGroups !== this.props.getPublicGroups) {
  //     console.log('get public groups', this.props.getPublicGroups);
  //   }
  // }
  //Option 1 is for rendering private groups in standing
  //Option 2 is for rendering public groups in standing
  privateStandings = (option, groupData) => {
    switch (option) {
      case 1:
        this.props.navigation.navigate('GroupStacks', {
          standings: 'Private',
          groupData: groupData,
        });
        break;
      case 2:
        this.props.navigation.navigate('Standings', {standings: 'Public'});
        break;
      default:
        break;
    }
  };

  inviteFriends = async () => {
    const {shareInviteMessage} = this.state;
    if (shareInviteMessage) {
      try {
        const result = await Share.share({
          message: shareInviteMessage.message,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Alert.alert('Failed to share invite');
          // dismissed
        }
      } catch (error) {
        Alert.alert('Failed to share invite');
      }
    }
  };

  // Groups
  addNewGroup = () => {
    this.props.navigation.navigate('NewGroup');
  };
  showGroups = () => {
    this.props.navigation.navigate('Groups');
  };

  // Chat Rooms
  NewChatRoom = () => {
    this.props.navigation.navigate('NewChatRoom');
  };

  showChatRooms = () => {
    // console.log('PROPS', this.props);
    let user = this.props.user;
    this.props.navigation.navigate('ChatRooms', user);
  };
  showTakes = () => {
    // console.log('PROPS', this.props);
    let user = this.props.user;
    this.props.navigation.navigate('Takes', user);
  };

  // Watch Party
  addNewWatchParty = () => {
    this.props.navigation.navigate('NewWatchParty');
  };
  NewContestWatchParty = () => {
    this.props.navigation.navigate('NewContestWatchParty');
  };
  CreatePickemContestParty = () => {
    this.props.navigation.navigate('CreatePickemContestParty');
  };
  showWatchParty = () => {
    // console.log('allWatchParty', this.props);
    this.props.navigation.navigate('WatchParty');
  };
  showContestWatchParty = () => {
    // console.log('PROPS', this.props);
    let user = this.props.user;
    this.props.navigation.navigate('ContestWatchParty', user);
  };

  showPickemContestParty = () => {
    // console.log('PROPS', this.props);
    let user = this.props.user;
    this.props.navigation.navigate('PickemContestParty', user);
  };

  navigatePrivacyPolicy = () => {
    console.log('this is running', this.props, this.props.navigation.navigate);
    this.props.navigation.navigate('PrivacyPolicy');
  };

  onRefresh = () => {
    try {
      this.setState({loader: true});

      let params = {
        auth_token: this.props.user.auth_token,
        limit: 30,
        page: 0,
      };
      // this.props.fetchUserWatchParty(params);
      // Commenting groups functionality just for now
      // this.props.fetchUserGroups(params)
      console.log('auth token==================== 1', this.props, params);
      this.props.getUserByAuthToken({
        ...params,
        player_id: this.props?.user.player_id,
      });
      this.props.getContestWatchParty(params);
      this.props.getPickemWatchParty(params);
      this.props.getChatRooms(params);
      this.props.getPromotionalAds(params);
      this.props.getSportsFeed(params);

      // this.props.getMyBets(params);
      setTimeout(() => {
        this.setState({loader: false});
        showToast('Refreshed data successfully!');
      }, 2000);
    } catch (error) {
      console.log('showing catched error', error);
    }
  };
  renderGroups = () => {
    try {
      const {getUserGroups} = this.props;
      // console.log('showing props from home', this.props);

      return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupContaier}>
          {getUserGroups.length > 0 ? (
            getUserGroups.map(group => {
              return (
                <View style={styles.group}>
                  <TouchableOpacity
                    onPress={() => this.privateStandings(1, group)}
                    style={styles.userGroupsImage}>
                    {/* <Image
                      source={
                        group.profile_image
                          ? {uri: group.profile_image}
                          : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                      }
                      style={styles.image}
                    /> */}
                    <TouchableOpacity style={styles.joinTextContainer}>
                      <Text style={styles.joinText}>Join</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <Text
                    allowFontScaling={false}
                    style={styles.titleGroup}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {group.title}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text allowFontScaling={false} style={styles.error}>
              No groups found! lets create one
            </Text>
          )}
        </ScrollView>
      );
    } catch (error) {}
  };
  renderBets = () => {
    const {myBets, user} = this.props;
    return (
      <View>
        {myBets.length > 0 ? (
          myBets.map(bet => {
            return (
              // <View style={styles.betContainer}>
              //   <View style={styles.acceptContainer}>
              //     <Text allowFontScaling = {false}style={styles.titleText}>{bet.title}</Text>
              //     <Text allowFontScaling = {false}style={styles.deleteText}>{bet.description}</Text>
              //   </View>
              //   {/* <TouchableOpacity style={styles.deleteContainer}>
              //     <Text allowFontScaling = {false}style={styles.deleteText}>{APPLICATION_CONSTANTS.delete}</Text>
              //   </TouchableOpacity> */}
              // </View>
              <View style={styles.betContainer}>
                {/* <View style = {styles.profilePicContainer}>
                  <Image
                  source = {APPLICATION_IMAGES.profilePicPlaceHolder}
                  style = {styles.profile}
                  />
                  </View> */}
                <View style={styles.containerText}>
                  <Text allowFontScaling={false} style={styles.wagerText}>
                    Bet:
                  </Text>
                  <Text allowFontScaling={false} style={styles.titleText}>
                    {bet.bet_by[0] ? bet.bet_by[0].username : 'No person found'}{' '}
                    bets{' '}
                    {bet.bet_to.map(bet_to => {
                      return <Text allowFontScaling>{bet_to.username},</Text>;
                    })}
                  </Text>
                  {bet.is_winner === 1 ? (
                    <Text allowFontScaling={false} style={styles.titleText}>
                      {user.username} wins the bet 🏆{' '}
                    </Text>
                  ) : null}
                  <Text allowFontScaling={false} style={styles.titleText}>
                    {bet.description.split(',').join("'")}
                  </Text>
                  <View style={styles.containerWager}>
                    <Text allowFontScaling={false} style={styles.wagerText}>
                      Wager<Text>: {bet.wager}</Text>
                    </Text>
                    {bet.is_complete === 1 ? (
                      <MeButton
                        title={'Completed Bet'}
                        textStyles={styles.textBtnComplete}
                        containerStyles={styles.completedContainer}
                        onPress={() => {
                          showToast('You already completed this bet!');
                        }}
                      />
                    ) : bet.disputed === 1 ? (
                      <MeButton
                        title={'Disputed'}
                        textStyles={styles.textBtnComplete}
                        containerStyles={styles.disputedContainer}
                        onPress={() => {
                          this.props.navigation.navigate('CompleteBets', {
                            bet,
                          });
                        }}

                        // onPress={this.addNewBet}
                      />
                    ) : bet.pending === 1 ? (
                      <MeButton
                        title={'Pending'}
                        textStyles={styles.textBtnComplete}
                        containerStyles={styles.pendingContainer}
                        onPress={() => {
                          this.props.navigation.navigate('CompleteBets', {
                            bet,
                          });
                        }}
                      />
                    ) : (
                      <MeButton
                        title={'Complete Bet'}
                        textStyles={styles.textBtnComplete}
                        containerStyles={styles.btnContainerComplete}
                        onPress={() => {
                          this.props.navigation.navigate('CompleteBets', {
                            bet,
                          });
                        }}

                        // onPress={this.addNewBet}
                      />
                    )}
                  </View>
                  {/* <TouchableOpacity style = {styles.likeContainer}>
                  <Image
                  source = {APPLICATION_IMAGES.unLikedBet}
                  style = {styles.profile}
                  />
                  </TouchableOpacity> */}
                </View>
              </View>
            );
          })
        ) : (
          <Text allowFontScaling>No recentBets found!</Text>
        )}
      </View>
    );
  };
  renderAllBets = () => {
    this.props.navigation.navigate('AllBets');
  };

  renderSportsFeed() {
    const {
      allContest,
      allPickemContest,
      allChatRooms,
      myChatRooms,
      myContest,
      myPickemContest,
      sportsFeed,
    } = this.props;

    console.log('NNNNNNNNNNN>>>', sportsFeed);
    // const flaggedContests =
    //   allContest &&
    //   allContest.concat(myContest).filter(contest => contest.flag === 1);
    // const flaggedPickem =
    //   allPickemContest &&
    //   allPickemContest
    //     .concat(myPickemContest)
    //     .filter(contest => contest.flag === 1);
    // const flaggedChat =
    //   allChatRooms &&
    //   allChatRooms.concat(myChatRooms).filter(contest => contest.flag === 1);

    const currentLatestContest =
      allContest &&
      [...allContest]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 1);

    const currentLatestPickem =
      allPickemContest &&
      [...allPickemContest]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 1);

    const currentLatestChat =
      allChatRooms &&
      [...allChatRooms]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 1);
    console.log('sports feed ', sportsFeed?.promotedFeeds);

    return (
      <>
        {sportsFeed &&
          sportsFeed?.promotedFeeds &&
          sportsFeed?.promotedFeeds.length > 0 &&
          sportsFeed?.promotedFeeds.map(feed => {
            const {feedType} = feed;
            if (feedType === 'contest') {
              return (
                <WatchPartyListingsContest
                  key={feed.slug}
                  groups={[feed]}
                  allGroups={true}
                  fromHome={true}
                />
              );
            } else if (feedType === 'pickem') {
              return (
                <WatchPartyListingsPickem
                  key={feed.slug}
                  groups={[feed]}
                  allGroups={true}
                  fromHome={true}
                />
              );
            } else if (feedType === 'huddle') {
              return (
                <WatchPartyListingsChat
                  key={feed.slug}
                  groups={[feed]}
                  allGroups={true}
                  fromHome={true}
                />
              );
            } else {
              return null;
            }
          })}
        {/* {sportsFeed &&
          sportsFeed?.promotedFeeds &&
          sportsFeed?.promotedFeeds?.promotedHuddles?.length > 0 && (
            <WatchPartyListingsChat
              groups={sportsFeed?.promotedFeeds?.promotedHuddles}
              allGroups={true}
              fromHome={true}
            />
          )}
        {sportsFeed &&
          sportsFeed?.promotedFeeds &&
          sportsFeed?.promotedFeeds?.promotedContestParty?.length > 0 && (
            <WatchPartyListingsContest
              groups={sportsFeed.promotedFeeds.promotedContestParty}
              allGroups={true}
              fromHome={true}
            />
          )}
        {sportsFeed &&
          sportsFeed?.promotedFeeds &&
          sportsFeed?.promotedFeeds?.promotedPickemParty?.length > 0 && (
            <WatchPartyListingsPickem
              groups={sportsFeed?.promotedFeeds?.promotedPickemParty}
              allGroups={true}
              fromHome={true}
            />
          )} */}
        {/* PROMOTED AND FLAGGED CONTEST */}

        {/* MY CONTEST & CHAT */}
        <WatchPartyListingsChat
          groups={myChatRooms}
          allGroups={true}
          fromHome={true}
        />
        <WatchPartyListingsContest
          groups={myContest}
          allGroups={true}
          fromHome={true}
        />
        <WatchPartyListingsPickem
          groups={myPickemContest}
          allGroups={true}
          fromHome={true}
        />

        {/* CURRENT LATEST */}
        {myChatRooms && myChatRooms.length === 0 && (
          <WatchPartyListingsChat
            groups={currentLatestChat}
            allGroups={true}
            fromHome={true}
          />
        )}

        {myContest && myContest.length === 0 && (
          <WatchPartyListingsContest
            groups={currentLatestContest}
            fromHome={true}
            allGroups={true}
          />
        )}

        {myPickemContest && myPickemContest.length === 0 && (
          <WatchPartyListingsPickem
            groups={currentLatestPickem}
            allGroups={true}
            fromHome={true}
          />
        )}
      </>
    );
  }

  render() {
    // console.log('showing props home', this.props);
    const {user} = this.props;
    return (
      <>
        <MeHeader
          showProfilePic={true}
          title={/*'Textme.Bet'*/ 'Undefeated.Live'}
          hideBackBtn={true}
          profilePicUrl={user ? user.profile_image_url : null}
          showNotficaion={false}
          showAboutUs={true}
          showlogo={true}
          onAboutInfo={() => {
            this.props.navigation.navigate('AboutUs');
          }}
          onNotificationPress={() => {
            this.props.navigation.navigate('PendingBets');
          }}
        />
        <MeWrapper style={styles.wrapper}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                enabled
                refreshing={this.state.loader}
                onRefresh={this.onRefresh}
              />
            }>
            {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? (
              <>
                <MeWelcome
                  userName={user ? user.username : ''}
                  // title={'All Bets'}
                  onPress={this.renderAllBets}
                />
                <CustomButton
                  title={'Create Contest Party'}
                  description={'Start a contest'}
                  onPress={this.NewContestWatchParty}
                  marginTop={WP('4')}
                />

                <CustomButton
                  title={'Contest Party'}
                  onPress={this.showContestWatchParty}
                  marginTop={WP('4')}
                />

                <CustomButton
                  title={"Create Pick'em Party"}
                  onPress={this.CreatePickemContestParty}
                  marginTop={WP('4')}
                />

                <CustomButton
                  title={"Pick'em Party"}
                  onPress={this.showPickemContestParty}
                  marginTop={WP('4')}
                />

                <CustomButton
                  title={'Create Huddle'}
                  onPress={this.NewChatRoom}
                  marginTop={WP('4')}
                />

                <CustomButton
                  title={'Huddles'}
                  onPress={this.showChatRooms}
                  marginTop={WP('4')}
                />
                <CustomButton
                  title={'Takes'}
                  onPress={this.showTakes}
                  marginTop={WP('4')}
                />
                <CustomButton
                  title={'Leaderboard'}
                  onPress={() => this.privateStandings(2)}
                  marginTop={WP('4')}
                />
                <CustomButton
                  title={'Invite friends'}
                  onPress={() => {
                    this.inviteFriends();
                  }}
                  marginTop={WP('4')}
                />
                <MeButton
                  containerStyles={styles.btnContainerLink}
                  textStyles={styles.textBtnLink}
                  title={'Privacy Policy'}
                  onPress={this.navigatePrivacyPolicy}
                />
              </>
            ) : (
              <>
                <View style={styles.section}>
                  <MeWelcome
                    userName={user ? user.username : ''}
                    onPress={this.renderAllBets}
                  />
                </View>
                <View>
                  {/* <Carousel slides={this.props.promotionalAds} /> */}
                  <SnapCarousel slides={this.props.promotionalAds} />
                  <Text style={styles.heading}>Sports Feed</Text>
                  <View style={{position: 'relative', right: 13}}>
                    {this.renderSportsFeed()}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </MeWrapper>
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
      </>
    );
  }
}
mapStateToProps = state => {
  console.log('state', state.story);
  return {
    user: state.auth.user,
    getUserGroups: state.story.getUserGroups,
    getPublicGroups: state.story.getPublicGroups,
    myBets: state.story.getMyBets,
    allWatchParty: state.story.allWatchParty,
    myWatchParty: state.story.myWatchParty,
    sportList: state.story.getSportsList,
    myChatRooms: state.story.myChatRooms,
    allChatRooms: state.story.allChatRooms,
    myContest: state.story.myContest,
    allContest: state.story.allContest,
    myPickemContest: state.story.myPickemContest,
    allPickemContest: state.story.allPickemContest,
    promotionalAds: state.story.promotionalAds,
    sportsFeed: state.story.sportsFeed,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchUserGroups: params => dispatch(TASKS.getUserGroups(params)),
    // fetchUserWatchParty: params => dispatch(TASKS.getWatchParty(params)),
    // fetchPublicWatchParty: (params) => dispatch(TASKS.getPublicWatchParty(params)),
    getMyBets: params => dispatch(TASKS.getMyBets(params)),
    getAllBets: params => dispatch(TASKS.getAllBets(params)),
    submitStatus: params => dispatch(TASKS.betsStatus(params)),
    getContestWatchParty: params =>
      dispatch(TASKS.getContestWatchParty(params)),
    getPickemWatchParty: params => dispatch(TASKS.getPickemWatchParty(params)),
    getChatRooms: params => dispatch(TASKS.getChatRooms(params)),
    getSportList: () => dispatch(TASKS.getSportList()),
    getShareInviteMessage: () => dispatch(TASKS.getShareInviteFriends()),
    getPromotionalAds: params => dispatch(TASKS.getPromotionalAds(params)),
    getSportsFeed: params => dispatch(TASKS.getSportsFeed(params)),
    getUserByAuthToken: params => dispatch(TASKS.getUserByAuthToken(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
