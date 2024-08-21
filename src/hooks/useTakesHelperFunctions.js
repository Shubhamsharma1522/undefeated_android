import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPicture} from '../services';
import * as TASKS from '../store/actions/index';
import RNFetchBlob from 'rn-fetch-blob';
import {getVideosToUpload} from '../services/helpers';
import uuid from 'react-native-uuid';
const useTakesHelperFunction = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isMediaUploadLoading, setMediaUploadLoadingState] =
    React.useState(false);
  const [selectedMediaFile, setSelectedMediaFile] = React.useState({
    state: false,
    fullImageSource: [],
    loading: '',
    uploadMode: false, // if true then user uploads a pick. if false user view  the image in full screen mode
  });

  const uploadImage = () => {
    console.log('contest upload image ==>');
    setMediaUploadLoadingState(true);
    getPicture(
      async image => {
        const fileName = `takes/parentTake/images/${uuid.v4()}`;
        console.log('showing getted image', image);
        setSelectedMediaFile(prevState => ({
          ...prevState,
          state: true,
          loading: 'STARTED',
          uploadMode: true,
        }));

        const presignedUri = await dispatch(
          TASKS.generatePresingedUrl({
            auth_token: user.auth_token,
            fileType: image.uri.type,
            fileName: fileName,
          }),
        );
        console.log({presignedUri});
        let filePath = image.uri && image.uri.uri.replace('file://', '');
        const response = await RNFetchBlob.fetch(
          'PUT',
          presignedUri,
          {
            'Content-Type': image.uri.type,
          },
          RNFetchBlob.wrap(filePath),
        );
        console.log({uploadAudio: response});
        setMediaUploadLoadingState(false);
        setSelectedMediaFile(prev => ({
          ...prev,
          state: true,
          fullImageSource:
            response?.respInfo?.redirects?.length > 0
              ? [
                  ...prev.fullImageSource,
                  {
                    uri: response?.respInfo?.redirects[0].split('?')[0],
                    mediaType: 'image',
                    height: image.uri?.height,
                    width: image.uri?.width,
                    mimeType: image.uri?.type,
                    fileSize: image.uri?.fileSize,
                    uuid: uuid.v4(),
                  },
                ]
              : [...prev.fullImageSource],
          uploadMode: true,
          loading: 'STOPED',
        }));
      },
      error => {
        setMediaUploadLoadingState(false);
      },
      () => setMediaUploadLoadingState(false),
    );
  };
  const uploadVideo = () => {
    console.log('contest upload image ==>');
    setMediaUploadLoadingState(true);
    getVideosToUpload(
      async image => {
        const fileName = `takes/parentTake/video/${uuid.v4()}`;

        console.log('showing getted image', image);
        setSelectedMediaFile(prevState => ({
          ...prevState,
          state: true,
          loading: 'STARTED',
          uploadMode: true,
        }));

        const presignedUri = await dispatch(
          TASKS.generatePresingedUrl({
            auth_token: user.auth_token,
            fileType: image.uri.type,
            fileName: fileName,
          }),
        );
        console.log({presignedUri});
        let filePath = image.uri && image.uri.uri.replace('file://', '');
        const response = await RNFetchBlob.fetch(
          'PUT',
          presignedUri,
          {
            'Content-Type': image.uri.type,
          },
          RNFetchBlob.wrap(filePath),
        );
        console.log({uploadAudio: response});
        setMediaUploadLoadingState(false);
        setSelectedMediaFile(prev => ({
          ...prev,
          state: true,
          fullImageSource:
            response?.respInfo?.redirects?.length > 0
              ? [
                  ...prev.fullImageSource,
                  {
                    uri: response?.respInfo?.redirects[0].split('?')[0],
                    mediaType: 'video',
                    height: image.uri?.height,
                    width: image.uri?.width,
                    mimeType: image.uri?.type,
                    fileSize: image.uri?.fileSize,
                    uuid: uuid.v4(),
                  },
                ]
              : [...prev.fullImageSource],
          uploadMode: true,
          loading: 'STOPED',
        }));
      },
      error => {
        setMediaUploadLoadingState(false);
        // showToast(APPLICATION_CONSTANTS.imageNotPossible);
      },
      () => setMediaUploadLoadingState(false),
    );
  };
  return {
    uploadImage,
    uploadVideo,
    isMediaUploadLoading,
    selectedMediaFile,
    setSelectedMediaFile,
  };
};

export default useTakesHelperFunction;
