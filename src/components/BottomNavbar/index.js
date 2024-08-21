import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {
  APPLICATION_IMAGES,
  WP,
  COLORS,
  FONTS,
  navigate,
  back,
} from '../../services';
// import {ReactComponent as Home} from '../../../assets/icons/home.svg';

const MeBottomNavbar = props => {
  // const privateStandings = (option, groupData) => {
  //   switch (option) {
  //     case 1:
  //       navigate('GroupStacks', {
  //         standings: 'Private',
  //         groupData: groupData,
  //       });
  //       break;
  //     case 2:
  //       navigate('Standings', { standings: 'Public' });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <View style={[styles.navbarContainer, styles.shadowProp]}>
      <View style={styles.navbarInner}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigate('ChatRooms')}>
          {/* <Image
            source={APPLICATION_IMAGES.chat}
            alt="chat"
            style={styles.img}
          /> */}
          <Image
            style={styles.img}
            source={APPLICATION_IMAGES.chat}
          />

          <Text style={styles.navText}>Huddles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigate('Contest')}>
          <Image
            style={styles.img}
            source={APPLICATION_IMAGES.contestIcon}
          
          />
          <Text style={styles.navText}>Contests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.takes} onPress={() => navigate('Takes')}>
          <Image
            source={APPLICATION_IMAGES.post}
            alt="chat"
            style={styles.img}
          />
          <Text style={styles.navText}>Takes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() =>
            navigate('Standings', {standings: 'Public'})
          }></TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigate('Standings', {standings: 'Public'})}>
          <Image
            style={styles.img}
            // source={{
            //   uri: 'https://unsplash.it/400/400?image=1',
            //   headers: {Authorization: 'someAuthToken'},
            //   priority: FastImage.priority.normal,
            // }}
            source={APPLICATION_IMAGES.leaderboardIcon}
          
          />
          <Text style={styles.navText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigate('Home')}>
          {/* <Image
            source={APPLICATION_IMAGES.home}
            alt="home"
            style={styles.img}
          /> */}
          <Image
            style={styles.img}
            // source={{
            //   uri: 'https://unsplash.it/400/400?image=1',
            //   headers: {Authorization: 'someAuthToken'},
            //   priority: FastImage.priority.normal,
            // }}
            source={APPLICATION_IMAGES.home}
          
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  navbarContainer: {
    // width: Dimensions.get('window').width-20,
    flexDirection: 'row',
    borderTopColor: COLORS.lightGrey,
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 7,
    paddingHorizontal: 30,
    // backgroundColor:COLORS.white,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: COLORS.white,
    // elevation: 2,
  },
  navbarInner: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  tab: {
    // justifyContent:'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takes: {
    // justifyContent:'space-between',
    paddingLeft:17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  contest: {
    width: 30,
    height: 30,
  },
  navText: {
    fontSize: 12,
    color: COLORS.lightGrey,
  },
});
export default MeBottomNavbar;
