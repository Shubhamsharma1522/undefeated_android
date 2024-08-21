import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CreateThread from './CreateTake';
import {MeWrapper} from '../../../components/MeWrapper';
import {MeHeader} from '../../../components/MeHeader';
import MeBottomNavbar from '../../../components/BottomNavbar';
import useTakesSocket from '../../../hooks/useTakesSocket';
import TakeComponent from './Components/TakeComponent';
import MeFullImageModal from '../../../components/MeFullSizeImageModal';
import {MeButton} from '../../../components/MeButton';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  showToast,
} from '../../../services';
const ITEMS_PER_PAGE = 30;
const ITEM_HEIGHT = 100; // Adjust this value based on your item height

const Takes = props => {
  const [createTakes, setCreateTakes] = useState(false);
  const [refreshingState, setRefreshState] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false);
  const [selectedFilteredHashtag, setSelectedFilteredHashtag] = useState(null);
  const [selectedImageInFullScreen, showSelectedImageInFullScreen] = useState({
    state: false,
    fullImageSource: '',
    loading: '',
    uploadMode: false,
  });

  const [takesData, setTakesData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.auth.user);
  const allTakes = useSelector(state => state.story.takes);
  const takesLoading = useSelector(state => state.story.takesLoading);
  const {isDisconnected} = useTakesSocket(
    'TAKES',
    false,
    'Takes',
    props.navigation,
  );

  const listRef = useRef(null);
  useEffect(() => {
    if (!takesLoading && allTakes && allTakes.length > 0) {
      setTakesData(allTakes.slice(0, ITEMS_PER_PAGE));
    }
  }, [takesLoading, allTakes]);

  const onRefresh = useCallback(() => {
    setRefreshState(true);
    setTimeout(() => {
      showToast('Refreshed!');
      setRefreshState(false);
      props.navigation.replace('Takes');
    }, 1000);
  }, [props.navigation]);

  const reConnectSocket = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  const renderFooter = useCallback(() => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  }, [loading]);

  const loadMore = useCallback(() => {
    setLoading(true);
    const newPage = page + 1;
    const newData = allTakes.slice(0, newPage * ITEMS_PER_PAGE);
    setTakesData(newData);
    setPage(newPage);
    setLoading(false);
  }, [allTakes, page]);

  const getItemLayout = (takesData, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <>
      <MeHeader
        showProfilePic={true}
        title={'Undefeated.Live'}
        hideBackBtn={
          user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? false : true
        }
        showAboutUs={
          user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? false : true
        }
        profilePicUrl={user ? user.profile_image : null}
        showNotficaion={false}
        showlogo={true}
      />
      {!showFullImg && (
        <TouchableOpacity
          style={styles.plusContainer}
          onPress={() => setCreateTakes(true)}>
          <Image source={APPLICATION_IMAGES.plus} style={styles.img} />
        </TouchableOpacity>
      )}
      {selectedFilteredHashtag ? <Text>{selectedFilteredHashtag}</Text> : null}
      {!takesLoading && !showFullImg && (
        <MeWrapper style={{padding: 0}}>
          <View style={styles.takesHeading}>
            <Text style={styles.heading}>Takes</Text>
          </View>
          <FlatList
            disableVirtualization={true}
            ref={listRef}
            data={takesData}
            onRefresh={onRefresh}
            refreshing={refreshingState}
            style={{paddingRight: 20}}
            removeClippedSubviews={true}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Takes Found</Text>
              </View>
            )}
            renderItem={({item}) => {
              console.log('itemFEED', item, takesData);
              if (item?.takesActiveStatus !== 'disable') {
                return (
                  <TakeComponent
                    isOnPressActive={true}
                    showReactionContainer={true}
                    parentTake={item}
                    showSelectedImageInFullScreen={
                      showSelectedImageInFullScreen
                    }
                    setShowFullImg={setShowFullImg}
                    selectedImageInFullScreen={selectedImageInFullScreen}
                    showCommentIcon={true}
                    setSelectedFilteredHashtag={setSelectedFilteredHashtag}
                  />
                );
              }
              return null;
            }}
            keyExtractor={item => item._id}
            ListFooterComponent={renderFooter}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            // onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={getItemLayout}
          />
        </MeWrapper>
      )}

      {takesLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Takes...</Text>
        </View>
      )}
      {showFullImg && (
        <MeFullImageModal
          isVisible={selectedImageInFullScreen.state}
          image={selectedImageInFullScreen.fullImageSource}
          closeHandler={() => {
            setShowFullImg(false);
            showSelectedImageInFullScreen({
              state: false,
              fullImageSource: '',
              loading: '',
              uploadMode: false,
            });
          }}
        />
      )}

      {!takesLoading && isDisconnected && (
        <View style={{marginVertical: 10}}>
          <MeButton onPress={reConnectSocket} title="Refresh Takes" />
        </View>
      )}
      {user && user.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
        <MeBottomNavbar />
      )}
      {createTakes && (
        <CreateThread
          closeHandler={() => setCreateTakes(false)}
          isVisible={createTakes}
          isDisconnected={isDisconnected}
          reConnectSocket={reConnectSocket}
        />
      )}
    </>
  );
};

export default Takes;

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.appColour,
    fontWeight: 'bold',
    fontSize: 20,
  },
  takesHeading: {
    width: '100%',
  },
  img: {
    width: 30,
    height: 30,
  },
  plusContainer: {
    width: '100%',
    maxWidth: 70,
    height: '100%',
    maxHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.appColour,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: '10%',
    right: '4%',
    zIndex: 10,
    elevation: 6, // Android shadow elevation

    // iOS shadow properties
    shadowColor: COLORS.lightGrey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  // plusContainer: {
  //   width: '100%',
  //   maxWidth: 70,
  //   height: '100%',
  //   maxHeight: 70,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 50,
  //   backgroundColor: COLORS.appColour,
  //   borderWidth: 1,
  //   borderColor: COLORS.appColour,
  //   borderStyle: 'solid',
  //   position: 'absolute',
  //   bottom: '10%',
  //   right: '4%',
  //   zIndex: 10,
  //   shadowColor: '#000',
  //   elevation: 6,
  // },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 250,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: FONTS.appFont,
    color: COLORS.appColour,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    fontFamily: FONTS.appFont,
    color: COLORS.appColour,
  },
});
