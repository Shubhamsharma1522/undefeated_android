import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as TYPES from '../store/actions/types';
import * as TASKS from '../store/actions/index';

const useMentionUser = () => {
  const debounceTimeout = React.useRef(null);
  const [mentionedUsersDetected, setMentionDetected] = React.useState([]);
  const [currentMentioned, setCurrentMentioned] = useState('');
  const [showMentionSuggestions, setShowMentionedSuggestions] = useState(false);
  const {user} = useSelector(state => state.auth);
  const {mentionedUsers} = useSelector(state => state.story);
  const dispatch = useDispatch();

  const resetMentionedUsers = () => {
    setShowMentionedSuggestions(false);
    dispatch({
      type: TYPES.MENTIONED_USERS_LIST,
      payload: [],
    });
  };
  useEffect(() => {
    resetMentionedUsers();
    return () => resetMentionedUsers();
  }, []);
  useMemo(() => {
    if (mentionedUsers && mentionedUsers.length > 0) {
      setShowMentionedSuggestions(true);
    } else {
      setShowMentionedSuggestions(false);
    }
  }, [mentionedUsers, mentionedUsers?.length]);
  function addMentionSymbolIfNeeded(text) {
    if (!text.startsWith('@')) {
      text = '@' + text;
    }
    return text;
  }
  const getMentionedUsers = usernameSearched => {
    console.log('MNH', {user, l: user.auth_token, usernameSearched});
    dispatch(
      TASKS.getMentionedUsersList({
        auth_token: user.auth_token,
        searched_username: usernameSearched,
      }),
    );
  };

  const searchMentionedUsers = mentionedUserSearched => {
    setCurrentMentioned(mentionedUserSearched);
    if (mentionedUserSearched && mentionedUserSearched.length > 0) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        getMentionedUsers(mentionedUserSearched);
      }, 200);
    } else {
      resetMentionedUsers();
    }
  };
  const replaceMentionedUsersInTextMessage = (
    text,
    cursorPosition,
    suggestion,
  ) => {
    console.log('cursorPosition', cursorPosition);
    // Regular expression to find all mentionedUsers (#word)
    const mentionedRegex = /@[^\s#]+/g;
    let match;
    let mentionedUsers = [];

    // Find all mentionedUsers in the text
    while ((match = mentionedRegex.exec(text)) !== null) {
      mentionedUsers.push({
        text: match[0],
        index: match.index,
        endIndex: match.index + match[0].length,
      });
    }

    // Find the closest hashtag before or at the cursor position
    let closestMentionedUsers = null;

    for (let i = 0; i < mentionedUsers.length; i++) {
      if (
        mentionedUsers[i].index <= cursorPosition.start &&
        mentionedUsers[i].endIndex >= cursorPosition.start
      ) {
        // Hashtag is at or before the cursor position
        closestMentionedUsers = mentionedUsers[i];
        break;
      }
    }

    if (!closestMentionedUsers) {
      // No hashtag found before the cursor position, append suggestion at cursor position
      return (
        text.substring(0, cursorPosition.start) +
        suggestion +
        text.substring(cursorPosition.start)
      );
    }

    // Replace the closest hashtag with the suggestion
    const replacedText =
      text.substring(0, closestMentionedUsers.index) +
      ' @' +
      suggestion +
      text.substring(closestMentionedUsers.endIndex);
    setCurrentMentioned('');
    // setShowMentionedSuggestions(false);
    resetMentionedUsers();
    return replacedText;
  };

  const detectCurrentMentionedUser = (
    currentSelection,
    text,
    setTextMessage,
  ) => {
    const {start} = currentSelection;
    const textBeforeCursor = text.slice(0, start);

    // Regular expression to find the current hashtag (word starting with #)
    const regex = /\B@([a-zA-Z\d]*)$/;
    const match = textBeforeCursor.match(regex);
    if (match && match.length >= 1 && match[1] != '') {
      const mUser = match[1]; // Extract the hashtag without the #
      setTextMessage(text);
      searchMentionedUsers(`${mUser}`);
    } else {
      resetMentionedUsers();
    }
  };

  const detectAllMentionedUsersInText = (textMessage, selectedSport) => {
    if (textMessage) {
      const allEveryoneRegex = /@all\b|@everyone\b/gi;
      // Test if @all or @everyone is mentioned in the text
      return allEveryoneRegex.test(textMessage);

      // const mentionRegex = /@([a-zA-Z0-9_]+)/g;
      // // Array to store all mentioned usernames
      // let mentionedUsers = [];

      // // Using match method with regex to find all mentions
      // let match;
      // while ((match = mentionRegex.exec(textMessage)) !== null) {
      //   mentionedUsers.push(match[1]); // Pushing the username (group 1 of the regex match)
      // }

      // return mentionedUsers;
      // const delectedHashtagsClone = [...mentionedUsersDetected];
      // const mentionedRegex = /\B#(\w+)/g;
      // const mentionedUsers = textMessage.match(mentionedRegex);

      // mentionedUsers && mentionedUsers.length > 0
      //   ? mentionedUsers.map(hashtag => {
      //       const trimmedHashtag = hashtag.trim().replace(/^@/, '');
      //       const existingHashtag = delectedHashtagsClone.find(
      //         item => item.hashtag.trim().replace(/^@/, '') === trimmedHashtag,
      //       );

      //       if (!existingHashtag) {
      //         delectedHashtagsClone.push({
      //           hashtag: `#${trimmedHashtag}`,
      //           type: 'trending',
      //           sports: selectedSport,
      //           image: '',
      //         });
      //       }
      //     })
      //   : [];
      // return delectedHashtagsClone;
    } else return [];
  };
  return {
    mentionedUsers,
    searchMentionedUsers,
    replaceMentionedUsersInTextMessage,
    currentMentioned,
    setCurrentMentioned,
    showMentionSuggestions,
    setShowMentionedSuggestions,
    resetMentionedUsers,
    detectCurrentMentionedUser,
    setMentionDetected,
    detectAllMentionedUsersInText,
    mentionedUsersDetected,
  };
};

export default useMentionUser;
