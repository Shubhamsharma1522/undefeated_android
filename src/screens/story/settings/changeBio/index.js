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

class ChangeBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBio: this?.props?.user?.bio,
    };
  }

  start = () => {
    console.log('this', this.props);
    const {userBio} = this.state;
    // userBio.trim() !== '' &&
    if (userBio.trim().length <= 100) {
      const updateProfile = {
        auth_token: this.props.user.auth_token,
        new_bio: userBio,
      };
      this.props.editProfileDatabase(updateProfile);
      // Optionally clear the input field after successful update
      // this.setState({userBio: ''});
    } else {
      showToast('Please enter a valid bio (max 100 characters)!');
    }
  };

  // start = () => {
  //   const {userBio} = this.state;
  //   if (userBio != '') {
  //     const updateProfile = {
  //       auth_token: this.props.user.auth_token,
  //       new_bio: userBio,
  //     };
  //     this.props.editProfileDatabase(updateProfile);
  //   } else {
  //     showToast('Please enter valid bio !');
  //   }
  // };

  render() {
    const {userBio} = this.state;
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
            <MeSettingsHeader title={/*'Textme.Bet'*/ 'Undefeated.Live'} />
          )}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeBanner}>
              <Text allowFontScaling={false} style={styles.title}>
                {/* {APPLICATION_CONSTANTS.welcomeTextTitle} */}
                Edit Bio
              </Text>
              {/* <Text allowFontScaling={false} style={styles.subTitle}>
                {APPLICATION_CONSTANTS.welcomeTextSubTitle}
              </Text> */}
            </View>

            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  Bio
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={'Enter Bio'}
                  style={styles.placeholder}
                  placeholderTextColor={COLORS.white}
                  value={userBio}
                  onChangeText={text => {
                    this.setState({userBio: text});
                  }}
                  multiline={true}
                  textAlignVertical="top"
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProfileDatabase: params => dispatch(TASKS.updateBio(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeBio);
