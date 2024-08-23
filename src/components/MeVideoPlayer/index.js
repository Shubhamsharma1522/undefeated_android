import React, {useRef, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {COLORS, HP} from '../../services';

const VideoPlayer = ({uri, uuid, isPlaying, onPlay}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleLoadStart = () => {
    console.log('Video loading started');
    setLoading(true);
  };

  const handleLoad = () => {
    console.log('Video loaded');
    setLoading(false);
  };

  const handleError = e => {
    console.log('Video Error: ', e);
    setLoading(false); // Hide loading spinner in case of error
  };

  console.log('Video URI:', uri); // Debug: Check if URI is correct

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.black} />
        </View>
      )}
      <Video
        ref={videoRef}
        source={{uri}}
        style={styles.backgroundVideo}
        resizeMode="cover"
        onError={handleError}
        controls={true}
        paused={!isPlaying}
        onPlay={() => onPlay(uuid)}
        poster="https://undefeatedimages.s3.amazonaws.com/takes/parentTake/thumbnails/images.jpg"
        // posterResizeMode="cover"
        volume={1.0}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        muted={false}
        // onLoadStart={handleLoadStart}
        // onLoad={handleLoad}
      />
      {/* // renderLoader={
        //   <View style={styles.loadingContainer}>
        //     <Text style={{marginBottom: 5}}>Loading video...</Text>
        //     <ActivityIndicator size="large" />
        //   </View>
        // }></Video> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: 280,
    height: 250,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    top: HP('12'),
    zIndex: 10,
  },
});

export default React.memo(VideoPlayer);
