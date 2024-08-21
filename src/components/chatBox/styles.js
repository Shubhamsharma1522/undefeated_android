import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, WP} from '../../services';

export default StyleSheet.create({
  chatContainer: {
    marginLeft: 5,
    flexDirection: 'column',
    // flex: 1,
  },
  chatTxt: {
    // borderWidth: 1,
    color: COLORS.black,
    fontSize: WP('4'),
    // marginVertical: 5,
    fontWeight: '500',
    padding: 5,
    // backgroundColor: '#ff0000',
  },
  recTxt: {
    backgroundColor: '#d3d3d3',
    padding: WP(2),
    borderBottomLeftRadius: 0,
    borderRadius: WP(5),
  },
  currentUserText: {
    // backgroundColor: '#c9e1fd',
    backgroundColor: COLORS.appColour,
    padding: WP('0.5'),
    borderRadius: WP('3'),
  },
  otherUserText: {
    backgroundColor: '#c9e1fd',
    // padding: WP('2'),
    padding: WP('0.5'),
    borderRadius: WP('3'),
  },
  recevierText: {
    // backgroundColor: '#00008B',
    backgroundColor: '#d3d3d3',
    padding: WP('2'),
    borderRadius: WP('3'),
  },
  chatTxtLink: {
    color: '#0000ff',
    fontSize: WP('4.5'),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  profileImageContainerChat: {
    display: 'flex',
    height: WP('8'),
    width: WP('8'),
    borderRadius: 100,
    borderWidth: 1,
    // borderColor: '#00008B',
    borderColor: COLORS.appColour,
    marginBottom: 10,
  },
  userNameText: {
    marginHorizontal: 10,
    fontSize: 16,
    // color: COLORS.appColour,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  messageTimeStampCurrentUser: {
    // display: 'flex',
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    marginLeft: 'auto',
  },
  messageTimeStampOtherUser: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  localDate: {
    textAlign: 'center',
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    // width: WP('25'),
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#f5f6fa',
  },
  localDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    borderRadius: 12,
    paddingTop: 1,
    paddingBottom: 8,
    paddingHorizontal: 8,
    maxWidth: '80%',
    marginBottom: 2,
  },
  imgMessageBubble: {
    // height: Dimensions.get('window').width * 0.6, // Set the height to half of window width
    // width: Dimensions.get('window').width * 0.4, // Set the width to 60% of window width
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,
    // overflow: 'hidden',
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 8,
    paddingHorizontal: 2,
    maxWidth: '80%',
    marginBottom: 2,
    // height: Dimensions.get('window').width * 0.55, // Set the height to half of window width
    width: Dimensions.get('window').width * 0.6,
    overflow: 'hidden',
  },
  senderBubble: {
    backgroundColor: COLORS.appColour, // Example color for sender bubble
    borderTopRightRadius: 0,
    // height: Dimensions.get('window').width * 0.5, // Set the height to half of window width
    // width: Dimensions.get('window').width * 0.6,
    // overflow: 'hidden',
  },
  receiverBubble: {
    backgroundColor: '#c9e1fd', // Example color for receiver bubble
    borderTopLeftRadius: 0,
  },
  senderMessageText: {
    fontSize: 16,
    color: COLORS.white,
    // color: '#000000', // Example color for message text
  },
  receiverMessageText: {
    fontSize: 16,
    color: COLORS.black,
    // color: '#000000', // Example color for message text
  },
  timestamp: {
    fontSize: 12,
    color: '#808080', // Example color for timestamp
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  card: {
    width: 200, // Set a fixed width for the card
    height: 200, // Set a fixed height for the card
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  chatTxtLink: {
    color: '#0000ff',
    fontSize: WP('4.5'),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
