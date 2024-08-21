/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  WP,
  COLORS,
  FONTS,
  back,
  APPLICATION_CONSTANTS,
} from '../../../services';
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader} from '../../../components/MeHeader';
import {MeButton} from '../../../components/MeButton';
import MeBottomNavbar from '../../../components/BottomNavbar';
import {connect} from 'react-redux';

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //   onRefresh = () => {
  //     try {
  //     } catch (error) {
  //       console.log('showing catched error', error);
  //     }
  //   };

  navigatePrivacyPolicy = () => {
    this.props.navigation.navigate('AppPrivacyPolicy');
    // this.props.navigation.navigate('SignUp');
  };

  render() {
    console.log('showing props', this.props);
    const {user} = this.props;
    return (
      <>
        <MeHeader
          title={'Undefeated.Live'}
          showProfilePic={false}
          showlogo={true}
          hideBackBtn={false}
          profilePicUrl={user ? user.profile_image : null}
          showNotficaion={false}
          onBackBtn={() => {
            back();
          }}
          onAboutInfo={() => {
            this.props.navigation.navigate('AboutUs');
          }}
          onNotificationPress={() => {
            this.props.navigation.navigate('PendingBets');
          }}
        />
        <MeWrapper>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.screenHeading}>About Us</Text>
              <Text style={styles.screenDescription}>
                Undefeated.Live is a free to play fan engagement prediction game
                {'\n'}
                {'\n'}
                We are an in-game prediction platform that engages you during
                the games. By having you answer predictions during a game for
                the chance to win free cash,
                {'\n'}
                {'\n'}
                Live game prediction contest for the NFL, NBA, NHL, PGA and,
                many other sports leagues.
                {'\n'}
                {'\n'}
                Download the app. Watch the games, Answer the Questions
                correctly and Win cash & prizes
                {'\n'} {'\n'}
              </Text>
              <Text style={styles.screenHeading}>Why Undefeated.Live:</Text>
              <Text style={styles.screenDescription}>
                Now you have another reason to watch more Sports {'\n'} {'\n'}
                Never watch a game alone again{'\n'} {'\n'}
                People are making money watching sports {'\n'} {'\n'}
                Watch. Answer. Win{'\n'} {'\n'}
                We put on multiple contests per week Answer all questions right
                and win the Perfect Prize{'\n'} {'\n'}
                It’s simple to join an open contest {'\n'} {'\n'}
                Chat or talk trash with others in the same contest.{'\n'} {'\n'}
                Watch the leaderboard to see how you are comparing to others
              </Text>
              <Text style={styles.screenHeading}>
                Undefeated.Live Brand Ambassador
              </Text>
              <Text style={styles.screenDescription}>
                Be an Undefeated.Live Brand Ambassador - Why become Brand
                Ambassador? We offer a per-user fee on every person you get to
                download the app.{'\n'}You get to test new updates before they
                go live. Email us at art@artvigilshow.com to get your referral
                code.
              </Text>
            </View>

            <MeButton
              containerStyles={styles.btnContainer}
              textStyles={styles.textBtn}
              title={'Privacy Policy'}
              onPress={this.navigatePrivacyPolicy}
            />
          </ScrollView>
        </MeWrapper>
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  screenHeading: {
    fontSize: WP('5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    color: COLORS.appColour,
    fontFamily: FONTS.appFont,
    alignSelf: 'center',
    // marginTop: WP('5'),src/screens/story/chatRoomDetails/FriendList/index.js
  },
  btnContainer: {
    backgroundColor: COLORS.appColour,
    borderColor: COLORS.appColour,
    height: WP('12'),
    width: WP('65'),
    borderWidth: 2,
    borderRadius: 100,
    marginTop: WP('5'),
  },
  textBtn: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: WP('4'),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.lightGrey,
  },
  screenDescription: {
    fontSize: WP('3.5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    color: COLORS.black,
    fontFamily: FONTS.appFont,
    alignSelf: 'center',
    marginTop: WP('2'),
  },
  listView: {
    fontSize: WP('3.5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    color: COLORS.black,
    fontFamily: FONTS.appFont,

    marginTop: WP('2'),
  },
});
mapStateToProps = state => {
  // console.log('state', state);
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(AboutUs);
