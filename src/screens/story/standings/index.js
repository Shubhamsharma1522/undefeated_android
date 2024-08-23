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
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader} from '../../../components/MeHeader';
import {MeWelcome} from '../../../components/MeWelcome';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  WP,
  COLORS,
} from '../../../services';
import {MeButton} from '../../../components/MeButton';
import * as TASKS from '../../../store/actions/index';
import MeModal from '../../../components/MeModal';
import MeBottomNavbar from '../../../components/BottomNavbar';
import {MeInputField} from '../../../components/MeInputField';

class Standings extends Component {
  constructor(props) {
    super(props);
    console.log('thos.props', this.props);
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
      filteredStandings: this.props.publicstandings,
    };
  }
  componentDidMount() {
    try {
      let param = {
        auth_token: this.props.user.auth_token,
        limit: 50,
        page: 0,
      };
      this.props.getpublicStand(param);
    } catch (error) {}
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log({nextProps:nextProps?.member});
    this.setState({
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
      filteredStandings: nextProps.publicstandings,
    });
  }

  renderPrivateGroups = () => {
    try {
      const {user} = this.props;
      const {groupData} = this.props.route.params;
      console.log('showing group data ', groupData);
      return (
        <View>
          <Text allowFontScaling={false} style={styles.headingText}>
            Standings for {groupData.title ? groupData.title : ''}
          </Text>
          <TouchableOpacity
            onPress={
              this.props.route.params?.standings == 'Private'
                ? () => this.showPrivateChat(groupData)
                : null
            }>
            <Image
              source={APPLICATION_IMAGES.chatIcon}
              style={styles.chatStyle}
            />
          </TouchableOpacity>
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
                        Contest
                        {'\n'}
                        {participant.totalContest}
                      </Text>
                    ) : (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        {participant.totalContest}
                      </Text>
                    )}
                    {index == 0 ? (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        Total Score:{participant.totalScore}
                      </Text>
                    ) : (
                      <Text allowFontScaling={false} style={styles.ratio}>
                        {participant.totalScore}
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
  toggleModal = member => {
    this.setState({
      showModal: !this.state.showModal,
      member: member,
    });
  };
  renderPublicGroups = () => {
    try {
      const {publicstandings} = this.props;
      return (
        <View>
          <Text allowFontScaling={false} style={styles.headingText}>
            {APPLICATION_CONSTANTS.publicStandings}
          </Text>
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
                        publicstandings &&
                        publicstandings.length > 0 &&
                        publicstandings.filter(
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
              <View style={styles.headertext}>
                <Text style={styles.username}>Username</Text>
                <Text style={styles.textheading}>Contest</Text>
                <Text style={styles.Score}>Score</Text>
              </View>
              <View style={styles.groupContainer}>
                {this.state.filteredStandings &&
                this.state.filteredStandings.length > 0 ? (
                  this.state.filteredStandings.map((participant, index) => {
                    return (
                        <View key={index} style={styles.renderRow}>
                          <Text allowFontScaling={false} style={styles.id}>
                            {index + 1}
                          </Text>
                          <TouchableOpacity
                            style={styles.imgStyles}
                            onPress={() => {
                              console.log(
                                'private message full leader',
                                participant,
                              );
                              // this.toggleModal({...participant,id:participant.user_id});
                              this.toggleModal({...participant});
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
                          {index == 0 ? (
                            <Text allowFontScaling={false} style={styles.ratio}>
                              {/* Contest{'\n'} */}
                              {participant.totalContest}
                            </Text>
                          ) : (
                            <Text allowFontScaling={false} style={styles.ratio}>
                              {participant.totalContest}
                            </Text>
                          )}
                          {index == 0 ? (
                            <Text allowFontScaling={false} style={styles.ratio}>
                              {/* Score {'\n'} */}
                              {participant.totalScore}
                            </Text>
                          ) : (
                            <Text allowFontScaling={false} style={styles.ratio}>
                              {participant.totalScore}
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
  showPrivateChat = groupData => {
    // console.log('showing group details', groupData);
    this.props.navigation.navigate('ChatAndNewsScreen', {
      standings: 'private',
      groupData,
    });
  };
  showPublicChat = person => {
    console.log('private message showing person details', person);
    this.props.navigation.navigate('Messages', {
      standings: 'public',
      person,
    });
  };
  render() {
    const {user} = this.props;
    const {member, showModal} = this.state;
    console.log('MEMBERS_', member, JSON.stringify(this.props));
    return (
      <>
        <MeHeader
          title={'Undefeated.Live'}
          showProfilePic={true}
          profilePicUrl={user ? user?.profile_image : null}
          showlogo={true}
          hideBackBtn={false}
        />

        <MeWrapper>
          {member ? (
            <MeModal
              isVisible={showModal}
              member={{...member, userId: member.slug}}
              onClosePress={this.toggleModal}
              isLeaderBoard={true}
              onBetPress={() => {
                this.props.navigation.navigate('NewBet', {
                  fromStandingBet: 1,
                  participant: member,
                });
                this.toggleModal();
              }}
              onMessageBtnPressed={() => {
                this.props.route.params?.standings == 'Private'
                  ? this.showPrivateChat()
                  : this.showPublicChat(member),
                  this.toggleModal();
              }}
            />
          ) : null}

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}>
            {APPLICATION_CONSTANTS.private && (
              <Text allowFontScaling>{APPLICATION_CONSTANTS.private}</Text>
            )}

            <View>
              {this.props.route.params
                ? this.props.route.params?.standings == 'Private'
                  ? this.renderPrivateGroups()
                  : this.renderPublicGroups()
                : null}
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
  // console.log("leaderbaord_state",JSON.stringify(state.story.PublicStanding))
  return {
    user: state.auth.user,
    publicstandings: state.story.PublicStanding,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    getpublicStand: params => dispatch(TASKS.getPublicStandings(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Standings);
