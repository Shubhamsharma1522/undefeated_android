// src/components/CustomTopTabView.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../../services';

const CustomTopTabView = ({
  tabs,
  initialTabKey,
  data,
  user,
  AllData,
  MyData,
}) => {
  // Initialize the active tab state with the initial tab key
  const [activeTab, setActiveTab] = useState(initialTabKey);

  // Render the content based on the active tab key
  const renderContent = () => {
    switch (activeTab) {
      case 'AllRooms':
        return AllData ? (
          <AllData data={data.allData} user={user} />
        ) : (
          <View style={styles.content}>
            <Text>No Data</Text>
          </View>
        );
      case 'MyRooms':
        return MyData ? (
          <MyData data={data.myData} user={user} />
        ) : (
          <View style={styles.content}>
            <Text>No Data</Text>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text>No Data</Text>
          </View>
        );
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem]}
            onPress={() => setActiveTab(tab.key)}>
            <View style={[activeTab === tab.key && styles.activeTab]}>
              <Text style={styles.tabText}>{tab.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContent}>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.appColour,
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    //
  },
  tabText: {
    fontSize: 16,
    color: COLORS.white,
    paddingVertical: 5,
  },
  tabContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default CustomTopTabView;
