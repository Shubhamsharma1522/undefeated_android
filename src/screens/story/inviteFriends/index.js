import React, { Component } from 'react';
import { View, Text, Platform, BackHandler, ScrollView, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { MeWrapper } from '../../../components/MeWrapper'
import { MeHeader } from '../../../components/MeHeader';
import { styles } from './styles'
import { APPLICATION_CONSTANTS, getAllContacts, ShowActivityIndicator, COLORS } from '../../../services';
import Contacts from 'react-native-contacts';
import MeBottomNavbar from '../../../components/BottomNavbar';
import { MeButton } from '../../../components/MeButton';
import * as TASKS from '../../../store/actions/index'
class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      temp: [],
      loading: true
    }
    this.arrayholder = [];

  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  }
  onSendInvite(user) {
    console.log('showing user to be send message', user)
    // alert(user.givenName)
    // alert(user.phoneNumbers[0].number)
    try {
      let invite = {
        phone_number: `${user.phoneNumbers[0].number.split(" ").join("")}`,
        auth_token: this.props.user.auth_token,
        invited_name: Platform.OS === 'ios' ? user.givenName : user.displayName,
        app_download_link: "(using the link below)"
      }
      this.props.inviteUser(invite)
    } catch (error) {
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    //Fetching all contacts of phone
    try {
      getAllContacts((contacts) => {
        this.setState({ contacts: contacts, loading: false, temp: contacts })
        console.log('showing fetched contatcs', contacts)
        this.arrayholder = contacts
      }, (reject) => {
        this.setState({ loading: false })

      })
    } catch (error) {
      this.setState({ loading: false })
    }
  }
  renderContacts = () => {
    const { contacts } = this.state
    return (
      <View style={styles.contactParent}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <View style={styles.rowStyles}
              key={Math.random()}
            >
              <Text allowFontScaling={false} style={styles.rowText}>{Platform.OS === 'ios' ? item.givenName : item.displayName}</Text>
              <MeButton
                title={'invite'}
                containerStyles={styles.btn}
                textStyles={styles.title}
                onPress={() => { this.onSendInvite(item) }}
              />
            </View>

          )}
          keyExtractor={item => item.email}
        />
      </View>
    )
  }
  inviteFriend = (contact) => {
    this.props.navigation.navigate('Home')
  }
  searchFilterFunction = text => {
    try {
      if (text === "" || text === null) {
        this.setState({
          contacts: this.state.temp
        })
      }
      else {
        Contacts.getContactsMatchingString(text, (err, contacts) => {
          this.setState({ contacts });
        });
      }
    } catch (error) {
      alert(error)

    }
  };

  render() {
    const { loading } = this.state;
    const {user}=this.props
    return (
      <>
      <MeHeader
      title={'Invite Friends'}
      onBackBtn={() => { this.props.navigation.navigate('Settings') }}
      showlogo={true}
      profilePicUrl={user ? user.profile_image : null}
    // hideBackBtn = {true}
    />
      <MeWrapper>
      
        {loading ?
          <View style={styles.loaderContainer}>
            {ShowActivityIndicator()}
          </View>
          :
          <>
            <View style={styles.searchContainer}>
              <TextInput allowFontScaling={false}
                placeholder={'Search contact'}
                onChangeText={(text) => { this.searchFilterFunction(text) }}
                style={styles.searchInput}
                placeholderTextColor={COLORS.black}
              />

            </View>
            <Text allowFontScaling={false} style={styles.phoneBook}>{APPLICATION_CONSTANTS.phoneBookText}</Text>

            {this.renderContacts()}
          </>


        }
      </MeWrapper>
      {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
      </>
    )
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};
mapDispatchToProps = dispatch => {
  return {
    inviteUser: (params) => dispatch(TASKS.sendInvites(params)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
