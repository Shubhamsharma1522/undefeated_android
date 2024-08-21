import {useQuery} from '@tanstack/react-query';
import {useSelector, useDispatch} from 'react-redux';
import * as storyApi from '../../services/api/methods/storyMethods';
import * as TYPES from '../../store/actions/types';

export const useGetUserFollowersAndFollowings = userId => {
  const {user: loggedInUser} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isLoggedInUserId =
    loggedInUser && loggedInUser?.id === userId ? true : false;
  const initialData = {
    followers:
      isLoggedInUserId && loggedInUser.followers ? loggedInUser.followers : [],
    followings:
      isLoggedInUserId && loggedInUser.followings
        ? loggedInUser.followings
        : [],
  };

  return useQuery({
    queryKey: ['user-follows', userId],
    enabled: Boolean(userId),
    initialData: initialData,
    keepPreviousData: true,
    queryFn: async () => {
      return storyApi
        .getFollowerAndFollowingList({
          auth_token: loggedInUser.auth_token,
          user_id: userId,
        })
        .then(res => {
          if (res.status === true && res.code === 200) {
            if (isLoggedInUserId) {
              dispatch({
                type: TYPES.UPDATE_FOLLOWERS_AND_FOLLOWINGS,
                followers: res.data.followers,
                followings: res.data.followings,
              });
            }
            return res.data;
          } else if (res.status === false && res.code === 405) {
            throw res.data;
          }
        });
    },
  });
};
