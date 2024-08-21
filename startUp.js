import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AuthStack, AppNavigator} from './routes';
import Dummy from './dummy';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Dummy: Dummy,
      AuthStack: AuthStack,
      App: AppNavigator,
    },
    {
      initialRouteName: 'Dummy',
    },
  ),
);

export default AppContainer;
