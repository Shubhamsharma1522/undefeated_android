import React, {Component} from 'react';
import {View, Text, TextInput, Linking} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, showToast} from '../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../components/MeButton';
import * as TASKS from '../../../store/actions/index';
import {AuthContext} from '../../../contexts/authContext';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
let playerId = '';
let deviceToken = '';
class Login extends Component {
  static useAuthContext = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '+1',
      password: '',
      playerId: '',
    };

    // OneSignal.addEventListener('ids', this.onIds);
    // OneSignal.idsAvailable(idsAvailable => {
    //   console.log(idsAvailable.playerId);
    //   console.log(idsAvailable.pushToken);
    // });
    // const playerId = OneSignal.getUserId();
    // messaging()
    //   .getToken()
    //   .then(token => {
    //     console.log('gcm token', token);
    //     deviceToken = token;
    //   });
    // this.getuserId();
    // OneSignal.configure();
    OneSignal.getDeviceState().then(deviceState => {
      console.log('new Fuction in contructor', deviceState);
      playerId = deviceState?.userId;
      this.setState({playerId: deviceState?.userId});
    });
    OneSignal.addSubscriptionObserver(() => {
      OneSignal.getDeviceState().then(deviceState => {
        console.log('new Fuction in observer', deviceState);
        playerId = deviceState?.userId;
        this.setState({playerId: deviceState?.userId});
      });
    });
  }
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }
  // onIds(device) {
  //   try {
  //     playerId = device.userId;
  //   } catch (error) {}
  // }

  async componentDidMount() {
    console.log('<<><><><USER<><><><>', this?.useAuthContext?.useAuth());
    OneSignal.addSubscriptionObserver(() => {
      OneSignal.getDeviceState().then(deviceState => {
        console.log('new Fuction in mount observer', deviceState);
        playerId = deviceState?.userId;
        this.setState({playerId: deviceState?.userId});
      });
    });
  }

  // async getuserId() {
  //   const state = await OneSignal.getDeviceState();
  //   playerId = state.userId;
  //   this.setState({playerId: playerId});
  // }

  start = ({setIsUserAuthenticated}) => {
    const {phone_number, password, playerId: newPlayerId} = this.state;

    if (phone_number && password && newPlayerId) {
      let params = {
        phone_number: phone_number,
        password: password,
        player_id: newPlayerId,
        deviceToken: deviceToken,
      };
      this.props.loginUser(params, data => {
        console.log('LOGIN USER', data);
        setIsUserAuthenticated(true);
        return this.props.navigation.navigate('Home');
      });
    } else {
      showToast(APPLICATION_CONSTANTS.enterMobileNumberAndPassword);
    }
  };
  navigateSignUp = () => {
    this.props.navigation.navigate('PhoneNumberValidation');
    //this.props.navigation.navigate('SignUp');
  };
  forgetPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };
  render() {
    // const state = OneSignal.getDeviceState();
    // playerId = state.userId;
    // console.log('Inside render', playerId);
    // this.setState({playerId: playerId});
    const {phone_number, password} = this.state;
    return (
      <AuthContext.Consumer>
        {({setIsUserAuthenticated}) => (
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.welcomeBanner}>
              <Text allowFontScaling={false} style={styles.title}>
                {APPLICATION_CONSTANTS.welcomeTextTitle}
              </Text>
              <Text allowFontScaling={false} style={styles.subTitle}>
                {APPLICATION_CONSTANTS.welcomeTextSubTitle}
              </Text>
            </View>
            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  allowFontScaling={false}
                  placeholder={APPLICATION_CONSTANTS.loginPlaceHolder}
                  style={styles.placeholder}
                  keyboardType={'phone-pad'}
                  placeholderTextColor={COLORS.white}
                  autoFocus={true}
                  value={phone_number}
                  onChangeText={text => {
                    this.setState({phone_number: text});
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  allowFontScaling={false}
                  placeholder={APPLICATION_CONSTANTS.passwordPlaceHolder}
                  style={styles.placeholder}
                  secureTextEntry={true}
                  placeholderTextColor={COLORS.white}
                  value={password}
                  onChangeText={text => {
                    this.setState({password: text});
                  }}
                />
              </View>
              <MeButton
                title="Forgot Password?"
                containerStyles={styles.forgetPassword}
                textStyles={styles.btnText}
                onPress={this.forgetPassword}
              />
              <MeButton
                title="Login"
                onPress={() => this.start({setIsUserAuthenticated})}
                containerStyles={styles.loginBtn}
                lumper={this.props.lumper}
              />
              <MeButton
                title={APPLICATION_CONSTANTS.dontHaveAccount}
                containerStyles={styles.dontHaveAccount}
                textStyles={styles.btnText}
                onPress={this.navigateSignUp}
              />
            </View>
            <View style={styles.webContainer}>
              <Text style={styles.sprtWebsite}>Support Website</Text>
              <Text
                style={styles.sprtWebsite}
                onPress={() => Linking.openURL('https://undefeated.live/')}>
                https://undefeated.live/
              </Text>
            </View>
          </KeyboardAwareScrollView>
        )}
      </AuthContext.Consumer>
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
    loginUser: (params, callback) =>
      dispatch(TASKS.loginUser(params, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
