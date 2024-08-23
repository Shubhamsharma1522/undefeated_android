//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  COLORS,
  WP,
  showToast,
  APPLICATION_IMAGE_CONSTANTS,
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
} from '../../../../../../services';
import {UserListItem} from './watchPartyProfileItem';
import MembersList from './membersComponent';
import {MeButton} from '../../../../../../components/MeButton';
import JoinModal from './joinModal';
import * as TASKS from '../../../../../../store/actions/index';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';

// create a component
const WatchPartyCard = props => {
  const navigation = useNavigation();
  // console.log('WatchPartyCard props here**', props);
  let placeHolder = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
  // let profileImageHolder =
  //   APPLICATION_IMAGE_CONSTANTS.contestWatchPartyCoverImg;

  let profileImageHolder = APPLICATION_IMAGES.contestAws;
  //   console.log('[in Watch Party Card] props', props);
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //     console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKK",props.myContest, props.group)
  //   NavigationActions.setParams({ standings: 'Private', groupData: props.myContest[0] });
  //     //   props.navigation.dispatch(setParamsAction);
  // },[props.myContest])
  const {group, user} = props;

  console.log('contest watch party item props', props);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const joinGroup = async () => {
    // console.log('group in watch Card', group);
    // console.log('user in watch Card', user);

    // const {id, title, description } = this.props.route.params.params.groupData
    const {id, slug} = group;
    const {auth_token} = props.user;
    // const {  selectedUser } = this.state

    let params = {
      auth_token: auth_token,
      party_id: slug,
      isJoin: true,
    };
    // console.log('showing groups creating ', params);
    console.log('PARAMS', params);
    await props.joinContest(params);
    await props.getSportsFeed(params);
    await props.getContestWatchParty(params);
    setShowModal(false);
  };

  const leaveGroup = async () => {
    // console.log('group in watch Card-1', group);
    // console.log('user in watch Card-1', user);
    console.log('leave groupl', group, user);
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
    await props.getSportsFeed(params);
    await props.getContestWatchParty(paramsWatchParty);
  };

  const openDetails = () => {
   navigation.navigate('WatchPartyContestStacks', {
      screen: 'GroupDetails',
      params: {
        standings: 'Private',
        groupData: props.group,
      },
    });
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
        <Image
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
                containerStyles={styles.btnContainer}
                textStyles={styles.btnText}
              />
            ) : (
              <MeButton
                title={'Leave'}
                onPress={leaveGroup}
                containerStyles={styles.btnContainer}
                textStyles={styles.btnText}
              />
            )
          ) : null}
          {user &&
            user?.role == APPLICATION_CONSTANTS.USER_ADMIN &&
            group.is_private == 1 && (
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
      </TouchableOpacity>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
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
  },
  btnContainer: {
    height: WP('8'),
    width: WP('20'),
    position: 'absolute',
    right: WP('0'),
    bottom: WP('6'),
    // alignItems: 'center',
    // justifyContent: 'center'
  },

  btnText: {
    fontWeight: '100',
    fontSize: WP('4'),
  },
  privateText: {
    color: 'red',
  },
});

//make this component available to the app
mapStateToProps = state => {
  // console.log('sate in watch party', state);
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    myContest: state.story.myContest,
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
    joinContest: params => dispatch(TASKS.joinContest(params)),
    leaveContest: params => dispatch(TASKS.leaveContest(params)),
    // fetchUserWatchParty: (params) => dispatch(TASKS.getWatchParty(params)),
    getContestWatchParty: params =>
      dispatch(TASKS.getContestWatchParty(params)),
    getSportList: () => dispatch(TASKS.getSportList()),
    getSportsFeed: params => dispatch(TASKS.getSportsFeed(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WatchPartyCard);
