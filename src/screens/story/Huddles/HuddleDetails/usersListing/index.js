import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {UserListItem} from '../components/TabScreens/components/userListsItems';
const initialLayout = {width: Dimensions.get('window').width};
import MeBottomNavbar from '../../../../../components/BottomNavbar';
import {
  FONTS,
  WP,
  COLORS,
  APPLICATION_IMAGES,
  back,
  navigate,
} from '../../../../../services';
import MeModal from '../../../../../components/MeModal';
import * as Util from '../../../../../services';
import {connect, useSelector} from 'react-redux';
import * as TASKS from '../../../../../store/actions/index';
import {MeHeader} from '../../../../../components/MeHeader';

const UsersListings = props => {
  console.log('UsersListings showing props here ', props);

  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const toggleModal = member => {
    // setShowModal(!showModal);
    // setMember(member);
  };

  const onRedirectToMessage = person => {
    let groupData = props.route.params.params.groupData;
    console.log('member**', member, groupData);

    setShowModal(false);
    props.navigation.navigate('Messages', {standings: 'public', person});
  };

  const toggleRemoveMemberModal = member => {
    setConfirmModal(true);
    setSelectedUser([...selectedUser, member.id]);
    setMember(member);
  };

  useEffect(() => {
    (async () => {
      const {auth_token} = props.user;
      const paramsSetGroups = {
        auth_token,
      };
      await props.getChatRooms(paramsSetGroups);
    })();
  }, [props]);

  const removeMember = async member => {
    console.log('in remove member', member);

    const {id, title, description, slug} = props.route.params.params.groupData;
    //    console.log("params in call done", params)
    // const {  selectedUser } = this.state
    console.log('showing selected user', selectedUser);

    const {auth_token} = props.user;

    if (id && selectedUser !== '') {
      let params = {
        auth_token: auth_token,
        title: title,
        description: description,
        room_slug: slug,
        delete_members: `${selectedUser}`,
        // private: enabled,
        // // description: description,
        // profile_image: uploadingPath,
        // members_list: `${selectedUser}`
      };
      // console.log('showing groups creating ', params);
      await props.deleteAMemberChatRoom(params);
      let paramsSetGroups = {
        auth_token: auth_token,
      };
      await props.getChatRooms(paramsSetGroups);
      navigate('ChatRooms');
      setConfirmModal(false);
    } else {
      showToast('Select atleast 1 member');
    }
    // setConfirmModal(true)
    // setMember(member)
  };

  const {params} = props.route.params;
  const user = useSelector(state => state.auth.user);

  return (
    <View style={styles.container}>
      <MeHeader
        showProfilePic={true}
        title={'Undefeated.Live'}
        hideBackBtn={false}
        profilePicUrl={user ? user.profile_image : null}
        showNotficaion={false}
        showAboutUs={false}
        showlogo={true}
        onAboutInfo={() => {
          this.props.navigation.navigate('AboutUs');
        }}
        onNotificationPress={() => {
          this.props.navigation.navigate('PendingBets');
        }}
      />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headings} allowFontScaling={false}>
            Who's Here
          </Text>
          <TouchableOpacity />
        </View>
      </View>
      <Text style={styles.details} allowFontScaling={false}>
        Members - ({params.groupData?.members_list?.length || 0})
      </Text>

      <ScrollView
        contentContainerStyle={styles.scene}
        showsVerticalScrollIndicator={false}>
        {params.groupData ? (
          params.groupData.members_list &&
          params.groupData.members_list.length > 0 ? (
            params.groupData.members_list.map((member, index) => {
              return (
                <UserListItem
                  member={member}
                  owner={params.groupData?.owner_information}
                  onMemberTapped={() => toggleModal(member)}
                  onMemberRemoveTapped={toggleRemoveMemberModal}
                  index={index}
                />
              );
            })
          ) : (
            <Text>No members</Text>
          )
        ) : (
          <Text>No members</Text>
        )}
      </ScrollView>
      {member ? (
        <View>
          <MeModal
            isVisible={showModal}
            onClosePress={toggleModal}
            member={member}
            isWatchParty={true}
            onRedirectToMessage={() => onRedirectToMessage(member)}
            // onRedirectToBet={onRedirectToBet}
          />
          <MeModal
            isVisible={confirmModal}
            onClosePress={() => setConfirmModal(false)}
            member={member}
            loading={loading}
            removeMember={removeMember}
            type="remove"
          />
        </View>
      ) : null}
      {user && user.role === Util.APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </View>
  );
};
mapStateToProps = state => {
  return {
    user: state.auth.user,
    // userGroups: state.story.userGroups,
    // // userListings: state.story.getUsersLists,
  };
};
mapDispatchToProps = dispatch => {
  return {
    deleteAMemberChatRoom: params =>
      dispatch(TASKS.deleteAMemberChatRoom(params)),

    getChatRooms: params => dispatch(TASKS.getChatRooms(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersListings);
const styles = StyleSheet.create({
  scene: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  details: {
    color: COLORS.grey,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    paddingLeft: WP('3'),
    marginTop: WP('5'),
  },
  headings: {
    color: COLORS.white,
    fontWeight: Platform.OS === 'ios' ? '400' : null,
    fontSize: WP('5'),
    fontFamily: FONTS.appFont,
  },
  header: {
    display: 'flex',
    // height: WP('30'),
    backgroundColor: COLORS.appColour,
  },
  searchHolder: {
    display: 'flex',
    height: WP('10'),
    width: WP('95'),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
    borderRadius: WP('3'),
  },
  cancel: {
    height: WP('5'),
    width: WP('5'),
  },
  headerContainer: {
    flexDirection: 'row',
    // paddingLeft: WP('3'),
    marginBottom: WP('4'),
    marginTop: WP('4'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: WP('3'),
  },
});
