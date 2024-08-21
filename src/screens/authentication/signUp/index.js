import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader} from '../../../components/MeHeader';
import {styles} from './styles';
import {
  APPLICATION_IMAGES,
  WP,
  COLORS,
  showToast,
  APPLICATION_CONSTANTS,
} from '../../../services';
import {MeInputField} from '../../../components/MeInputField';
import {MeButton} from '../../../components/MeButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getCurrentDate, getPicture} from '../../../services';
import {emailValidator, validateUsername} from '../../../services/helpers';
import * as TASKS from '../../../store/actions/index';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
let playerId = '';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDate: '',
      image: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      Username: '',
      referralCode: '',
      uploadingPath: '',
    };
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
    // OneSignal.addEventListener('ids', this.onIds);
  }
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }
  // onIds(device) {
  //   console.log('Device info in signup : ', device);
  //   try {
  //     playerId = device.userId;
  //   } catch (error) {}
  // }

  submit = () => {
    const {
      maxDate,
      image,
      firstname,
      lastname,
      email,
      password,
      confirm_password,
      Username,
      uploadingPath,
      referralCode,
    } = this.state;
    if (
      firstname &&
      lastname &&
      email &&
      password &&
      confirm_password &&
      Username &&
      playerId
    ) {
      const isUsernameValid = validateUsername(Username);
      if (!emailValidator(email)) {
        showToast(APPLICATION_CONSTANTS.enterValidEmail);
        return;
      } else if (password !== confirm_password) {
        showToast(APPLICATION_CONSTANTS.passwordNotMatch);
        return;
      } else if (typeof isUsernameValid === 'string') {
        showToast(isUsernameValid);
      } else {
        let params = {
          auth_token: this.props.token,
          profile_image: uploadingPath,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          confirm_password: confirm_password,
          username: Username,
          player_id: playerId,
          referralCode: referralCode,
        };
        console.log('paramsparams', params);
        this.props.SignUp(params);
      }
    } else {
      showToast(APPLICATION_CONSTANTS.fillAllFields);
    }

    // this.props.navigation.navigate('FriendList')
  };
  componentDidMount() {
    OneSignal.addSubscriptionObserver(() => {
      OneSignal.getDeviceState().then(deviceState => {
        console.log('new Fuction in mount observer', deviceState);
        playerId = deviceState?.userId;
        this.setState({playerId: deviceState?.userId});
      });
    });
    this.setState({maxDate: getCurrentDate()});
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  changeImage = () => {
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
  render() {
    const {
      image,
      firstname,
      lastname,
      email,
      password,
      confirm_password,
      Username,
      referralCode,
    } = this.state;
    return (
      <>
        <MeHeader title={'Sign Up'} hideBackBtn={true} />
        <MeWrapper>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={this.changeImage}>
              <Image
                source={
                  image != null
                    ? {uri: image}
                    : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                }
                style={styles.profileContainer}
              />
            </TouchableOpacity>
            <MeInputField
              placeholder={'First Name'}
              value={firstname}
              onChangeText={text => this.setState({firstname: text})}
            />
            <MeInputField
              placeholder={'Last Name'}
              value={lastname}
              onChangeText={text => this.setState({lastname: text})}
            />
            <MeInputField
              placeholder={'Username'}
              value={Username}
              onChangeText={text => this.setState({Username: text})}
            />
            <MeInputField
              placeholder={'Email'}
              keyboardType={'email-address'}
              value={email}
              onChangeText={text => this.setState({email: text})}
            />
            <MeInputField
              placeholder={'Password'}
              secureTextEntry={true}
              value={password}
              onChangeText={text => this.setState({password: text})}
            />
            <MeInputField
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              value={confirm_password}
              onChangeText={text => this.setState({confirm_password: text})}
            />

            <MeInputField
              placeholder={'Referral Code'}
              value={referralCode}
              onChangeText={text => this.setState({referralCode: text})}
            />

            <MeButton
              title={'Next'}
              containerStyles={styles.btn}
              onPress={this.submit}
              lumper={this.props.lumper}
            />
          </KeyboardAwareScrollView>
        </MeWrapper>
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    token: state.auth.token,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    SignUp: params => dispatch(TASKS.signUpUsers(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
