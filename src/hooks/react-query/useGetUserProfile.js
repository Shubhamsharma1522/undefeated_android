import {useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import * as storyApi from '../../services/api/methods/storyMethods';

export const useGetUserProfile = ({userId}) => {
  const {user} = useSelector(state => state.auth);
  const isOwnProfile = user && user?.id === userId ? true : false;

  const userProfileQuery = useQuery({
    queryKey: ['user', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      return isOwnProfile
        ? Promise.resolve({})
        : storyApi
            .getUserById({auth_token: user.auth_token, user_id: userId})
            .then(res => {
              if (res.status === true && res.code === 200) {
                return res.data;
              } else if (res.status === false && res.code === 405) {
                throw res.data;
              }
            });
    },
  });

  if (isOwnProfile) {
    return {isLoading: false, data: user};
  }

  return userProfileQuery;
};
