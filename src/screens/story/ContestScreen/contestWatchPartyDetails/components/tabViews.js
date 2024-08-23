import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Home} from '../components/TabScreens/home';
import {WatchParty} from '../components/TabScreens/watchParty';

const initialLayout = {width: Dimensions.get('window').width};

export const OptionsTab = props => {
  console.log('PROPS*', props);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'home', title: 'Watch Party'},
    // { key: 'watchParty', title: 'Watch Party' },
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'home':
        return <Home group={props.groupDetails} />;
      case 'watchParty':
        return <WatchParty />;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={tabs => {
        props.onTabChange(tabs);
        setIndex(tabs);
      }}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
