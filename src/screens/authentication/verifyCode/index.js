import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader, MeSettingsHeader} from '../../../components/MeHeader';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WP} from '../../../services';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPInputView from 'rn-otp-textinput'
import * as TASKS from '../../../store/actions/index';

class VerifyCode extends Component {
  constructor(props) {
    super(props);
    console.log('UNIQUE PROPS', this.props.route);
    this.passTextInput = null;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  start = code => {
    const {params} = this.props.route.params;
    if (code) {
      let param = {
        phone_number: params.phone_number,
        code: code,
      };

      if (this.props.route.params.changeNumber == true) {
        let parameters = {
          auth_token: this.props.user.auth_token,
          new_phone: params.new_phone,
          code: code,
        };
        console.log('showing before updating new number', parameters);
        this.props.requestNewUserUpdateNumberVerification(parameters);
      } else if (params.path) {
        this.props.resetPasswordVerify(param);
      } else {
        this.props.verifyOtp(param);
      }
    }
  };
  resend = () => {
    const {params} = this.props.route.params;
    if (params.phone_number) {
      let param = {
        phone_number: params.phone_number,
      };
      this.props.requestOtp(param);
    }
  };
  render() {
    console.log('showing passed props', this.props.route.params);
    return (
      <>
        <View style={{marginTop: 0}}>
          <MeHeader
            title={'Verify OTP'}
            showProfilePic={false}
            hideBackBtn={false}
            showNotficaion={false}
            showAboutUs={false}
            centerLogo={{marginRight: WP('40')}}
            showlogo={true}
          />
        </View>
        <MeWrapper>
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Text allowFontScaling={false} style={styles.OTP}>
              Enter One Time Password code sent to your number
            </Text>
            <View style={styles.boxParentContainer}>
              <OTPInputView
                style={styles.otpContainer}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  this.start(code);
                }}
              />
            </View>
            {this.props.route.params?.params &&
            this.props.route.params?.params?.changeNumber == true ? null : (
              <TouchableOpacity
                style={styles.resendContainer}
                onPress={this.resend}>
                <Text allowFontScaling={false} style={styles.OTP}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </KeyboardAwareScrollView>
        </MeWrapper>
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
    verifyOtp: param => dispatch(TASKS.verifyOtp(param)),
    requestOtp: params => dispatch(TASKS.requestOtp(params)),
    resetPasswordVerify: params => dispatch(TASKS.verifyResetPassword(params)),
    requestNewUserUpdateNumberVerification: params =>
      dispatch(TASKS.verifyOtpUpdated(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);
