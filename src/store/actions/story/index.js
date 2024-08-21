import * as TYPES from '../types';
import * as Util from '../../../services';
import * as TASKS from '../index';
import * as storyApi from '../../../services/api/methods/storyMethods';
import * as userServiceStoryApi from '../../../services/api/methods/userServiceStoryMethods';
import axios from 'axios';
import {TAKES_SERVICE_URL} from '../../../services/constants';

export const sendSms = data => async dispatch => {
  // _POST('/send/sms', data).then(res => {
  //   console.log('sms resp', res);
  // });
};

export const setChatLoading = state => async dispatch => {
  dispatch({
    type: 'CHAT_LOADING',
    payload: state,
  });
  if (state) {
    setTimeout(() => {
      dispatch({
        type: 'CHAT_LOADING',
        payload: false,
      });
    }, 5000);
  }
};
export const setTakesLoading = state => async dispatch => {
  dispatch({
    type: TYPES.TAKES_LOADING,
    payload: state,
  });
  if (state) {
    setTimeout(() => {
      dispatch({
        type: TYPES.TAKES_LOADING,
        payload: false,
      });
    }, 5000);
  }
};
export const deleteUserAccount = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.deleteUserAccount(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const reportUser = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.reportUser(params);
      Util.showToast('User reported successfully!', true);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        console.log('report-user-api', api);
        // Util.showToast(Util.APPLICATION_CONSTANTS.userReported);
        // return Util.showToast('User reported successfully!');
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const likeDislikeTakes = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      //  await storyApi.reportUser(params);
      let api = await axios.post(
        TAKES_SERVICE_URL + '/like-dislike-takes',
        params,
      );
      console.log('like-dislike-api', api);
      // Util.showToast('User reported successfully!', true);
      dispatch(TASKS.hideLoader());
      if (
        api.data &&
        api.data.status == true &&
        api.data.code == 200 &&
        api.data.data.isTakeAlreadyLiked == false
      ) {
        dispatch(
          notifyUsersLikesDislike({
            sender_auth_token: params.sender_auth_token,
            receiver_slug: params.receiver_slug,
            notification_type: params.type,
            takes_message: params.takes_message,
          }),
        );
      } else if (api && api.data && api.data.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getHashtags = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await axios.post(
        TAKES_SERVICE_URL + `/get-hashtag-list`,
        params,
      );
      console.log('get-hashtag-list', api);
      // Util.showToast('User reported successfully!', true);
      dispatch(TASKS.hideLoader());
      if (api.data && api.data.status == true && api.data.code == 200) {
        dispatch({
          type: TYPES.HASHTAG_LIST,
          payload: api.data.data,
        });
      } else {
        dispatch({
          type: TYPES.HASHTAG_LIST,
          payload: [],
        });
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getMentionedUsersList = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    console.log('get-mentioned-users-list');
    try {
      let api = await userServiceStoryApi.getMentionedUsers(params);
      console.log('getMentionedUsersList', api);
      // Util.showToast('User reported successfully!', true);
      // dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        console.log('getMentionedUsersList', api);
        dispatch({
          type: TYPES.MENTIONED_USERS_LIST,
          payload: api.data,
        });
      } else {
        dispatch({
          type: TYPES.MENTIONED_USERS_LIST,
          payload: [],
        });
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getTakesFilteredByHashtag = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await axios.post(
        TAKES_SERVICE_URL + `/get-filtered-takes-by-hashtag`,
        params,
      );
      console.log('get-filtered-takes-by-hashtag', api);

      dispatch(TASKS.hideLoader());
      if (api.data && api.data.status == true && api.data.code == 200) {
        dispatch({
          type: TYPES.HASHTAGED_TAKES_LIST,
          payload: api.data.data,
        });
      } else {
        dispatch({
          type: TYPES.HASHTAGED_TAKES_LIST,
          payload: [],
        });
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const notifyUsersLikesDislike = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.notifyUsersLikeDislikeTakesApi(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.userReported);
        // return Util.showToast('User reported successfully!');
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const notifyMentionedUsers = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.notifyUsersTakesApi(params);
      console.log({api});
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.userReported);
        // return Util.showToast('User reported successfully!');
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getUserList = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getUserList(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (api.data.length > 0) {
          api.data.forEach(item => {
            item.isSelected = false;
          });
        }

        dispatch({
          type: TYPES.GET_USER_LISTS,
          userList: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const addNewGroup = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addNewGroup(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.GET_USER_GROUPS,
          userList: api.data,
        });
        Util.navigate('Home', {refresh: true});
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addMemberToGroup = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addMemberToGroup(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Home', {refresh: true});
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addMemberToWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addMemberToWatchParty(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // getWatchParty(params)
        // await storyApi.getWatchPartyList(params);
        if (params && params.isJoin === true) {
          Util.navigate('Home', {refresh: true});
        }
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const joinWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.joinWatchParty(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // getWatchParty(params)
        // await storyApi.getWatchPartyList(params);
        // if (params && params.isJoin === true) {
        // Util.navigate('Home', {refresh: true});

        Util.navigate('WatchParty', {key: 0});
        // }
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const removeFromGroup = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.removeFromGroup(params);
      // console.log('resposne from api', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Home', {refresh: true});
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getUserGroups = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getUserGroups(params);
      console.log('[getUserGroups]', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (api.data.length > 0) {
          api.data.MY_GROUPS.forEach(item => {
            item.isSelected = false;
          });
          api.data.ALL_GROUPS.forEach(item => {
            item.isSelected = false;
          });
        }
        dispatch({
          type: TYPES.GET_USER_GROUPS,
          userGroups: api.data.MY_GROUPS,
          allGroups: api.data.ALL_GROUPS,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getShareInviteFriends = () => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getShareInviteMessage();
      console.log('[getShareInviteFriends]', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        return api.data;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getPromotionalAds = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPromotionalAds(params);
      console.log('[getPromotionalAds]', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // return api.data;
        dispatch({
          type: TYPES.GET_PROMOTIONAL_ADS,
          promotionalAds: api.data.promotional_ads,
        });
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getPublicGroups = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPublicGroups(params);
      console.log('api data', api.data);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // if (api.data.length > 0) {
        //   api.data.forEach(item => {
        //     item.isSelected = false;
        //   });
        // }
        dispatch({
          type: TYPES.GET_PUBLIC_GROUPS,
          publicGroups: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

// Watch Party

export const addNewWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addNewWatchParty(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Home', {refresh: true});
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getWatchParty = params => {
  console.log('INSIDE GET WATCH PARTY CALLED!');
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getWatchPartyList(params);

      dispatch(TASKS.hideLoader());
      // console.log('API******', api);
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()

        dispatch({
          type: TYPES.GET_ALL_WATCH_PARTY,
          allWatchParty: api.data.ALL_WATCH_PARTY,
          myWatchParty: api.data.MY_WATCH_PARTY,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const deleteAMemberWatchParty = params => {
  console.log('INSIDE deleteAMemberWatchParty');
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.deleteAMemberWatchParty(params);

      dispatch(TASKS.hideLoader());
      // console.log("deleteAMemberWatchParty******",api)
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        // dispatch({
        //   type:TYPES.GET_ALL_WATCH_PARTY,
        //   allWatchParty:api.data.ALL_WATCH_PARTY,
        //   myWatchParty:api.data.MY_WATCH_PARTY
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getPublicWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPublicWatchParty(params);
      console.log(',,,,,,,', api);
      dispatch(TASKS.hideLoader());
      console.log('INSIDE PUBLIC WP!', api);
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()

        dispatch({
          type: TYPES.GET_PUBLIC_WATCH_PARTY,
          publicWatchParty: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getPrivateWatchParty = params => {
  console.log('INSIDE PRIVATE WATCH PARTY!');
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPrivateWatchParty(params);

      dispatch(TASKS.hideLoader());
      console.log('API******', api);
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()

        dispatch({
          type: TYPES.GET_PRIVATE_WATCH_PARTY,
          privateWatchParty: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addNewBet = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.placeNewBet(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced);
        Util.back();
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getAllBets = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getAllBets(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        dispatch({
          type: TYPES.GET_ALL_BETS,
          allBets: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getMyBets = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getMyBets(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        dispatch({
          type: TYPES.GET_MY_BETS,
          myBets: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const betsStatus = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.betStatus(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const betSendViaMessage = (params, success) => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.sendSms(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced);
        Util.back();
        success(true);
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
const likeParams = params => {
  console.log('showing params passed', params);
  return {
    type: TYPES.LIKE_BET_UPDATE,
    id: params,
  };
};

export const updateLikeBet = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    dispatch(likeParams(params));

    try {
      let api = await storyApi.likeUnlikeBet(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};
export const getPendingBets = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.fetchPendingBets(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        dispatch({
          type: TYPES.GET_PENDING_BETS,
          pendingBets: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getSportsBet = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getSportsBet(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        dispatch({
          type: TYPES.GET_SPORTS_BETS,
          sportsBet: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addNewQuickBet = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.placeNewQuickBet(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced);
        Util.back();
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getPublicStandings = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPublicStandings(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        dispatch({
          type: TYPES.GET_PUBLIC_STANDINGS,
          publicStanding: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const completeBetStageOne = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.completeBetsStageOne(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        Util.back();
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const completeBetStageOne2 = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.completeBetsStageOne2(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        Util.navigate('Home');
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getMessages = (params, success) => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getMessages(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        success(api.data);

        // dispatch({
        //   type:TYPES.GET_MESSAGES,
        //   message:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const sendMessages = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.sendMessages(params);
      dispatch(TASKS.hideLoader());
      console.log('API MESSAGE', api);
      if (api.status == true && api.code == 200) {
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

//Action which calls the api pushNotification
export const pushNotification = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.pushNotification(params);
      dispatch(TASKS.hideLoader());
      console.log('API MESSAGE', api);
      if (api.status == true && api.code == 200) {
        Util.showToast('Notification sent');
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

//Firebase groupMessages : stores the messages inside groupChat -> groupId ->messages - > messageId
export const groupsenderMsg = async (
  msgValue,
  currentUserId,
  groupId,
  img,
  senderImage,
  userName,
) => {
  //Disabled AFTER REDIS CHAT V2
  // console.log('groupsenderMsg', {
  //   messege: {
  //     sender: currentUserId,
  //     userName,
  //     reciever: groupId,
  //     msg: msgValue,
  //     img: img,
  //     avatar: senderImage,
  //   },
  //   seenBy: currentUserId,
  // });
  // try {
  //   return await firebase
  //     .database()
  //     .ref('groupChat/' + groupId)
  //     .child('messages')
  //     .push({
  //       messege: {
  //         sender: currentUserId,
  //         userName,
  //         reciever: groupId,
  //         msg: msgValue,
  //         img: img,
  //         avatar: senderImage,
  //       },
  //       seenBy: currentUserId,
  //     });
  // } catch (error) {
  //   return console.log(error);
  // }
};

//Firebase sending private message : stores message inside messages -> CurrentUserId -> receiverId
export const senderMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
  senderImage,
  userName,
) => {
  console.log('senderMsg', userName);
  //Disabled AFTER REDIS CHAT
  // try {
  //   return await firebase
  //     .database()
  //     .ref('messeges/' + currentUserId)
  //     .child(guestUserId)
  //     .push({
  //       messege: {
  //         sender: currentUserId,
  //         reciever: guestUserId,
  //         msg: msgValue,
  //         img: img,
  //         avatar: senderImage,
  //         userName,
  //       },
  //     });
  // } catch (error) {
  //   return error;
  // }
};

//Firebasse reciveMsg : Stores the message as messages->reciverId->senderId->MessageId->message
export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
  senderImage,
  userName,
) => {
  //Disabled AFTER REDIS CHAT
  // console.log(
  //   'recieverMsg',
  //   msgValue,
  //   currentUserId,
  //   guestUserId,
  //   img,
  //   userName,
  // );
  // try {
  //   return await firebase
  //     .database()
  //     .ref('messeges/' + guestUserId)
  //     .child(currentUserId)
  //     .push({
  //       messege: {
  //         sender: currentUserId,
  //         reciever: guestUserId,
  //         msg: msgValue,
  //         img: img,
  //         avatar: senderImage,
  //         userName,
  //       },
  //     });
  // } catch (error) {
  //   return error;
  // }
};

//Firebase getPrivateChat : fetch all the messages for the particular users
export const getPrivateChat = async (currentUserId, guestUserId) => {
  console.log('recieverMsg', currentUserId, guestUserId);
  //Disabled AFTER REDIS CHAT
  // try {
  //   let msgs = [];
  //   await firebase
  //     .database()
  //     .ref('messeges')
  //     .child(currentUserId)
  //     .child(guestUserId)
  //     .on('value', dataSnapshot => {
  //       dataSnapshot.forEach(child => {
  //         msgs.push({
  //           sendBy: child.val().messege.sender,
  //           recievedBy: child.val().messege.reciever,
  //           msg: child.val().messege.msg,
  //           img: child.val().messege.img,
  //         });
  //       });
  //     });
  //   return msgs;
  // } catch (error) {
  //   return error;
  // }
};

//Firebase getGroupChat : fetch all the messages for a particular group
export const getGroupChat = async guestUserId => {
  // console.log('recieverMsg',msgValue, currentUserId, guestUserId, img);
  //Disabled AFTER REDIS CHAT
  // try {
  //   let msgs = [];
  //   await firebase
  //     .database()
  //     .ref('groupChat/' + guestUserId)
  //     .child('messages')
  //     .on('value', dataSnapshot => {
  //       dataSnapshot.forEach(child => {
  //         // console.log("fetchinnggg..", child.val());
  //         msgs.push({
  //           sendBy: child.val().messege.sender,
  //           recievedBy: child.val().messege.reciever,
  //           msg: child.val().messege.msg,
  //           img: child.val().messege.img,
  //         });
  //       });
  //     });
  //   return msgs;
  // } catch (error) {
  //   return error;
  // }
};

export const sendInvites = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.inviteUsers(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Promote Invitation Sent Successfully.');
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const editProfile = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.editProfile(params);
      // dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Profile updated successfully ! ');
        Util.navigate('Settings');
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getUserById = (params, success) => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getUserById(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        success(api.data);
        // return api.data;
        // dispatch({
        //   type:TYPES.GET_MESSAGES,
        //   message:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getUserByAuthToken = params => {
  return async dispatch => {
    try {
      let api = await storyApi.getUserByAuthToken(params);
      console.log({api_PPPP: api});
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code === 200) {
        return api.data;
      } else if (api.code == 405) {
        dispatch(TASKS.logout(params));
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const deletePendingBet = id => {
  return dispatch => {
    dispatch({
      type: TYPES.CLEAN_PENDING_BETS,
      bet_id: id,
    });
  };
};

export const getGolferListing = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getGolferListing(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // if (api.data.length > 0) {
        //   api.data.forEach(item => {
        //     item.isSelected = false;
        //   });
        // }

        dispatch({
          type: TYPES.GET_GOLFER_LISTING,
          golferList: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedFetchingUserList)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

// Chat Room API's
export const addNewChatRoom = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addChatRoom(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomCreated);
        if (params.role === 1) {
          Util.navigate('ChatRooms', {refresh: true});
        } else {
          Util.navigate('Home', {refresh: true});
        }
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getChatRooms = params => {
  console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', params);
  return async dispatch => {
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE dispatch', params);
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getChatRooms(params);
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE API', api);
      console.log('all chat room data', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        dispatch({
          type: TYPES.GET_CHAT_ROOMS,
          myChatRooms: api.data.MyChatRooms,
          allChatRooms: api.data.AllChatRooms,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      }
      return;
    } catch (error) {
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ERROr', error);
      dispatch(TASKS.hideLoader());
    }
  };
};
export const getChatRoomById = params => {
  return async dispatch => {
    // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE dispatch', params);
    console.log(
      '🚀 ~ file: index.js:1053 ~ getChatRoomById ~ getChatRoomById:',
      params,
    );
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getChatRoomById(params);
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE API', api);
      console.log('getChatRoomById data', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        return api.data;
        // Util.navigate('Home', {refresh: true});
        // dispatch({
        //   type: TYPES.GET_CHAT_ROOMS,
        //   myChatRooms: api.data.MyChatRooms,
        //   allChatRooms: api.data.AllChatRooms,
        // });
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.chatRoomNotCreated);
      }
      return;
    } catch (error) {
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ERROr', error);
      dispatch(TASKS.hideLoader());
    }
  };
};

export const joinChatRoom = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.joinChatRoom(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Successfully joined Huddle!');
        // getWatchParty(params)
        // await storyApi.getWatchPartyList(params);
        // if (params && params.isJoin === true) {
        //   Util.navigate('Home', {refresh: true});
        // }
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const leaveChatRoom = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.leaveChatRoom(params);

      dispatch(TASKS.hideLoader());
      // console.log("deleteAMemberWatchParty******",api)
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        // dispatch({
        //   type:TYPES.GET_ALL_WATCH_PARTY,
        //   allWatchParty:api.data.ALL_WATCH_PARTY,
        //   myWatchParty:api.data.MY_WATCH_PARTY
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addMemberToChatRoom = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addMemberToChatRoom(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // getWatchParty(params)
        // await storyApi.getWatchPartyList(params);
        if (params && params.isJoin === true) {
          Util.navigate('Home', {refresh: true});
        }
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const deleteAMemberChatRoom = params => {
  console.log('INSIDE deleteAMemberChatRoom');
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.deleteAMemberChatRoom(params);

      dispatch(TASKS.hideLoader());
      // console.log("deleteAMemberWatchParty******",api)
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        //  Util.showToast(Util.APPLICATION_CONSTANTS.BetPlaced)
        //  Util.back()
        // dispatch({
        //   type:TYPES.GET_ALL_WATCH_PARTY,
        //   allWatchParty:api.data.ALL_WATCH_PARTY,
        //   myWatchParty:api.data.MY_WATCH_PARTY
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const notifyBtnPressChatRoom = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.notifyBtnPressChatRoom(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Notification sent');
      } else if (api.code == 405) {
        Util.showToast('Unable to send notification.');
      } else {
        Util.showToast('Unable to send notification.');
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const sendMessageLiveChat = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.sendMessagesLiveChat(params);
      dispatch(TASKS.hideLoader());
      console.log('API MESSAGE', api);
      if (api.status == true && api.code == 200) {
        // dispatch({
        //   type:TYPES.GET_PENDING_BETS,
        //   pendingBets:api.data
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
//Contest api
export const addNewContestWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addContestwatchParty(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Home', {refresh: true});
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addNewPickemWatchParty = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addPickemWatchParty(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Home', {refresh: true});
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.pickemWatchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.pickemWatchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getContestWatchParty = params => {
  // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', params);
  return async dispatch => {
    // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE dispatch', params);
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getContestwatchParty(params);
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE API', api);
      console.log('all watch part data', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        dispatch({
          type: TYPES.GET_CONTEXT_PARTY,
          myContest: api.data.MyContest,
          allContest: api.data.AllContest,
        });
      } else if (api.code == 405) {
        // Util.showToast('');
        return false;
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ERROr', error);
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getPickemWatchParty = params => {
  // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', params);
  return async dispatch => {
    // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE dispatch', params);
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPickemWatchParty(params);
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE API', api);
      console.log('all pickem watch part data', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        dispatch({
          type: TYPES.GET_PICKEM_CONTEXT_PARTY,
          myPickemContest: api.data.MyContest,
          allPickemContest: api.data.AllContest,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.pickemWatchPartyNotCreated);
        return false;
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.pickemWatchPartyNotCreated);
        return false;
      }
    } catch (error) {
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ERROr', error);
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getContestAllQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getContestAllQuestions(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        console.log('getContestAllQuestions', api);
        dispatch({
          type: TYPES.GET_CONTEXT_ALL_QUESTION,
          contextAllQuestion: api.data.selectQuestion,
          previousQuestion: api.data.previousQuestion,
        });
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addContestQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addContestQuestion(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // console.log("ADD CONECT QUESTION",api)
        Util.showToast('Added');
        // Util.navigate('Home', {refresh: true});

        // dispatch({
        //   type: TYPES.GET_CONTEXT_ALL_QUESTION,
        //   contextAllQuestion: api.data
        // });
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.ADD_CONTEXT_QUESTION_ERROR);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.ADD_CONTEXT_QUESTION_ERROR);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const deleteContestQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.deleteContestQuestion(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        console.log('DElete CONECT QUESTION', api);
        Util.showToast('Removed');
        // Util.navigate('Home', {refresh: true});

        // dispatch({
        //   type: TYPES.GET_CONTEXT_ALL_QUESTION,
        //   contextAllQuestion: api.data
        // });
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.ADD_CONTEXT_QUESTION_ERROR);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.ADD_CONTEXT_QUESTION_ERROR);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getUserContestQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getUserContestQuestion(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.navigate('Home', {refresh: true});
        console.log('getContestAllQuestions', api);
        dispatch({
          type: TYPES.GET_USER_CONTEXT_QUESTION,
          contextAllQuestion: api.data.activeQuestions,
          previousQuestion: api.data.previousQuestions,
          // userContestQuestion: api.data
        });
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addUserAnswer = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addUserAnswer(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Submitted');
        return true;
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        Util.showToast(Util.APPLICATION_CONSTANTS.questionAnswerTimeout);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const addAdminAnswer = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.addAdminAnswer(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Submitted');
        return true;
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const enableDisableQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.enableDisableQuestion(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.showToast("Submitted")
        //   return true
        if (params.enable) {
          Util.showToast('Questions Enabled');
        } else {
          Util.showToast('Questions Disabled');
        }
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const turnOffSpecificQuestion = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.turnOffSpecificQuestion(params);
      dispatch(TASKS.hideLoader());
      if (api.status === true && api.code === 200) {
        Util.showToast('Question turned OFF');
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.turnoffQuestion);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.turnoffQuestion);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const enableDisableContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.enableDisableContest(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (params.enable) {
          Util.showToast('Questions Enabled');
        } else {
          Util.showToast('Questions Disabled');
        }
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const enableDisableQuesnContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.enableDisableQuesnContest(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (params.enable) {
          Util.showToast('Questions Enabled');
        } else {
          Util.showToast('Questions Disabled');
        }
      } else if (api.code == 405) {
        console.log('api data enable quest 405', api);
        params.enable
          ? Util.showToast('Unable to enable the questions')
          : Util.showToast('Unable to disbale the questions');
      } else {
        console.log('api data enable quest else', api);
        params.enable
          ? Util.showToast('Unable to enable the questions')
          : Util.showToast('Unable to disbale the questions');
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
      Util.showToast('Something went wrong! Please try again.');
    }
  };
};

export const enableDisableQuesnAutomateContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.enableDisableQuesnAutomateContest(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (params.enable) {
          Util.showToast('Questions Automate Enabled');
        } else {
          Util.showToast('Questions Automate Disabled');
        }
        return true;
      } else if (api.code == 405) {
        console.log('api data enable quest 405', api);
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        console.log('api data enable quest else', api);
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
      return false;
    }
  };
};

export const enableDisableContestFlag = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.enableDisableContestFlag(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (params.enable) {
          Util.showToast('Contest Flagged Successfully');
        } else {
          Util.showToast('Removed Contest Flag');
        }
        return true;
      } else if (api.code == 405) {
        console.log('api data enable quest 405', api);
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      } else {
        console.log('api data enable quest else', api);
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
      return false;
    }
  };
};

export const contestNotification = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.contestNotification(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (params.enable == true) {
          Util.showToast('Contest Party Enabled!');
        } else {
          Util.showToast('Contest Party Disabled!');
        }

        return true;
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyDisableEnable);
        return false;
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyDisableEnable);
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
      return false;
    }
  };
};

export const notifyBtnPress = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.notifyBtnPress(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Notification sent');
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const notifyContestMembers = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.notifyContestMembers(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Notification sent');
      } else if (api.code == 405) {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getAwards = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getAwards(params);
      // dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.showToast("Questions Disabled");
        dispatch({
          type: TYPES.GET_AWARDS,
          awards: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};

export const getContestLeaderBoard = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getContestLeaderBoard(params);
      // dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // Util.showToast("Questions Disabled");
        dispatch({
          type: TYPES.GET_CONTEST_LEADERBOARD,
          contestLeaderBoard: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.watchPartyNotCreated);
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};

export const joinContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.joinContest(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast('Successfully joined Contest!');
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const joinPickemContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.joinPickemContest(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        await Util.showToast('Successfully joined Pickem!');
        // getWatchParty(params)
        // await storyApi.getWatchPartyList(params);
        // if (params && params.isJoin === true) {
        //   Util.navigate('Home', {refresh: true});
        // }
      } else if (api.code == 405) {
        Util.showToast('Invalide contest code.');
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.contestCodeError);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const leaveContest = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.leaveContest(params);

      dispatch(TASKS.hideLoader());
      // console.log("deleteAMemberWatchParty******",api)
      if (api.status == true && api.code == 200) {
        Util.showToast(`You've successfully left the contest!`);
        //  Util.back()
        // dispatch({
        //   type:TYPES.GET_ALL_WATCH_PARTY,
        //   allWatchParty:api.data.ALL_WATCH_PARTY,
        //   myWatchParty:api.data.MY_WATCH_PARTY
        // })
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getSportList = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      // console.log('actionchal rha h na');
      let api = await storyApi.getSportList(params);

      dispatch(TASKS.hideLoader());
      console.log('sportslist******', api);
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.GET_SPORTS_LIST,
          payload: api.data,
        });
      } else if (api.code == 405) {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.groupNotCreated)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};

export const getSportsFeed = params => {
  // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', params);
  return async dispatch => {
    // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE dispatch', params);
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getSportsFeedApi(params);
      console.log('Sprots Feed', api);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.GET_SPORTS_FEED,
          sportsFeed: api.data,
        });
      } else if (api.code == 405) {
        Util.showToast('Sports Feed Failed');
      } else {
        // Util.showToast('Sports Feed Failed!');
      }
    } catch (error) {
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ERROr', error);
      dispatch(TASKS.hideLoader());
    }
  };
};

export const generatePresingedUrl = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await storyApi.getPresignedUrl(params);
      console.log('API_NEW', {api});
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        return api.data;
      } else {
        console.log('api data enable quest else', api);
        // Util.showToast('Unable to upload file');.
        return false;
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
      return false;
      // Util.showToast('Something went wrong! Please try again.');
    }
  };
};
