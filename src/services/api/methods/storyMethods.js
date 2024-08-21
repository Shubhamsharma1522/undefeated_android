import Api from '../index';
import {endPoints} from '../../index';

function deleteAMemberWatchParty(params) {
  return Api(endPoints.deleteAMemberWatchParty, params, 'post', null);
}
function getWatchPartyList(params) {
  return Api(endPoints.getWatchParty, params, 'post', null);
}
function getPublicWatchPartyList(params) {
  console.log(',,,,+');
  return Api(endPoints.getPublicWatchParty, params, 'post', null);
}
function getPrivateWatchPartyList(params) {
  return Api(endPoints.getPrivateWatchParty, params, 'post', null);
}

function getUserList(params) {
  return Api(endPoints.getUserList, params, 'post', null);
}
function deleteUserAccount(params) {
  return Api(endPoints.deleteUserAccount, params, 'post', null);
}

function reportUser(params) {
  return Api(endPoints.reportUser, params, 'post', null);
}

function addNewGroup(params) {
  return Api(endPoints.addGroup, params, 'post', null);
}
function addNewWatchParty(params) {
  return Api(endPoints.addWatchParty, params, 'post', null);
}
function addMemberToGroup(params) {
  return Api(endPoints.addMemberToGroup, params, 'post', null);
}

function addMemberToWatchParty(params) {
  return Api(endPoints.addMemberToWatchParty, params, 'post', null);
}

function joinWatchParty(params) {
  return Api(endPoints.joinWatchParty, params, 'post', null);
}

function removeFromGroup(params) {
  return Api(endPoints.removeFromGroup, params, 'post', null);
}
function getUserGroups(params) {
  return Api(endPoints.getUsersGroup, params, 'post', null);
}
function getShareInviteMessage(params) {
  return Api(endPoints.getShareInviteMessage, params, 'post', null);
}

function getPromotionalAds(params) {
  return Api(endPoints.getPromotionalAds, params, 'post', null);
}

function getPublicGroups(params) {
  return Api(endPoints.getPublicGroup, params, 'post', null);
}
function placeNewBet(params) {
  return Api(endPoints.addBet, params, 'post', null);
}
function placeNewQuickBet(params) {
  return Api(endPoints.addQuickBet, params, 'post', null);
}

function getAllBets(params) {
  return Api(endPoints.getAllBets, params, 'post', null);
}
function getMyBets(params) {
  return Api(endPoints.getMyBets, params, 'post', null);
}
function betStatus(params) {
  return Api(endPoints.betStatus, params, 'post', null);
}
function likeUnlikeBet(params) {
  return Api(endPoints.likeUnlikeBet, params, 'post', null);
}
function fetchPendingBets(params) {
  return Api(endPoints.pendingBets, params, 'post', null);
}
function completeBetsStageOne(params) {
  return Api(endPoints.completeBets, params, 'post', null);
}
function completeBetsStageOne2(params) {
  return Api(endPoints.completeBetsStage2, params, 'post', null);
}
function getBetById(params) {
  return Api(endPoints.getBetById, params, 'post', null);
}

function getSportsBet(params) {
  return Api(endPoints.getSportsBet, params, 'post', null);
}

function getPublicStandings(params) {
  return Api(endPoints.getPublicStandings, params, 'post', null);
}
function getMessages(params) {
  return Api(endPoints.getMessages, params, 'post', null);
}
function sendMessages(params) {
  return Api(endPoints.sendMessages, params, 'post', null);
}
function pushNotification(params) {
  return Api(endPoints.pushNotification, params, 'post', null);
}
function inviteUsers(params) {
  return Api(endPoints.inviteUser, params, 'post', null);
}
function getUserById(params) {
  return Api(endPoints.getUserById, params, 'post', null);
}
function getUserByAuthToken(params) {
  return Api(endPoints.getUserByAuthToken, params, 'post', null);
}
function editProfile(params) {
  return Api(endPoints.editProfile, params, 'post', null);
}
function sendSms(params) {
  return Api(endPoints.sendBetViaSms, params, 'post', null);
}

function getGolferListing(params) {
  // console.log(endPoints.getGolferListing,"ENDPOINT")
  return Api(endPoints.getGolferListing, params, 'post', null);
}

// Chat Rooms
function addChatRoom(params) {
  return Api(endPoints.createChatRoom, params, 'post', null);
}
function getChatRooms(params) {
  return Api(endPoints.getChatRooms, params, 'post', null);
}
function getChatRoomById(params) {
  return Api(endPoints.getChatRoomById, params, 'post', null);
}

function joinChatRoom(params) {
  return Api(endPoints.joinChatRoom, params, 'post', null);
}
function leaveChatRoom(params) {
  return Api(endPoints.leaveChatRoom, params, 'post', null);
}
function addMemberToChatRoom(params) {
  return Api(endPoints.addMemberToChatRoom, params, 'post', null);
}
function deleteAMemberChatRoom(params) {
  return Api(endPoints.deleteAMemberChatRoom, params, 'post', null);
}
function notifyBtnPressChatRoom(params) {
  return Api(endPoints.notifyBtnPressChatRoom, params, 'post', null);
}
function sendMessagesLiveChat(params) {
  return Api(endPoints.sendMessagesLiveChat, params, 'post', null);
}
//Contest
function addContestwatchParty(params) {
  return Api(endPoints.createContestWatchParty, params, 'post', null);
}

function addPickemWatchParty(params) {
  return Api(endPoints.createPickemWatchParty, params, 'post', null);
}

