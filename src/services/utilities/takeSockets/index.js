import {io} from 'socket.io-client';
import {TAKES_SERVICE_URL} from '../../constants';
import {setTakesLoading} from '../../../store/actions/story/index';
let socket;

export const initiateTakeSocketConnection = () => {
  console.log('SOCKET MOUNT INSIDE TAKES_SERVICE_URL', TAKES_SERVICE_URL);
  socket = io(TAKES_SERVICE_URL, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
  });

  console.log('Connecting socket...');
  return socket;
};
export const connectToTakesComment = ({takeId}, setState) => {
  socket &&
    socket.emit(
      'getTakeDetails',
      {
        takeId,
      },
      (error, data) => {
        console.log('take data sent', data);
        // notifyOnMessageSent && notifyOnMessageSent({message});

        // dispatch(
        //   sendSms({user, message, role, emitType, img, id, chatId, orderId}),
        // );
        // cb && cb();
        setState(data);
      },
    );
};

// export const initiateSpecificSocketConnection = () => {
//   const socketSpec = io(CHAT_URL);

//   console.log('Connecting socket...');

//   return socketSpec;
// };

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) {
    socket.disconnect();
    socket.emit('end');
    socket.close();
  }
};

// export const disconnectSpecificSocket = socketSpec => {
//   console.log('Disconnecting socket Spicific...');
//   if (socketSpec) {
//     socketSpec.disconnect();
//     socketSpec.emit('end');
//     socketSpec.close();
//   }
// };
export const updateReadBy = ({user, room}) => {
  socket.emit('updateReadBy', {user, room}, () => {
    // cb && cb();
  });
};
export const subscribeToTakes = (
  {takeId, userRole, takesUserId, dispatch},
  cb,
) => {
  console.log('SCOKET GETING DATA  >> INSIDE subscribeToChat ~ chatId', {
    takeId,
    userRole,
    takesUserId,
    dispatch,
  });
  dispatch(setTakesLoading(true));

  socket.emit(
    'takes_signin',
    {
      takeId,
      userRole,
      takesUserId,
      limit: 5,
      offset: 0,
    },
    (error, history) => {
      if (error) {
        console.log('SCOKET GETING DATA >> ERROR', error);
        dispatch(setTakesLoading(false));
      } else {
        console.log(
          '🚀 ~ file: index.tsx ~ line 95 ~ //getMessages ~ history',
          history,
        );
        console.log('SCOKET GETING DATA >> MESSAGES', history);
        dispatch(setTakesLoading(false));
        cb(history);
      }
    },
  );

  // cb(history);
};

export const sendTakeMessage = (
  {
    userRole,
    takesMessage,
    takesImg,
    type,
    takesUserId,
    takesType,
    takesUuid,
    takesParentId,
    notifyOnMessageSent,
    senderData,
    sport,
    takesRootParentId,
    parentTake,
    dispatch,
    hashtags,
  },
  callback,
) => {
  console.log('message sent: SOCKET EMIT', socket, takesMessage);
  if (!socket) {
    initiateChatSocketConnection();
  }
  socket &&
    socket.emit(
      'sendTakesMessage',
      {
        userRole,
        takesMessage,
        takesImg,
        type,
        takesUserId,
        takesType,
        senderData,
        takesUuid,
        takesParentId,
        sport,
        takesRootParentId,
        hashtags,
      },
      () => {
        console.log('message sent', takesMessage, socket);
        // if (takesParentId) {
        //   dispatch(
        //     TASKS.notifyUsersLikesDislike({
        //       sender_auth_token: senderData?.user,
        //       receiver_slug: parentTake?.senderData?.user,
        //       notification_type: 'reply',
        //       takes_message: takesMessage,
        //     }),
        //   );
        // }
        // dispatch({})
        // notifyOnMessageSent && notifyOnMessageSent({message});

        // dispatch(
        //   sendSms({user, message, role, emitType, img, id, chatId, orderId}),
        // );
        // cb && cb();
        callback();
      },
    );
};

export const sendUnDeliveredQueuedMessages = ({messages}) => {
  socket.emit('sendQueuedMessages', {messages: messages}, () => {
    console.log('message saved to Redis sendUnDeliveredQueuedMessages');
    // cb && cb();
  });
};

export const subscribeToNewMessage = (cb1, cb2) => {
  console.log('message sent: BEFORE msg');
  socket.on('message', msg => {
    console.log('subscribeToNewMessage', msg);
    console.log('message sent: msg', msg);
    cb1(msg);
  });
  socket.on('update-take', msg => {
    console.log('subscribeToNewMessage', msg);
    console.log('message sent: msg', msg);
    cb2(msg);
  });
};

export const subscribeToNewTakeReply = cb => {
  console.log('Take Reply sent: BEFORE msg');
  socket.on('takeDetails', msg => {
    console.log('subscribeToNewMessage', msg);
    console.log('message sent: msg', msg);
    cb(msg);
  });
};
