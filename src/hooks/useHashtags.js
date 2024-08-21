import React, {useEffect, useState, memo, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as TYPES from '../store/actions/types';
import * as TASKS from '../store/actions/index';

const useHashtags = () => {
  const debounceTimeout = React.useRef(null);
  const [detectedHashtags, setHashtagsDetected] = React.useState([]);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [showHashtagsSuggestions, setShowHashtagsSuggestions] = useState(false);
  const {hashtags} = useSelector(state => state.story);
  const dispatch = useDispatch();
  useMemo(() => {
    if (hashtags && hashtags.length > 0) {
      setShowHashtagsSuggestions(true);
    } else {
      setShowHashtagsSuggestions(false);
    }
  }, [hashtags, hashtags && hashtags?.length]);
  function addHashIfNeeded(text) {
    if (!text.startsWith('#')) {
      text = '#' + text;
    }
    return text;
  }
  const getHashtagsBySportsType = (hashTagSearched, sport) => {
    dispatch(
      TASKS.getHashtags({
        sports: sport,
        hashTagSearched: addHashIfNeeded(hashTagSearched),
        limit: 5,
        offset: 0,
      }),
    );
  };
  const resetHashtagsList = () => {
    setShowHashtagsSuggestions(false);
    dispatch({
      type: TYPES.HASHTAG_LIST,
      payload: [],
    });
  };
  const searchHashtag = (hashTagSearched, sport) => {
    setCurrentHashtag(hashTagSearched);
    if (hashTagSearched && hashTagSearched.length > 0) {
      // setShowHashtagsSuggestions(true);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        getHashtagsBySportsType(hashTagSearched, sport);
      }, 500);
    } else {
      setShowHashtagsSuggestions(false);
      resetHashtagsList();
    }
  };
  const replaceHashtagsInTextMessage = (text, cursorPosition, suggestion) => {
    console.log('cursorPosition', cursorPosition);
    // Regular expression to find all hashtags (#word)
    const hashtagRegex = /#[^\s#]+/g;
    let match;
    let hashtags = [];

    // Find all hashtags in the text
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push({
        text: match[0],
        index: match.index,
        endIndex: match.index + match[0].length,
      });
    }

    // Find the closest hashtag before or at the cursor position
    let closestHashtag = null;

    for (let i = 0; i < hashtags.length; i++) {
      if (
        hashtags[i].index <= cursorPosition.start &&
        hashtags[i].endIndex >= cursorPosition.start
      ) {
        // Hashtag is at or before the cursor position
        closestHashtag = hashtags[i];
        break;
      }
    }

    if (!closestHashtag) {
      // No hashtag found before the cursor position, append suggestion at cursor position
      return (
        text.substring(0, cursorPosition.start) +
        suggestion +
        text.substring(cursorPosition.start)
      );
    }

    // Replace the closest hashtag with the suggestion
    const replacedText =
      text.substring(0, closestHashtag.index) +
      suggestion +
      text.substring(closestHashtag.endIndex);
    setCurrentHashtag('');
    setShowHashtagsSuggestions(false);
    resetHashtagsList();
    return replacedText;
  };

  const detectCurrentHashtag = (
    currentSelection,
    text,
    selectedSport,
    setTextMessage,
  ) => {
    const {start} = currentSelection;
    const textBeforeCursor = text.slice(0, start);

    // Regular expression to find the current hashtag (word starting with #)
    const regex = /\B#([a-zA-Z\d]*)$/;
    const match = textBeforeCursor.match(regex);

    if (match) {
      const hashtag = match[1]; // Extract the hashtag without the #
      setTextMessage(text);
      searchHashtag(`${hashtag}`, selectedSport);
    } else {
      resetHashtagsList();
    }
  };
  const detectAllHashtagsInText = (textMessage, selectedSport) => {
    if (textMessage) {
      const delectedHashtagsClone = [...detectedHashtags];
      const hashtagRegex = /\B#(\w+)/g;
      const hashtags = textMessage.match(hashtagRegex);

      hashtags && hashtags.length > 0
        ? hashtags.map(hashtag => {
            const trimmedHashtag = hashtag.trim().replace(/^#/, '');
            const existingHashtag = delectedHashtagsClone.find(
              item => item.hashtag.trim().replace(/^#/, '') === trimmedHashtag,
            );

            if (!existingHashtag) {
              delectedHashtagsClone.push({
                hashtag: `#${trimmedHashtag}`,
                type: 'trending',
                sports: selectedSport,
                image: '',
              });
            }
          })
        : [];
      return delectedHashtagsClone;
    } else return [];
  };
  return {
    hashtags,
    searchHashtag,
    replaceHashtagsInTextMessage,
    currentHashtag,
    setCurrentHashtag,
    showHashtagsSuggestions,
    setShowHashtagsSuggestions,
    resetHashtagsList,
    detectCurrentHashtag,
    setHashtagsDetected,
    detectAllHashtagsInText,
  };
};

export default useHashtags;
