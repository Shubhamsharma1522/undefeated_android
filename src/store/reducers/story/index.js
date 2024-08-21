import * as TYPES from '../../actions/types';
const initialState = {
  getUsersLists: [],
  getUserGroups: [],
  getPublicGroups: [],
  getAllBets: [],
  getMyBets: [],
  getPendingBets: [],
  getSportsBets: [],

  PublicStanding: [],
  messages: [],
  // Chat Rooms
  myChatRooms: [],
  allChatRooms: [],

  // ----
  allWatchParty: [],
  myWatchParty: [],
  allPickemContest: [],
  myPickemContest: [],

  allGroups: [],
  golferList: [],
  myContest: [],
  allContest: [],
  contextAllQuestion: [],
  previousQuestion: [],
  userContestQuestion: [],
  getSportsList: [],
  awards: [],
  contestLeaderBoard: [],
  selectedContest: null,
  promotionalAds: [],
  sportsFeed: {
    promotedContestParty: [],
    promotedHuddles: [],
    promotedPickemParty: [],
  },
  chatLoading: false,
  takesLoading: false,
  scrollIndex: 0,
  hashtags: [],
  mentionedUsers: [],
};
const reducer = (state = initialState, actions) => {
  // if(actions.type === TYPES.GET_ALL_WATCH_PARTY ){
  console.log('**', actions);
  // }

  switch (actions.type) {
    case TYPES.GET_USER_LISTS:
      return {
        ...state,
        getUsersLists: actions.userList,
      };
    case TYPES.GET_PRIVATE_WATCH_PARTY:
      return {
        ...state,
        privateWatchParty: actions.privateWatchParty,
      };

    case TYPES.GET_PUBLIC_WATCH_PARTY:
      return {
        ...state,
        publicWatchParty: actions.publicWatchParty,
      };
    case TYPES.GET_ALL_WATCH_PARTY:
      return {
        ...state,
        allWatchParty: actions.allWatchParty,
        myWatchParty: actions.myWatchParty,
      };
    case TYPES.GET_PICKEM_CONTEXT_PARTY:
      return {
        ...state,
        allPickemContest: actions.allPickemContest,
        myPickemContest: actions.myPickemContest,
      };
    case TYPES.GET_SELECTED_CONTEST:
      return {
        ...state,
        selectedContest: actions.selectedContest,
      };

    case TYPES.GET_USER_GROUPS:
      return {
        ...state,
        getUserGroups: actions.userGroups,
        allGroups: actions.allGroups,
      };
    case TYPES.GET_PUBLIC_GROUPS: {
      return {
        ...state,
        getPublicGroups: actions.publicGroups,
      };
    }
    case TYPES.GET_ALL_BETS:
      return {
        ...state,
        getAllBets: actions.allBets,
      };
    case TYPES.GET_MY_BETS:
      return {
        ...state,
        getMyBets: actions.myBets,
      };

    case TYPES.GET_SPORTS_BETS:
      return {
        ...state,
        getSportsBets: actions.sportsBet,
      };

    case TYPES.GET_MESSAGES:
      console.log('UPDATED THE GETMESSAGE', actions);
      return {
        ...state,
        messages: actions.payload,
      };
    case TYPES.GET_TAKES:
      console.log('UPDATED THE GETMESSAGE', actions);
      return {
        ...state,
        takes: actions.payload,
      };
    case TYPES.CHAT_LOADING:
      return {
        ...state,
        chatLoading: actions.payload,
      };
    case TYPES.TAKES_LOADING:
      return {
        ...state,
        takesLoading: actions.payload,
      };
    case TYPES.GET_MESSAGE: {
      console.log('Reducer GET_MESSAGE', actions.payload, state.messages);
      const index = state.messages.findIndex(
        msg => msg.id === actions.payload.id,
      );

      // connection
      if (index <= -1) {
        return {
          ...state,
          messages: [...state.messages, actions.payload],
        };
      } else {
        // 1. Make a shallow copy of the items
        const items = [...state.messages];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[index]};
        // 3. Replace the property you're intested in
        item = actions.payload;
        // 4. Put it back into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy

        return {
          ...state,
          messages: items,
        };
      }
    }
    case TYPES.GET_NEW_TAKE: {
      console.log('Reducer GET_MESSAGE', actions.payload, state.messages);
      const index = state.takes.findIndex(
        msg => msg.takesUuid === actions.payload.takesUuid,
      );

      // connection
      if (index <= -1) {
        return {
          ...state,
          takes: [actions.payload, ...state.takes],
        };
      } else {
        // 1. Make a shallow copy of the items
        const items = [...state.takes];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[index]};
        // 3. Replace the property you're intested in
        item = actions.payload;
        // 4. Put it back into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy

        return {
          ...state,
          takes: items,
        };
      }
    }
    case TYPES.UPDATE_NEW_TAKE_REPLY: {
      console.log('Reducer GET_MESSAGE', actions.payload, state.messages);
      const index = state.takes.findIndex(
        msg => msg.takesUuid === actions.payload.takesUuid,
      );

      // connection
      if (index <= -1) {
        return {
          ...state,
          takes: [actions.payload, ...state.takes],
        };
      } else {
        // 1. Make a shallow copy of the items
        const items = [...state.takes];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[index]};
        // 3. Replace the property you're intested in
        item = actions.payload;
        // 4. Put it back into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy

        return {
          ...state,
          takes: items,
        };
      }
    }
    case TYPES.UPDATE_EXISTING_TAKE: {
      console.log('Reducer GET_MESSAGE', actions.payload, state.messages);
      const index = state.takes.findIndex(
        msg => msg.takesUuid === actions.payload.takesUuid,
      );

      // connection
      if (index <= -1) {
        return {
          ...state,
          takes: [actions.payload, ...state.takes],
        };
      } else {
        // 1. Make a shallow copy of the items
        const items = [...state.takes];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[index]};
        // 3. Replace the property you're intested in
        item = actions.payload;
        // 4. Put it back into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy

        return {
          ...state,
          takes: items,
        };
      }
    }

    case TYPES.GET_PUBLIC_STANDINGS:
      return {
        ...state,
        PublicStanding: actions.publicStanding,
      };
    case TYPES.LIKE_BET_UPDATE:
      let object = state.getAllBets.map(reduxItem => {
        console.log('showing actions', actions);

        if (reduxItem.id === actions.id.bet_id) {
          console.log('showing actions', actions);
          if (actions.id.isLiked) {
            reduxItem.likes_count = reduxItem.likes_count + 1;
          } else {
            reduxItem.likes_count = reduxItem.likes_count - 1;
          }
          reduxItem.is_liked_by_me = !reduxItem.is_liked_by_me;
        }

        return reduxItem;
      });
      return {
        ...state,
        getAllBets: object,
      };
    case TYPES.GET_PENDING_BETS:
      return {
        ...state,
        getPendingBets: actions.pendingBets,
      };
    case TYPES.CLEAN_PENDING_BETS:
      let cancelout = state.getPendingBets.filter(
        item => item.id !== actions.bet_id,
      );
      console.log('showing length', cancelout.length);
      return {
        ...state,
        getPendingBets: cancelout,
      };

    case TYPES.GET_GOLFER_LISTING:
      return {
        ...state,
        golferList: actions.golferList,
      };
    case TYPES.GET_CONTEXT_PARTY:
      return {
        ...state,
        myContest: actions.myContest,
        allContest: actions.allContest,
      };
    case TYPES.GET_CHAT_ROOMS:
      return {
        ...state,
        myChatRooms: actions.myChatRooms,
        allChatRooms: actions.allChatRooms,
      };
    case TYPES.GET_CONTEXT_ALL_QUESTION:
      return {
        ...state,
        contextAllQuestion: actions.contextAllQuestion,
        previousQuestion: actions.previousQuestion,
      };
    case TYPES.GET_USER_CONTEXT_QUESTION:
      return {
        ...state,
        // userContestQuestion: actions.userContestQuestion
        contextAllQuestion: actions.contextAllQuestion,
        previousQuestion: actions.previousQuestion,
      };
    case TYPES.GET_AWARDS:
      return {
        ...state,
        awards: actions.awards,
      };
    case TYPES.GET_CONTEST_LEADERBOARD:
      return {
        ...state,
        contestLeaderBoard: actions.contestLeaderBoard,
      };
    case TYPES.LOG_OUT:
      return {
        getUsersLists: [],
        getUserGroups: [],
        getPublicGroups: [],
        getAllBets: [],
        getMyBets: [],
      };
    case TYPES.GET_SPORTS_LIST:
      return {
        ...state,
        getSportsList: actions.payload,
      };

    case TYPES.GET_PROMOTIONAL_ADS:
      console.log('actions in get prom add', actions);
      return {
        ...state,
        promotionalAds: actions.promotionalAds,
      };
    case TYPES.GET_SPORTS_FEED:
      console.log('actions in sports feed', actions);
      return {
        ...state,
        sportsFeed: actions.sportsFeed,
      };
    case 'SCROLL_INDEX':
      return {
        ...state,
        scrollIndex: actions.payload,
      };
    case TYPES.HASHTAG_LIST:
      return {
        ...state,
        hashtags: actions.payload,
      };
    case TYPES.HASHTAGED_TAKES_LIST:
      return {
        ...state,
        filteredTakes: actions.payload,
      };
    case TYPES.MENTIONED_USERS_LIST:
      return {
        ...state,
        mentionedUsers: actions.payload,
      };

    default:
      return state;
  }
};
export default reducer;
