import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  BackHandler,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {MeWrapper} from '../../../../../components/MeWrapper';
import {MeHeader} from '../../../../../components/MeHeader';
import {styles} from './styles';
import {
  APPLICATION_CONSTANTS,
  back,
  COLORS,
  getAllContacts,
  navigate,
  ShowActivityIndicator,
} from '../../../../../services';
import Contacts from 'react-native-contacts';

import {MeButton} from '../../../../../components/MeButton';
import * as TASKS from '../../../../../store/actions/index';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import {MeInputField} from '../../../../../components/MeInputField';
class FriendLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      temp: [],
      loading: true,
    };
    this.arrayholder = [];
    // console.log("INSIDEHAHAHA")
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  async onSendInvite(user) {
    console.log(
      'showing user to be send message',
      user,
      this.props.route.params.params?.groupData.title,
    );
    // alert(user.givenName)
    // alert(user.phoneNumbers[0].number)
    try {
      let invite = {
        phone_number: `${user.phoneNumbers[0].number.split(' ').join('')}`,
        auth_token: this.props.user.auth_token,
        invited_name: Platform.OS === 'ios' ? user.givenName : user.displayName,
        party_name: this.props.route.params.params?.groupData.title,
        app_download_link: '(using the link below)',
        type: 'chat',
      };
      await this.props.inviteUser(invite);
      await navigate('ChatRooms');
    } catch (error) {}
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    //Fetching all contacts of phone
    try {
      getAllContacts(
        contacts => {
          this.setState({contacts: contacts, loading: false, temp: contacts});
          console.log('showing fetched contatcs', contacts);
          this.arrayholder = contacts;
        },
        reject => {
          this.setState({loading: false});
        },
      );
    } catch (error) {
      this.setState({loading: false});
    }
  }
  renderContacts = () => {
    const {contacts} = this.state;
    return (
      <View style={styles.contactParent}>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <View style={styles.rowStyles} key={Math.random()}>
              <Text allowFontScaling={false} style={styles.rowText}>
                {Platform.OS === 'ios' ? item.givenName : item.displayName}
              </Text>
              <MeButton
                title={'invite'}
                containerStyles={styles.btn}
                textStyles={styles.title}
                onPress={() => {
                  this.onSendInvite(item);
                }}
              />
            </View>
          )}
          keyExtractor={item => item.email}
        />
      </View>
    );
  };
  inviteFriend = contact => {
    this.props.navigation.navigate('Home');
  };
  searchFilterFunction = text => {
    try {
      if (text === '' || text === null) {
        this.setState({
          contacts: this.state.temp,
        });
      } else {
        Contacts.getContactsMatchingString(text, (err, contacts) => {
          this.setState({contacts});
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {loading} = this.state;
    const {user} = this.props;
    return (
      <>
        <MeHeader
          title={'Invite Friends'}
          onBackBtn={() => {
            back();
          }}
          showlogo={true}
          profilePicUrl={user ? user.profile_image : null}
          showProfilePic={true}
          // hideBackBtn = {true}
        />
        <MeWrapper>
          {loading ? (
            <View style={styles.loaderContainer}>
              {ShowActivityIndicator()}
            </View>
          ) : (
            <>
              <View style={styles.searchbarContainer}>
                <MeInputField
                  style={styles.searchBar}
                  //  value={reportingMessage}
                  placeholder={'Search contact'}
                  onChangeText={text => {
                    this.searchFilterFunction(text);
                  }}
                  placeholderTextColor={COLORS.black}
                />
              </View>
              <Text allowFontScaling={false} style={styles.phoneBook}>
                {APPLICATION_CONSTANTS.phoneBookText}
              </Text>
              {/* <MeButton
      title = {'Next'}
      containerStyles = {styles.nextBtn}
      onPress = {this.inviteFriend}
      /> */}
              {this.renderContacts()}
            </>
          )}
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
  };
};
mapDispatchToProps = dispatch => {
  return {
    inviteUser: params => dispatch(TASKS.sendInvites(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendLists);
