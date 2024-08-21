import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {
  APPLICATION_CONSTANTS,
  COLORS,
  emailValidator,
  showToast,
} from '../../../../services';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader, MeSettingsHeader} from '../../../../components/MeHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../../components/MeButton';
import * as TASKS from '../../../../store/actions/index';
import MeBottomNavbar from '../../../../components/BottomNavbar';
import * as TYPES from '../../../../store/actions/types';
class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this?.props?.user?.email,
    };
  }
  // ValidateEmail(mail) {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //     return true;
  //   }
  //   showToast('You have entered an invalid email address!');
  //   return false;
  // }
  start = () => {
    const {email} = this.state;
    if (email != '') {
      if (emailValidator(email)) {
        let UpdateProfile = {
          auth_token: this.props.user.auth_token,
          email: email,
        };
        this.props.editProfileDatabase(UpdateProfile);
        this.props.updataEmail(email);
      } else {
        showToast('You have entered an invalid email address!');
        return false;
      }
    } else {
      showToast('Please enter email address');
    }
  };
  render() {
    const {email} = this.state;
    const {user} = this.props;
    return (
      <>
        {user && user.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
          <View style={{backgroundColor: 'white'}}>
            <MeHeader
              title={'Undefeated.Live'}
              showProfilePic={true}
              hideBackBtn={false}
              profilePicUrl={user ? user.profile_image : null}
              showNotficaion={false}
              showAboutUs={false}
              showlogo={true}
              style={{backgroundColor: 'white'}}
            />
          </View>
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
                Edit Email Address
              </Text>
              {/* <Text allowFontScaling={false} style={styles.subTitle}>
                {APPLICATION_CONSTANTS.welcomeTextSubTitle}
              </Text> */}
            </View>

            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  Please enter new email address
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder="Enter email address"
                  style={styles.placeholder}
                  keyboardType={'email-address'}
                  placeholderTextColor={COLORS.white}
                  value={email}
                  onChangeText={text => {
                    this.setState({email: text});
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
    editProfileDatabase: params => dispatch(TASKS.editProfile(params)),
    updataEmail: email =>
      dispatch({
        type: TYPES.CHANGE_EMAIL,
        email,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
