import UsersListings from '../usersListing';
import ChatAndNewsScreen from '../chatAndNews';
import FriendLists from '../FriendList';
import InviteUsersList from '../InviteUsersList';
import ChatRoomDetails from '../index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function HuddleNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatRoomDetails" component={ChatRoomDetails} />
      <Stack.Screen name="UsersListings" component={UsersListings} />
      <Stack.Screen name="ChatAndNewsScreen" component={ChatAndNewsScreen} />
      <Stack.Screen name="FriendLists" component={FriendLists} />
      <Stack.Screen name="InviteUsersList" component={InviteUsersList} />
    </Stack.Navigator>
  );
}
// const ChatRoomStacks = createStackNavigator(
//   {
//     ChatRoomDetails: ChatRoomDetails,
//     // ChatAndNews: ChatAndNews,
//     UsersListings: UsersListings,
//     ChatAndNewsScreen: ChatAndNewsScreen,
//     // RenderQuickBets: RenderQuickBets,
//     FriendLists: FriendLists,
//     InviteUsersList: InviteUsersList,
//     // QuestionList: QuestionList,
//     // UserQuestionAnswer: UserQuestionAnswer,
//     // ContestLeaderboard: ContestLeaderboard,
//     // HowToPlay: HowToPlay,
//   },
//   {
//     headerMode: 'none',
//   },
// );

// export default ChatRoomStacks;
export default HuddleNavigator;
