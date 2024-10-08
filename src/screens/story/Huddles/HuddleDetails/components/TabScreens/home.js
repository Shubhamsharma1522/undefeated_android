import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {COLORS, FONTS, HP, showToast} from '../../../../../../services';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  back,
  WP,
  APPLICATION_IMAGE_CONSTANTS,
} from '../../../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {enableDisableQuesnAutomateContest} from '../../../../../../store/actions/story';
import {Platform} from 'react-native';
// const initialLayout = {width: Dimensions.get('window').width};

const Home = props => {
  const [contestQues, setContestQueston] = useState(null);
  const [enable, setEnable] = useState(false);
  const [isQuestionAutoEnable, setIsQuestionAutoEnable] = useState(false);
  const [showText, setShowText] = useState(true);
  const [isContestActive, setContestActiveStatus] = useState(false);
  const [isError, setError] = useState(false);
  // const [contestDetails, setContestDetails] = useState(null);
  const {params} = props.props.route.params;
  const dispatch = useDispatch();
  // const {selectedContest} = useSelector(state => state.story);

  // setTimeout(() => {
  //   setShowText(showText => !showText);
  //   console.log('Inside SetTime Out');
  // }, 2000);
  // console.log("enable",enable)
  useEffect(() => {
    console.log('Home Mount', props);
    const {groupData} = props.props.route.params.params;
    // const contestDetail = props.props.myContest;

    console.log('groupDatagroupData', groupData);
    setContestActiveStatus(groupData?.is_active === 1 ? true : false);
    setIsQuestionAutoEnable(
      groupData?.auto_question_status === 1 ? true : false,
    );
    setEnable(groupData?.status === 1 ? true : false);
    // getContestDetails(contestDetail);
  }, []);

  // useMemo(() => {
  //   // const {groupData} = props.props.route.params.params;
  //   if (selectedContest) {
  //     console.log('groupDatagroupData', selectedContest);
  //     setContestActiveStatus(selectedContest?.is_active === 1 ? true : false);
  //     setIsQuestionAutoEnable(
  //       selectedContest?.auto_question_status === 1 ? true : false,
  //     );
  //     setEnable(selectedContest?.status === 1 ? true : false);
  //   }
  // }, [selectedContest]);

  // clearTimeout(interval);
  // console.log('props in CP Details', props.props.navigation);

  useEffect(() => {
    if (
      contestQues === null &&
      props.contextAllQuestion &&
      props.contextAllQuestion.length > 0
    ) {
      setContestQueston(props.contextAllQuestion);
    }
  }, [props.contextAllQuestion, contestQues]);

  // useEffect(() => {
  //   if (props.contextAllQuestion && props.contextAllQuestion.length > 0) {
  //     if (
  //       props.contextAllQuestion &&
  //       props.contextAllQuestion.some(e => e.status === 1)
  //     ) {
  //       /* vendors contains the element we're looking for */
  //       setEnable(true);
  //     }
  //   }
  // }, [props.contextAllQuestion]);

  const checkContestFinishStatus = useCallback(() => {
    const {groupData} = props?.props?.route.params;
    if (groupData?.is_active === 2) {
      return true;
    }
    return false;
  }, [props.props.route.params.params]);
  // console.log(
  //   'params&&',
  //   params && params?.groupData && params?.groupData.is_active,
  // );
  const contestActiveBtn = async e => {
    // this.setState({enable: e});
    setContestActiveStatus(e);
    if (enable) {
      await toggleSwitch(false);
    }
    if (isQuestionAutoEnable) {
      await toggleQASwitch(false);
    }

    const {groupData} = props.props.route.params.params;
    let contestObj = {
      auth_token: props.props.user.auth_token,
      enable: e,
      slug: groupData.slug,
      contest_watch_party_id: groupData.id,
    };

    await props.props.contestNotification(contestObj);
    // console.log('api callleddd', status);
    // if (status) {
    // setContestActiveStatus(false);
    // setIsQuestionAutoEnable(false);
    // setEnable(false)
    // }
  };

  const toggleSwitch = async e => {
    console.log(
      'enable value props',
      props,
      e,
      typeof e,
      isQuestionAutoEnable,
      typeof isQuestionAutoEnable,
    );

    const contextQuestions = props.contextAllQuestion || [];
    let index = -1;
    for (index = 0; index < contextQuestions.length; index++) {
      const element = contextQuestions[index];

      if (element.is_added) {
        break;
      }
    }
    if (
      (e === true && index == contextQuestions.length) ||
      contextQuestions.length == 0
    ) {
      showToast('Please add some Questions first');
      return;
    }
    setEnable(e);
    // if (e == 'true' && isQuestionAutoEnable) {
    //   await toggleQASwitch(false);
    // }

    let obj = {
      auth_token: props.props.user.auth_token,
      enable: e,
      slug: params?.groupData.slug,
      contest_watch_party_id: params?.groupData.id,
      sports_name: params?.groupData.sport_name,
    };
    console.log(obj);
    await props.props.enableDisableQuesnContest(obj);
    await props.props.getContestAllQuestion(obj);
  };

  const toggleQASwitch = async e => {
    console.log('enable value props', props, e, params);
    setIsQuestionAutoEnable(e);
    let obj = {
      auth_token: props.props.user.auth_token,
      enable: e,
      slug: params?.groupData.slug,
      contest_watch_party_id: params?.groupData.id,
      sports_name: params?.groupData.sport_name,
    };
    // console.log(
    //   'enable disable quesn auto',
    //   e,
    //   typeof e,
    //   enable,
    //   typeof enable,
    // );
    // if (e == 'true' && enable) {
    //   await toggleSwitch(false);
    // }
    const apiStatus = await dispatch(enableDisableQuesnAutomateContest(obj));
    console.log('API STATUS', apiStatus);
    if (apiStatus) {
      await props.props.getContestAllQuestion(obj);

      setError(false);
    } else {
      toggleQASwitch(false);
      setError(true);
    }
  };
  console.log('props.group', props.group);
  console.log('props.props', props.props);
  console.log('params?.groupData', params?.groupData);
  return (
    <ScrollView contentContainerStyle={styles.scene}>
      <Text style={styles.title}>
        {params?.groupData.type !== 3
          ? params?.groupData &&
            params?.groupData.team_one &&
            params?.groupData.team_two
            ? params?.groupData.team_one + ' V/S ' + params?.groupData.team_two
            : null
          : params?.groupData.title}
      </Text>
      {props &&
      props.props &&
      props.props.user &&
      props.props.user.role === APPLICATION_CONSTANTS.USER_ADMIN &&
      params?.groupData &&
      params?.groupData.is_private === 1 ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.privateText}>Private</Text>
          <Text style={styles.subTitle}>
            {params?.groupData && params?.groupData.contest_code
              ? ` | Contest Code: ${params?.groupData.contest_code} `
              : null}
          </Text>
        </View>
      ) : null}

      {props?.props.user && props?.props.user?.role === 2 ? (
        <View
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Chat Close
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={COLORS.appColour}
              ios_backgroundColor="#fff"
              value={isContestActive}
              onValueChange={e => contestActiveBtn(e)}
            />
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Open
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={{
          // marginTop: 5,
          // padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          style={styles.viewIconTab}
          onPress={() =>
            props.props.navigation.navigate('ChatAndNewsScreen', {
              groupData: params?.groupData,
              standings: 'private',
            })
          }>
          {props.isUnread ? (
            <Image
              source={APPLICATION_IMAGES.bellIcon}
              style={styles.imageBellIcon}
            />
          ) : null}
          <Image source={APPLICATION_IMAGES.chatIcon} style={styles.image} />
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: COLORS.appColour,
              fontWeight: 'bold',
              position: 'relative',
            }}>
            {`Chat`}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.viewIconTab}
          onPress={() =>
            props.props.navigation.navigate('ContestLeaderboard', {
              group: props.group.groupData,
            })
          }>
          <Image source={APPLICATION_IMAGES.leaderboard} style={styles.image} />

          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: COLORS.appColour,
              fontWeight: 'bold',
            }}>
            Leaderboard
          </Text>
        </TouchableOpacity> */}

        {/* {props &&
        props.props &&
        props.props.user &&
        // isContestActive === true &&
        props.props.user.role === APPLICATION_CONSTANTS.USER_ADMIN ? (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isContestActive ? COLORS.appColour : COLORS.lightGrey}
              ios_backgroundColor="#fff"
              value={enable}
              disabled={!isContestActive}
              onValueChange={e => toggleSwitch(e)}
            />
             <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: COLORS.appColour,
                fontWeight: 'bold',
              }}>
              Q Disable - Enable
            </Text>
          </TouchableOpacity>
        ) : null} */}

        {/* {props &&
        props.props &&
        props.props.user &&
        // isContestActive === true &&
        props.props.user.role === APPLICATION_CONSTANTS.USER_ADMIN ? (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isContestActive ? COLORS.appColour : COLORS.lightGrey}
              ios_backgroundColor="#fff"
              value={isQuestionAutoEnable}
              disabled={!isContestActive}
              onValueChange={e => toggleQASwitch(e)}
            />
              <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: COLORS.appColour,
                fontWeight: 'bold',
                marginLeft: 15,
              }}>
              AQ Disable - Enable
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
      {/* {isError &&
        props?.props?.user?.role === APPLICATION_CONSTANTS.USER_ADMIN && (
          <View style={{marginTop: HP(2)}}>
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontWeight: '600',
                fontSize: 16,
              }}>
              No NFL Data. Please try again!
            </Text>
          </View>
        )} */}
      {/* {checkContestFinishStatus() &&
      props?.props?.user?.role !== APPLICATION_CONSTANTS.USER_ADMIN ? (
        <View style={styles.centerAlignContestFinished}>
          <Image
            source={APPLICATION_IMAGES.contestFinished}
            style={styles.contestFinishedImg}
          />
          <Text style={styles.contestFinishedText}>Contest Finished!</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: HP(2),
            }}
            onPress={() =>
              props.props.navigation.navigate('HowToPlay', {
                group: props.group.groupData,
              })
            }>
            <Text allowFontScaling={false} style={styles.howToPlayTitle}>
              How To Play?
            </Text>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.awardTitle}>
            Awards
          </Text>
          <View style={styles.awardSection}>
            <View style={styles.awardNumber}>
              <Text style={styles.awardNumber}>Perfect Prize</Text>
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.awardName}>
                {props && props.awards && props.awards.length > 0
                  ? props.awards[0].perfect_prize
                  : '300 USD'}
              </Text>
            </View>
          </View>
          <View style={styles.awardSection}>
            <View style={styles.awardNumber}>
              <Text style={styles.awardNumber}>1st Prize</Text>
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.awardName}>
                {props && props.awards && props.awards.length > 0
                  ? props.awards[0].first_prize
                  : '50 USD'}
              </Text>
            </View>
          </View>
          <View style={styles.awardSection}>
            <View style={styles.awardNumber}>
              <Text style={styles.awardNumber}>2nd Prize</Text>
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.awardName}>
                {props && props.awards && props.awards.length > 0
                  ? props.awards[0].second_prize
                  : '20 USD'}
              </Text>
            </View>
          </View>

          {props &&
          props.awards &&
          props.awards.length > 0 &&
          props.awards[0].third_prize ? (
            <View style={styles.awardSection}>
              <View style={styles.awardNumber}>
                <Text style={styles.awardNumber}>3rd Prize</Text>
              </View>
              <View>
                <Text allowFontScaling={false} style={styles.awardName}>
                  {props.awards[0].third_prize}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scene: {
    flexGrow: 1,
  },
  welcomeMessage: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: WP('5'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginTop: WP('5'),
  },
  title: {
    textAlign: 'center',
    color: COLORS.appColour,
    fontSize: WP('4'),
    // fontWeight: Platform.OS === 'ios' ? '700' : '600',
    fontWeight: '700',
    fontFamily: FONTS.appFont,
    marginLeft: 15,
    // maxWidth: WP('10'),
  },
  subTitle: {
    textAlign: 'center',
    color: COLORS.grey,
    fontSize: WP('3.8'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginTop: WP('1'),
  },
  privateText: {
    color: 'red',
    textAlign: 'center',
    fontSize: WP('3.8'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginTop: WP('1'),
  },
  image: {
    height: WP('15'),
    width: WP('15'),
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: WP('2'),
  },
  imageBellIcon: {
    height: WP('5'),
    width: WP('5'),
    // backgroundColor: 'red',
    // borderRadius: 50,
    // borderRadius: 100,
    // overflow: 'hidden',
    marginBottom: WP('2'),
    position: 'absolute',
    zIndex: 1,
    top: 18,
    right: 18,
  },
  centerAlignContestFinished: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contestFinishedImg: {
    height: WP('30'),
    width: WP('30'),
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: WP('4'),
    marginTop: WP('4'),
  },
  contestOn: {
    height: WP('11'),
    fontSize: WP('8'),
    color: 'red',
    // width: WP('15'),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 100,
    marginBottom: WP('3'),
    marginTop: WP('3'),
    fontWeight: 'bold',
  },
  staticMsg: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: WP('4'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginTop: WP('5'),
    marginBottom: WP('3'),
  },
  staticWatchParty: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: WP('4'),
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginTop: WP('5'),
    marginBottom: WP('1'),
  },
  staticWatchPartyContent: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: WP('3'),
    // fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontFamily: FONTS.appFont,
    marginRight: WP('5'),
    marginLeft: WP('5'),
    // marginTop: WP('1')
  },
  viewIconTab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: WP('5'),
  },
  awardSection: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: WP('5'),
    marginRight: WP('5'),

    marginBottom: WP('2'),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.appColour,
    elevation: 2,
    shadowOpacity: Platform.OS === 'ios' ? 1 : null,
    padding: 10,
    borderRadius: 7,
    flexWrap: 'wrap',
  },
  howToPlayTitle: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    marginLeft: WP('4'),
    // marginBottom: WP('5'),
    fontFamily: FONTS.appFont,
    marginBottom: WP('2'),
    marginTop: WP('2'),
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  contestFinishedText: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('8'),
    marginLeft: WP('4'),
    fontFamily: FONTS.appFont,
    marginBottom: WP('2'),
    marginTop: WP('2'),
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  awardTitle: {
    color: COLORS.black,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    marginLeft: WP('4'),
    // marginBottom: WP('5'),
    fontFamily: FONTS.appFont,
    marginBottom: WP('2'),
    marginTop: WP('2'),
  },
  awardNumber: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    marginLeft: WP('2'),
    fontFamily: FONTS.appFont,
    width: Platform.OS === 'ios' ? WP('20') : WP('25'),
    color: COLORS.white,
    flexGrow: WP('1'),
    flexShrink: WP('1'),
    flexBasis: WP(20),
    // flex: '1 1 20%',
  },
  awardName: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('5'),
    marginLeft: WP('2'),
    fontFamily: FONTS.appFont,
    color: COLORS.white,
    flexGrow: WP('1'),
    flexShrink: WP('1'),
    flexBasis: WP(80),
    paddingLeft: WP('5'),
    // flex: '1 1 80%',
    // width: Platform.OS === 'ios' ? WP('11') : WP('13')
  },

  ping: {
    width: WP('4'),
    height: WP('4'),
    backgroundColor: 'red',
    position: 'absolute',
    // top: 0,
    right: WP('6'),
    borderRadius: WP('5'),
  },
});

export default memo(Home);
