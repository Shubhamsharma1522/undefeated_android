//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {
  COLORS,
  WP,
  navigate,
  showToast,
  APPLICATION_IMAGE_CONSTANTS,
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
} from '../../../../services';
import {UserListItem} from './watchPartyProfileItem';
import MembersList from './membersComponent';
import {MeButton} from '../../../../components/MeButton';
import JoinModal from './joinModal';
import * as TASKS from '../../../../store/actions/index';
import {connect, useDispatch} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Dialog from 'react-native-dialog';

import {GET_SELECTED_CONTEST} from '../../../../store/actions/types';
// create a component
const WatchPartyCard = props => {
  const dispatch = useDispatch();
  // console.log('WatchPartyCard props here', props);
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
  // let profileImageHolder =
  //   APPLICATION_IMAGE_CONSTANTS.contestWatchPartyCoverImg;

  let profileImageHolder = APPLICATION_IMAGES.pickemAws;
  //   console.log('[in Watch Party Card] props', props);
  const [showModal, setShowModal] = useState(false);
  const [showContestCodeDialog, setShowContestCodeDialog] = useState(false);
  const [contestCodeText, setContestCodeText] = useState('');

  const {group, user} = props;

  console.log('contest watch party props', props.group);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const joinGroup = async e => {
    e.preventDefault();
    props.group && props.group.is_private === 1
      ? showDialog()
      : handleJoinContest();
  };

  const leaveGroup = async () => {
    // console.log('group in watch Card-1', group);
    // console.log('user in watch Card-1', user);
    const {auth_token} = user;
    const {slug} = group;

    let params = {
      auth_token: auth_token,
      party_slug: slug,
      delete_members: `${user.slug}`,
    };
    let paramsWatchParty = {
      auth_token: auth_token,
      limit: 20,
      page: 0,
    };
    // console.log('showing groups creating ', params);
    await props.leaveContest(params);
    await props.getPickemWatchParty(paramsWatchParty);
  };

  const openDetails = async () => {
    // dispatch({
    //   type: GET_SELECTED_CONTEST,
    //   selectedContest: props.group,
    // });
    const {auth_token} = user;

    // let paramsWatchParty = {
    //   auth_token: auth_token,
    //   limit: 20,
    //   page: 0,
    // };
    // props.getPickemWatchParty(paramsWatchParty);
    navigate('WatchPartyContestStacks', {
      standings: 'Private',
      groupData: props.group,
    });
  };
  const showDialog = () => {
    setShowContestCodeDialog(true);
  };

  const handleCancel = () => {
    setShowContestCodeDialog(false);
  };

  const handleJoinContest = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic

    // if (contestCodeText.length < 6) {
    //   return;
    // }

    const {id, slug, isJoined} = group;
    const {auth_token} = props.user;
    // const {  selectedUser } = this.state

    let params = {
      auth_token: auth_token,
      party_id: slug,
      isJoin: true,
      contest_code: contestCodeText,
    };
    // console.log('showing groups creating ', params);
    console.log('PARAMS in join watch party', params);
    setShowModal(false);
    setShowContestCodeDialog(false);
    await props.joinPickemContest(params);
    await props.getPickemWatchParty(params);

    // toggleModal();

    // setShowContestCodeDialog(false);
  };

  return (
    !!props.sportList && (
      <TouchableOpacity
        key={props?.index}
        style={styles.container}
        disabled={
          user && user?.role !== APPLICATION_CONSTANTS.USER_ADMIN
            ? props.group.isJoined === 0
              ? true
              : false
            : false
        }
        onPress={openDetails}>
        {/* <Image
          source={
            group.profile_image
              ? {uri: group.profile_image}
              : {uri: profileImageHolder, cache: 'reload'}
          }
          style={styles.imageHeader}
        /> */}
        <Image
          key={Math.random()}
          source={
            group.profile_image
              ? {uri: group.profile_image}
              : {uri: profileImageHolder}
          }
          style={styles.imageHeader}
        />

        <UserListItem group={props.group} sportList={props.sportList} />

        <View style={styles.memberInviteContainer}>
          {props.group.members_list && props.group.members_list.length > 0 ? (
            <MembersList group={props.group} />
          ) : (
            <Text />
          )}

          {user && user?.role !== APPLICATION_CONSTANTS.USER_ADMIN ? (
            !props.group.isJoined ? (
              <MeButton
                title={'Play'}
                onPress={joinGroup}
                containerStyles={
                  group.is_private === 1
                    ? styles.joinPrivateBtnContainerPlay
                    : styles.joinBtnContainer
                }
                textStyles={styles.btnText}
              />
            ) : (
              <MeButton
                title={'Leave'}
                onPress={leaveGroup}
                containerStyles={
                  group.is_private === 1
                    ? styles.joinPrivateBtnContainer
                    : styles.joinBtnContainer
                }
                textStyles={styles.btnText}
              />
            )
          ) : null}
          {user &&
            // user?.role == APPLICATION_CONSTANTS.USER_ADMIN &&
            group.is_private === 1 && (
              <View>
                <Text style={styles.privateText}>Private</Text>
              </View>
            )}
        </View>

        <JoinModal
          isVisible={showModal}
          group={props.group}
          onClosePress={toggleModal}
          onJoinPress={joinGroup}
          onBackdropPress={toggleModal}
          allGroups={props.allGroups}
        />
        <View>
          <Dialog.Container visible={showContestCodeDialog}>
            <Dialog.Title>Contest Code</Dialog.Title>
            <Dialog.Description>
              Please enter contest code to join the private contest.
            </Dialog.Description>
            <Dialog.Input
              maxLength={6}
              style={{color: 'black'}}
              onChangeText={e => {
                setContestCodeText(e);
              }}></Dialog.Input>
            {/* <TextInput
              allowFontScaling={false}
              // placeholder={APPLICATION_CONSTANTS.contextWatchPartyTitle}
              // placeholderTextColor={COLORS.black}
              // style={styles.titlePlaceholder}
              value={'title'}
              // onChangeText=÷{text => this.setState({title: text})}
            /> */}
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Join Contest" onPress={handleJoinContest} />
          </Dialog.Container>
        </View>
      </TouchableOpacity>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  joinPrivateBtnContainerPlay: {
    height: WP('8'),
    width: WP('18'),
    position: 'absolute',
    right: WP('-41'),
    bottom: WP('4'),
  },
  container: {
    display: 'flex',
    // height: WP('45'),
    width: WP('88'),
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    marginBottom: WP('3'),
    borderRadius: WP('2'),
    overflow: 'hidden',
  },
  imageHeader: {
    display: 'flex',
    height: WP('40'),
    width: '100%',
    // position: 'relative'
  },
  groupImage: {
    height: WP('23'),
    width: WP('88'),
    overflow: 'hidden',
    borderTopLeftRadius: WP('2'),
    borderTopRightRadius: WP('2'),
    resizeMode: 'stretch',
  },
  member: {
    marginLeft: WP('2'),
  },
  memberInviteContainer: {
    position: 'relative',
    paddingBottom: WP('2'),
    paddingRight: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  joinBtnContainer: {
    height: WP('8'),
    width: WP('18'),
    position: 'absolute',
    right: WP('0'),
    bottom: WP('6'),
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  joinPrivateBtnContainer: {
    height: WP('8'),
    width: WP('18'),
    position: 'absolute',
    right: WP('-41'),
    bottom: WP('4'),
    // alignItems: 'center',
    // justifyContent: 'center'
  },

  btnText: {
    fontWeight: '100',
    fontSize: WP('4'),
  },
  privateText: {
    color: 'red',
    marginRight: WP('2'),
  },
});

//make this component available to the app
mapStateToProps = state => {
  // console.log('sate in watch party', state);
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    sportList: state.story.getSportsList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(TASKS.getUserList(params)),
    addNewGroup: params => dispatch(TASKS.addNewGroup(params)),
    addNewWatchParty: params => dispatch(TASKS.addNewWatchParty(params)),
    addMemberToWatchParty: params =>
      dispatch(TASKS.addMemberToWatchParty(params)),
    joinPickemContest: params => dispatch(TASKS.joinPickemContest(params)),
    leaveContest: params => dispatch(TASKS.leaveContest(params)),
    // fetchUserWatchParty: (params) => dispatch(TASKS.getWatchParty(params)),
    getPickemWatchParty: params => dispatch(TASKS.getPickemWatchParty(params)),
    getSportList: () => dispatch(TASKS.getSportList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WatchPartyCard);
