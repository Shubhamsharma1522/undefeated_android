// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { enableScreens } from 'react-native-screens';

// enableScreens(true);
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function AppTest() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//       initialRouteName="Home">
//         <Stack.Screen  options={{ title: 'My home' }} name="Home" component={HomeScreen} />
//         <Stack.Screen  options={{ title: 'My home' }} name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppTest;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './authStackNavigator';
import AppNavigator from './appStackNavigator';
import { enableScreens } from 'react-native-screens';
import { navigationRef,setTopLevelNavigator } from '../services/navigation';
import { AuthContext, useAuth } from '../contexts/authContext';
enableScreens(true);

// Assume we have a hook or context to determine authentication status
// import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const {isUserAuthenticated} =useAuth()
  console.log("TEST",{isUserAuthenticated})
  return (
    <NavigationContainer ref={navigationRef}
    onReady={() => setTopLevelNavigator(navigationRef.current)}
    >
      {isUserAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="App" component={AppNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigator;
