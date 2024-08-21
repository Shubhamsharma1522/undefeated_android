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
  subscribeToTakes,
  subscribeToNewMessage,
} from '../services/utilities/takeSockets/index';
import {setTakesLoading} from '../store/actions/story/index';
import {initiateTakeSocketConnection} from '../services/utilities/takeSockets';

const useTakesSocket = (chatIdParam, refreshPage = true, from, navigation) => {
  const dispatch = useDispatch();
  let socket;
  const chatId = chatIdParam;
  const {user: authData} = useSelector(state => state.auth);
  console.log('🚀 ~ file: index.tsx ~ line 31 ~ chatId', chatId);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const subscribeCallbackMainMessage = msg => {
    dispatch({type: TYPES.GET_NEW_TAKE, payload: msg});
  };
  const subscribeCallbackOnTakeUpdate = msg => {
    dispatch({type: TYPES.UPDATE_EXISTING_TAKE, payload: msg});
  };

  useEffect(() => {
    // console.log('Aaaaaaaaaa', socket);
    socket = initiateTakeSocketConnection();
    console.log('SOCKET>>LOGS CONNECTED MOUJNT', socket);
    subscribeToNewMessage(
      subscribeCallbackMainMessage,
      subscribeCallbackOnTakeUpdate,
    );

    // Listen for disconnect event
    socket.on('disconnect', err => {
      console.log('SOCKET>>LOGS DISCONNECTED');
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
      console.log('SOCKET>>LOGS CONNECTED', socket);
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
        {
          takeId: chatId,
          userRole: authData.role,
          takesUserId: authData.id,
        },
        // {user: state.user, room: state.room, userRole: state.userRole},
        error => {
          if (error) {
            console.error(error);
          }
        },
      );
    });
    return () => {
      if (from === 'Takes') {
        console.log('SOCKET>>LOGS UNMOUNT');
        setIsDisconnected(true);
        disconnectSocket();
      }
    };
  }, []),
    useEffect(() => {
      console.log('FROM PAGEEEEEEEEEEEEE', from, {authData, chatId});
      console.log('SCOKET GETING DATA', from, {authData, chatId});
      if (authData && chatId != null) {
        subscribeToTakes(
          {
            takeId: chatId,
            userRole: authData.role,
            takesUserId: authData.id,
            dispatch,
          },
          data => {
            console.log('SCOKET GETING DATA useEffect ~ data.messages:', data);
            dispatch(setTakesLoading(false));
            dispatch({
              type: TYPES.GET_TAKES,
              payload: data ? data : [],
            });
          },
        );
      }
    }, [authData, chatId]);

  console.log('POWER SOCKET', {socket});

  return {isDisconnected, socket};
};

export default useTakesSocket;