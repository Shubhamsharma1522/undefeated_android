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

class ChangeFavoriteTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFavoriteTeams: this?.props?.user?.userFavoriteTeams,
    };
  }
  componentDidMount() {
    console.log({
      userFavoriteTeams: this?.props?.user?.favorite_teams,
    });
    this.setState({
      userFavoriteTeams: this?.props?.user?.favorite_teams,
    });
  }
  start = () => {
    const {userFavoriteTeams} = this.state;
    // userFavoriteTeams.trim() !== '' &&
    if (userFavoriteTeams.trim().length <= 100) {
      let UpdateProfile = {
        auth_token: this.props.user.auth_token,
        new_favorite_teams: userFavoriteTeams,
      };
      this.props.editProfileDatabase(UpdateProfile);
    } else {
      showToast('Please enter a valid teams (max 100 characters)!');
    }
  };

  render() {
    const {userFavoriteTeams} = this.state;
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
          {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN && (
            <MeSettingsHeader title={/*'Textme.Bet'*/ 'Undefeated.Live'} />
          )}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeBanner}>
              <Text allowFontScaling={false} style={styles.title}>
                {/* {APPLICATION_CONSTANTS.welcomeTextTitle} */}
                Edit Favorite Teams
              </Text>
              {/* <Text allowFontScaling={false} style={styles.subTitle}>
                {APPLICATION_CONSTANTS.welcomeTextSubTitle}
              </Text> */}
            </View>

            <View style={styles.welcomeContainer}>
              <View style={styles.inputContainer}>
                <Text allowFontScaling={false} style={styles.signUpText}>
                  Teams
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={'Enter your favorite teams'}
                  style={styles.placeholder}
                  placeholderTextColor={COLORS.white}
                  value={userFavoriteTeams}
                  textAlignVertical="top"
                  multiline={true}
                  onChangeText={text => {
                    this.setState({userFavoriteTeams: text});
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProfileDatabase: params => dispatch(TASKS.updateFavoriteTeams(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeFavoriteTeams);
