import {USER_SERVICE_URL} from '../index';

export default function userServiceApi(path, params, method, token) {
  console.log({params});
  token = 'NSFWe3rx0MxQiAn5UI8azWR4LbU2Y7DGYl7t84j1DnKHv9dJCUEW0terqw4IlYjp';
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  let options;
  options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(token && {token: token}),
    },
    method: method,
    ...(params && {body: formBody}),
  };
  return fetch(USER_SERVICE_URL + path, options)
    .then(resp => resp.json())
    .then(responseJSON => {
      // console.log("showing response ",responseJSON)
      return responseJSON;
    })
    .catch(error => {
      return error;
    });
}
