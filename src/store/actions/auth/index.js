import * as TYPES from '../types';
import * as Util from '../../../services';
import * as TASKS from '../index';
import * as AuthenticationApi from '../../../services/api/methods/authenticationMethods';

export const requestOtp = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.requestOtp(params);
    
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        console.log({api})
       return Util.navigate('VerifyCode', {params});
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSendingOtp);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const forgotPassword = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.forgotPassword(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('VerifyCode', {params});
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSendingOtp);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const verifyResetPassword = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.verifyResetPassword(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('ResetPassword', {params});
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSendingOtp);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const resetPassword = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.resetPassword(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.showToast(Util.APPLICATION_CONSTANTS.passwordUpdated);
        Util.navigate('Login');
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSendingOtp);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const verifyOtp = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.verifyOtp(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        if (api.data) {
          dispatch({
            type: TYPES.SAVE_TOKEN,
            token: api.data.auth_token,
          });
          Util.navigate('SignUp');
        }
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.invalidCode);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const verifyOtpUpdated = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.verifyUpdatedPhoneNumber(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        // if(api.data){
        dispatch({
          type: TYPES.CHANGE_NUMBER,
          phone_number: params.new_phone,
        });
        //   Util.navigate('SignUp')
        // }
        Util.showToast('You have updated number successfully !');
        Util.navigate('Home');
      } else if (api.code == 405) {
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.invalidCode)
      }
    } catch (error) {
      alert(error);
      // dispatch(TASKS.hideLoader());
      console.log('showing error ', error);
    }
  };
};
export const signUpUsers = params => {
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.signUpUsers(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.ADD_USER,
          user: api.data,
        });
        // Util.navigate('FriendList')
        Util.navigate('Settings');
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp);
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const loginUser = (params,callback) => {
  // console.log('showing params',params)
  return async dispatch => {
    dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.loginUser(params);
      dispatch(TASKS.hideLoader());
      console.log('showing api called and error', api, params);
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.ADD_USER,
          user: api.data,
        });
        callback(api.data)
        // Util.navigate('Home');
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp);
      }
      return api;
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
export const updateUserName = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.updateUserName(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('Settings');
      } else if (api.code == 405) {
        Util.showToast('Failed to update firstname and lastname');
      } else {
        Util.showToast('Failed to update firstname and lastname');
      }
    } catch (error) {
      Util.showToast('Failed to update firstname and lastname');
      // dispatch(TASKS.hideLoader());
    }
  };
};
export const updateUserPhoneNumber = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.updatePhoneNumber(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        Util.navigate('VerifyCode', {params, changeNumber: true});

        // dispatch({
        //   type:TYPES.ADD_USER,
        //   user:api.data
        // })
        // Util.navigate('Home')
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp)
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};
export const updateBio = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.updateBio(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.CHANGE_BIO,
          bio: api.data.bio,
        });
        Util.navigate('Settings');
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp)
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};
export const updateFavoriteTeams = params => {
  return async dispatch => {
    // dispatch(TASKS.showLoader());
    try {
      let api = await AuthenticationApi.updateFavoriteTeams(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.CHANGE_FAVORITE_TEAMS,
          favorite_teams: api.data.favorite_teams,
        });
        Util.navigate('Settings');
      } else if (api.code == 405) {
        Util.showToast(api.data);
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp)
      }
    } catch (error) {
      // dispatch(TASKS.hideLoader());
    }
  };
};
export const logout = params => {
  return async dispatch => {
    try {
      let api = await AuthenticationApi.logOut(params);
      dispatch(TASKS.hideLoader());
      if (api.status == true && api.code == 200) {
        dispatch({
          type: TYPES.LOG_OUT,
        });
        Util.navigate('AuthStack');
      } else if (api.code == 405) {
        // Util.showToast(api.data)
      } else {
        // Util.showToast(Util.APPLICATION_CONSTANTS.failedSignUp)
      }
    } catch (error) {
      dispatch(TASKS.hideLoader());
    }
  };
};
