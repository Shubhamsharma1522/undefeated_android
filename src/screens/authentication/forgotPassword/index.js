import React, { Component } from 'react';
import { View, Text,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles'
import { APPLICATION_CONSTANTS, COLORS, showToast } from '../../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MeButton } from '../../../components/MeButton';
import { MeWrapper } from '../../../components/MeWrapper';
import { MeSettingsHeader } from '../../../components/MeHeader';
import * as TASKS from '../../../store/actions/index'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number:'+1'
    }
  }
  start = ()=>{
    // this.props.navigation.navigate('Home')
    const {phone_number} = this.state
    if(phone_number.length > 2){
      let params = {
        phone_number:phone_number,
        path:'reset'
      }
      this.props.forgotPassword(params)
    }
    else{
      showToast(APPLICATION_CONSTANTS.enterMobileNumber)
    }
  }
  navigateSignUp = () =>{
    this.props.navigation.navigate('PhoneNumberValidation')

  }
  render() {
    const {phone_number} = this.state
    return (
      <>
      <MeWrapper
      settings={true}
    >
      <MeSettingsHeader
        title={'Forgot Password'}
      />
      <KeyboardAwareScrollView contentContainerStyle = {styles.container}
      showsVerticalScrollIndicator = {false}
      >
          <View style={styles.welcomeBanner}>
            <Text allowFontScaling = {false}style={styles.title}>{APPLICATION_CONSTANTS.welcomeTextTitle}</Text>
            <Text allowFontScaling = {false}style={styles.subTitle}>{APPLICATION_CONSTANTS.welcomeTextSubTitle}</Text>
          </View>
          <Text allowFontScaling = {false}style = {styles.signUpText}>{APPLICATION_CONSTANTS.forgotText}</Text>

          <View style={styles.welcomeContainer}>
            <View style = {styles.inputContainer}>
             <TextInput allowFontScaling= {false}

              placeholder = {APPLICATION_CONSTANTS.loginPlaceHolder}
              style = {styles.placeholder}
              keyboardType = {'phone-pad'}
              placeholderTextColor = {COLORS.white}
              value = {phone_number}
              onChangeText = {(text)=>{this.setState({phone_number:text})}}
              />
            </View>
            <MeButton
            title = "Reset"
            onPress = {this.start}
            containerStyles = {styles.loginBtn}
            lumper = {this.props.lumper}
            />
          </View>
      </KeyboardAwareScrollView>
      </MeWrapper>
      </>

    )
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    lumper:state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
forgotPassword :(params) => dispatch(TASKS.forgotPassword(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
