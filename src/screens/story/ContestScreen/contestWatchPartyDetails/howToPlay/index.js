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
} from '../../../../../services';
import {connect} from 'react-redux';
import {MeWrapper} from '../../../../../components/MeWrapper';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import {MeHeader} from '../../../../../components/MeHeader';
const HowToPlay = (props) => {
  // constructor() {
  //   super();
  //   this.state = {};
  // }

  //   onRefresh = () => {
  //     try {
  //     } catch (error) {
  //       console.log('showing catched error', error);
  //     }
  //   };
    console.log('showing propsXYZ', this.props);
    const {user} = props;
    const {type} = props.route.params.params.group;
    return (
      <>
        <MeHeader
          title={/*'Textme.Bet'*/ 'Undefeated.Live'}
          showProfilePic={true}
          hideBackBtn={false}
          profilePicUrl={user ? user?.profile_image : null}
          showlogo={true}
          showNotficaion={false}
          onBackBtn={() => {
            back();
          }}
          // onAboutInfo={() => {
          //   this.props.navigation.navigate('AboutUs');
          // }}
          // onNotificationPress={() => {
          //   this.props.navigation.navigate('PendingBets');
          // }}
        />
        <MeWrapper>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View>
              {Platform.OS === 'ios' && (
                <Text
                  style={[
                    styles.screenDescription,
                    {fontSize: 14, textAlign: 'center', fontStyle: 'italic'},
                  ]}>
                  Apple is not a sponsor and not affiliated with contests
                  offered in the app
                </Text>
              )}
              <Text style={styles.screenHeading}>How To Play:</Text>
              <Text style={styles.screenDescription}>
                1. Select Question Button to Answer a Question in the Contest.{' '}
                {'\n'} {'\n'}
                2. Select Leaderboard to see the current standings. {'\n'}{' '}
                {'\n'}
                3. Select Chat to interact with other participants. {'\n'}
                {'\n'}
              </Text>
              <Text style={styles.screenHeading}>Contest Rules:</Text>
              {type === 3 ? (
                <Text style={styles.screenDescription}>
                  1. 10 Points for Each Right Answer.{'\n'} {'\n'}
                  2. Perfect Prize for Getting All Questions Correct. {
                    '\n'
                  }{' '}
                  {'\n'}
                  3. Prize will split in case of a tie. {'\n'} {'\n'}
                </Text>
              ) : (
                <Text style={styles.screenDescription}>
                  1. 10 Points for Each Right Answer.{'\n'} {'\n'}
                  2. 1 Bonus Point for the Consecutive Right Answers{'\n'}{' '}
                  {'\n'}
                  3. Perfect Prize for Getting All Questions Correct. {
                    '\n'
                  }{' '}
                  {'\n'}
                  4. Prize will split in case of a tie. {'\n'} {'\n'}
                </Text>
              )}
              {type !== 3 && (
                <View>
                  <Text style={styles.screenHeading}>Double Down:</Text>
                  <Text style={styles.screenDescription}>
                    1. Choose DD next to the question to Double Down your score.
                    {'\n'} {'\n'}
                    2. The player receives DD bonus for each correct response,
                    and loses 5 points for incorrect ones.
                  </Text>
                </View>
              )}
              {type === 3 ? (
                <View>
                  <Text style={styles.screenHeading}>Scoring:</Text>
                  <Text style={styles.screenDescription}>
                    1. For each correct answer, 10 points are awarded.
                    {'\n'} {'\n'}
                    2. 0 points will be deducted for the incorrect answers.{' '}
                    {'\n'}
                    {'\n'}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.screenHeading}>Scoring:</Text>
                  <Text style={styles.screenDescription}>
                    1. For each correct answer (without DD), 10 points are
                    awarded.
                    {'\n'} {'\n'}
                    2. 0 points will be deducted for the incorrect answers
                    (without DD). {'\n'}
                    {'\n'}
                    3. For the correct answer (with DD) 20 points are awarded.
                    {'\n'}
                    {'\n'}
                    4. A wrong answer (with DD) will result in a 5 point
                    deduction.
                    {'\n'}
                    {'\n'}
                    5. For each correct answer (with or without DD), we will add
                    one bonus point.{'\n'}
                    {'\n'}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </MeWrapper>
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
      </>
    );

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
    marginTop: WP('5'),
  },
  screenDescription: {
    fontSize: WP('3.7'),
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
export default HowToPlay;
