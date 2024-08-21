import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, showToast} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../../components/MeButton';
import * as TASKS from '../../../../store/actions/index';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
    };
  }
  start = () => {
    try {
      const {password, confirm_password} = this.state;
      const {params} = this.props.route.params;
      if (password && confirm_password) {
        if (password === confirm_password) {
          let param = {
            phone_number: params.phone_number,
            code: params.code,
            password: password,
            confirm_password: confirm_password,
          };
          this.props.resetPassword(param);
        } else {
          showToast(APPLICATION_CONSTANTS.passwordNotMatch);
        }
      } else {
        showToast(APPLICATION_CONSTANTS.allFields);
      }
    } catch (error) {
      alert(error);
    }
    // this.props.navigation.navigate('Home')
  };
  navigateSignUp = () => {
    this.props.navigation.navigate('PhoneNumberValidation');
  };
  render() {
    const {password, confirm_password} = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.welcomeBanner}>
          <Text allowFontScaling={false} style={styles.title}>
            {APPLICATION_CONSTANTS.welcomeTextTitle}
          </Text>
          <Text allowFontScaling={false} style={styles.subTitle}>
            {APPLICATION_CONSTANTS.welcomeTextSubTitle}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.signUpText}>
          {APPLICATION_CONSTANTS.resetPassword}
        </Text>

        <View style={styles.welcomeContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              allowFontScaling={false}
              placeholder={APPLICATION_CONSTANTS.newPasswordPlaceholder}
              style={styles.placeholder}
              placeholderTextColor={COLORS.white}
              secureTextEntry={true}
              value={password}
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              allowFontScaling={false}
              placeholder={APPLICATION_CONSTANTS.confirmNewPassword}
              style={styles.placeholder}
              placeholderTextColor={COLORS.white}
              secureTextEntry={true}
              value={confirm_password}
              onChangeText={text => this.setState({confirm_password: text})}
            />
          </View>
          <MeButton
            title="Reset"
            onPress={this.start}
            containerStyles={styles.loginBtn}
            lumper={this.props.lumper}
          />
        </View>
      </KeyboardAwareScrollView>
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
    resetPassword: params => dispatch(TASKS.resetPassword(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
