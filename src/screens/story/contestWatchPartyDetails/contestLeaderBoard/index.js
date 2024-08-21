import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader} from '../../../../components/MeHeader';
import {MeWelcome} from '../../../../components/MeWelcome';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  WP,
  FONTS,
  COLORS,
} from '../../../../services';
import {MeButton} from '../../../../components/MeButton';
import * as TASKS from '../../../../store/actions/index';
import MeModal from '../../../../components/MeModal';
import MeBottomNavbar from '../../../../components/BottomNavbar';
import {MeInputField} from '../../../../components/MeInputField';


class ContestLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateGroups: [
        {
          id: 1,
          image: APPLICATION_IMAGES.groupImage1,
          wins: 10,
          lose: 2,
        },
        {
          id: 2,
          image: APPLICATION_IMAGES.groupImage2,
          wins: 29,
          lose: 2,
        },
        {
          id: 3,
          image: APPLICATION_IMAGES.groupImage3,
          wins: 10,
          lose: 2,
        },
        {
          id: 4,
          image: APPLICATION_IMAGES.groupImage1,
          wins: 10,
          lose: 2,
        },
        {
          id: 5,
          image: APPLICATION_IMAGES.groupImage2,
          wins: 10,
          lose: 2,
        },
      ],
      publicGroups: [
        {
          id: 1,
          image: APPLICATION_IMAGES.groupImage1,
          wins: 10,
          lose: 2,
        },
        {
          id: 2,
          image: APPLICATION_IMAGES.groupImage2,
          wins: 29,
          lose: 2,
        },
        {
          id: 3,
          image: APPLICATION_IMAGES.groupImage3,
          wins: 10,
          lose: 2,
        },
        {
          id: 4,
          image: APPLICATION_IMAGES.groupImage1,
          wins: 10,
          lose: 2,
        },
        {
          id: 5,
          image: APPLICATION_IMAGES.groupImage2,
          wins: 10,
          lose: 2,
        },
      ],
      showModal: false,
      member: null,
      filteredStandings: this.props.contestLeaderBoard,
    };
  }
  componentDidMount() {
    let {group} = this.props.route.params.params;
    try {
      let param = {
        auth_token: this.props.user.auth_token,
        contest_watch_party_id: group.id,
        limit: 50,
        page: 0,
      };
      this.props.getContestLeaderBoard(param);
      this.setState({
        filteredStandings: this.props?.contestLeaderBoard,
      });
    } catch (error) {}
  }
  componentWillReceiveProps(nextProps) {
    console.log('INSIDE NEXT PROPS ', nextProps, this.props);
    if (
      nextProps.contestLeaderBoard &&
      nextProps.contestLeaderBoard.length > 0
    ) {
      this.setState({
        filteredStandings: nextProps.contestLeaderBoard,
      });
    }
  }
  toggleModal = member => {
    // console.log('toggle modal is called');
    this.setState({
      showModal: !this.state.showModal,
      member: member,
    });
  };
  renderScores = () => {
    try {
      const {contestLeaderBoard} = this.props;
      const {filteredStandings} = this.state;
      return (
        <View style={styles.leaderboardContainer}>
          <React.Fragment>
            <Text allowFontScaling={false} style={styles.headingText}>
              Contest Leaderboard
            </Text>
          </React.Fragment>
          {/* this.props.lumper */}
          {this.props.lumper ? (
            <View
              style={{
                height: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={COLORS.appColour}
                style={{maxHeight: '10%'}}
              />
              <Text style={{textAlign: 'center', marginLeft: 10}}>
                Loading...
              </Text>
            </View>
          ) : (
            <React.Fragment>
              <View style={styles.searchbarContainer}>
                <MeInputField
                  placeholder={'Search'}
                  style={styles.searchBar}
                  //  value={reportingMessage}
                  onChangeText={text => {
                    this.setState({
                      filteredStandings:
                        contestLeaderBoard &&
                        contestLeaderBoard.length > 0 &&
                        contestLeaderBoard.filter(
                          user =>
                            user.username &&
                            user.username
                              .toLowerCase()
                              .includes(text.toLowerCase()),
                        ),
                    });
                  }}
                />
              </View>
              <View style={styles.groupContainer}>
                <View style={styles.renderRow}>
                  <Text
                    style={{
                      marginLeft: WP('18'),
                      color: 'blue',
                      textAlign: 'center',
                    }}>
                    Username
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginRight: WP('8'),
                      color: 'blue',
                    }}>
                    Score
                  </Text>
                </View>
                {filteredStandings && filteredStandings.length > 0 ? (
                  filteredStandings.map((participant, index) => {
                    return (
                      <View style={styles.renderRow}>
                        {index + 1 === 1 ? (
                          <Text allowFontScaling={false} style={styles.idOne}>
                            1
                          </Text>
                        ) : index + 1 === 2 ? (
                          <Text allowFontScaling={false} style={styles.idTwo}>
                            2
                          </Text>
                        ) : index + 1 === 3 ? (
                          <Text allowFontScaling={false} style={styles.idThree}>
                            3
                          </Text>
                        ) : (
                          <Text allowFontScaling={false} style={styles.id}>
                            {index + 1}
                          </Text>
                        )}
                        <TouchableOpacity
                          style={styles.imgStyles}
                          onPress={() => {
                            this.toggleModal(participant);
                          }}>
                          <Image
                            source={
                              participant.profile_image
                                ? {uri: participant.profile_image}
                                : {
                                    uri: APPLICATION_IMAGES.profilePicPlaceHolder,
                                  }
                            }
                            style={styles.imageSt}
                          />
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={styles.name}>
                          {participant.username}
                        </Text>
                        {/* <Text>Score</Text> */}
                        <Text allowFontScaling={false} style={styles.ratio}>
                          {participant.total_score
                            ? participant.total_score
                            : 0}
                        </Text>
                        {participant && participant.isPerfect === 1 ? (
                          <View style={styles.ppImage}>
                            <Image
                              source={APPLICATION_IMAGES.pp}
                              style={{
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            />
                          </View>
                        ) : (
                          <Text
                            style={{
                              width: 30,
                              height: 30,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {' '}
                          </Text>
                        )}
                      </View>
                    );
                  })
                ) : (
                  <Text allowFontScaling={false} style={styles.noParticipant}>
                    Sorry no standings available
                  </Text>
                )}
              </View>
            </React.Fragment>
          )}
        </View>
      );
    } catch (error) {}
  };
  renderPrivateGroups = () => {
    try {
      const {user} = this.props;
      const {groupData} = this.props.route.params.params;
      console.log('showing group data ', groupData);
      return (
        <View>
          <Text allowFontScaling={false} style={styles.headingText}>
            Standings for {groupData.title ? groupData.title : 'No name'}
          </Text>
          {/* <TouchableOpacity
            onPress={this.props.route.params.params.standings == 'Private' ? () => this.showPrivateChat(groupData) : null}
          >
            <Image
              source={APPLICATION_IMAGES.chatIcon}
              style={styles.chatStyle}
            />
          </TouchableOpacity> */}
          <View style={styles.groupContainer}>
            {groupData.members_list.length > 0 ? (
              groupData.members_list.map((participant, index) => {
                return (
                  <View style={styles.renderRow}>
                    <Text allowFontScaling={false} style={styles.id}>
                      {index + 1}.
                    </Text>
                    <View style={styles.imgStyles}>
                      <Image
                        source={
                          participant.profile_image
                            ? {uri: participant.profile_image}
                            : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                        }
                        style={styles.imageSt}
                      />
                    </View>
                    <Text allowFontScaling={false} style={styles.name}>
                      {participant.username}
                    </Text>
                    {index == 0 ? (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        WIN%:{participant.ratio}
                      </Text>
                    ) : (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        {participant.ratio}
                      </Text>
                    )}
                    {/* <Text allowFontScaling = {false}style = {styles.wins}>Wins: {participant.win_count ? participant.win_count  :0}</Text>
                  <Text allowFontScaling = {false}style = {styles.wins}>-</Text>
                  <Text allowFontScaling = {false}style = {styles.wins}>Lost: {participant.loose_count ?participant.loose_count :0 }</Text>
                   */}
                  </View>
                );
              })
            ) : (
              <Text allowFontScaling={false} style={styles.noParticipant}>
                Sorry No Participants
              </Text>
            )}
          </View>
        </View>
      );
    } catch (error) {}
  };
  renderPublicGroups = () => {
    try {
      const {publicstandings} = this.props;
      return (
        <View>
          <Text allowFontScaling={false} style={styles.headingText}>
            {APPLICATION_CONSTANTS.publicStandings}
          </Text>
          {/* <TouchableOpacity 
                        onPress = {this.props.route.params.params.standings == 'Private' ? this.showPrivateChat :this.showPublicChat}
                        >
                        <Image
                            source={APPLICATION_IMAGES.chatIcon}
                            style={styles.chatStyle}
                        />
                        </TouchableOpacity> */}
          <View style={styles.groupContainer}>
            {publicstandings && publicstandings.length > 0 ? (
              publicstandings.map((participant, index) => {
                return (
                  <View style={styles.renderRow}>
                    <Text allowFontScaling={false} style={styles.id}>
                      {index + 1}
                    </Text>
                    <TouchableOpacity
                      style={styles.imgStyles}
                      onPress={() => {
                        this.toggleModal(participant);
                      }}>
                      <Image
                        source={
                          participant.profile_image
                            ? {uri: participant.profile_image}
                            : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                        }
                        style={styles.imageSt}
                      />
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.name}>
                      {participant.username}
                    </Text>
                    {/* <Text allowFontScaling = {false}style = {styles.wins}>Wins: {participant.win_count}</Text>
                <Text allowFontScaling = {false}style = {styles.bar}>-</Text>
                <Text allowFontScaling = {false}style = {styles.lost}>Lost: {participant.loose_count}</Text> */}
                    {index == 0 ? (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        WIN%:{participant.ratio}
                      </Text>
                    ) : (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        {participant.ratio}
                      </Text>
                    )}
                    {/* {participant.id == this.props.user.id ?

                      null
                      :
                      // <MeButton
                      // containerStyles = {styles.btn}
                      // title = {`Bet`}
                      // textStyles = {styles.text}
                      // onPress = {()=>{this.props.navigation.navigate('NewBet',{fromStandingBet:1,participant})}}
                      // />
                      <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('NewBet', { fromStandingBet: 1, participant }) }}
                      >
                        <Image
                          source={APPLICATION_IMAGES.placeBet}
                          style={styles.btn}
                        />
                      </TouchableOpacity>
                    }
                    {participant.id == this.props.user.id ?

                      null
                      :

                      <TouchableOpacity
                        onPress={() => { this.props.route.params.params.standings == 'Private' ? this.showPrivateChat : this.showPublicChat(participant) }}
                      >
                        <Image
                          source={APPLICATION_IMAGES.chatIcon}
                          style={styles.chatStyle}
                        />
                      </TouchableOpacity>
                    } */}
                  </View>
                );
              })
            ) : (
              <Text allowFontScaling={false} style={styles.noParticipant}>
                Sorry no standings available
              </Text>
            )}
          </View>
        </View>
      );
    } catch (error) {}
  };
  showPrivateChat = groupData => {
    // console.log('private message person details privatecontestleader', person);
    this.props.navigation.navigate('Messages', {
      standings: 'private',
      groupData,
    });
  };
  showPublicChat = person => {
    console.log('private message person details public contestleader', person);
    this.props.navigation.navigate('Messages', {standings: 'public', person});
  };
  render() {
    const {user} = this.props;
    const {member, showModal} = this.state;
    return (
      <>
        <MeHeader
          title={'Undefeated.Live'}
          showProfilePic={true}
          profilePicUrl={user ? user.profile_image : null}
          showlogo={true}
        />
        <MeWrapper>
          {member ? (
            <MeModal
              isVisible={showModal}
              member={member}
              onClosePress={this.toggleModal}
              isLeaderBoard={true}
              onBetPress={() => {
                this.props.navigation.navigate('NewBet', {
                  fromStandingBet: 1,
                  participant: member,
                }),
                  this.toggleModal();
              }}
              onMessageBtnPressed={() => {
                this.props.route.params.params.standings == 'Private'
                  ? this.showPrivateChat()
                  : this.showPublicChat(member),
                  this.toggleModal();
              }}
            />
          ) : null}

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <Text allowFontScaling>{APPLICATION_CONSTANTS.private}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: WP('3'),
              }}>
              <Image
                source={APPLICATION_IMAGES.pp}
                style={{
                  marginRight: WP('4'),
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: WP('4'),
                }}>
                Perfect Prize
              </Text>
            </View>

            <View>
              {/* {this.props.route.params.params ?
              (this.props.route.params.params.standings == 'Private' ?
                this.renderPrivateGroups()
                :
                this.renderPublicGroups()
              ) 
              :
              null
            } */}
              {this.renderScores()}
            </View>
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
  return {
    user: state.auth.user,
    publicstandings: state.story.PublicStanding,
    contestLeaderBoard: state.story.contestLeaderBoard,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    // getpublicStand: (params) => dispatch(TASKS.getPublicStandings(params)),
    getContestLeaderBoard: params =>
      dispatch(TASKS.getContestLeaderBoard(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestLeaderboard);
