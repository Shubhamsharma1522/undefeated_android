import {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../redux/store';
import {ActionType} from '../redux/types';
import {
  sendMessage,
  sendUnDeliveredQueuedMessages,
  updateReadBy,
} from '../services/utilities/sockets';
import {storeToStorage} from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useChatCache = async (socket, chatId, isDisconnected) => {
  const dispatch = useDispatch();

  const messages = useSelector(state => state.story.messages);
  const authData = useSelector(state => state.auth.user);
  // console.log({ASYN: AsyncStorage.getItem('chatCache')});
  const chatCache = JSON.parse(await AsyncStorage.getItem('chatCache')) || [];

  const checkChatInCache = chatId => {
    if (!chatCache) return false;
    const indexOfJobId = chatCache.findIndex(item => item.chatId == chatId);

    if (indexOfJobId == -1) return false;
    else return indexOfJobId;
  };

  //   const saveInCache = (messages: any) => {};

  useEffect(() => {
    if (!isDisconnected) {
      const indexOfJobId = checkChatInCache(chatId);
      console.log(
        '🚀 ~ file: useChatCache.tsx:30 ~ useEffect ~ indexOfJobId',
        indexOfJobId,
      );

      // save in cache
      if (indexOfJobId === false) {
        // if chatId not found in cache
        chatCache.push({
          chatId,
          messages,
        });
      } else {
        // if chatId found in cache
        chatCache[indexOfJobId].messages = messages;
      }
      updateReadBy({user: authData.userId, room: chatId});
      //   localStorage.setItem('chatCache', JSON.stringify(chatCache));
      storeToStorage('chatCache', chatCache);
    }
  }, [messages]);

  // useEffect(() => {
  //   if (isDisconnected) {
  //     dispatch({
  //       type: ActionType.GET_MESSAGES,
  //       payload: getCacheByChatId() || [],
  //     });
  //   }
  // }, [isDisconnected]);

  useEffect(() => {
    if (!isDisconnected) {
      const queueMessages =
        messages && messages?.length > 0
          ? messages.filter(msg => msg.isDelivered === false)
          : [];
      console.log(
        '🚀 ~ file: useChatCache.tsx:67 ~ useEffect ~ queueMessages',
        queueMessages,
      );
      sendUnDeliveredQueuedMessages({messages: queueMessages});
    }
  }, [isDisconnected]);
  // const getCacheByChatId = () => {
  //   const indexOfJobId = checkChatInCache(chatId);
  //   if (indexOfJobId === false) {
  //     return [];
  //   } else return chatCache[indexOfJobId].messages;
  // };

  // return { cacheMessages: []};
};

export default useChatCache;
