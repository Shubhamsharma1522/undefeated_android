import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, showToast} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../../components/MeButton';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader, MeSettingsHeader} from '../../../../components/MeHeader';
import * as TASKS from '../../../../store/actions/index';
import MeBottomNavbar from '../../../../components/BottomNavbar';
class ChangeNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: this.props?.user?.phone_number,
    };
  }
  start = () => {
    const {phone_number} = this.state;
    if (phone_number != '') {
      let UpdateProfile = {
        auth_token: this.props.user.auth_token,
        new_phone: phone_number,
      };
      this.props.editProfileDatabase(UpdateProfile);
    } else {
      showToast('Please enter valid number !');
    }
  };
  navigateSignUp = () => {
    this.props.navigation.navigate('PhoneNumberValidation');
  };
  render() {
    const {phone_number} = this.state;
    const {user} = this.props;
    return (
      <>
        {user && user.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
          // <View style={{backgroundColor: 'white'}}>
          <MeHeader
            title={/*'Textme.Bet'*/ 'Undefeated.Live'}
            showProfilePic={true}
            hideBackBtn={false}
            profilePicUrl={user ? user.profile_image : null}
            showNotficaion={false}
            showAboutUs={false}
            showlogo={true}
            style={{backgroundColor: 'white'}}
          />
          // {/* </View> */}
        )}
        <MeWrapper settings={true}>
          {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN && (
            <MeSettingsHeader title={'Undefeated.Live'} />
          )}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeBanner}>
              <Text allowFontScaling={false} style={styles.title}>
                {/* {APPLICATION_CONSTANTS.welcomeTextTitle} */}
                Edit Phone Number
              </Text>
              {/* <Text allowFontScaling={false} style={styles.subTitle}>
                {APPLICATION_CONSTANTS.welcomeTextSubTitle}
              </Text> */}
            </View>

            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  {APPLICATION_CONSTANTS.newPhone}
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={APPLICATION_CONSTANTS.loginPlaceHolder}
                  style={styles.placeholder}
                  placeholderTextColor={COLORS.white}
                  keyboardType={'phone-pad'}
                  value={phone_number}
                  onChangeText={text => {
                    this.setState({phone_number: text});
                  }}
                />
              </View>
              <MeButton
                title="Save"
                onPress={this.start}
                containerStyles={styles.loginBtn}
              />
            </View>
          </KeyboardAwareScrollView>
        </MeWrapper>
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
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
    editProfileDatabase: params =>
      dispatch(TASKS.updateUserPhoneNumber(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeNumber);
