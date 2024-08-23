import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {MeWrapper} from '../../../../../components/MeWrapper';
import {MeHeader} from '../../../../../components/MeHeader';
import {MeWelcome} from '../../../../../components/MeWelcome';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  COLORS,
  WP,
  showToast,
  ShowActivityIndicator,
  getAllContacts,
} from '../../../../../services';
import {Switch} from 'react-native-switch';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {MeButton} from '../../../../../components/MeButton';
import * as TASKS from '../../../../../store/actions/index';
import Contacts from 'react-native-contacts';
import MembersList from '../../../../../components/MeMembersList';
let isParticipantAddedIndiviual = false;
const placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
class RenderQuickBets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
      wagerAmount: '',
      showModal: false,
      showUsersModal: false,
      showCreateBet: false,
      showGolferList: false,
      showContacts: false,
      newWager: '',
      selectedUser: [],
      selectedUserName: [],
      groupid: '',
      contacts: [],
      temp: [],
      loading: true,
      selectContact: null,
      isMemberSelected: false,
      golferList: [],
      popularWages: [
        {
          id: 1,
          wage: 'Offense scores points on this drive',
        },
        {
          id: 2,
          wage: 'Offense scores a TD this drive',
        },
        {
          id: 9,
          wage: 'Offense kicks FG this drive',
        },
        {
          id: 10,
          wage: 'Offense is 3 & out',
        },
        {
          id: 12,
          wage: 'Offense will throw an interception on this drive',
        },
        {
          id: 13,
          wage: `Offense will fumble the ball on this drive`,
        },
        {
          id: 14,
          wage: `Offense won't allow any sacks on this drive`,
        },
        {
          id: 15,
          wage: `Field Goal kicker will miss FG on this drive`,
        },
        {
          id: 16,
          wage: 'Defense gets a pick 6 on this drive',
        },
        {
          id: 16,
          wage: `Defense scores on this drive`,
        },
        {
          id: 16,
          wage: 'Defense gets a sack on this drive',
        },
        {
          id: 16,
          wage: 'Returner returns the punt for a TD',
        },
        {
          id: 16,
          wage: 'Defense gets a safety on this drive',
        },
      ],
      userList: [],
      userGroups: [],
      selectedGroup: [],
      description: 'Tap to pick quick bet!',
      golferDescription: 'Tap to select a golfer!',
      title: '',
      quickBetList: [],
      partyMembersList: [],
      isMemberSelected: false,
      //   members_list: [],
    };
    // const placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png'
  }

  componentDidMount() {
    console.log('QUICK', this.props);
    const {auth_token} = this.props.user;
    const {group} = this.props.route.params.params;
    let params = {
      auth_token: auth_token,
      sportName: group.sport_name,
    };
    this.props.getSportsBet(params);
    this.props.getGolferList(params);

    const members_list = this.props.route.params.params.group.members_list;
    this.setState({
      userList: members_list,
      partyMembersList: members_list,
      groupid: group.id,
      quickBetList: this.props.sportsBet,
      golferList: this.props.golferList,
      //   members_list: members_list,
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.sportsBet != this.props.sportsBet) {
  //       const {auth_token} = this.props.user;
  //       const {group} = this.props.route.params.params;
  //     let params = {
  //       auth_token: auth_token,
  //       sportName: group.sport_name,
  //     };
  //     this.props.getSportsBet(params);
  //     this.setState({
  //       quickBetList: this.props.sportsBet,
  //     });
  //   }
  // }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  toggleUsersModal = () => {
    this.setState({showUsersModal: !this.state.showUsersModal});
  };

  addUserDone = () => {
    this.setState({
      showUsersModal: !this.state.showUsersModal,
      isMemberSelected: true,
    });
  };

  toggleCreateBet = () => {
    this.setState({showCreateBet: !this.state.showCreateBet});
  };
  toggleGolferList = () => {
    this.setState({showGolferList: !this.state.showGolferList});
  };

  renderModal = () => {
    const {showCreateBet, newWager} = this.state;
    return (
      <Modal isVisible={showCreateBet} onBackdropPress={this.toggleCreateBet}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.Modal}>
            <Text allowFontScaling={false} style={styles.titleModal}>
              {APPLICATION_CONSTANTS.quickBetsTitle}
            </Text>
            {this.renderWagesList()}
            <MeButton
              title={'Done'}
              containerStyles={styles.btnContainer}
              textStyles={styles.textBtn}
              onPress={this.addWager}
            />
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };
  renderGolferModal = () => {
    const {showGolferList, newWager} = this.state;
    return (
      <Modal isVisible={showGolferList} onBackdropPress={this.toggleGolferList}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.Modal}>
            <Text allowFontScaling={false} style={styles.titleModal}>
              {APPLICATION_CONSTANTS.golferTitle}
            </Text>
            {this.renderGolferList()}
            {/* <MeButton
              title={'Done'}
              containerStyles={styles.btnContainer}
              textStyles={styles.textBtn}
              onPress={this.toggleCreateBet}
            /> */}
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };
  addWager = () => {
    const {newWager} = this.state;
    if (newWager != '') {
      let newWage = {
        id: Math.random(),
        wage: newWager,
      };
      this.setState({
        popularWages: [...this.state.popularWages, newWage],
      });
      this.setState({newWager: ''});
      // this.toggleModal()
    } else {
      this.toggleCreateBet();
    }
  };
  changeWage = selectedWage => {
    console.log('showing wage selected', selectedWage.wage);
    this.setState({
      description: selectedWage.wage,
    });
    this.toggleCreateBet();
  };
  changeGolfer = selectedGolfer => {
    this.setState({
      golferDescription: selectedGolfer.name,
    });
    this.toggleGolferList();
  };
  renderGolferList = () => {
    // const {quickBetList} = this.state;
    return (
      <ScrollView>
        {this.props.golferList && this.props.golferList.length > 0 ? (
          this.props.golferList &&
          this.props.golferList.map(golfer => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.changeGolfer(golfer)}>
                  <Text allowFontScaling={false} style={styles.popularText}>
                    {golfer.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text allowFontScaling={false} style={styles.popularText}>
            {APPLICATION_CONSTANTS.noWagesFound}
          </Text>
        )}
      </ScrollView>
    );
  };

  renderWagesList = () => {
    const {quickBetList} = this.state;
    return (
      <ScrollView>
        {this.props.sportsBet && this.props.sportsBet.length > 0 ? (
          this.props.sportsBet.map(wage => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.changeWage(wage)}>
                  <Text allowFontScaling={false} style={styles.popularText}>
                    {wage.wage}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text allowFontScaling={false} style={styles.popularText}>
            {APPLICATION_CONSTANTS.noWagesFound}
          </Text>
        )}
      </ScrollView>
    );
  };

  renderQuickBetMembers = () => {
    console.log('shwoing params in renderquickbetmembers', this.props);
    this.setState({showUsersModal: true});
  };

  addUserToGroup = user => {
    console.log('showing users', user);

    // this.state.members_list.push(user);

    const {userList} = this.state;
    // const { selectedUser } = this.state
    var newData = userList.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: true});
      return el;
    });
    // var partyMemberList = userList.map(el => {
    //     if (el.id == user.id) return Object.assign({}, el, {isSelected: true});
    //     return el;
    //   });
    console.log('in new Data', newData);
    this.setState({userList: newData});
    this.state.selectedUser.push(user.id);
    var allstrings = this.state.selectedUser.join(',');
    console.log('showing appended strings', allstrings);
  };
  deleteUserToGroup = user => {
    const {userList, members_list, selectedUser} = this.state;
    console.log('user list', userList);
    var newData = userList.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: false});
      return el;
    });
    this.setState({userList: newData});
    // var usernames = members_list.filter(e => e.id !== user.id);
    // this.setState({members_list: usernames});

    var filteredAry = selectedUser.filter(e => e !== user.id);
    this.setState({selectedUser: filteredAry});
  };
  renderUserGroups = () => {
    try {
      const {
        showUsersModal,
        userList,
        // , userGroups,
        //  switchValue
      } = this.state;

      const members_list =
        this.props.route.params.params.group.members_list;
      console.log('[Quick Bet] members list', members_list);
      // console.log('[Quick Bet] renderUserGroups', this.props);

      return (
        <Modal
          isVisible={showUsersModal}
          style={styles.userList}
          onBackdropPress={this.toggleUsersModal}>
          <ScrollView style={styles.lisitngs}>
            <View style={styles.headingContainer}>
              <TouchableOpacity onPress={this.toggleUsersModal}>
                <Text allowFontScaling={false} style={styles.optionsBtn}>
                  Cancel
                </Text>
              </TouchableOpacity>
              {/* <Text allowFontScaling = {false}style = {styles.addParticipants}>{switchValue ? APPLICATION_CONSTANTS.selectParticipants : APPLICATION_CONSTANTS.selectGroup}</Text> */}
              <TouchableOpacity onPress={this.addUserDone}>
                <Text allowFontScaling={false} style={styles.optionsBtn}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            {userList && userList.length > 0 ? (
              <View style={styles.parentContainerUSers}>
                {userList.map(user => {
                  // user
                  // console.log('[Quick Bet] renderUserGroups', user);
                  if (
                    user &&
                    this.props.user &&
                    user.id != this.props.user.id
                  ) {
                    return (
                      <View style={styles.rowContainer}>
                        <View style={styles.userImage}>
                          <Image
                            source={
                              user.profile_image != ''
                                ? {uri: user.profile_image}
                                : {
                                    uri: APPLICATION_IMAGES.profilePicPlaceHolder,
                                  }
                            }
                            style={styles.userImageContainerInside}
                          />
                        </View>
                        <Text allowFontScaling={false} style={styles.rowName}>
                          {user.username}
                        </Text>
                        {user.isSelected ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.deleteUserToGroup(user);
                            }}>
                            <Text allowFontScaling={false} style={styles.added}>
                              added
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => {
                              this.addUserToGroup(user);
                            }}>
                            <Image
                              source={APPLICATION_IMAGES.addGroup}
                              style={styles.image}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  }
                })}
              </View>
            ) : (
              <View style={styles.noUser}>
                <Text allowFontScaling={false} style={styles.addParticipants}>
                  {APPLICATION_CONSTANTS.noUserFound}
                </Text>
              </View>
            )}
          </ScrollView>
        </Modal>
      );
    } catch (error) {}
  };

  renderNewBet = () => {
    const {
      wagerAmount,
      switchValue,
      description,
      golferDescription,
      title,
      isMemberSelected,
      selectedUserName,
      selectedUser,
      partyMembersList,
      userList,
    } = this.state;
    const {group} = this.props.route.params.params;
    let isSelect = '';
    // console.log('[WatchPartyQuickBet] watchparty  data', group.sport_name);
    return (
      <View style={styles.newBetContainer}>
        <Text allowFontScaling={false} style={styles.watchParty}>
          {APPLICATION_CONSTANTS.watchPartyMembers}
        </Text>
        <TouchableOpacity onPress={this.renderQuickBetMembers}>
          <View style={styles.groupBtn}>
            {/* <MembersList group={group} /> */}

            <ScrollView
              style={styles.imagesContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {isMemberSelected && userList ? (
                userList.length > 0 ? (
                  userList.map((group, i) => {
                    if (group.isSelected === true) {
                      return (
                        <Image
                          source={{
                            uri:
                              group.profile_image != null
                                ? group.profile_image
                                : placeHolder,
                          }}
                          style={styles.profile_image}
                        />
                      );
                    }
                  })
                ) : (
                  <Text style={{color: 'black'}}>Select members</Text>
                )
              ) : (
                <Text style={{color: 'black'}}>Select members</Text>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.purposedBet}>
          {APPLICATION_CONSTANTS.quickWager}
        </Text>
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          value={wagerAmount}
          placeholder={'$10 or Lunch'}
          autoFocus={true}
          // maxLength = {4}
          placeholderTextColor={COLORS.black}
          onChangeText={text => {
            this.setState({wagerAmount: text});
          }}
        />

        {group && group.sport_name === 'golf' ? (
          <Text allowFontScaling={false} style={styles.purposedBet}>
            Select a Golfer
          </Text>
        ) : null}
        {group && group.sport_name === 'golf' ? (
          <TouchableOpacity
            style={styles.pickedBetsBtn}
            onPress={this.toggleGolferList}>
            <Text allowFontScaling={false} style={styles.purposedBet}>
              {golferDescription}
            </Text>
          </TouchableOpacity>
        ) : null}

        <Text allowFontScaling={false} style={styles.purposedBet}>
          {APPLICATION_CONSTANTS.pickedBet}
        </Text>

        <TouchableOpacity
          style={styles.pickedBetsBtn}
          onPress={this.toggleCreateBet}>
          <Text allowFontScaling={false} style={styles.purposedBet}>
            {description}
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.wager}>
                    <TouchableOpacity onPress={this.toggleCreateBet}
                        style={styles.wagerBtn}
                    >
                        <Text allowFontScaling={false} style={styles.chooseWagerText}>{APPLICATION_CONSTANTS.QuickWage}</Text>
                    </TouchableOpacity>
                </View> */}
      </View>
    );
  };

  submitBet = () => {
    try {
      const {
        title,
        description,
        golferDescription,
        //  switchValue,
        selectedUser,
        selectedGroup,
        wagerAmount,
        groupid,
      } = this.state;
      let golferName;

      if (
        golferDescription &&
        golferDescription !== undefined &&
        golferDescription != 'Tap to select a golfer!' &&
        golferDescription != null
      ) {
        golferName = golferDescription;
      } else {
        golferName = null;
      }
      console.log('in Submit QUICK BET', this.state);
      if (
        selectedUser.length > 0 ||
        (selectedGroup.length > 0 && wagerAmount != 0)
      ) {
        if (
          //   title &&
          (description &&
            //  && switchValue
            selectedUser &&
            wagerAmount != 0) ||
          //   title &&
          (description &&
            // && !switchValue
            // && selectedGroup
            wagerAmount != 0)
        ) {
          // if (wagerAmount.match(/\d/)) {
          let desc = golferName
            ? golferName + ' ' + description.split("'").join(',')
            : description.split("'").join(',');
          if (wagerAmount > 5000) {
            showToast('Please enter wage between $1 - $5000');
          } else {
            console.log('in submit condn');
            let params = {
              auth_token: this.props.user.auth_token,
              title: this.props.user.username,
              description: desc,
              wager: wagerAmount,
              bet_type:
                // selectedUser.length > 0 ? 1
                // :
                2,
              vs_player_id: selectedUser.length > 0 ? selectedUser[0] : null,
              vs_group_id: groupid ? groupid : null,
              bet_group_users_ids: `${selectedUser}`,
              //   selectedGroup.length > 0 ? `${selectedGroup}` : null,
              is_private:
                // switchValue ?
                2,
              // : 1,
              is_quick_bet: 1,
              vs_sports_player: golferDescription,
            };

            console.log('showing params created in ', params);
            this.props.createQuickBet(params);
            isParticipantAddedIndiviual = false;
            let param = {
              auth_token: this.props.user.auth_token,
              limit: 40,
              page: 0,
            };
            setTimeout(() => {
              this.props.getMyBets(param);
            }, 2000);
          }
          // }
          // else {
          //   let params = {
          //     auth_token: this.props.user.auth_token,
          //     title: this.props.user.username,
          //     description: desc,
          //     wager: wagerAmount,
          //     bet_type: selectedUser.length > 0 ? 1 : 2,
          //     vs_player_id: selectedUser.length > 0 ? selectedUser[0] : null,
          //     vs_group_id: groupid ? groupid : null,
          //     bet_group_users_ids:
          //       selectedGroup.length > 0 ? `${selectedGroup}` : null,
          //     is_private: switchValue ? 2 : 1,
          //     vs_sports_player: golferDescription
          //   };
          //   console.log('showing params created in ', params);
          //   this.props.createBet(params);
          //   isParticipantAddedIndiviual = false;
          //   let param = {
          //     auth_token: this.props.user.auth_token,
          //     limit: 40,
          //     page: 0,
          //   };
          //   setTimeout(() => {
          //     this.props.getMyBets(param);
          //   }, 2000);
          // }
        } else {
          showToast(APPLICATION_CONSTANTS.QuickBetsError);
        }
      } else {
        showToast(APPLICATION_CONSTANTS.QuickBetsError);
      }
    } catch (error) {
      console.log('showing error', error);
    }
  };

  render() {
    const {user, lumper} = this.props;
    const {switchValue} = this.state;
    const {group} = this.props.route.params.params;
    return (
      <KeyboardAwareScrollView>
        <MeWrapper>
          <MeHeader
            title={/*'Textme.Bet'*/ 'Undefeated.Live'}
            showProfilePic={true}
            profilePicUrl={user?.profile_image ? user?.profile_image : null}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <Text allowFontScaling={false} style={styles.screenHeading}>
              {APPLICATION_CONSTANTS.quickBetText}
            </Text>
            <Text allowFontScaling={false} style={styles.screenDescription}>
              {APPLICATION_CONSTANTS.quickBetDescriptions}
            </Text>
            <View>
              {this.renderNewBet()}
              {this.renderUserGroups()}
            </View>
            {lumper ? (
              <View style={styles.btnsContainer}>
                {ShowActivityIndicator()}
              </View>
            ) : (
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={this.submitBet}>
                  <Image
                    source={APPLICATION_IMAGES.send}
                    style={styles.sendImage}
                  />
                  <Text allowFontScaling={false} style={styles.sendText}>
                    {APPLICATION_CONSTANTS.send}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    this.props.navigation.pop();
                  }}>
                  <Image
                    source={APPLICATION_IMAGES.cancel}
                    style={styles.sendImage}
                  />
                  <Text allowFontScaling={false} style={styles.cancelText}>
                    {APPLICATION_CONSTANTS.cancel}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {this.renderModal()}
            {this.renderGolferModal()}
          </KeyboardAwareScrollView>
        </MeWrapper>
      </KeyboardAwareScrollView>
    );
  }
}
mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    lumper: state.ui.isLoading,
    getUserGroups: state.story.getUserGroups,
    sportsBet: state.story.getSportsBets,
    golferList: state.story.golferList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    fetchUserGroups: params => dispatch(TASKS.getUserGroups(params)),
    createBet: params => dispatch(TASKS.addNewBet(params)),
    createQuickBet: params => dispatch(TASKS.addNewQuickBet(params)),
    getMyBets: params => dispatch(TASKS.getMyBets(params)),
    sendBetSms: (params, success) =>
      dispatch(TASKS.betSendViaMessage(params, success)),
    getSportsBet: (params, success) =>
      dispatch(TASKS.getSportsBet(params, success)),
    getGolferList: (params, success) =>
      dispatch(TASKS.getGolferListing(params, success)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RenderQuickBets);
