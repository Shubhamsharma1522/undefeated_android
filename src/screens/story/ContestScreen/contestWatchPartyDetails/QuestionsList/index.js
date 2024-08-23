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
  Button,
  Image,
  Switch,
  SectionList,
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
  showToast,
  replaceQuestion,
} from '../../../../../services';

import * as TASKS from '../../../../../store/actions/index';
import * as Util from '../../../../../services';
class InviteUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      temp: [],
      loading: true,
      disbtn: false,
      userList: [],
      selectedQuestion: {},
      selectedUserName: [],
      members_list: [],
      usersToShow: [],
      noUsers: false,

      contextAllQuestion: [],
      previousQuestion: [],
      // userContestQuestion:[],
      enable: false,
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
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('in question list');

    try {
      const {groupData, enable} = this.props.route.params.params;
      // console.log('constest data',groupData,"enable",enable)
      let params = {
        sports_name: groupData.sport_name,
        auth_token: this.props.user.auth_token,
        contest_watch_party_id: groupData.id,
      };

      await this.props.getContestAllQuestion(params);
      this.setState({
        loading: false,
        contextAllQuestion: this.props.contextAllQuestion,
        previousQuestion: this.props.previousQuestion,
        noUsers: true,

        // enable:
      });
      if (this.props.contextAllQuestion.some(e => e.status === 1)) {
        /* vendors contains the element we're looking for */
        this.setState({
          loading: false,
          enable: true,
        });
      }
    } catch (error) {
      this.setState({loading: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {contextAllQuestion, previousQuestion} = this.props;
    if (
      contextAllQuestion != nextProps.contextAllQuestion ||
      previousQuestion != nextProps.previousQuestion
    ) {
      this.setState({
        loading: false,
        contextAllQuestion: nextProps.contextAllQuestion,
        previousQuestion: nextProps.previousQuestion,
      });
    }
  }
  toggleSwitch = e => {
    this.setState({
      enable: e,
    });
    const {groupData} = this.props.route.params.params;

    let params = {
      auth_token: this.props.user.auth_token,
      contest_watch_party_id: groupData.id,
      enable: e ? 1 : 0,
    };
    // if (e === true) {
    this.props.enableDisableQuestion(params);
    // }
  };

  addUserToGroup = async question => {
    const {contextAllQuestion} = this.state;

    console.log('question', question, contextAllQuestion);
    const {id} = this.props.route.params.params.groupData;
    const {auth_token} = this.props.user;

    if (contextAllQuestion.some(e => e.isAdded === 2)) {
      /* vendors contains the element we're looking for */
      console.log('ALREADY HAVE ONE QUSTION', contextAllQuestion);
      showToast('You can select only one question.');
    } else {
      // var newData = contextAllQuestion.map(el => {
      //   if (el.question_id == question.question_id) return Object.assign({}, el, { isAdded: 1 });
      //   return el;
      // });
      let newData = contextAllQuestion.map(obj =>
        obj.question_id === question.question_id ? {...obj, isAdded: 1} : obj,
      );
      console.log('newData', newData);
      this.setState({contextAllQuestion: newData});

      if (id && question !== '') {
        let params = {
          auth_token: auth_token,
          contest_watch_party_id: id,
          question_id: question.question_id,
        };

        this.setState({
          disbtn: true,
        });

        // console.log('showing groups creating ', params);
        await this.props.addContestQuestion(params);
        const {groupData} = this.props.route.params.params;
        params = {
          sports_name: groupData.sport_name,
          auth_token: this.props.user.auth_token,
          contest_watch_party_id: groupData.id,
        };

        await this.props.getContestAllQuestion(params);
        this.setState({
          disbtn: false,
        });

        showToast('Added');
        // await this.props.fetchUserWatchParty(params);
        // navigate('WatchParty');
        // back();
      } else {
        showToast('Select atleast 1 question');
      }
    }
  };
  deleteUserToGroup = async question => {
    const {contextAllQuestion} = this.state;

    const {id} = this.props.route.params.params.groupData;
    const {auth_token} = this.props.user;

    var newData = contextAllQuestion.map(el => {
      if (el.question_id == question.question_id)
        return Object.assign({}, el, {isAdded: 0});
      return el;
    });

    this.setState({contextAllQuestion: newData});

    if (id && question !== '') {
      let params = {
        auth_token: auth_token,
        contest_watch_party_id: id,
        question_id: question.question_id,
        id: question.id,
      };
      console.log('showing groups creating ', params);
      await this.props.deleteContestQuestion(params);
      showToast('Removed');
      // await this.props.fetchUserWatchParty(params);
      // navigate('WatchParty');
      // back();
    } else {
      showToast('Select atleast 1 question');
    }
  };
  callDone = async () => {
    const {id, title, description} =
      this.props.route.params.params.groupData;
    //    console.log("params in call done", params)
    const {selectedQuestion} = this.state;
    console.log('this.props.navigation', this.props.navigation);
    const {auth_token} = this.props.user;

    if (id && selectedQuestion !== '') {
      let params = {
        auth_token: auth_token,
        contest_watch_party_id: id,
        question_id: selectedQuestion.question_id,
      };
      console.log('showing groups creating ', params);
      await this.props.addContestQuestion(params);
      await this.props.fetchUserWatchParty(params);
      navigate('WatchParty');
      // back();
    } else {
      showToast('Select atleast 1 member');
    }
  };

  //ONLY FOR ADMIN
  toggleAnswer = async (e, question) => {
    // console.log('in toggle Answer', e, question);
    const {id} = this.props.route.params.params.groupData;

    const {auth_token} = this.props.user;
    const {previousQuestion} = this.state;

    let prevAnswer = previousQuestion.filter(ques => {
      return ques === question;
    });

    // console.log('prev answer', prevAnswer[0].answer, e);
    let newData;

    if (prevAnswer[0].answer === 1 && e === 1) {
      // console.log('if block');
      newData = previousQuestion.map(obj =>
        obj.question_id === question.question_id &&
        obj.iterator === question.iterator
          ? {...obj, answer: null}
          : obj,
      );
    } else if (prevAnswer[0].answer === 0 && e === 0) {
      // console.log('else if block');
      newData = previousQuestion.map(obj =>
        obj.question_id === question.question_id &&
        obj.iterator === question.iterator
          ? {...obj, answer: null}
          : obj,
      );
    } else if (prevAnswer[0].answer === 3 && e === 3) {
      // console.log('else if block');
      newData = previousQuestion.map(obj =>
        obj.question_id === question.question_id &&
        obj.iterator === question.iterator
          ? {...obj, answer: null}
          : obj,
      );
    } else if (prevAnswer[0].answer === 4 && e === 4) {
      // console.log('else if block');
      newData = previousQuestion.map(obj =>
        obj.question_id === question.question_id &&
        obj.iterator === question.iterator
          ? {...obj, answer: null}
          : obj,
      );
    } else {
      // console.log('else block');
      newData = previousQuestion.map(obj =>
        obj.question_id === question.question_id &&
        obj.iterator === question.iterator
          ? {
              ...obj,
              answer: e >= 0 ? e : null,
            }
          : obj,
      );
    }

    // console.log('newData', newData);

    // console.log('NEXT DATA NEW', newData);
    this.setState({
      previousQuestion: newData,
    });

    let dataToSend = newData.filter(obj => obj.id === question.id);

    let params = {
      auth_token: auth_token,
      submitted_answers: JSON.stringify(dataToSend),
    };
    // console.log('before adding answer ', params);
    await this.props.addUserAnswer(params);
    // showToast("Added");
    // await this.props.fetchUserWatchParty(params);
    // navigate('WatchParty');
    // back();
  };
  twistSection = title => {
    const {selectContestQuestion, previousContestQuestion} =
      this.state.showHideSection;
    if (title === 'Select Contest Questions') {
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
    if (title === 'Select Contest Questions') {
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
  renderPreviousQuestion = (user, index, enable) => {
    const {previousContestQuestion} = this.state.showHideSection;
    if (previousContestQuestion) {
      return (
        <View style={styles.colContainer} key={index}>
          <View style={styles.rowContainer}>
            <View style={styles.userImage}>
              <Text style={styles.userImageContainerInside}>
                {/* {user.question_count} */ index + 1}
              </Text>
            </View>
            <Text allowFontScaling={false} style={styles.rowName}>
              {user.question}
            </Text>
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
              <View style={{flex: 1, margin: 10}}>
                <Button
                  title={user.option_one ? user.option_one : 'YES'}
                  onPress={() => {
                    this.toggleAnswer(1, user);
                  }}
                  color={user.answer === 1 ? '' : '#C0C0C0'}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  margin: 10,
                }}>
                <Button
                  title={user.option_two ? user.option_two : 'NO'}
                  onPress={() => {
                    this.toggleAnswer(0, user);
                  }}
                  color={user.answer === 0 ? '' : '#C0C0C0'}
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
              {user && user.option_three ? (
                <View
                  style={{
                    flex: 1,
                    margin: 10,
                  }}>
                  <Button
                    title={user.option_three ? user.option_three : 'NO'}
                    onPress={() => {
                      this.toggleAnswer(3, user);
                    }}
                    color={user.answer === 3 ? '' : '#C0C0C0'}
                  />
                </View>
              ) : null}
              {user && user.option_four ? (
                <View
                  style={{
                    flex: 1,
                    margin: 10,
                  }}>
                  <Button
                    title={user.option_four ? user.option_four : 'NO'}
                    onPress={() => {
                      this.toggleAnswer(4, user);
                    }}
                    color={user.answer === 4 ? '' : '#C0C0C0'}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      );
    } else return null;
  };
  renderSelectContestQuestion = (user, index, enable) => {
    const {selectContestQuestion} = this.state.showHideSection;
    const {auth_token} = this.props.user;
    if (selectContestQuestion) {
      return (
        <View style={styles.colContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.userImage}>
              <Text style={styles.userImageContainerInside}>{index + 1}</Text>
            </View>
            <Text allowFontScaling={false} style={styles.rowName}>
              {user.question}
            </Text>

            {user.isAdded === 1 ? (
              !enable ? (
                <TouchableOpacity
                  onPress={() => {
                    this.deleteUserToGroup(user);
                  }}
                  style={styles.removeBtn}>
                  <Image
                    source={APPLICATION_IMAGES.cancel}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    // this.deleteUserToGroup(user);
                    console.log('useruser', user);
                    if (user.id) {
                      const {groupData, enable} =
                        this.props.route.params.params;
                      // console.log('constest data',groupData,"enable",enable)
                      let params = {
                        sports_name: groupData.sport_name,
                        auth_token: auth_token,
                        contest_watch_party_id: groupData.id,
                      };
                      await this.props.turnOffSpecificQuestion({
                        contest_question_answer_id: user.id,
                        auth_token: auth_token,
                        question_enable_status: false,
                      });
                      await this.props.getContestAllQuestion(params);
                    } else {
                      Util.showToast("Couldn't find the question id");
                    }
                  }}
                  style={styles.offBtn}>
                  <Text style={styles.disableText}>OFF</Text>
                </TouchableOpacity>
              )
            ) : !enable ? (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  this.addUserToGroup(user);
                }}
                disabled={this.state.disbtn}>
                <Image
                  source={APPLICATION_IMAGES.addGroup}
                  style={styles.image}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  // this.deleteUserToGroup(user);
                  console.log('useruser123', user);
                  const {groupData, enable} =
                    this.props.route.params.params;

                  let params = {
                    auth_token: auth_token,
                    contest_watch_party_id: groupData.id,
                    question_id: user.question_id,
                    sports_name: groupData.sport_name,
                    enableQuestionInstantly: true,
                  };

                  console.log('showing groups creating ', params);
                  await this.props.addContestQuestion(params);
                  await this.props.getContestAllQuestion(params);
                }}
                style={styles.onBtn}>
                <Text style={styles.enableText}>ON</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 10,
            }}
          />
        </View>
      );
    } else return null;
  };
  renderNoContent = ({section}) => {
    if (section.title === 'Select Contest Questions') {
      if (section.data.length === 0) {
        return (
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}>
            No Questions Found
          </Text>
        );
      }
      return null;
    } else if (section.title === 'Previous Questions') {
      if (section.data.length === 0) {
        return (
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}>
            No Previous Questions
          </Text>
        );
      }
      return null;
    }
  };
  renderUserList = () => {
    const {contextAllQuestion, previousQuestion} = this.state;

    var {groupData, enable} =
      this.props.navigation &&
      this.props.route.params.params &&
      this.props.route.params.params;
    return (
      <ScrollView style={styles.lisitngs}>
        <SectionList
          sections={[
            {
              title: 'Select Contest Questions',
              data: contextAllQuestion.map(user => {
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
          renderSectionFooter={this.renderNoContent}
          keyExtractor={(item, index) => item + index}
          renderItem={data => {
            let {item, index, section} = data;
            if (section.title === 'Select Contest Questions') {
              return this.renderSelectContestQuestion(item, index, enable);
            } else if (section.title === 'Previous Questions') {
              return this.renderPreviousQuestion(item, index, enable);
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
    const {loading} = this.state;
    return (
      <View style={{flex: 1}}>
          <MeHeader
            title={'Questions'}
            onBackBtn={() => {
              back();
            }}
            showlogo={true}
            // enable={true}
            // enableValue={this.state.enable}
            // toggleSwitch={this.toggleSwitch}
            // hideBackBtn = {true}
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
        {/* <MeBottomNavbar/> */}
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    contextAllQuestion: state.story.contextAllQuestion,
    previousQuestion: state.story.previousQuestion,
  };
};
mapDispatchToProps = dispatch => {
  return {
    inviteUser: params => dispatch(TASKS.sendInvites(params)),
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    addMemberToGroup: params => dispatch(TASKS.addMemberToGroup(params)),
    addMemberToWatchParty: params =>
      dispatch(TASKS.addMemberToWatchParty(params)),
    fetchUserWatchParty: params => dispatch(TASKS.getWatchParty(params)),
    getContestAllQuestion: params =>
      dispatch(TASKS.getContestAllQuestion(params)),

    addContestQuestion: params => dispatch(TASKS.addContestQuestion(params)),

    deleteContestQuestion: params =>
      dispatch(TASKS.deleteContestQuestion(params)),
    enableDisableQuestion: params =>
      dispatch(TASKS.enableDisableQuestion(params)),
    addUserAnswer: params => dispatch(TASKS.addUserAnswer(params)),
    addAdminAnswer: params => dispatch(TASKS.addAdminAnswer(params)),
    turnOffSpecificQuestion: params =>
      dispatch(TASKS.turnOffSpecificQuestion(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersList);
