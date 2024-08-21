import Api from '../index';
import {endPoints} from '../../index';
function loginUser(params) {
  console.log('in login user action', params);
  return Api(endPoints.login, params, 'post', null);
}
function requestOtp(params) {
  return Api(endPoints.getOtp, params, 'post', null);
}
function verifyOtp(params) {
  return Api(endPoints.verifyOtp, params, 'post', null);
}
function signUpUsers(params) {
  return Api(endPoints.signUpUser, params, 'post', null);
}
function forgotPassword(params) {
  return Api(endPoints.forgotPassword, params, 'post', null);
}
function verifyResetPassword(params) {
  return Api(endPoints.verifyReset, params, 'post', null);
}
function resetPassword(params) {
  return Api(endPoints.resetPassword, params, 'post', null);
}
function inviteUsers(mobileNumber) {
  return Api(
    endPoints.inviteUser + '?phone_number=' + mobileNumber,
    null,
    'post',
    null,
  );
}
function logOut(params) {
  return Api(endPoints.logout, params, 'post', null);
}
function updateUserName(params) {
  return Api(endPoints.updateName, params, 'post', null);
}
function updatePhoneNumber(params) {
  return Api(endPoints.updatePhone, params, 'post', null);
}
function updateBio(params) {
  return Api(endPoints.updateBio, params, 'post', null);
}
function updateFavoriteTeams(params) {
  return Api(endPoints.updateFavoriteTeams, params, 'post', null);
}
function verifyUpdatedPhoneNumber(params) {
  return Api(endPoints.verifyUpdateUserPhoneNumber, params, 'post', null);
}

export {
  loginUser,
  requestOtp,
  verifyOtp,
  inviteUsers,
  signUpUsers,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
  logOut,
  updateUserName,
  updatePhoneNumber,
  updateBio,
  updateFavoriteTeams,
  verifyUpdatedPhoneNumber,
};
