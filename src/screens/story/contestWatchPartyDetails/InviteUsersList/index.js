import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  BackHandler,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader} from '../../../../components/MeHeader';
import {styles} from './styles';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  back,
  COLORS,
  getAllContacts,
  navigate,
  ShowActivityIndicator,
  WP,
} from '../../../../services';
import Contacts from 'react-native-contacts';

import {MeButton} from '../../../../components/MeButton';
import * as TASKS from '../../../../store/actions/index';
import {STORE} from '../../../../store/storeConfig';
import {MeInputField} from '../../../../components/MeInputField';
class InviteUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      temp: [],
      loading: true,
      userList: [],
      selectedUser: [],
      selectedUserName: [],
      members_list: [],
      usersToShow: [],
      noUsers: false,
    };
    this.arrayholder = [];
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  onSendInvite(user) {
    // console.log('showing user to be send message', user);
    // alert(user.givenName)
    // alert(user.phoneNumbers[0].number)
    try {
      let invite = {
        phone_number: `${user.phoneNumbers[0].number.split(' ').join('')}`,
        auth_token: this.props.user.auth_token,
        invited_name: Platform.OS === 'ios' ? user.givenName : user.displayName,
        app_download_link: '(using the link below)',
      };
      this.props.inviteUser(invite);
    } catch (error) {}
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('Invite friends MOUNT', this.props);
    const {userListings} = this.props;
    //Fetching all contacts of phone
    try {
      let params = {
        auth_token: this.props.user.auth_token,
      };
      this.props.fetchUsers(params);
      const {groupData} = this.props.route.params.params;

      console.log('users to show before', groupData, userListings);

      const memberId = groupData?.members_list?.map(member => member.id);
      console.log('memberidd', memberId);
      let usersToShow = [];
      if (memberId)
        usersToShow = userListings.filter(user => !memberId.includes(user.id));

      console.log('users to show', usersToShow);
      this.setState({
        userList: userListings,
        usersToShow: usersToShow,
        loading: false,
      });
    } catch (error) {
      this.setState({loading: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {userListings} = this.props;
    if (userListings != nextProps.userListings) {
      console.log('showing next userslists', nextProps);

      const {groupData} = this.props.route.params.params;

      console.log('users to show before', groupData, nextProps.userListings);

      const memberId = groupData.members_list?.map(member => member.id);
      console.log('memberidd', memberId);
      let usersToShow = [];
      if (memberId)
        usersToShow = nextProps.userListings.filter(
          user => !memberId.includes(user.id),
        );

      console.log('users to show', usersToShow);
      this.setState({
        userList: nextProps.userListings,
        usersToShow: usersToShow,
        loading: false,
        noUsers: usersToShow.length > 0 ? false : true,
        filteredUsers: usersToShow,
      });

      // this.setState({
      //   userList: nextProps.userListings,
      // });
    }
  }
  addUserToGroup = user => {
    console.log('showing users', user);
    this.state.members_list.push(user);
    const {usersToShow, filteredUsers} = this.state;
    // const { selectedUser } = this.state
    var newData = usersToShow.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: true});
      return el;
    });

    var newDataFiltered = filteredUsers.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: true});
      return el;
    });

    this.setState({usersToShow: newData, filteredUsers: newDataFiltered});
    this.state.selectedUser.push(user.id);
    var allstrings = this.state.selectedUser.join(',');
    console.log('showing appended strings', allstrings);
  };
  deleteUserToGroup = user => {
    const {usersToShow, members_list, selectedUser, filteredUsers} = this.state;
    var newData = usersToShow.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: false});
      return el;
    });
    var newDataFiltered = filteredUsers.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: false});
      return el;
    });

    this.setState({usersToShow: newData, filteredUsers: newDataFiltered});
    var usernames = members_list.filter(e => e.id !== user.id);
    this.setState({members_list: usernames});

    var filteredAry = selectedUser.filter(e => e !== user.id);
    this.setState({selectedUser: filteredAry});
  };
  callDone = async () => {
    const {id, title, description, slug} =
      this.props.route.params.params.groupData;
    //    console.log("params in call done", params)
    const {selectedUser} = this.state;
    console.log('showing selected user', selectedUser);
    const {auth_token} = this.props.user;

    if (id && selectedUser !== '') {
      let params = {
        auth_token: auth_token,
        title: title,
        description: description,
        party_slug: slug,
        add_members: `${selectedUser}`,
        // private: enabled,
        // // description: description,
        // profile_image: uploadingPath,
        // members_list: `${selectedUser}`
      };
      console.log('showing groups creating ', params);
      await this.props.addMemberToWatchParty(params);
      await this.props.fetchUserWatchParty(params);
      navigate('GroupDetails');
      let properties = {
        auth_token: auth_token,
        limit: 30,
        page: 0,
      };
      // console.log('dispatching contestwatchpartydetails onreceived refresh from ');
      await STORE.dispatch(TASKS.getContestWatchParty(properties));
      // back();
    } else {
      showToast('Select atleast 1 member');
    }
    // back()
    // if (selectedUser.length >= 2) {
    //   this.toggleModal()
    // }
    // else {
    //   showToast(APPLICATION_CONSTANTS.atleasttwoParticipants)
    // }
  };

  renderUserList = () => {
    const {userList, usersToShow, filteredUsers} = this.state;

    return (
      <ScrollView style={styles.lisitngs}>
        {filteredUsers && filteredUsers.length > 0 ? (
          <View style={styles.parentContainerUSers}>
            {filteredUsers.map(user => {
              return (
                <View style={styles.rowContainer}>
                  {/* {user.profile_image?
                    <View style={styles.userImage}>
                      <Image
                        source={
                          user.profile_image != ''
                            ? { uri: user.profile_image }
                            : APPLICATION_IMAGES.profilePicPlaceHolder
                        }
                        style={styles.userImageContainerInside}
                      />
                    </View>:null} */}
                  <Text allowFontScaling={false} style={styles.rowName}>
                    {user.username}
                  </Text>
                  {user.isSelected ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.deleteUserToGroup(user);
                      }}
                      style={styles.addedBtn}>
                      <Text allowFontScaling={false} style={styles.added}>
                        Added
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
            })}
          </View>
        ) : this.state.noUsers ? (
          <View style={styles.noUser}>
            <Text allowFontScaling={false} style={styles.addParticipants}>
              {APPLICATION_CONSTANTS.noUserFound}
            </Text>
          </View>
        ) : (
          <View style={styles.loaderContainer}>{ShowActivityIndicator()}</View>
        )}
      </ScrollView>
    );
  };

  render() {
    const {loading} = this.state;
    return (
      <>
        <MeHeader
          title={'Invite Friends'}
          onBackBtn={() => {
            back();
          }}
          // hideBackBtn = {true}
        />

        {/* <View style={{ flex: 1 }}> */}
        <MeWrapper>
          {loading ? (
            <View style={styles.loaderContainer}>
              {ShowActivityIndicator()}
            </View>
          ) : (
            <>
              <View style={styles.searchbarContainer}>
                <MeInputField
                  placeholder={'Search'}
                  style={styles.searchBar}
                  //  value={reportingMessage}
                  onChangeText={text => {
                    // console.log('this.state.userList', this.state.userList);
                    console.log('text =>', text);
                    this.setState({
                      filteredUsers: this.state.usersToShow.filter(user =>
                        user.username
                          .toLowerCase()
                          .includes(text.toLowerCase()),
                      ),
                    });
                  }}
                />
              </View>

              {this.renderUserList()}
            </>
          )}
        </MeWrapper>
        <TouchableOpacity
          onPress={this.callDone}
          style={{
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: COLORS.appColour,
          }}>
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              fontSize: WP('5'),
              color: COLORS.white,
            }}>
            Invite
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
  };
};
mapDispatchToProps = dispatch => {
  return {
    inviteUser: params => dispatch(TASKS.sendInvites(params)),
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    addMemberToGroup: params => dispatch(TASKS.addMemberToGroup(params)),
    addMemberToWatchParty: params =>
      dispatch(TASKS.addMemberToWatchParty(params)),
    fetchUserWatchParty: params => dispatch(TASKS.getWatchParty(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersList);
