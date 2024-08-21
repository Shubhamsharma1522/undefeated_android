// import {useRef} from 'react';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
// import VideoPlayer from 'react-native-video-player';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const MeVideoPlayer = () => {
  //   const videoRef = useRef(null);
  //   const background = require('./background.mp4');

  return <Text>Video Player</Text>;
  // return (
  //   <VideoPlayer
  //     video={{
  //       uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //     }}
  //     videoWidth={1600}
  //     videoHeight={900}
  //     thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
  //   />
  // );
};

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MeVideoPlayer;
