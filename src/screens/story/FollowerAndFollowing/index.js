import React, {useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MeHeader} from '../../../components/MeHeader';
// import {TabView, TabBar} from 'react-native-tab-view';
import MeBottomNavbar from '../../../components/BottomNavbar';
import {COLORS, APPLICATION_CONSTANTS} from '../../../services';
import FollowerAndFollowingTab from './FollowerAndFollowingTab';
import {useGetUserFollowersAndFollowings} from '../../../hooks/react-query/useGetUserFollowersAndFollowings';
import MeCustomTabView from '../../../components/MeTabView';
const initialLayout = {width: Dimensions.get('window').width};

export const FOLLOW_ROUTES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS',
};

// const renderTabBar = props => (
//   <TabBar
//     {...props}
//     style={{backgroundColor: COLORS.appColour}}
//     indicatorStyle={{backgroundColor: COLORS.white}}
//     getLabelText={({route}) => route.title}
//   />
// );

// const routes = [
//   {key: FOLLOW_ROUTES.FOLLOWERS, title: 'Followers'},
//   {key: FOLLOW_ROUTES.FOLLOWINGS, title: 'Followings'},
// ];

const tabs = [
  {key: 'MyRooms', label: 'Followers'},
  {key: 'AllRooms', label: 'Followings'},
];
const FollowerAndFollowing = props => {
  console.log('propsprops', props.route);
  const loggedInUser = useSelector(state => state.auth.user);
  const userId = props?.route?.params?.params?.userId
    ? props?.route?.params?.params?.userId
    : null;
  // const {userId, initialScreen} = props?.route?.params?.params |null ;
  // const initalRoute = FOLLOW_ROUTES[initialScreen] || FOLLOW_ROUTES.FOLLOWERS;
  // const initalRouteIndex = routes.findIndex(route => route.key === initalRoute);

  // const [index, setIndex] = useState(initalRouteIndex);

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
  console.log('followsList>>',followsList, followersAndFollowings);
  // const renderScene = ({route}) => {
  //   return (
  //     <FollowerAndFollowingTab
  //       tab={route.key}
  //       isLoading={isLoading}
  //       onPress={data => console.log(data)}
  //       data={followsList?.[route.key] || []}
  //     />
  //   );
  // };
  const AllData = () => {
    return (
      <FollowerAndFollowingTab
        tab={FOLLOW_ROUTES.FOLLOWINGS}
        isLoading={isLoading}
        onPress={data => console.log(data)}
        data={followsList[FOLLOW_ROUTES.FOLLOWINGS] || []}
      />
    );
  };
  const MyData = () => {
    return (
      <FollowerAndFollowingTab
        tab={FOLLOW_ROUTES.FOLLOWERS}
        isLoading={isLoading}
        onPress={data => console.log(data)}
        data={followsList[FOLLOW_ROUTES.FOLLOWERS] || []}
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
      <MeCustomTabView
        tabs={tabs}
        initialTabKey={props?.route?.params?.params?.initialScreen  === FOLLOW_ROUTES.FOLLOWERS ? "MyRooms": "AllRooms"} 
        data={{
          allData: followsList[FOLLOW_ROUTES.FOLLOWINGS],
          myData: followsList[FOLLOW_ROUTES.FOLLOWERS],
        }}
        user={loggedInUser}
        AllData={AllData} // Pass the AllData component
        MyData={MyData}
      />
      {/* <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        bounces={true}
        renderTabBar={renderTabBar}
      /> */}
      {loggedInUser &&
      loggedInUser.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
        <MeBottomNavbar />
      )}
    </>
  );
};

export default FollowerAndFollowing;
