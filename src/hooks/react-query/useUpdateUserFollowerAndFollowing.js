import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import * as storyApi from '../../services/api/methods/storyMethods';

export const useUpdateUserFollowerAndFollowing = () => {
  const {user: loggedInUser} = useSelector(state => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({userId}) => {
      return storyApi
        .followOrUnfollowUser({
          auth_token: loggedInUser.auth_token,
          followee_id: userId,
        })
        .then(res => {
          if (res.status === true && res.code === 200) {
            return res.data;
          } else if (res.status === false && res.code === 405) {
            throw res.data;
          }
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      queryClient.invalidateQueries({queryKey: ['user-follows']});
    },
  });
};
