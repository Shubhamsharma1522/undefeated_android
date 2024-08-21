import React, {Component} from 'react';
import * as Util from '../../../services';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, showToast} from '../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../components/MeButton';
import * as TASKS from '../../../store/actions/index';
import {WebView} from 'react-native-webview';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
let playerId = '';
let deviceToken = '';
class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '+1',
      password: '',
      playerId: '',
    };

    // OneSignal.addEventListener('ids', this.onIds);
  }

  navigatePrivacyPolicy = () => {
    this.props.navigation.navigate('PhoneNumberValidation', {
      isAcceptedPrivacyPolicy: true,
    });
  };
  navigateLogin = () => {
    this.props.navigation.navigate('PhoneNumberValidation', {
      isAcceptedPrivacyPolicy: false,
    });
  };

  render() {
    const {phone_number, password} = this.state;
    const params = this.props.route.params.params;
    return (
      <>
        <WebView
          startInLoadingState={true}
          source={{uri: `https://undefeated.live/privacy-policy`}}
          renderLoading={() => {
            return Util.ShowActivityIndicator();
          }}
        />
        {params?.showAcceptDecline ? (
          <View style={styles.buttonContainer}>
            <MeButton onPress={this.navigatePrivacyPolicy} title="Accept" />
            <MeButton
              containerStyles={styles.declineButton}
              onPress={this.navigateLogin}
              title="Decline"
            />
          </View>
        ) : null}
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    loginUser: params => dispatch(TASKS.loginUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
