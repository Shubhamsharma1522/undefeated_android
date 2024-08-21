// import {NavigationActions, StackActions} from 'react-navigation';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
export const navigationRef = React.createRef();
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('setTopLevelNavigator', navigatorRef);
  _navigator = navigatorRef;
}

const navigate = (routeName, params) =>{
  // const navigation = useNavigation();
  // console.log('NAVIGATE ROUT', routeName, JSON.stringify(params), _navigator);
  // return navigation.navigate(routeName, params);
  if (navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  }
}

function back() {
  if (navigationRef.current) {
    console.log('Navigating back');
    navigationRef.current.dispatch(CommonActions.goBack());
  } else {
    console.log('navigationRef.current is null');
  }
  // navigationRef.current.dispatch(CommonActions.back());
}

export {navigate, back, setTopLevelNavigator};
