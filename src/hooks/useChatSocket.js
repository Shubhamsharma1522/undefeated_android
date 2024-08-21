import {useEffect, useState, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as TYPES from '../store/actions/types';

// import {AuthContext} from '../authContext/authContext';
//  import { getConnectionDetails } from "../redux/action-creator/connectionsActions";
// import {ActionType} from '../redux/types';
// import { ALL_BUTTON_FLAGS } from "../utils/constant";
// import {useQuery} from '../utils/queryHook';
// import { addLogs } from "../components/chatUI_v2/helper";
import {
  disconnectSocket,
  initiateChatSocketConnection,
  sendMessage,
  sendUnDeliveredQueuedMessages,
  subscribeToChat,
  subscribeToNewMessage,
} from '../services/utilities/sockets/index';
import {setChatLoading} from '../store/actions/story/index';

const useChatSocket = (chatIdParam, refreshPage = true, from) => {
  const dispatch = useDispatch();
  let socket;
  // const authContext = useContext(AuthContext);
  // const {userJobDetails} = useSelector(state => state.chatReducer);

  // const location = useLocation();
  // const history = useHistory();
  // const locationState = location?.state;
  // console.log('🚀 ~ file: index.tsx ~ line 32 ~ locationState', locationState);

  // const query = useQuery();
  // const chatId =
  //   locationState && locationState.chatId ? locationState.chatId : chatIdParam;
  // console.log({chatIdParam});
  const chatId = chatIdParam;
  // const {authData} = authContext;
  const {user: authData} = useSelector(state => state.auth);

  console.log('🚀 ~ file: index.tsx ~ line 31 ~ chatId', chatId);
  const [state] = useState({
    user: authData?.id,
    room: chatId,
    userRole: authData?.role,
  });

  const [isDisconnected, setIsDisconnected] = useState(true);
  const [isConcluded, setIsConcluded] = useState(false);
  const [socketConnection, setSocketConnection] = useState(null);

  useEffect(() => {
    console.log('SOCKET MOUNT');

    const socket = initiateChatSocketConnection();
    subscribeToNewMessage(msg => {
      // dispatch({type: ActionType.GET_MESSAGE, payload: msg});
      dispatch({type: TYPES.GET_MESSAGE, payload: msg});
    });

    // Listen for disconnect event
    socket.on('disconnect', err => {
      console.log('SOCKET DISCONNECTED');
      console.log('server disconnected: ', err);

      setTimeout(() => {
        setIsDisconnected(true);
      }, 1000);
      console.log('SCOKET GETING DATA err', err, typeof err);

      if (err) {
        // Reconnect manually if the disconnection was initiated by the server
        socket && socket.connect();
        if (err != 'io client disconnect') {
          //The socket was manually disconnected using socket.disconnect()
          //https://socket.io/docs/v3/client-socket-instance/
          // history.go(0);
          // establishSocketConnection();
        }
      }
    });

    socket.on('connect', err => {
      console.log('SOCKET CONNECTED');
      //socket connected
      setIsDisconnected(false);
    });
    // [START cloudrun_websockets_reconnect]
    // Listen for reconnect event
    socket.io.on('reconnect', () => {
      console.log('reconnected');
      setIsDisconnected(false);
      // Emit "updateSocketId" event to update the recorded socket ID with user and room
      socket.emit(
        'updateSocketId',
        {user: state.user, room: state.room, userRole: state.userRole},
        error => {
          if (error) {
            console.error(error);
          }
        },
      );
    });

    return () => {
      console.log('SOCKET UNMOUNT');
      setIsDisconnected(true);
      disconnectSocket();
      // dispatch({type: TYPES.GET_MESSAGES, payload: []});
    };
  }, []);
  const establishSocketConnection = () => {
    console.log('SOCKET MOUNT');

    const socket = initiateChatSocketConnection();
    subscribeToNewMessage(msg => {
      // dispatch({type: ActionType.GET_MESSAGE, payload: msg});
      dispatch({type: TYPES.GET_MESSAGE, payload: msg});
    });

    // Listen for disconnect event
    socket.on('disconnect', err => {
      console.log('SOCKET DISCONNECTED');
      console.log('server disconnected: ', err);

      setTimeout(() => {
        setIsDisconnected(true);
      }, 1000);
      console.log('SCOKET GETING DATA err', err, typeof err);

      if (err) {
        // Reconnect manually if the disconnection was initiated by the server
        socket && socket.connect();
        if (err != 'io client disconnect') {
          //The socket was manually disconnected using socket.disconnect()
          //https://socket.io/docs/v3/client-socket-instance/
          // history.go(0);
          // establishSocketConnection();
        }
      }
    });

    socket.on('connect', err => {
      console.log('SOCKET CONNECTED');
      //socket connected
      setIsDisconnected(false);
    });
    // [START cloudrun_websockets_reconnect]
    // Listen for reconnect event
    socket.io.on('reconnect', () => {
      console.log('reconnected');
      setIsDisconnected(false);
      // Emit "updateSocketId" event to update the recorded socket ID with user and room
      socket.emit(
        'updateSocketId',
        {user: state.user, room: state.room, userRole: state.userRole},
        error => {
          if (error) {
            console.error(error);
          }
        },
      );
    });
  };

  // useEffect(() => {
  //   // (async () => await establishSocketConnection())();
  //   // establishSocketConnection();

  //   return () => {
  //     console.log('SOCKET UNMOUNT');
  //     setIsDisconnected(true);
  //     disconnectSocket();
  //     dispatch({type: TYPES.GET_MESSAGES, payload: []});
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log('SCOKET GETING DATA >>socket Connection', socketConnection);
  //   if (!socketConnection) {
  //     (async () => await establishSocketConnection())();
  //   }
  // }, [socketConnection]);

  // console.log({authData});
  useEffect(() => {
    console.log('FROM PAGEEEEEEEEEEEEE', from, {authData, chatId});
    console.log('SCOKET GETING DATA', from, {authData, chatId});
    if (authData && chatId != null) {
      subscribeToChat(
        {
          childId: authData.id,
          chatId: chatId,
          role: authData.role,
          dispatch,
        },
        data => {
          console.log('SCOKET GETING DATA useEffect ~ data.messages:', data);
          dispatch(setChatLoading(false));
          dispatch({
            type: TYPES.GET_MESSAGES,
            payload: data && data.messages ? data.messages : [],
          });
        },
      );
    }
  }, [authData, chatId]);

  return {isDisconnected, socket, isConcluded, establishSocketConnection};
};

export default useChatSocket;
