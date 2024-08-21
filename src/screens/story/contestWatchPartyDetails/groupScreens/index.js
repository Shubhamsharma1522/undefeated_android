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
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader} from '../../../../components/MeHeader';
import {MeWelcome} from '../../../../components/MeWelcome';
import {
  APPLICATION_IMAGES,
  APPLICATION_CONSTANTS,
  COLORS,
  WP,
  showToast,
  ShowActivityIndicator,
  navigate,
} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getPicture} from '../../../../services';
import * as TASKS from '../../../../store/actions/index';
import Modal from 'react-native-modal';
class ChatAndNews extends Component {
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
    };
  }
  segway = () => {
    navigate('ChatAndNewsScreen');
  };
  renderChat = () => {
    const {
      image,
      title,
      description,
      members_list,
      message,
      enabled,
    } = this.state;
    return (
      <View style={styles.newBetContainer}>
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.chatTitle}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={title}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.firstMessage}
            placeholderTextColor={COLORS.black}
            style={styles.welcomePlaceholder}
            value={message}
            onChangeText={text => this.setState({message: text})}
            multiline={true}
          />
        </View>
      </View>
    );
  };
  renderNews = () => {
    const {
      image,
      title,
      description,
      members_list,
      message,
      enabled,
    } = this.state;
    return (
      <View style={styles.newBetContainer}>
        <View style={styles.titleContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.newsTitle}
            placeholderTextColor={COLORS.black}
            style={styles.titlePlaceholder}
            value={title}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <TextInput
            allowFontScaling={false}
            placeholder={APPLICATION_CONSTANTS.firstMessage}
            placeholderTextColor={COLORS.black}
            style={styles.welcomePlaceholder}
            value={message}
            onChangeText={text => this.setState({message: text})}
            multiline={true}
          />
        </View>
      </View>
    );
  };
  render() {
    const {user, lumper, navigation} = this.props;
    const {params} = navigation.state;
    console.log('Showing props here', this.props);
    return (
      <MeWrapper>
        <MeHeader
          title={/*'Textme.Bet'*/ 'Undefeated.Live'}
          showProfilePic={true}
          profilePicUrl={user?.profile_image ? user.profile_image : null}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.betsContainer}>
            {params.isChat ? this.renderChat() : this.renderNews()}
          </View>
          {lumper ? (
            <View style={styles.createBtnContainer}>
              {ShowActivityIndicator('white')}
            </View>
          ) : (
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() =>
                this.props.navigation.navigate('ChatAndNewsScreen')
              }
              style={styles.createBtnContainer}>
              <Text allowFontScaling={false} style={styles.sendText}>
                {params.isChat
                  ? APPLICATION_CONSTANTS.startChat
                  : APPLICATION_CONSTANTS.newsChat}
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      </MeWrapper>
    );
  }
}
mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    addNewGroup: params => dispatch(TASKS.addNewGroup(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatAndNews);
