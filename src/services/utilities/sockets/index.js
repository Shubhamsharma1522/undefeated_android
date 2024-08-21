import {io} from 'socket.io-client';
import {CHAT_URL} from '../../constants';
// import {sendSms, setChatLoading} from '../redux/action-creator/common.action';
import {sendSms, setChatLoading} from '../../../store/actions/story/index';
import {useEffect} from 'react';
let socket;

export const initiateChatSocketConnection = () => {
  console.log('SOCKET MOUNT INSIDE initiateChatSocketConnection', CHAT_URL);
  socket = io(CHAT_URL);

  console.log('Connecting socket...');

  return socket;
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
export const subscribeToChat = ({childId, chatId, role, dispatch}, cb) => {
  console.log('SCOKET GETING DATA  >> INSIDE subscribeToChat ~ chatId', {
    childId,
    chatId,
    role,
    dispatch,
  });
  dispatch(setChatLoading(true));
  // setTimeout(() => {
  //   dispatch(setChatLoading(false));
  // }, 5000);
  socket.emit(
    'signin',
    {
      user: childId,
      room: String(chatId),
      role,
    },
    (error, history) => {
      if (error) {
        console.log('SCOKET GETING DATA >> ERROR', error);
        dispatch(setChatLoading(false));
      } else {
        console.log(
          '🚀 ~ file: index.tsx ~ line 95 ~ //getMessages ~ history',
          history,
        );
        console.log('SCOKET GETING DATA >> MESSAGES', history);
        dispatch(setChatLoading(false));

        cb(history);

        // The history callback includes message history
        // if (history) addHistory(history.messages);
        // Load chat room messages
        // setChatroom(room);
        // $('#signin').hide();
        // $('#chatroom').show();
        // window.scrollTo(0, document.body.scrollHeight);
      }
    },
  );

  // cb(history);
};

export const sendMessage = ({
  user,
  message,
  role,
  emitType,
  img,
  id,
  dispatch,
  chatId,
  chatRecipientDetails,
  messageType,
  notifyOnMessageSent,
  senderData,
}) => {
  console.log('message sent: SOCKET EMIT', socket, message);
  if (!socket) {
    initiateChatSocketConnection();
  }
  socket &&
    socket.emit(
      'sendMessage',
      {
        message,
        role,
        emitType,
        img,
        id,
        chatId,
        chatRecipientDetails,
        messageType,
        senderData,
      },
      () => {
        console.log('message sent', message, socket);
        notifyOnMessageSent && notifyOnMessageSent({message});

        // dispatch(
        //   sendSms({user, message, role, emitType, img, id, chatId, orderId}),
        // );
        // cb && cb();
      },
    );
};

// export const sendMessageExternal = ({
//   message,
//   role,
//   id,
//   jobId,
//   socketSpecific,
//   userId,
//   chatRecipientDetails,
// }) => {
//   console.log('in sendMessageExternal');

//   socketSpecific.emit(
//     'sendMessage',
//     {
//       message,
//       role,
//       id,
//       jobId,
//       type: 'external',
//       userId,
//       chatRecipientDetails,
//     },
//     () => {
//       disconnectSpecificSocket(socketSpecific);
//       // cb && cb();
//     },
//   );
// };

// export const getJobDetailsByOrderId = ({orderId}, callback) => {
//   _GET(`/jobDetailsByOrderId/${orderId}`).then(res => {
//     console.log('response', res);
//     if (res.data?.status) {
//       callback(res?.data?.data);
//     } else callback(false);
//   });
// };

// export const sendMessageAfterPayment = (
//   dispatch,
//   {orderId, upgrade, role, userId},
// ) => {
//   // return new Promise((resolve, reject) => {
//   try {
//     if (!upgrade) return;

//     getJobDetailsByOrderId({orderId}, response => {
//       console.log('sendMessageAfterPayment', response);
//       const {userId, serviceName, jobId} = response;
//       createSocketAndSendMessageExt({
//         message: `User #${userId} has upgraded to service - ${serviceName}. (Please standby for conclusion)`,
//         role: 5,
//         id: uuidv4(),
//         jobId,
//         // userId: ADMIN_ID,
//       });
//       return;
//     });
//   } catch (error) {
//     console.log('errorrr', error);
//     return;
//   }
// };

// export const createSocketAndSendMessageExt = ({
//   message,
//   role,
//   id,
//   jobId,
//   userId,
//   chatRecipientDetails,
// }) => {
//   const socket = initiateSpecificSocketConnection();
//   socket.on('connect', async () => {
//     await sendMessageExternal({
//       message,
//       role,
//       id,
//       jobId,
//       socketSpecific: socket,
//       userId,
//       chatRecipientDetails,
//     });
//   });
// };

// export const createSocketAndGetJobUnreadDetailExt = ({
//   jobId,
//   userId,
//   userRole,
//   userJobDetails,
//   dispatch,
// }) => {
//   const socket = initiateSpecificSocketConnection();
//   socket.on('connect', async () => {
//     await getJobUnreadDetail({
//       jobId,
//       userId,
//       userRole,
//       userJobDetails,
//       socketSpecific: socket,
//       cb: data => {
//         console.log('job details from socket for Job', jobId, data);
//         dispatch({
//           type: ActionType.UPDATE_EXPERT_PENDING_JOBS,
//           payload: {isUnread: data.isUnread, jobId},
//         });
//         // UPDATE_EXPERT_PENDING_JOBS
//       },
//     });
//   });
// };

// export const aggJobUnreadDetailForSocket = ({
//   userId,
//   userRole,
//   data,
//   dispatch,
// }) => {
//   data
//     .filter(it => it.viewChat)
//     .forEach(it => {
//       createSocketAndGetJobUnreadDetailExt({
//         jobId: it.jobId,
//         userId,
//         userRole,
//         userJobDetails: it,
//         dispatch,
//       });
//     });
// };

// export const getJobUnreadDetail = ({
//   jobId,
//   socketSpecific,
//   userId,
//   userRole,
//   userJobDetails,
//   cb,
// }) => {
//   console.log('in sendMessageExternal');

//   socketSpecific.emit(
//     'getJobUnreadDetail',
//     {room: jobId, type: 'external', userId, userRole, userJobDetails},
//     (error, data) => {
//       disconnectSpecificSocket(socketSpecific);
//       if (error) {
//         console.error(error);
//       } else {
//         cb(data);
//       }
//     },
//   );
// };

export const sendUnDeliveredQueuedMessages = ({messages}) => {
  socket.emit('sendQueuedMessages', {messages: messages}, () => {
    console.log('message saved to Redis sendUnDeliveredQueuedMessages');
    // cb && cb();
  });
};

export const subscribeToNewMessage = cb => {
  console.log('message sent: BEFORE msg');
  socket.on('message', msg => {
    console.log('subscribeToNewMessage', msg);
    console.log('message sent: msg', msg);
    cb(msg);
  });
};
