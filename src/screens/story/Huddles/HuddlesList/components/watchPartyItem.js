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
} from '../../../../../services';
import {UserListItem} from './watchPartyProfileItem';
import MembersList from './membersComponent';
import {MeButton} from '../../../../../components/MeButton';
import JoinModal from './joinModal';
import * as TASKS from '../../../../../store/actions/index';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Dialog from 'react-native-dialog';
import {useNavigation} from '@react-navigation/native';

// create a component
const WatchPartyCard = props => {
  const navigation = useNavigation();
  // console.log('WatchPartyCard props here**', props);

  let profileImageHolder = APPLICATION_IMAGES.huddleAws;
  //   console.log('[in Watch Party Card] props', props);
  const [showModal, setShowModal] = useState(false);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [codeText, setCodeText] = useState('');
  // useEffect(() => {
  //     console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKK",props.myContest, props.group)
  //   NavigationActions.setParams({ standings: 'Private', groupData: props.myContest[0] });
  //     //   props.navigation.dispatch(setParamsAction);
  // },[props.myContest])
  const {group, user} = props;
  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKK', props);
  console.log('chatroom watch party item props', props);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const joinGroup = async e => {
    e.preventDefault();
    props.group && props.group.is_private === 1 ? showDialog() : handleJoin();
  };

  const leaveGroup = async () => {
    // console.log('group in watch Card-1', group);
    // console.log('user in watch Card-1', user);
    const {auth_token} = user;
    const {slug} = group;

    let params = {
      auth_token: auth_token,
      room_slug: slug,
      delete_members: `${user.slug}`,
    };
    let params1 = {
      auth_token: auth_token,
      limit: 20,
      page: 0,
    };
    // console.log('showing groups creating ', params);
    await props.leaveChatRoom(params);
    await props.getChatRooms(params1);
    await props.getSportsFeed(params);
  };

  const openDetails = () => {
    console.log('watch party item chat room props', props.group);
    return navigation.navigate('ChatRoomStacks', {
      screen: 'ChatRoomDetails',
      params: {
        standings: 'Private',
        groupData: props.group,
      },
    });
  };

  const showDialog = () => {
    setShowCodeDialog(true);
  };

  const handleCancel = () => {
    setShowCodeDialog(false);
  };

  const handleJoin = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic

    // if (codeText.length < 6) {
    //   return;
    // }

    const {id, slug} = group;
    const {auth_token} = props.user;
    // const {  selectedUser } = this.state

    let params = {
      auth_token: auth_token,
      room_id: slug,
      isJoin: true,
      code: codeText,
    };
    // console.log('showing groups creating ', params);
    console.log('PARAMS in join watch party', params);
    await props.joinChatRoom(params);
    setShowModal(false);
    setShowCodeDialog(false);

    await props.getChatRooms(params);
    await props.getSportsFeed(params);

    // toggleModal();
    // setShowCodeDialog(false);
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
          ) : null}
          {user && user?.role !== APPLICATION_CONSTANTS.USER_ADMIN ? (
            !props.group.isJoined ? (
              <MeButton
                title={'Follow'}
                onPress={joinGroup}
                containerStyles={
                  group.is_private === 1
                    ? styles.joinPrivateBtnContainerFollow
                    : styles.joinBtnContainer
                }
                textStyles={styles.btnText}
              />
            ) : (
              <MeButton
                title={'Unfollow'}
                onPress={leaveGroup}
                containerStyles={
                  group.is_private === 1
                    ? styles.joinBtnContainerUnfollow
                    : styles.joinBtnContainer
                }
                textStyles={styles.btnText}
              />
            )
          ) : null}
          {user &&
            // user?.role == APPLICATION_CONSTANTS.USER_ADMIN &&
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
        <View>
          <Dialog.Container visible={showCodeDialog}>
            <Dialog.Title>Huddle Code</Dialog.Title>
            <Dialog.Description>
              Please enter Huddle code to join the private Huddle.
            </Dialog.Description>
            <Dialog.Input
              maxLength={6}
              style={{color: 'black'}}
              onChangeText={e => {
                setCodeText(e);
              }}></Dialog.Input>

            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Join Huddle" onPress={handleJoin} />
          </Dialog.Container>
        </View>
      </TouchableOpacity>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  joinPrivateBtnContainerFollow: {
    height: WP('8'),
    width: WP('22'),
    position: 'absolute',
    right: WP('-44'),
    bottom: WP('4'),
    alignItems: 'center',
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
  btnContainer: {
    height: WP('8'),
    width: WP('18'),
    position: 'absolute',
    right: WP('1'),
    bottom: WP('3'),
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  joinBtnContainer: {
    height: WP('8'),
    width: WP('22'),
    position: 'absolute',
    right: WP('0'),
    bottom: WP('6'),
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  joinBtnContainerUnfollow: {
    // height: WP('8'),
    // width: WP('25'),
    // position: 'absolute',
    // right: WP('1'),
    // bottom: WP('6'),
    height: WP('8'),
    width: WP('22'),
    position: 'absolute',
    right: WP('-41'),
    bottom: WP('4'),
  },
  joinPrivateBtnContainer: {
    height: WP('8'),
    width: WP('25'),
    position: 'absolute',
    right: WP('-40'),
    bottom: WP('4'),
    alignItems: 'center',
    // alignItems: 'center',
    // justifyContent: 'center'
  },

  btnText: {
    fontWeight: '100',
    fontSize: WP('4'),
    textAlign: 'center',
    paddingHorizontal: 1,
  },
  privateText: {
    color: 'red',
    marginRight: WP('4'),
  },
});

//make this component available to the app
mapStateToProps = state => {
  // console.log('sate in watch party', state);
  return {
    user: state.auth.user,
    userListings: state.story.getUsersLists,
    myChatRooms: state.story.myChatRooms,
    sportList: state.story.getSportsList,
  };
};
mapDispatchToProps = dispatch => {
  return {
    joinChatRoom: params => dispatch(TASKS.joinChatRoom(params)),
    leaveChatRoom: params => dispatch(TASKS.leaveChatRoom(params)),
    // fetchUserWatchParty: (params) => dispatch(TASKS.getWatchParty(params)),
    getChatRooms: params => dispatch(TASKS.getChatRooms(params)),
    getSportList: () => dispatch(TASKS.getSportList()),
    getSportsFeed: params => dispatch(TASKS.getSportsFeed(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WatchPartyCard);
