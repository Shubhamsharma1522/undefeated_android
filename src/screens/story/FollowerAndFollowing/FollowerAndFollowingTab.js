import React from 'react';
import {Text, FlatList} from 'react-native';
import {WP, ShowActivityIndicator} from '../../../services';
import {FOLLOW_ROUTES} from './index';
import FollowerAndFollowingTabItem from './FollowerAndFollowingTabItem';

const FollowerAndFollowingTab = props => {
  const isFollowersTab = props.tab === FOLLOW_ROUTES.FOLLOWERS;
console.log("INSIDE FollowerAndFollowingTab",isFollowersTab,props)
  return (
    <FlatList
      ListEmptyComponent={() => {
        return props?.isLoading ? (
          ShowActivityIndicator()
        ) : (
          <Text>{`No ${
            isFollowersTab ? 'followers' : 'followings'
          } available`}</Text>
        );
      }}
      style={{padding: WP('2')}}
      data={props.data}
      keyExtractor={item => item.slug}
      renderItem={({item}) => <FollowerAndFollowingTabItem user={item} />}
    />
  );
};

export default FollowerAndFollowingTab;
