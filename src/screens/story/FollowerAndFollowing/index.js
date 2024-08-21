import React, {useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MeHeader} from '../../../components/MeHeader';
import {TabView, TabBar} from 'react-native-tab-view';
import MeBottomNavbar from '../../../components/BottomNavbar';
import {COLORS, APPLICATION_CONSTANTS} from '../../../services';
import FollowerAndFollowingTab from './FollowerAndFollowingTab';
import {useGetUserFollowersAndFollowings} from '../../../hooks/react-query/useGetUserFollowersAndFollowings';

const initialLayout = {width: Dimensions.get('window').width};

export const FOLLOW_ROUTES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS',
};

const renderTabBar = props => (
  <TabBar
    {...props}
    style={{backgroundColor: COLORS.appColour}}
    indicatorStyle={{backgroundColor: COLORS.white}}
    getLabelText={({route}) => route.title}
  />
);

const routes = [
  {key: FOLLOW_ROUTES.FOLLOWERS, title: 'Followers'},
  {key: FOLLOW_ROUTES.FOLLOWINGS, title: 'Followings'},
];

const FollowerAndFollowing = props => {
  const loggedInUser = useSelector(state => state.auth.user);

  const {userId, initialScreen} = props.route.params.params;
  const initalRoute = FOLLOW_ROUTES[initialScreen] || FOLLOW_ROUTES.FOLLOWERS;
  const initalRouteIndex = routes.findIndex(route => route.key === initalRoute);

  const [index, setIndex] = useState(initalRouteIndex);

  const {isLoading, data: followersAndFollowings} =
    useGetUserFollowersAndFollowings(userId);

  const followsList = useMemo(() => {
    if (!followersAndFollowings) {
      return {};
    }
    return {
      [FOLLOW_ROUTES.FOLLOWERS]: followersAndFollowings.followers,
      [FOLLOW_ROUTES.FOLLOWINGS]: followersAndFollowings.followings,
    };
  }, [followersAndFollowings]);

  const renderScene = ({route}) => {
    return (
      <FollowerAndFollowingTab
        tab={route.key}
        isLoading={isLoading}
        onPress={data => console.log(data)}
        data={followsList?.[route.key] || []}
      />
    );
  };

  return (
    <>
      <MeHeader
        title={'Undefeated.Live'}
        showProfilePic={true}
        hideBackBtn={false}
        showlogo={true}
        profilePicUrl={loggedInUser ? loggedInUser.profile_image : null}
        groups={true}
        showAboutUs={false}
        onAboutInfo={() => {
          props.navigation.navigate('AboutUs');
        }}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        bounces={true}
        renderTabBar={renderTabBar}
      />
      {loggedInUser &&
      loggedInUser.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};

export default FollowerAndFollowing;
