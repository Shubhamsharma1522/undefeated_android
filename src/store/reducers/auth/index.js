import * as TYPES from '../../actions/types';
const initialState = {
  user: null,
  token: null,
};
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.ADD_USER:
      console.log('current user', actions.user);
      return {
        ...state,
        user: actions.user,
      };
    case TYPES.UPDATE_PROFILE_IMAGE:
      let updatedUser = Object.assign(state.user, {
        profile_image: actions.image,
        profile_image_url: actions.image,
      });
      console.log('showing update user', updatedUser);
      return {
        ...state,
        user: updatedUser,
      };
    case TYPES.UPDATE_COVER_IMAGE: {
      const updatedUserWithCoverImage = Object.assign(state.user, {
        cover_image: actions.image,
        cover_image_url: actions.image,
      });
      console.log('showing update user', updatedUserWithCoverImage);
      return {
        ...state,
        user: updatedUserWithCoverImage,
      };
    }
    case TYPES.CHANGE_USER_NAME:
      let updatedUserName = Object.assign(state.user, {
        firstname: actions.firstname,
        lastname: actions.lastname,
      });
      return {
        ...state,
        user: updatedUserName,
      };
    case TYPES.CHANGE_EMAIL:
      let updatedEmail = Object.assign(state.user, {
        email: actions.email,
      });
      return {
        ...state,
        user: updatedEmail,
      };
    case TYPES.CHANGE_NUMBER:
      let updatedUserNumber = Object.assign(state.user, {
        phone_number: actions.phone_number,
      });
      return {
        ...state,
        user: updatedUserNumber,
      };
    case TYPES.CHANGE_BIO: {
      let userWithUpdatedBio = {
        ...state.user,
        bio: actions.bio,
      };
      return {
        ...state,
        user: userWithUpdatedBio,
      };
    }

    case TYPES.CHANGE_FAVORITE_TEAMS: {
      const userWithUpdatedFavoriteTeams = {
        ...state.user,
        favorite_teams: actions.favorite_teams,
      };
      return {
        ...state,
        user: userWithUpdatedFavoriteTeams,
      };
    }

    case TYPES.UPDATE_FOLLOWERS_AND_FOLLOWINGS: {
      const userWithUpdatedFollows = {
        ...state.user,
        followers: actions.followers,
        followings: actions.followings,
      };
      return {
        ...state,
        user: userWithUpdatedFollows,
      };
    }

    case TYPES.LOG_OUT:
      return {
        user: null,
        token: null,
      };
    case TYPES.SAVE_TOKEN:
      return {
        token: actions.token,
      };
    default:
      return state;
  }
};
export default reducer;
