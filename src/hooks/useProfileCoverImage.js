import React, {useCallback, useState} from 'react';
import {View, StyleSheet,Image} from 'react-native';

import {APPLICATION_IMAGES} from '../services';

const useUserImages = ({userProfile, styles}) => {
  const imageKey = Date.now();

  const userProfileSection = useCallback(() => {
    return (
      <Image
        style={styles.profileImage}
        key={imageKey}
        source={
          userProfile?.profile_image_url
            ? {uri: `${userProfile.profile_image_url}?${imageKey}`}
            : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
        }
        cacheControl={{
          public: true,
          maxAge: 86400,
        }}
      />
    );
  }, [userProfile?.profile_image_url]);

  const userCoverImageSection = useCallback(() => {
    return (
      <Image
        style={styles.fullSizeImage}
        key={imageKey}
        source={{
          uri: userProfile?.cover_image_url
            ? `${userProfile.cover_image_url}?${imageKey}`
            : APPLICATION_IMAGES.coverPicPlaceholder,
          headers: {Pragma: 'no-cache'},
        }}
        cacheControl={{
          public: true,
          maxAge: 86400,
        }}
      />
    );
  }, [userProfile?.cover_image_url]);

  return {
    userProfileSection,
    userCoverImageSection,
  };
};

export default useUserImages;
