import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, navigate} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MeButton} from '../../../../components/MeButton';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader, MeSettingsHeader} from '../../../../components/MeHeader';
import * as TASKS from '../../../../store/actions/index';
// import RNRestart from 'react-native-restart'; // Import package from node modules
import * as TYPES from '../../../../store/actions/types';
import MeBottomNavbar from '../../../../components/BottomNavbar';

class ChangeName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this?.user?.firstname,
      lastname: this?.user?.lastname,
    };
  }
  componentDidMount() {
    this.setState({
      firstname: this?.props?.user?.firstname,
      lastname: this?.props?.user?.lastname,
    });
  }
  start = () => {
    const {firstname, lastname} = this.state;
    if (firstname != '' && lastname != '') {
      let UpdateProfile = {
        auth_token: this.props.user.auth_token,
        // new_username: firstname,
        new_firstname: firstname,
        new_lastname: lastname,
      };
      console.log({UpdateProfile});
      this.props.updateName(firstname, lastname);
      this.props.editProfileDatabase(UpdateProfile);
      // navigate('Settings');
      // setTimeout(() => {
      //   RNRestart.Restart();
      // }, 1000);
    }
  };
  navigateSignUp = () => {
    this.props.navigation.navigate('PhoneNumberValidation');
  };
  render() {
    const {firstname, lastname} = this.state;
    const {user} = this.props;
    return (
      <>
        {user && user.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
          <View style={{backgroundColor: 'white'}}>
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
          </View>
        )}
        <MeWrapper settings={true}>
          {/* {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN && (
            <MeSettingsHeader title={'.Live'} />
          )} */}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeBanner}>
              <Text allowFontScaling={false} style={styles.title}>
                {/* {APPLICATION_CONSTANTS.welcomeTextTitle} */}
                Edit Name
              </Text>
            </View>
            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  First Name
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={APPLICATION_CONSTANTS.newNamePlaceHolder}
                  style={styles.placeholder}
                  placeholderTextColor={COLORS.white}
                  value={firstname}
                  onChangeText={text => {
                    this.setState({firstname: text});
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  Last Name
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={APPLICATION_CONSTANTS.newNamePlaceHolder}
                  style={styles.placeholder}
                  placeholderTextColor={COLORS.white}
                  value={lastname}
                  onChangeText={text => {
                    this.setState({lastname: text});
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
    updateName: (firstname, lastname) =>
      dispatch({
        type: TYPES.CHANGE_USER_NAME,
        firstname: firstname,
        lastname: lastname,
      }),
    editProfileDatabase: params => dispatch(TASKS.updateUserName(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);
