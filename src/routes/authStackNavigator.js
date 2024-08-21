import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Authentication Screens
import Login from '../screens/authentication/login';
import PhoneNumberValidation from '../screens/authentication/phoneNumberValidation';
import VerifyCode from '../screens/authentication/verifyCode';
import SignUp from '../screens/authentication/signUp';
import ForgotPassword from '../screens/authentication/forgotPassword';
import ResetPassword from '../screens/authentication/forgotPassword/resetPassword';
import PrivacyPolicy from '../screens/authentication/privacyPolicy/index';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PhoneNumberValidation" component={PhoneNumberValidation} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
