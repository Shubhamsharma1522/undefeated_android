import {userServiceEndpoints} from '../../index';
import userServiceApi from '../userService';

function getMentionedUsers(params) {
  console.log('PARAMS', params);
  return userServiceApi(
    userServiceEndpoints.getMentionedUsers,
    params,
    'post',
    null,
  );

}
export {getMentionedUsers}
