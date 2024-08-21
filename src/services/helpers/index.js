import {Platform, BackHandler, PermissionsAndroid, Linking, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import * as Util from '../index';
import Contacts from 'react-native-contacts';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment-timezone';
import React, {Component} from 'react';

import {COLORS} from '../utilities/styling/theme';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
// export const emailValidator = val => {
//   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     val,
//   );
// };
export const emailValidator = val => {
  return (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(live)$/.test(val)
  );
};

export const validateUsername = username => {
  // Regular expression to match username criteria
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}$/;

  // Check if the username matches the regex and does not contain spaces
  if (!usernameRegex.test(username)) {
    // Check specific validation rules
    if (username.length < 3) {
      return 'Username must be at least 3 characters long.';
    }
    if (username.length > 15) {
      return 'Username cannot be more than 15 characters long.';
    }
    if (!username.match(/^[a-zA-Z]/)) {
      return 'Username must start with a letter.';
    }
    if (!username.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) {
      return 'Username can only contain letters, numbers, and underscores.';
    }
    if (username.match(/\s/)) {
      return 'Username cannot contain spaces.';
    }
  }

  // If all validations pass
  return true;
};
// export const isOnline = (success, reject) => {
//   NetInfo.fetch().then(state => {
//     if (state.isConnected) {
//       success(true);
//     } else {
//       reject(false);
//     }
//   });
// };

export const showToast = (message, duration) => {
  // console.log("SHOW TOAST")
  Toast.show(message, duration ? Toast.LONG : Toast.SHORT);
};
export const storeToStorage = (key, data) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
export const retriveFromStorage = (key, token) => {
  AsyncStorage.getItem(key, (err, value) => {
    if (err) {
      console.log(err);
      token(null);
    } else {
      token(JSON.parse(value));
    }
  });
};
export const getAllContacts = (success, reject) => {
  if (Platform.OS === 'ios ') {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
        // reject(null);
      }
      // contacts returned
      success(contacts);
    });
  } else {
    console.log('in get all contacts');
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please Allow to View Contacts',
      })
        .then(andoidContactPermission => {
          console.log('andoidContactPermission ', andoidContactPermission);
          if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Contacts Permission granted');
            Contacts.getAll((err, contacts) => {
              if (err === 'denied') {
                reject(null);
                // error
              } else {
                success(contacts);
                // contacts returned in Array
              }
            });
          } else {
            console.log('Contacts permission denied');
            reject(null);
          }
          // Contacts.getAll()
          // Contacts.getAll((err, contacts) => {
          //   console.log("in get contacts", err, contacts)
          // if (err === 'denied') {
          //   reject(null);
          //   // error
          // } else {
          //   success(contacts);
          //   // contacts returned in Array
          // }
          // });
        })
        .catch(error => {
          console.log('in get contacts catch', error);
          reject(null);
        });
    } catch (err) {
      console.log('err', err);
      reject(null);
    }
  }
};
export const ShowActivityIndicator = color => {
  return <ActivityIndicator color={color ? color : COLORS.appColour} />;
};
export const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + '-' + month + '-' + date; //format: dd-mm-yyyy;
};
export const ValidURL = str => {
  // var regex =
  //   /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
};

const getImageBase64 = async uri => {
  try {
    // const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;
    const base64Data = await RNFS.readFile(uri, 'base64');
    return base64Data;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

const openCamera = (success, reject) => {
  const options = {
    quality: 0.1,
    maxWidth: 700,
    maxHeight: 700,
    storageOptions: {
      skipBackup: true,
    },
  };
  ImagePicker.launchCamera(options, async response => {
    console.log('showImagePicker', response);
    if (response.didCancel) {
      console.log('User cancelled photo picker');
      reject();
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      reject();
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else if (response && response.assets && response.assets.length > 0) {
      const imageBase64Data = await getImageBase64(response.assets[0].uri);
      let source = {uri: {...response.assets[0], data: imageBase64Data}};
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      success(source);
    }
  });
};
const openLibrary = (success, reject) => {
  const options = {
    quality: 0.1,
    // maxWidth: 700,
    // maxHeight: 700,
    storageOptions: {
      skipBackup: true,
      cameraRoll: true,
      waitUntilSaved: true,
    },
    mediaType: 'any',
  };
  ImagePicker.launchImageLibrary(options, async response => {
    console.log('showImagePicker', response);
    if (response.didCancel) {
      console.log('User cancelled photo picker');
      reject();
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      reject();
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response);
    } else if (response && response.assets && response.assets.length > 0) {
      console.log({'imageBase64Data-before': response.assets});
      const imageBase64Data = await getImageBase64(response.assets[0].uri);
      console.log({imageBase64Data});
      let source = {uri: {...response.assets[0], data: imageBase64Data}};
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      await success(source);
    }
  });
};

const requestPermission = async () => {
  try {
    console.log('asking for permission');
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      granted['android.permission.CAMERA'] &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE']
    ) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (error) {
    console.log('permission error', error);
  }
};

export const getPicture = async (success, reject) => {
  await requestPermission();
  Alert.alert(
    '',
    'Select Option',
    [
      {
        id: 1,
        text: 'Take Photo...',
        onPress: () => {
          openCamera(success, reject);
        },
      },
      {
        id: 2,
        text: 'Choose from library...',
        onPress: () => {
          openLibrary(success, reject);
        },
      },
      {
        id: 3,
        text: 'Close',
        // onPress: () => {
        //   openLibrary(success, reject);
        // },
      },
    ],
    {cancelable: true},
  );
  // const options = {
  //   quality: 0.1,
  //   maxWidth: 700,
  //   maxHeight: 700,
  //   storageOptions: {
  //     skipBackup: true,
  //   },
  // };
  // ImagePicker.launchCamera(options, async response => {
  //   console.log('showImagePicker', response);
  //   if (response.didCancel) {
  //     console.log('User cancelled photo picker');
  //     reject();
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //     reject();
  //   } else if (response.customButton) {
  //     console.log('User tapped custom button: ', response.customButton);
  //   } else if (response && response.assets && response.assets.length > 0) {
  //     const imageBase64Data = await getImageBase64(response.assets[0].uri);
  //     let source = {uri: {...response.assets[0], data: imageBase64Data}};
  //     // You can also display the image using data:
  //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  //     success(source);
  //   }
  // });
};

export const isValidUrl = urlString => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export const convertUtcToLocalTimeStamp = utcTimeStamp => {
  return moment.utc(utcTimeStamp).local().format('HH:mm');
};

export const convertLocalTimeStamptoReadableTimeStamp = utcTimeStamp => {
  // If time is before the last 24 hours
  return moment.utc(utcTimeStamp).local().fromNow();
  // if (moment.utc(utcTimeStamp).isBefore(moment().subtract(24, 'hours'))) {
  //   // Format the timestamp to HH:mm AM/PM
  //   return moment.utc(utcTimeStamp).local().format('hh:mm A');
  // } else {
  //   return moment.utc(utcTimeStamp).local().fromNow();
  // }
};
export const convertUtcToLocalDate = utcTimeStamp => {
  return moment.utc(utcTimeStamp).local().format('MMMM D, YYYY');
};

export const removeElementFromArray = (indexToRemove, array) => {
  if (indexToRemove > -1) {
    array.splice(indexToRemove, 1);
  }
  return array;
};

export const formatPhoneNumber = phoneNumber => {
  const countryCode = phoneNumber.slice(0, -10);
  const match = phoneNumber.slice(-10).match(/^(\d{3})(\d{3})(\d{4})$/);
  return `(${countryCode}) ${match[1]}-${match[2]}-${match[3]}`;
};
