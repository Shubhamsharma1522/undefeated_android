import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, showToast} from '../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../components/MeButton';
import * as TASKS from '../../../store/actions/index';
import {MeHeader} from '../../../components/MeHeader';
import {
  Checkbox,
  MD2Colors,
  MD3Colors,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper';
class PhoneNumberValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '+1',
      privacy_policy: false,
    };
  }
  start = () => {
    const {phone_number, privacy_policy} = this.state;
    if (phone_number.length > 2) {
      if (!privacy_policy) {
        console.log('START PHONE VERIFY', phone_number, privacy_policy);
        showToast(APPLICATION_CONSTANTS.acceptPrivacyPolicy);
        return;
      }
      let params = {
        phone_number: phone_number,
      };
      this.props.requestOtp(params);
    } else {
      showToast(APPLICATION_CONSTANTS.enterMobileNumber);
      return;
    }
    // this.props.navigation.navigate('VerifyCode')
  };

  navigatePrivacyPolicy = () => {
    this.props.navigation.navigate('PrivacyPolicy', {
      showAcceptDecline: true,
    });
    // this.props.navigation.navigate('SignUp');
  };

  navigateLogin = () => {
    this.props.navigation.navigate('Login');
    // this.props.navigation.navigate('SignUp');
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const isAccepted = this.props.route.params?.params
  //     ?.isAcceptedPrivacyPolicy
  //     ? true
  //     : false;
  //   if (isAccepted !== prevState.privacy_policy) {
  //     this.setState({
  //       privacy_policy: isAccepted,
  //     });
  //   }
  // }

  render() {
    const {phone_number, privacy_policy} = this.state;
    return (
      <>
        <MeHeader title={'Verify Phone Number'} hideBackBtn={true} />
        <View style={styles.container}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.welcomeBanner}>
                <Text allowFontScaling={false} style={styles.title}>
                  {APPLICATION_CONSTANTS.welcomeTextTitle}
                </Text>
                <Text allowFontScaling={false} style={styles.subTitle}>
                  {APPLICATION_CONSTANTS.welcomeTextSubTitle}
                </Text>
              </View>
              <View style={styles.welcomeContainer}>
                <Text allowFontScaling={false} style={styles.welcomeText}>
                  {APPLICATION_CONSTANTS.welcome}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    allowFontScaling={false}
                    placeholder={APPLICATION_CONSTANTS.phoneNumberPlaceHolder}
                    style={styles.placeholder}
                    keyboardType={'phone-pad'}
                    value={phone_number}
                    onChangeText={number => {
                      this.setState({phone_number: number});
                    }}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  {/* <CheckBox.Item
                  label="I have read and accept the"
                    // value={privacy_policy}
                    // style={styles.checkbox}
                    // onValueChange={value => {
                    //   this.setState({privacy_policy: value});
                    // }}
                  /> */}
                  {/* <Checkbox.Item
                    label=""
                    status={privacy_policy ? 'checked' : 'unchecked'}
                    color="#6200ee"
                    theme='roundness'
                   onPress={value => {
                    console.log("oncheck",value)
                      this.setState({privacy_policy: value});
                    }}
                  /> */}
                  <TouchableRipple
                    onPress={() =>  this.setState({privacy_policy: !privacy_policy})}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <Checkbox
                          status={privacy_policy ? 'checked' : 'unchecked'}
                        />
                      </View>
                    </View>
                  </TouchableRipple>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={this.navigatePrivacyPolicy}>
                    <Text>I have read and accept the</Text>
                    <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
                <MeButton
                  title="Get Started"
                  onPress={this.start}
                  lumper={false}
                />
                <TouchableOpacity
                  style={styles.loginLabel}
                  onPress={this.navigateLogin}>
                  <Text>Already have an account?</Text>

                  <Text style={styles.privacyPolicyText}> Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.webContainer}>
                <Text style={styles.sprtWebsite}>Support Website</Text>
                <Text
                  style={styles.sprtWebsite}
                  onPress={() => Linking.openURL('https://undefeated.live/')}>
                  https://undefeated.live/
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
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
    requestOtp: params => dispatch(TASKS.requestOtp(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneNumberValidation);
