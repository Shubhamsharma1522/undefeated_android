// //PRODUCTION
// export const BASE_URL = 'https://api.undefeated.live/api/'; //EC2 Production 1 Https
// export const CHAT_URL = 'https://undefeated-chat.uc.r.appspot.com'; //app engine
// export const TAKES_SERVICE_URL = 'https://takesapi.undefeated.live'; //UNDEFEATAED domain linked with AWS Fargate Takes Service
// export const USER_SERVICE_URL =
//   'https://j6tm5m42ia.execute-api.us-east-2.amazonaws.com/prod/api/v1/users-service';

// STAGING
export const BASE_URL = 'http://3.19.73.226:8000/api/'; //undefeated staging instance
export const CHAT_URL = 'https://undefeated-chat.uc.r.appspot.com'; //app engine
export const USER_SERVICE_URL =
  'https://4nhao9hq1e.execute-api.us-east-2.amazonaws.com/dev/api/v1/users-service';
export const TAKES_SERVICE_URL =
  'https://takes-dot-undefeated-chat.uc.r.appspot.com';

//LOCAL
// export const BASE_URL = 'http://172.20.10.2:8000/api/'; //undefeated staging instance
// export const CHAT_URL = 'https://undefeated-chat.uc.r.appspot.com'; //app engine
// export const USER_SERVICE_URL =
//   'https://4nhao9hq1e.execute-api.us-east-2.amazonaws.com/dev/api/v1/users-service';
// // export const TAKES_SERVICE_URL =
// //   'https://takes-dot-undefeated-chat.uc.r.appspot.com';
// export const TAKES_SERVICE_URL = 'http://172.20.10.2:8001';

export const endPoints = {
  // getPresignedUrlApi: 'chat/media/uploadToS3',
  getPresignedUrlApi: 'site/media-upload/generate-presigned-url',
  login: 'site/login',
  getOtp: 'otp/get',
  verifyOtp: 'otp/verify',
  signUpUser: 'user/update',
  inviteUser: 'user/invite',
  //Bets
  addBet: 'bet/add',
  getBet: 'bet/get',
  getAllBets: 'bet/v2/all-bets',
  getMyBets: 'bet/v2/my-bets',
  getSportsBet: 'bet/quick-bet-listing',
  getGolferListing: 'bet/golfer-player-listing',
  addQuickBet: 'bet/add-quick-bet',
  forgotPassword: 'site/forget-password',
  verifyReset: 'user/verify-password-reset-token',
  resetPassword: 'user/reset-password',
  getUserList: 'user/get-list',
  deleteUserAccount: 'user/delete-account',
  reportUser: 'user/report-user',

  //WatchParty
  addWatchParty: 'watch-party/create',
  getWatchParty: 'watch-party/parties',

  // getWatchParty: 'watch-party/get-user-private-wp',
  addMemberToWatchParty: 'watch-party/update',
  deleteAMemberWatchParty: 'watch-party/update',
  joinWatchParty: 'watch-party/join-party',

  getPublicWatchParty: 'watch-party/get-user-public-wp',
  getPrivateWatchParty: 'watch-party/get-user-private-wp',

  //Groups
  addGroup: 'group/add',
  addMemberToGroup: 'group/addToGroup',
  removeFromGroup: 'group/update',
  // getUsersGroup: 'group/get-user-my-groups',
  // getPublicGroup: 'group/',
  getUsersGroup: 'group/get-groups',
  getShareInviteMessage: 'site/share-invite-friends',
  getPromotionalAds: 'contest/getPromotionalAds',
  betStatus: 'bet/accept-bet',
  likeUnlikeBet: 'bet/like-unlike-bet',
  logout: 'site/logout',
  getSportsFeed: 'site/get-sports-feed',

  pendingBets: 'bet/get-pending-bets',
  completeBets: 'bet/complete-bet-stage-1',
  completeBetsStage2: 'bet/complete-bet-stage-2',
  getBetById: 'bet/getById',
  getPublicStandings: 'user/get-stats-list',
  getMessages: 'chat/get-messages',
  sendMessages: 'chat/send-message',
  pushNotification: 'chat/pushNotification',
  sendInvites: 'user/invite',
  getUserById: 'user/get-by-id',
  getUserByAuthToken: 'user/get',
  editProfile: 'user/edit-profile',
  updateName: 'user/update-username',
  updatePhone: 'user/update-phone',
  updateBio: 'user/update-bio',
  updateFavoriteTeams: 'user/update-favorite-teams',
  verifyUpdateUserPhoneNumber: 'user/validate-new-phone',
  sendBetViaSms: 'bet/add-with-sms',

  // Chat Rooms API's
  createChatRoom: 'chatRoom/createChatRoom',
  getChatRooms: 'chatRoom/getChatRooms',
  getChatRoomById: 'chatRoom/getChatRoomById',
  joinChatRoom: 'chatRoom/join-chat-room',
  leaveChatRoom: 'chatRoom/leave-chat-room',
  addMemberToChatRoom: 'chatRoom/update',
  deleteAMemberChatRoom: 'chatRoom/update',
  sendMessagesLiveChat: 'chatRoom/send-message',
  notifyBtnPressChatRoom: 'chatRoom/notifyLiveChatMembers',
  //Contest API

  createContestWatchParty: 'contest/createContest',
  getContestWatchParty: 'contest/getContest',
  createPickemWatchParty: 'contest/createPickemContest',
  getPickemWatchParty: 'contest/getPickemContest',
  getContestAllQuestion: 'contest/getAllQuestion',
  addContestQuestion: 'contest/addQuestionsForContext',
  deleteContestQuestion: 'contest/deleteQuestion',
  getUserContestQuestion: 'contest/getContestQuestion',
  addUserAnswer: 'contest/addContestAnswer',
  addAdminAnswer: 'contest/addAdminAnswer',
  enableDisableQuestion: 'contest/enable-disable-question',
  turnOffSpecificQuestion: 'contest/enable-disable-question-status',
  enableDisableContest: 'contest/enable-disable-contest',
  getAwards: 'contest/getAwards',
  getContestLeaderBoard: 'contest/get-leaderboard',
  joinContest: 'contest/join-contest-party',
  joinPickemContest: 'contest/join-pickem-party',
  leaveContest: 'contest/leave-contest-party',
  getSportsList: 'contest/getSportsList',
  contestNotification: 'contest/contestNotification',
  enableDisableQuesnContest: 'contest/enableDisableQuesnContest',
  enableDisableQuesnAutomateContest:
    'contest/enableDisableQuesnAutomateContest',
  enableDisableContestFlag: 'contest/enableDisableContestFlag',
  notifyBtnPress: 'contest/notifyBtnPress',
  notifyContestMembers: 'contest/notifyContestMembers',

  likeDislikeTakes: 'user/report-user',
  notifyUsersLikeDislikeTakes: 'takes/takesReplyAndReactionNotification',
  notifyMentionedUsersTakes: 'takes/takesMentionedUsersNotification',
  getFollowerAndFollowingList: 'follow/get-follows',
  followOrUnfollowUser: 'follow/follow-or-unfollow',
};
export const userServiceEndpoints = {
  getMentionedUsers: '/get-mentioned-users-list',
};
export const notifyMentionedUsersApi = {};
export let uuid = '';
export let keyboardVerticalOffset = -50;
export const smallDeviceHeight = 650;

export const setUniqueValue = u => {
  uuid = u;
};