function getContestwatchParty(params) {
  return Api(endPoints.getContestWatchParty, params, 'post', null);
}

function getPickemWatchParty(params) {
  return Api(endPoints.getPickemWatchParty, params, 'post', null);
}

//contest-admin
function getContestAllQuestions(params) {
  return Api(endPoints.getContestAllQuestion, params, 'post', null);
}
//contest-admin
function addContestQuestion(params) {
  return Api(endPoints.addContestQuestion, params, 'post', null);
}
function deleteContestQuestion(params) {
  return Api(endPoints.deleteContestQuestion, params, 'post', null);
}

function getUserContestQuestion(params) {
  return Api(endPoints.getUserContestQuestion, params, 'post', null);
}

function addUserAnswer(params) {
  return Api(endPoints.addUserAnswer, params, 'post', null);
}

function addAdminAnswer(params) {
  return Api(endPoints.addAdminAnswer, params, 'post', null);
}

function enableDisableQuestion(params) {
  return Api(endPoints.enableDisableQuestion, params, 'post', null);
}
function turnOffSpecificQuestion(params) {
  return Api(endPoints.turnOffSpecificQuestion, params, 'post', null);
}
function enableDisableContest(params) {
  return Api(endPoints.enableDisableContest, params, 'post', null);
}

function enableDisableQuesnContest(params) {
  return Api(endPoints.enableDisableQuesnContest, params, 'post', null);
}
function enableDisableQuesnAutomateContest(params) {
  return Api(endPoints.enableDisableQuesnAutomateContest, params, 'post', null);
}

function enableDisableContestFlag(params) {
  return Api(endPoints.enableDisableContestFlag, params, 'post', null);
}

function getAwards(params) {
  return Api(endPoints.getAwards, params, 'post', null);
}

function getContestLeaderBoard(params) {
  return Api(endPoints.getContestLeaderBoard, params, 'post', null);
}
function joinContest(params) {
  return Api(endPoints.joinContest, params, 'post', null);
}

function joinPickemContest(params) {
  return Api(endPoints.joinPickemContest, params, 'post', null);
}

function leaveContest(params) {
  return Api(endPoints.leaveContest, params, 'post', null);
}

function getSportList(params) {
  return Api(endPoints.getSportsList, params, 'post', null);
}

function contestNotification(params) {
  return Api(endPoints.contestNotification, params, 'post', null);
}

function notifyBtnPress(params) {
  return Api(endPoints.notifyBtnPress, params, 'post', null);
}

function notifyContestMembers(params) {
  return Api(endPoints.notifyContestMembers, params, 'post', null);
}
function getSportsFeedApi(params) {
  return Api(endPoints.getSportsFeed, params, 'post', null);
}

function getPresignedUrl(params) {
  return Api(endPoints.getPresignedUrlApi, params, 'post', null);
}
function notifyUsersLikeDislikeTakesApi(params) {
  return Api(endPoints.notifyUsersLikeDislikeTakes, params, 'post', null);
}

function notifyUsersTakesApi(params) {
  return Api(endPoints.notifyMentionedUsersTakes, params, 'post', null);
}
function getFollowerAndFollowingList(params) {
  return Api(endPoints.getFollowerAndFollowingList, params, 'post', null);
}
function followOrUnfollowUser(params) {
  return Api(endPoints.followOrUnfollowUser, params, 'post', null);
}

export {
  getSportsFeedApi,
  getUserList,
  addNewGroup,
  addNewWatchParty,
  addMemberToWatchParty,
  addMemberToGroup,
  removeFromGroup,
  getUserGroups,
  getPublicGroups,
  placeNewBet,
  getAllBets,
  getMyBets,
  betStatus,
  likeUnlikeBet,
  fetchPendingBets,
  completeBetsStageOne,
  completeBetsStageOne2,
  getBetById,
  getSportsBet,
  placeNewQuickBet,
  getPublicStandings,
  getMessages,
  sendMessages,
  pushNotification,
  inviteUsers,
  getUserById,
  getUserByAuthToken,
  editProfile,
  sendSms,
  getWatchPartyList,
  getPublicWatchPartyList,
  getPrivateWatchPartyList,
  deleteAMemberWatchParty,
  getGolferListing,
  joinWatchParty,
  addContestwatchParty,
  getContestwatchParty,
  addPickemWatchParty,
  getPickemWatchParty,
  getContestAllQuestions,
  addContestQuestion,
  deleteContestQuestion,
  getUserContestQuestion,
  addUserAnswer,
  addAdminAnswer,
  enableDisableQuestion,
  enableDisableContest,
  getAwards,
  getContestLeaderBoard,
  joinContest,
  leaveContest,
  getSportList,
  contestNotification,
  enableDisableQuesnContest,
  enableDisableQuesnAutomateContest,
  notifyBtnPress,
  notifyContestMembers,
  deleteUserAccount,
  reportUser,
  joinPickemContest,
  turnOffSpecificQuestion,
  getShareInviteMessage,
  addChatRoom,
  getChatRooms,
  joinChatRoom,
  leaveChatRoom,
  addMemberToChatRoom,
  deleteAMemberChatRoom,
  notifyBtnPressChatRoom,
  sendMessagesLiveChat,
  getChatRoomById,
  enableDisableContestFlag,
  getPromotionalAds,
  getPresignedUrl,
  notifyUsersLikeDislikeTakesApi,
  notifyUsersTakesApi,
  getFollowerAndFollowingList,
  followOrUnfollowUser
};
