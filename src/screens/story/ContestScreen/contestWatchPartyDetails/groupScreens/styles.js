import { StyleSheet, Platform } from 'react-native';
import { WP, COLORS, FONTS, HP } from '../../../../../services'
export const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        paddingBottom: 40,
    },
    newBetContainer: {
        display: 'flex',
        // borderRadius:WP('5'),
        // borderWidth:WP('0.5'),
        // borderColor:COLORS.black,
        marginTop: WP('10')
    },
    descriptionContainer: {
        display: 'flex',
        // height:WP('30'),
        borderBottomWidth: WP('0.5'),
        borderColor: COLORS.black,
        padding: WP('3')
    },
    descPlaceholder: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont
    },
    titleContainer: {
        display: 'flex',
        borderWidth: WP('0.2'),
        borderColor: COLORS.appColour,
        height: WP('15'),
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowOpacity: 0.2
    },
    welcomeContainer: {
        display: 'flex',
        borderWidth: WP('0.2'),
        borderColor: COLORS.appColour,
        height: WP('25'),
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowOpacity: 0.2,
        marginTop: WP('5')
    },
    titlePlaceholder: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        marginLeft: WP('3'),
        marginRight: WP('3'),
        fontFamily: FONTS.appFont,
        color: "#000"
    },
    welcomePlaceholder: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        marginLeft: WP('3'),
        marginRight: WP('3'),
        fontFamily: FONTS.appFont,
        color: "#000",
    },
    groupParentContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: WP('0.5'),
        borderColor: COLORS.black,
        height: WP('15')
    },
    wager: {
        display: 'flex',
        // height:WP('20'),
        alignItems: 'center',
        // justifyContent:'space-between',
        flexDirection: 'row',
        marginTop: WP('5'),
        marginBottom: WP('5')
    },
    groupBtn: {
        display: 'flex',
        width: WP('55'),
        borderRightWidth: WP('0.5'),
        borderColor: COLORS.black,
        justifyContent: 'center'
    },
    switchBtn: {
        display: 'flex',
        width: WP('40'),
        justifyContent: 'center',
        alignItems: 'center'

    },
    publicStyles: {
        color: COLORS.appColour,
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        elevation: 2
    },
    inactive: {
        color: COLORS.black,
        elevation: 2
    },
    androidSwitchParent: {
        display: 'flex',
        height: WP('8'),
        width: WP('24'),
        borderWidth: 2,
        borderColor: COLORS.appColour,
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: WP('5'),
        paddingLeft: WP('2'),
        overflow: 'hidden',
        paddingRight: WP('1')
    },
    iosParentSwitch: {
        display: 'flex',
        height: WP('8'),
        width: WP('24'),
        borderWidth: 2,
        borderColor: COLORS.appColour,
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: WP('5'),
        paddingLeft: WP('2')
    },
    personBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: WP('3'),
    },
    optionBtnText: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('3'),
    },
    optionImg: {
        height: WP('5'),
        width: WP('5'),
        resizeMode: 'contain',
        marginLeft: WP('4')
    },
    wagerAmountText: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('12')
    },
    wagerContaienr: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    wagerBtn: {
        height: WP('5'),
        width: WP('5'),
        resizeMode: 'contain',
        marginBottom: WP('2')
    },
    counter: {
        marginLeft: WP('2')
    },
    chooseWagerText: {
        color: "#999999",
        fontSize: WP('4')
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: WP('5')
    },
    sendImage: {
        display: 'flex',
        height: WP('15'),
        width: WP('15'),
        resizeMode: 'contain'
    },
    userImage: {
        display: 'flex',
        height: WP('10'),
        width: WP('10'),
        borderRadius: 100,
        marginRight: WP('3'),
        overflow: 'hidden'
    },
    cancelImage: {
        display: 'flex',
        height: WP('8'),
        width: WP('8'),
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        margin: WP('4')
    },
    sendBtn: {
        display: 'flex',
        alignItems: 'center'
    },
    cancelBtn: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: WP('10')
    },
    sendText: {
        color: COLORS.white,
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontFamily: FONTS.appFont
    },
    particpantCount: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontFamily: FONTS.appFont,
        color: COLORS.appColour

    },
    cancelText: {
        color: '#F80000',
        marginTop: WP('3'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontFamily: FONTS.appFont
    },
    invite: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        marginLeft: WP('4'),
        fontFamily: FONTS.appFont
    },
    privateChat: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        color: COLORS.black
    },
    privateChatDescriptions: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('3'),
        fontFamily: FONTS.appFont,
        color: COLORS.lightGrey,
        width: WP('60')
    },
    userListName: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        marginLeft: WP('4'),
        fontFamily: FONTS.appFont,
    },
    members: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        width: WP('60'),
    },
    imageContainer: {
        display: 'flex',
        height: WP('10'),
        width: WP('10'),
        borderRadius: 100,
        marginRight: WP('3'),
        position: 'absolute',
        right: WP('3'),
    },
    addBtn: {
        display: 'flex',
        height: WP('7'),
        width: WP('7'),
        borderRadius: 100,
        position: 'absolute',
        right: WP('3')
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    userImageContainerInside: {
        height: '100%',
        width: '100%',
    },
    profileContainer: {
        display: 'flex',
        height: WP('30'),
        width: WP('30'),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.appColour,
        alignSelf: 'center',
        marginBottom: WP('10')
    },
    userList: {
        display: 'flex',
        margin: 0,
        marginTop: WP('50'),
    },
    lisitngs: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: WP('5'),
        borderTopRightRadius: WP('5'),


    },
    addParticipants: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        alignSelf: 'center',
        color: COLORS.appColour,

    },
    rowName: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        alignSelf: 'center',
        color: COLORS.black,
        width: WP('65')
    },
    lisitngContainer: {
        flexGrow: 1
    },
    noUser: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: WP('40')
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: WP('2'),
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowOpacity: Platform.OS === 'ios' ? 1 : null,
        margin: WP('3')
    },
    parentContainerUSers: {
        marginTop: WP('5'),
        flexGrow: 1,
        paddingBottom: WP('10')
    },
    added: {
        color: COLORS.appColour
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: WP('5')
    },
    optionsBtn: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        color: COLORS.black,
    },
    containerStylesList: {
        display: 'flex',
        flexDirection: 'row'
    },
    containerNames: {
        display: 'flex',
        width: WP('80'),
    },
    createBtnContainer: {
        display: 'flex',
        height: WP('11'),
        width: WP('90'),
        backgroundColor: COLORS.appColour,
        borderRadius: WP('5'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: WP('10')
    },
    privateGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: WP('10')
    },
    betsContainer: {
        marginTop: WP('15')
    }
});