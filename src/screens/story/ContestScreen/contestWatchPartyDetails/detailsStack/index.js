// import {createStackNavigator} from 'react-navigation-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GroupDetails from '../index';
import ChatAndNews from '../groupScreens';
import UsersListings from '../usersListing';
import ChatAndNewsScreen from '../chatAndNews';
import RenderQuickBets from '../quickBet';
import FriendLists from '../FriendList';
import InviteUsersList from '../InviteUsersList';
import QuestionList from '../QuestionsList';
import UserQuestionAnswer from '../UsersQuestionsAnswer';
import ContestLeaderboard from '../contestLeaderBoard';
import HowToPlay from '../howToPlay';
const Stack = createNativeStackNavigator();
function ContestPartyNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
      <Stack.Screen name="ChatAndNews" component={ChatAndNews} />
      <Stack.Screen name="UsersListings" component={UsersListings} />
      <Stack.Screen name="ChatAndNewsScreen" component={ChatAndNewsScreen} />
      <Stack.Screen name="RenderQuickBets" component={RenderQuickBets} />

      <Stack.Screen name="FriendLists" component={FriendLists} />
      <Stack.Screen name="InviteUsersList" component={InviteUsersList} />
      <Stack.Screen name="QuestionList" component={QuestionList} />
      <Stack.Screen name="UserQuestionAnswer" component={UserQuestionAnswer} />
      <Stack.Screen name="ContestLeaderboard" component={ContestLeaderboard} />
      <Stack.Screen name="HowToPlay" component={HowToPlay} />
    </Stack.Navigator>
  );
}
// const WatchPartyContestStacks = createStackNavigator(
//   {
//     GroupDetails: GroupDetails,
//     ChatAndNews: ChatAndNews,
//     UsersListings: UsersListings,
//     ChatAndNewsScreen: ChatAndNewsScreen,
//     RenderQuickBets: RenderQuickBets,
//     FriendLists: FriendLists,
//     InviteUsersList: InviteUsersList,
//     QuestionList: QuestionList,
//     UserQuestionAnswer: UserQuestionAnswer,
//     ContestLeaderboard: ContestLeaderboard,
//     HowToPlay: HowToPlay,
//   },
//   {
//     headerMode: 'none',
//   },
// );

// export default WatchPartyContestStacks;
export default ContestPartyNavigator;
