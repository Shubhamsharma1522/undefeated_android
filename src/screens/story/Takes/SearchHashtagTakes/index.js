import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MeWrapper} from '../../../../components/MeWrapper';
import {MeHeader} from '../../../../components/MeHeader';
import MeBottomNavbar from '../../../../components/BottomNavbar';
import useSearchedTakes from '../../../../hooks/useSearchedTakes';
import TakeComponent from '../Components/TakeComponent';
import MeFullImageModal from '../../../../components/MeFullSizeImageModal';
import uuid from 'react-native-uuid';
import {
  APPLICATION_CONSTANTS,
  APPLICATION_IMAGES,
  COLORS,
  FONTS,
  navigate,
  showToast,
} from '../../../../services';

const ITEMS_PER_PAGE = 30;
const ITEM_HEIGHT = 100; // Adjust this value based on your item height

const SearchHashtagTakes = props => {
  console.log('props', props);
  const {searchedHashtag} = props?.navigation?.state?.params;
  const {isHashtagSelected, filteredTakes} = useSearchedTakes(searchedHashtag);
  const [refreshingState, setRefreshState] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false);
  const [selectedImageInFullScreen, showSelectedImageInFullScreen] = useState({
    state: false,
    fullImageSource: '',
    loading: '',
    uploadMode: false,
  });

  const [takesData, setTaggedTakes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.auth.user);
  const allTaggedTakes = useSelector(state => state.story.takes);
  const takesLoading = useSelector(state => state.story.takesLoading);

  const listRef = useRef(null);
  useEffect(() => {
    if (!takesLoading && allTaggedTakes && allTaggedTakes.length > 0) {
      setTaggedTakes(allTaggedTakes.slice(0, ITEMS_PER_PAGE));
    }
  }, [takesLoading, allTaggedTakes]);

  const onRefresh = useCallback(() => {
    setRefreshState(true);
    setTimeout(() => {
      showToast('Refreshed!');
      setRefreshState(false);
      props.navigation.replace('Takes');
    }, 1000);
  }, [props.navigation]);

  const renderFooter = useCallback(() => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  }, [loading]);

  const loadMore = useCallback(() => {
    setLoading(true);
    const newPage = page + 1;
    const newData = allTaggedTakes.slice(0, newPage * ITEMS_PER_PAGE);
    setTaggedTakes(newData);
    setPage(newPage);
    setLoading(false);
  }, [allTaggedTakes, page]);

  const getItemLayout = (takesData, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };
  console.log({filteredTakes});

  return (
    <>
      <MeHeader
        showProfilePic={true}
        title={'Undefeated.Live'}
        hideBackBtn={false}
        showAboutUs={false}
        profilePicUrl={user ? user.profile_image : null}
        showNotficaion={false}
        showlogo={true}
      />

      {!takesLoading && !showFullImg && (
        <MeWrapper style={{padding: 0}}>
          <View style={styles.takesHeading}>
            <Text style={styles.heading}>Takes</Text>
          </View>
          <View style={styles.hashtagContainer}>
            <Text style={styles.subHeading}>#{searchedHashtag}</Text>
            <TouchableOpacity
              onPress={() => {
                navigate('Takes');
              }}>
              <Image
                source={APPLICATION_IMAGES.closeBlue}
                style={{width: 20, height: 20, marginLeft: 30}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            disableVirtualization={true}
            ref={listRef}
            data={filteredTakes}
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
              console.log({item});
              if (
                item?.takesActiveStatus !== 'disable' &&
                item._id != 'undefined'
              ) {
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
                  />
                );
              }
              return null;
            }}
            keyExtractor={item => uuid.v4()}
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

      {user && user.role !== APPLICATION_CONSTANTS.USER_ADMIN && (
        <MeBottomNavbar />
      )}
    </>
  );
};

export default SearchHashtagTakes;

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.appColour,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subHeading: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.appColour,
    fontSize: 15,
    paddingVertical: 15,
  },
  takesHeading: {
    width: '100%',
  },
  hashtagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
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
