import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// App Screens
import Home from '../screens/story/Home';
// import NewBet from '../screens/story/newBet';
import Standings from '../screens/story/standings';
import Contest from '../screens/story/ContestScreen';
import Settings from '../screens/story/settings';
import ChangeEmail from '../screens/story/settings/changeEmail';
import ChangeName from '../screens/story/settings/changeName';
import ChangePassword from '../screens/story/settings/changePassword';
import ChangeNumber from '../screens/story/settings/changeNumber';
import ChangeBio from '../screens/story/settings/changeBio';
import ChangeFavoriteTeams from '../screens/story/settings/changeFavoriteTeams';
import AboutUs from '../screens/story/AboutUs/AboutUs';
import NewContestWatchParty from '../screens/story/newContestWatchParty/index';
import CreatePickemContestParty from '../screens/story/CreatePickemContestParty';
import ContestWatchParty from '../screens/story/ContestwatchParty/index';
import ShowFullImg from '../screens/story/showFullImg';
import PickemContestParty from '../screens/story/PickemContestParty';
// import WatchPartyContestStacks from '../screens/story/contestWatchPartyDetails/detailsStack/index';
// import NewChatRoom from '../screens/story/newChatRoom';
import ChatRoom from '../screens/story/Huddles/HuddlesList';
// import ChatRoomStacks from '../screens/story/chatRoomDetails/detailsStack';
import CarousalLink from '../components/Crousel/CarousalLink';
import Takes from '../screens/story/Takes/takesFeed';
import TakeDetails from '../screens/story/Takes/TakeDetails';
import AddTakeReply from '../screens/story/Takes/AddTakeReply';
import SearchedHashtagTakes from '../screens/story/Takes/SearchHashtagTakes';
import FollowerAndFollowing from '../screens/story/FollowerAndFollowing';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Standings" component={Standings} />
      <Stack.Screen name="Contest" component={Contest} />
      {/* <Stack.Screen name="NewWatchParty" component={NewWatchParty} /> */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
      <Stack.Screen name="ChangeName" component={ChangeName} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeNumber" component={ChangeNumber} />
      <Stack.Screen name="ChangeBio" component={ChangeBio} />
      <Stack.Screen name="ChangeFavoriteTeams" component={ChangeFavoriteTeams} />
      {/* <Stack.Screen name="AllBets" component={AllBets} /> */}
      <Stack.Screen name="AboutUs" component={AboutUs} />
      {/* <Stack.Screen name="PendingBets" component={PendingBets} /> */}
      <Stack.Screen name="NewContestWatchParty" component={NewContestWatchParty} />
      <Stack.Screen name="CreatePickemContestParty" component={CreatePickemContestParty} />
      <Stack.Screen name="ContestWatchParty" component={ContestWatchParty} />
      <Stack.Screen name="PickemContestParty" component={PickemContestParty} />
      {/* <Stack.Screen name="WatchPartyContestStacks" component={WatchPartyContestStacks} /> */}
      <Stack.Screen name="ShowFullImg" component={ShowFullImg} />
      {/* <Stack.Screen name="ChatRoomStacks" component={ChatRoomStacks} /> */}
      {/* <Stack.Screen name="NewChatRoom" component={NewChatRoom} /> */}
      <Stack.Screen name="ChatRooms" component={ChatRoom} />
      <Stack.Screen name="CarousalLink" component={CarousalLink} />
      <Stack.Screen name="Takes" component={Takes} />
      <Stack.Screen name="TakeDetails" component={TakeDetails} />
      <Stack.Screen name="AddTakeReply" component={AddTakeReply} />
      <Stack.Screen name="SearchedHashtagTakes" component={SearchedHashtagTakes} />
      <Stack.Screen name="FollowerAndFollowing" component={FollowerAndFollowing} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
