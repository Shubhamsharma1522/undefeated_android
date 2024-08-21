import {useDispatch, useSelector} from 'react-redux';
import * as TASKS from '../store/actions/index';
import {useEffect} from 'react';

const useSelectedTakes = selectedHashtag => {
  const dispatch = useDispatch();
  const {filteredTakes} = useSelector(state => state.story);
  function addHashIfNeeded(text) {
    if (!text.startsWith('#')) {
      text = '#' + text;
    }
    return text;
  }
  const getTakesBySelectedHashtag = hashTagSearched => {
    dispatch(
      TASKS.getTakesFilteredByHashtag({
        hashtag: addHashIfNeeded(hashTagSearched),
      }),
    );
  };
  useEffect(() => {
    if (selectedHashtag) getTakesBySelectedHashtag(selectedHashtag);
  }, [selectedHashtag]);

  return {filteredTakes};
};

export default useSelectedTakes;
