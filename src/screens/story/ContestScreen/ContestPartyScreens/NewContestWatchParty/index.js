import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  Switch,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';
import {styles} from './styles';
import {MeWrapper} from '../../../../../components/MeWrapper';
import {MeHeader} from '../../../../../components/MeHeader';
import {MeButton} from '../../../../../components/MeButton';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGE_CONSTANTS,
  COLORS,
  WP,
  showToast,
  ShowActivityIndicator,
} from '../../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getPicture} from '../../../../../services';
import * as TASKS from '../../../../../store/actions/index';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native';

// import DropDown, {
//   Select,
//   Option,
//   OptionList,
// } from 'react-native-option-select';

class NewContestWatchParty extends Component {
  constructor() {
    super();
    this.state = {
      switchValue: false,
      wagerAmount: 100,
      image: null,
      uploadingPath: '',
      title: '',
      description: 'demo trial',
      profile_image: '',
      members_list: [],
      showModal: false,
      selectedUser: [],
      userList: [],
      message: '',
      enabled: false,
      showSports: false,
      sport_name: [],
      selectedSportsItem: null,
      sportList: [
        {
          sport_name: 'Football',
          value: 'football',
        },
        {
          sport_name: 'Golf',
          value: 'golf',
        },
        {
          sport_name: 'Basketball',
          value: 'basketball',
        },
        {
          sport_name: 'Tennis',
          value: 'tennis',
        },
      ],
      team_one: '',
      team_two: '',
      isPrivate: false,
    };
  }
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };
  componentDidMount() {
    const {userListings} = this.props;
    this.props.getSportList({contest_type: 'CONTEST'});
    try {
      let params = {
        auth_token: this.props.user.auth_token,
      };
      this.props.fetchUsers(params);
      this.setState({
        userList: userListings,
      });
    } catch (error) {}
  }
  componentWillReceiveProps(nextProps) {
    const {userListings} = this.props;
    if (userListings != nextProps.userListings) {
      // console.log('showing next userslists', nextProps);
      this.setState({
        userList: nextProps.userListings,
      });
    }
  }
  changeImage = () => {
    console.log('new contest wath party');
    getPicture(
      image => {
        console.log('showing getted image', image);
        this.setState({
          image: image.uri.uri,
          uploadingPath: 'data:image/jpeg;base64,' + image.uri.data,
        });
      },
      error => {
        showToast(APPLICATION_CONSTANTS.imageNotPossible);
      },
    );
  };
  submitQuery = async () => {
    const {
      image,
      title,
      message,
      enabled,
      uploadingPath,
      selectedUser,
      team_one,
      team_two,
      isPrivate,
    } = this.state;
    // console.log('showing selected user', selectedUser);
    const {auth_token} = this.props.user;

    let params = {
      auth_token: auth_token,
      title: title,
      description: message,
      profile_image: uploadingPath,
      sport_name: this.state.sport_name,
      team_one: team_one,
      team_two: team_two,
      isPrivate: isPrivate,
    };
    console.log('BEFORE ADDING TO CONTEST', params);
    console.log('IsPrivate', isPrivate);

    await this.props.addNewContestWatchParty(params);
    await this.props.getContestWatchParty(params);
  };
  addUserToGroup = user => {
    console.log('showing users', user);
    this.state.members_list.push(user);
    const {userList} = this.state;
    const {selectedUser} = this.state;
    var newData = userList.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: true});
      return el;
    });

    this.setState({userList: newData});
    this.state.selectedUser.push(user.id);
    var allstrings = this.state.selectedUser.join(',');
    console.log('showing appended strings', allstrings);
  };
  selectedSports = item => {
    // console.log("ITEMSIN_",item)
    this.setState({
      sport_name: item.value,
      selectedSportsItem: item,
    });
  };
  renderSports = () => {
    const {
      showModal,
      userList,
      switchValue,
      userGroups,
      showSports,
      sportList,
    } = this.state;
    // const {showModal,userGroups ,switchValue} = this.state

    // console.log("showing fetched users", userList)
    return (
      <Modal
        isVisible={showSports}
        style={styles.userList}
        onBackdropPress={this.toggleModalContacts}>
        {/* {/ Changes ScrollView to SafeAreaView to due error in redering sport /} */}
        <ScrollView style={styles.lisitngs}>
          <SafeAreaView style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showSports: false,
                  sport_name: '',
                  selectedSportsItem: null,
                });
              }}>
              <Text allowFontScaling={false} style={styles.optionsBtn}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.addParticipants}>
              {APPLICATION_CONSTANTS.SportsGameList}
            </Text>
            <TouchableOpacity
              // onPress = {this.callDone}
              onPress={() => {
                this.setState({showSports: false});
              }}>
              <Text allowFontScaling={false} style={styles.optionsBtn}>
                Done
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
          {/* <View style={styles.searchContainer}>
            <TextInput allowFontScaling={false}
              placeholderTextColor={COLORS.appColour}
              placeholder={'Search contact here'}
              onChangeText={(text) => { this.searchFilterFunction(text) }}
            />

          </View> */}
          <View style={styles.contactParent}>
            <FlatList
              data={this.props.sportList}
              renderItem={({item}) => (
                <View style={styles.rowStyles} key={Math.random()}>
                  <Text allowFontScaling={false} style={styles.rowText}>
                    {Platform.OS === 'ios' ? item.sport_name : item.sport_name}
                  </Text>

                  {this.state.sport_name === item.value ? (
                    <MeButton
                      title={'Added'}
                      containerStyles={styles.btnBlue}
                      textStyles={styles.titleWhite}
                    />
                  ) : (
                    <MeButton
                      title={'Select'}
                      containerStyles={styles.btn}
                      textStyles={styles.title}
                      onPress={() => {
                        this.selectedSports(item);
                      }}
                    />
                  )}
                </View>
              )}
              keyExtractor={item => item.value}
            />
          </View>
        </ScrollView>
      </Modal>
    );
  };
  deleteUserToGroup = user => {
    const {userList, members_list, selectedUser} = this.state;
    var newData = userList.map(el => {
      if (el.id == user.id) return Object.assign({}, el, {isSelected: false});
      return el;
    });
    this.setState({userList: newData});
    var usernames = members_list.filter(e => e.id !== user.id);
    this.setState({members_list: usernames});

    var filteredAry = selectedUser.filter(e => e !== user.id);
    this.setState({selectedUser: filteredAry});
  };
  callDone = () => {
    const {selectedUser} = this.state;
    if (selectedUser.length >= 2) {
      this.toggleModal();
    } else {
      showToast(APPLICATION_CONSTANTS.atleasttwoParticipants);
    }
  };
  renderUserList = () => {
    const {showModal, userList} = this.state;
    console.log('showing fetched users', userList);
    return (
      <Modal
        isVisible={showModal}
        style={styles.userList}
        onBackdropPress={this.toggleModal}>
        <ScrollView style={styles.lisitngs}>
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={this.toggleModal}>
              <Text allowFontScaling={false} style={styles.optionsBtn}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.addParticipants}>
              {APPLICATION_CONSTANTS.selectParticipants}
            </Text>
            <TouchableOpacity onPress={this.callDone}>
              <Text allowFontScaling={false} style={styles.optionsBtn}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
          {userList && userList.length > 0 ? (
            <View style={styles.parentContainerUSers}>
              {userList.map(user => {
                return (
                  <View style={styles.rowContainer}>
                    <View style={styles.userImage}>
                      <Image
                        source={
                          user.profile_image != ''
                            ? {uri: user.profile_image}
                            : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
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
  };
  toggleSwitch = () => this.setState({isPrivate: !this.state.isPrivate});
  toggleModalSports = () => this.setState({showSports: !this.state.showSports});
  renderNewBet = () => {
    const profilePicPlaceHolder =
      APPLICATION_IMAGE_CONSTANTS.contestWatchPartyCoverImg;
    const {
      image,
      title,
      description,
      members_list,
      message,
      enabled,
      team_one,
      team_two,
      isPrivate,
    } = this.state;
    console.log('Here is IsPRivate Value', isPrivate);
    return (
      <View style={styles.newBetContainer}>
        <View>
          <TouchableOpacity onPress={this.changeImage}>
            <Image
              source={image != null ? {uri: image} : profilePicPlaceHolder}
              style={styles.imageHeader}
            />
          </TouchableOpacity>
          <Text style={styles.createPartyTitle}>CREATE A CONTEST PARTY</Text>
        </View>
        <View />
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.contextWatchPartyTitle}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={title}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.welcomeMessage}
            placeholderTextColor={COLORS.black}
            style={styles.welcomePlaceholder}
            value={message}
            onChangeText={text => this.setState({message: text})}
            multiline={true}
            // maxLength={30}
          />
        </View>
        {/* {/ //team one and team two /} */}
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.team_one}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={team_one}
            onChangeText={text => this.setState({team_one: text})}
          />
        </View>
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.team_two}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={team_two}
            onChangeText={text => this.setState({team_two: text})}
          />
        </View>
        {/* {/ //team one and team two /} */}
        <View style={styles.contactsBtn}>
          <TouchableOpacity
            style={styles.personBtns}
            onPress={this.toggleModalSports}>
            <Text allowFontScaling={false} style={styles.optionBtnText}>
              {this.state.selectedSportsItem
                ? this.state.selectedSportsItem.sport_name
                : APPLICATION_CONSTANTS.SportsGameList}
            </Text>
            <Image
              source={APPLICATION_IMAGES.options}
              style={styles.optionImg}
            />
          </TouchableOpacity>
        </View>
        {this.renderSports()}
        <View style={styles.privateGroupContainer}>
          <View>
            <Text allowFontScaling={false} style={styles.privateChat}>
              {APPLICATION_CONSTANTS.privateWatchParty}
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.privateChatDescriptions}>
              {APPLICATION_CONSTANTS.privateWatchPartyDescription}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={{false: '#767577', true: COLORS.appColour}}
            ios_backgroundColor="#fff"
            value={isPrivate}
            onValueChange={this.toggleSwitch}
          />
        </View>
      </View>
    );
  };
  render() {
    const {user, lumper} = this.props;
    return (
      <>
        <MeHeader
          title={'Undefeated.Live'}
          showProfilePic={true}
          profilePicUrl={user?.profile_image ? user.profile_image : null}
        />

        <MeWrapper>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View>{this.renderNewBet()}</View>
            {lumper ? (
              <View style={styles.createBtnContainer}>
                {ShowActivityIndicator('white')}
              </View>
            ) : (
              <TouchableOpacity
                // style={styles.sendBtn}
                onPress={this.submitQuery}
                style={styles.createBtnContainer}>
                <Text allowFontScaling={false} style={styles.sendText}>
                  {APPLICATION_CONSTANTS.createWatchParty}
                </Text>
              </TouchableOpacity>
            )}

            {/* {/ {this.renderUserList()} /} */}
          </KeyboardAwareScrollView>
        </MeWrapper>
      </>
    );
  }
}
mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    lumper: state.ui.isLoading,
    sportList: state.story.getSportsList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    addNewGroup: params => dispatch(TASKS.addNewGroup(params)),
    addNewContestWatchParty: params =>
      dispatch(TASKS.addNewContestWatchParty(params)),
    getContestWatchParty: params =>
      dispatch(TASKS.getContestWatchParty(params)),
    getSportList: params => dispatch(TASKS.getSportList(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewContestWatchParty);
