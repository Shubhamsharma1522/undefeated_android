import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  BackHandler,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  Button,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import {MeWrapper} from '../../../../../components/MeWrapper';
import {MeHeader} from '../../../../../components/MeHeader';
import {styles} from './styles';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  back,
  COLORS,
  getAllContacts,
  navigate,
  ShowActivityIndicator,
  WP,
} from '../../../../../services';
import Contacts from 'react-native-contacts';

import {MeButton} from '../../../../../components/MeButton';
import * as TASKS from '../../../../../store/actions/index';
import {SectionList} from 'react-native';
import MeBottomNavbar from '../../../../../components/BottomNavbar';
class InviteUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      temp: [],
      loading: true,
      userList: [],
      selectedQuestion: {},
      selectedUserName: [],
      members_list: [],
      usersToShow: [],
      noUsers: false,
      activeQuestion: [],
      previousQuestion: [],
      showHideSection: {
        selectContestQuestion: true,
        previousContestQuestion: false,
      },
    };
    this.arrayholder = [];
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  onSendInvite(user) {
    try {
      let invite = {
        phone_number: `${user.phoneNumbers[0].number.split(' ').join('')}`,
        auth_token: this.props.user.auth_token,
        invited_name: Platform.OS === 'ios' ? user.givenName : user.displayName,
        app_download_link: '(using the link below)',
      };
      this.props.inviteUser(invite);
    } catch (error) {}
  }
  async componentDidMount() {
    console.log('in user question answer this.props', this.props);

    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    try {
      const {groupData} = this.props.route.params;
      let params = {
        auth_token: this.props.user.auth_token,
        contest_watch_party_id: groupData.id,
      };

      await this.props.getUserContestQuestion(params);
      this.setState({
        loading: false,
        activeQuestion: this.props.activeQuestion,
        previousQuestion: this.props.previousQuestion,
      });
    } catch (error) {
      this.setState({loading: false});
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { contextAllQuestion } = this.props;

  //   if (contextAllQuestion != nextProps.contextAllQuestion) {
  //     // var newData = nextProps.contextAllQuestion.map(obj =>
  //     //   obj.id ? { ...obj, answer: false } : obj
  //     // )
  //     this.setState({
  //       loading: false,
  //       contextAllQuestion: nextProps.contextAllQuestion
  //     });
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    const {activeQuestion, previousQuestion} = this.props;
    // console.log('Active and previous', activeQuestion, previousQuestion);
    if (
      activeQuestion != nextProps.activeQuestion ||
      previousQuestion != nextProps.previousQuestion
    ) {
      this.setState({
        loading: false,
        activeQuestion: nextProps.activeQuestion,
        previousQuestion: nextProps.previousQuestion,
        noUsers: true,
      });
    }
  }
  toggleSwitch = (e, question) => {
    var newData = this.state.activeQuestion.map(obj =>
      obj.question_id === question.question_id ? {...obj, answer: e} : obj,
    );
    this.setState({activeQuestion: newData});
    console.log('activeQuestion', newData);
  };

  callDone = async () => {
    const {groupData} = this.props.route.params;

    // const {id} = this.props.route.params.groupData;
    const {activeQuestion} = this.state;
    const {auth_token} = this.props.user;
    // if (id && selectedQuestion !== '') {
    // var newData = contextAllQuestion.map(obj =>
    //   obj.answer === true ? { ...obj, answer: 1 } : { ...obj, answer: 0 }
    // )
    console.log('user submit activeQuestion', activeQuestion);
    let params = {
      auth_token: auth_token,
      submitted_answers: JSON.stringify(activeQuestion),
    };
    // console.log('SHOWING PARAMS', params, activeQuestion);
    const resp = await this.props.addUserAnswer(params);
    console.log('callDone resp', resp);
    console.log('callDone props', this.props);

    if (resp) {
      back();
      // this.props.navigation.navigate('ChatAndNewsScreen', {
      //   groupData,
      //   standings: 'private',
      // });
    }
  };
  onDoubleDown = (e, question) => {
    e.preventDefault();
    Alert.alert(
      'Double Down',
      "Double Down gives you an ultimate chance to win double points for the right answers! Tap on 'Apply' now!      ",
      [
        {
          text: 'Go DD',
          style: 'default',
          onPress: () => {
            const newData = this.state.activeQuestion.map(obj =>
              obj.question_id == question.question_id
                ? {...obj, is_double_down: 1}
                : obj,
            );
            this.setState({activeQuestion: [...newData]});
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            const newData = this.state.activeQuestion.map(obj =>
              obj.question_id == question.question_id
                ? {...obj, is_double_down: 0}
                : obj,
            );
            this.setState({activeQuestion: [...newData]});
          },
          style: 'destructive',
        },
      ],
    );
  };

  getAnswerColor = (user, option) => {
    let color;

    let optionCorrect = option === user.adminAnswer;

    let userAnswered = user.answer === option;

    if (!userAnswered) color = '#C0C0C0';
    else color = '';

    if (user.adminAnswer >= 0 && user.adminAnswer !== null) {
      if (optionCorrect) color = 'green';
      else if (userAnswered) color = 'red';
    }

    return color;
  };
  twistSection = title => {
    const {selectContestQuestion, previousContestQuestion} =
      this.state.showHideSection;
    if (title === 'Active Questions') {
      this.setState({
        showHideSection: {
          ...this.state.showHideSection,
          selectContestQuestion: !selectContestQuestion,
        },
      });
    } else if (title === 'Previous Questions') {
      this.setState({
        showHideSection: {
          ...this.state.showHideSection,
          previousContestQuestion: !previousContestQuestion,
        },
      });
    }
  };
  twistSectionRenderIcon = title => {
    const {selectContestQuestion, previousContestQuestion} =
      this.state.showHideSection;
    if (title === 'Active Questions') {
      const imge = selectContestQuestion
        ? APPLICATION_IMAGES.upArrow
        : APPLICATION_IMAGES.downArrow;
      return <Image source={imge} style={styles.twistArrowImage} />;
    } else if (title === 'Previous Questions') {
      const imge = previousContestQuestion
        ? APPLICATION_IMAGES.upArrow
        : APPLICATION_IMAGES.downArrow;
      return <Image source={imge} style={styles.twistArrowImage} />;
    }
  };
  renderPreviousQuestion = (user, index, groupData) => {
    const {previousContestQuestion} = this.state.showHideSection;
    if (previousContestQuestion) {
      return (
        <View style={styles.parentContainerUSers} key={index}>
          <View style={styles.colContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.userImage}>
                <Text style={styles.userImageContainerInside}>
                  {/* {user.question_count} */ index + 1}
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.rowName}>
                {user.question}
              </Text>
              <Text allowFontScaling={false} style={styles.container}>
                {user.adminAnswer >= 0 && user.adminAnswer !== null ? (
                  user.adminAnswer === user.answer ? (
                    <Image
                      source={APPLICATION_IMAGES.true}
                      style={styles.sendCancelImg}
                    />
                  ) : (
                    <Image
                      source={APPLICATION_IMAGES.cancel}
                      style={styles.sendCancelImg}
                    />
                  )
                ) : (
                  <Image
                    source={APPLICATION_IMAGES.empty}
                    style={styles.sendCancelImg}
                  />
                )}
              </Text>
              {user.is_double_down === 1 ? (
                <TouchableOpacity style={styles.ddButtonPreviousQuestions}>
                  <Image
                    source={APPLICATION_IMAGES.DD_Selected}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 10}}>
                  <Button
                    title={user.option_one ? user.option_one : 'YES'}
                    // onPress={() => {this.toggleAnswer(true,user)}}
                    color={this.getAnswerColor(user, 1)}
                  />
                </View>
                <View style={{flex: 1, margin: 10}}>
                  <Button
                    title={user.option_two ? user.option_two : 'NO'}
                    // onPress={() => {this.toggleAnswer(false,user)}}
                    color={this.getAnswerColor(user, 0)}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                {user && user?.option_three ? (
                  <View style={{flex: 1, margin: 10}}>
                    <Button
                      title={user.option_three ? user.option_three : 'YES'}
                      // onPress={() => {this.toggleAnswer(true,user)}}
                      color={this.getAnswerColor(user, 3)}

                      // color={user.answer === 3 ? '' : '#C0C0C0'}
                    />
                  </View>
                ) : null}
                {user && user?.option_four ? (
                  <View style={{flex: 1, margin: 10}}>
                    <Button
                      title={user.option_four ? user.option_four : 'YES'}
                      // onPress={() => {this.toggleAnswer(true,user)}}
                      color={this.getAnswerColor(user, 4)}

                      // color={user.answer === 4 ? '' : '#C0C0C0'}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      );
    } else return null;
  };
  renderActiveQuestions = (user, index, groupData) => {
    const {selectContestQuestion} = this.state.showHideSection;

    const {activeQuestion} = this.state;
    console.log('ACTIVE', activeQuestion.length, index);
    if (selectContestQuestion) {
      return (
        <View style={styles.parentContainerUSers} key={index}>
          <View style={styles.colContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.userImage}>
                <Text style={styles.userImageContainerInside}>{index + 1}</Text>
              </View>
              <Text allowFontScaling={false} style={styles.rowName}>
                {user.question}
              </Text>
              {groupData.type !== 3 && user.is_double_down === 1 ? (
                <TouchableOpacity
                  onPress={e => this.onDoubleDown(e, user)}
                  style={styles.addedBtn}>
                  <Image
                    source={APPLICATION_IMAGES.DD_Selected}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : (
                groupData.type !== 3 && (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={e => this.onDoubleDown(e, user)}>
                    <Image
                      source={APPLICATION_IMAGES.DD_Unselected}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 10}}>
                  <TouchableOpacity
                    style={user.answer === 1 ? styles.btnon : styles.btnoff}
                    title="Yes"
                    onPress={() => {
                      this.toggleSwitch(1, user);
                    }}
                    // color={user.answer === 1 ? '' : '#9097a3'}
                  >
                    <Text
                      style={
                        user.answer === 1 ? styles.btntexton : styles.btntextoff
                      }>
                      {user.option_one ? user.option_one : 'YES'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, margin: 10}}>
                  <TouchableOpacity
                    style={user.answer === 0 ? styles.btnon : styles.btnoff}
                    title="Yes"
                    onPress={() => {
                      this.toggleSwitch(0, user);
                    }}
                    //color={user.answer === 1 ? '' : '#9097a3'}
                  >
                    <Text
                      style={
                        user.answer === 0 ? styles.btntexton : styles.btntextoff
                      }>
                      {user.option_two ? user.option_two : 'NO'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                {user && user?.option_three ? (
                  <View style={{flex: 1, margin: 10}}>
                    <TouchableOpacity
                      style={user.answer === 3 ? styles.btnon : styles.btnoff}
                      title="Yes"
                      onPress={() => {
                        this.toggleSwitch(3, user);
                      }}
                      //color={user.answer === 1 ? '' : '#9097a3'}
                    >
                      <Text
                        style={
                          user.answer === 3
                            ? styles.btntexton
                            : styles.btntextoff
                        }>
                        {user.option_three ? user.option_three : 'NO'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {user && user?.option_four ? (
                  <View style={{flex: 1, margin: 10}}>
                    <TouchableOpacity
                      style={user.answer === 4 ? styles.btnon : styles.btnoff}
                      title="Yes"
                      onPress={() => {
                        this.toggleSwitch(4, user);
                      }}
                      //color={user.answer === 1 ? '' : '#9097a3'}
                    >
                      <Text
                        style={
                          user.answer === 4
                            ? styles.btntexton
                            : styles.btntextoff
                        }>
                        {user.option_four ? user.option_four : 'NO'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {activeQuestion.length > 0 && activeQuestion.length - 1 === index && (
            <TouchableOpacity
              onPress={this.callDone}
              style={{
                width: '100%',
                padding: 10,
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: COLORS.appColour,
                marginTop: 30,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  fontSize: WP('5'),
                  color: COLORS.white,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else return null;
  };
  renderNoContent = ({section}) => {
    if (section.title === 'Active Questions') {
      if (section.data.length === 0) {
        return (
          <Text style={{textAlign: 'center', color: COLORS.appColour}}>
            No Active Questions
          </Text>
        );
      }
      return null;
    } else if (section.title === 'Previous Questions') {
      if (section.data.length === 0) {
        return (
          <Text style={{textAlign: 'center', color: COLORS.appColour}}>
            No Previous Questions
          </Text>
        );
      }
      return null;
    }
  };
  renderUserList = () => {
    const {activeQuestion, previousQuestion} = this.state;
    const {groupData} = this.props.route.params;
    return (
      <ScrollView style={styles.lisitngs}>
        <SectionList
          renderSectionFooter={this.renderNoContent}
          sections={[
            {
              title: 'Active Questions',
              data: activeQuestion.map(user => {
                var str = user.question;
                str = str.replace(/team_one/gi, groupData.team_one);
                str = str.replace(/team_two/gi, groupData.team_two);

                user.question = str;
                return user;
              }),
            },
            {
              title: 'Previous Questions',
              data: previousQuestion.map(user => {
                var str = user.question;
                str = str.replace(/team_one/gi, groupData.team_one);
                str = str.replace(/team_two/gi, groupData.team_two);

                user.question = str;
                return user;
              }),
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={data => {
            console.log('data', data);
            let {item, index, section} = data;
            if (section.title === 'Active Questions') {
              return this.renderActiveQuestions(item, index, groupData);
            } else if (section.title === 'Previous Questions') {
              return this.renderPreviousQuestion(item, index, groupData);
            }
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.twistHeadingRow}>
              <Text style={[styles.subHeading, styles.twistHeading]}>
                {title}
              </Text>
              <TouchableOpacity
                style={styles.twistHeading}
                onPress={() => this.twistSection(title)}>
                {this.twistSectionRenderIcon(title)}
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    );
  };
  render() {
    console.log('in user question answer');
    const {user} = this.props;

    const {loading} = this.state;
    return (
      <View style={{flex: 1}}>
        <MeHeader
          title={'Questions'}
          onBackBtn={() => {
            back();
          }}
          showProfilePic={true}
          profilePicUrl={user ? user.profile_image : null}
          showlogo={true}
        />
        <MeWrapper>
          {loading ? (
            <View style={styles.loaderContainer}>
              {ShowActivityIndicator()}
            </View>
          ) : (
            <>{this.renderUserList()}</>
          )}
        </MeWrapper>
        <MeBottomNavbar />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    activeQuestion: state.story.contextAllQuestion,
    previousQuestion: state.story.previousQuestion,
  };
};
mapDispatchToProps = dispatch => {
  return {
    getUserContestQuestion: params =>
      dispatch(TASKS.getUserContestQuestion(params)),
    addUserAnswer: params => dispatch(TASKS.addUserAnswer(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersList);
