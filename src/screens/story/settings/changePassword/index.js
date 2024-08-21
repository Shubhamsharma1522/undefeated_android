import React, { Component } from 'react';
import { View, Text,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles'
import { APPLICATION_CONSTANTS, COLORS } from '../../../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MeButton } from '../../../../components/MeButton';
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  start = ()=>{
    this.props.navigation.navigate('Home')
  }
  navigateSignUp = () =>{
    this.props.navigation.navigate('PhoneNumberValidation')

  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle = {styles.container}>
          <View style={styles.welcomeBanner}>
            <Text allowFontScaling = {false}style={styles.title}>{APPLICATION_CONSTANTS.welcomeTextTitle}</Text>
            <Text allowFontScaling = {false}style={styles.subTitle}>{APPLICATION_CONSTANTS.welcomeTextSubTitle}</Text>
          </View>
          <Text allowFontScaling = {false}style = {styles.signUpText}>{APPLICATION_CONSTANTS.ChangePassword}</Text>

          <View style={styles.welcomeContainer}>
            <View style = {styles.inputContainer}>
             <TextInput allowFontScaling= {false}

              placeholder = {APPLICATION_CONSTANTS.newNamePlaceHolder}
              style = {styles.placeholder}
              placeholderTextColor = {COLORS.white}
              />
            </View>
            <MeButton
            title = "Reset"
            onPress = {this.start}
            containerStyles = {styles.loginBtn}
            />
          </View>
      </KeyboardAwareScrollView>
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

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
