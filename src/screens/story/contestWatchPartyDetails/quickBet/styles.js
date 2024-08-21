import { StyleSheet, Platform } from 'react-native';
import { WP, COLORS, FONTS } from '../../../../services'
export const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        paddingBottom: 40
    },
    newBetContainer: {
        display: 'flex',
        // height:WP('90'),
        // borderRadius:WP('5'),
        // borderWidth:WP('0.5'),
        borderColor: COLORS.black,
        overflow: 'hidden',
        marginTop: WP('10')

    },
    descriptionContainer: {
        display: 'flex',
        height: WP('30'),
        borderBottomWidth: WP('0.5'),
        borderColor: COLORS.borderColor,
        padding: WP('3'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.borderColor,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,

    },
    descPlaceholder: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        color: "#000"
    },
    titleContainer: {
        display: 'flex',
        borderBottomWidth: WP('0.5'),
        borderColor: COLORS.black,
        height: WP('15'),
        justifyContent: 'center'
    },
    titlePlaceholder: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('4'),
        marginLeft: WP('3'),
        marginRight: WP('3'),
        fontFamily: FONTS.appFont
    },
    groupParentContainer: {
        display: 'flex',
        flexDirection: 'row',
        // borderBottomWidth:WP('0.5'),
        borderColor: COLORS.black,
        height: WP('15'),
        marginTop: WP('5')
    },
    groupParentContainerGroup: {
        display: 'flex',
        flexDirection: 'row',
        // borderBottomWidth:WP('0.5'),
        borderColor: COLORS.black,
        // height:WP('15'),
        marginTop: WP('5')

    },
    wager: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: WP('5')
    },
    groupBtn: {
        display: 'flex',
        width: WP('90'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.lightGrey,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
        padding: WP('3')
    },
    descriptionsBtn: {
        display: 'flex',
        width: WP('90'),
        height: WP('17'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.lightGrey,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
        padding: WP('3'),
        marginBottom: WP('3'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickedBetsBtn: {
        display: 'flex',
        width: WP('90'),
        height: WP('17'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.lightGrey,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
        // padding: WP('3'),
        marginBottom: WP('3'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    contactsBtn: {
        display: 'flex',
        width: WP('55'),
        height: WP('13'),
        // borderRightWidth:WP('0.5'),
        // borderColor:COLORS.black,
        justifyContent: 'center',
        borderWidth: WP('0.5'),
        borderColor: COLORS.borderColor,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
        marginTop: WP('3')
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
        elevation: 2,
        fontFamily: FONTS.appFont
    },
    inactive: {
        color: COLORS.black,
        elevation: 2,
        fontFamily: FONTS.appFont
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
        paddingRight: WP('1'),

    },
    iosParentSwitch: {
        display: 'flex',
        height: WP('8'),
        width: WP('24'),
        borderWidth: 2,
        // borderColor:COLORS.appColour,
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: WP('5'),
        paddingLeft: WP('2'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.borderColor,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
    },
    personBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: WP('3'),
    },
    optionBtnText: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('3'),
        fontFamily: FONTS.appFont,
        width: WP('35')
    },
    optionImg: {
        height: WP('5'),
        width: WP('5'),
        resizeMode: 'contain',
        marginLeft: WP('4')
    },
    wagerAmountText: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('8'),
        fontFamily: FONTS.appFont
    },
    wagerContaienr: {
        display: 'flex',
        // flexDirection:'row',
        alignItems: 'center'
    },
    wagerBtn: {
        height: WP('5'),
        width: WP('5'),
        resizeMode: 'contain',
        marginBottom: WP('2')
    },
    counter: {
        marginLeft: WP('2'),

    },
    chooseWagerText: {
        color: COLORS.appColour,
        fontSize: WP('4'),
        fontFamily: FONTS.appFont,
        // marginTop:Platform.OS === 'ios'? WP('7'):null,
        // alignSelf:'center'
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: WP('5')
    },
    sendImage: {
        display: 'flex',
        height: WP('15'),
        width: WP('15'),
        resizeMode: 'contain'
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
        color: '#017DF0',
        marginTop: WP('3'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontFamily: FONTS.appFont
    },
    cancelText: {
        color: '#F80000',
        marginTop: WP('3'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontFamily: FONTS.appFont
    },
    Modal: {
        display: 'flex',
        // alignItems:'center',
        // justifyContent:'center',
        backgroundColor: COLORS.appColour,
        padding: WP('5'),
        borderRadius: WP('3')
    },
    titleModal: {
        fontSize: WP('5'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.white,
        fontFamily: FONTS.appFont
    },
    popularText: {
        fontSize: WP('3.5'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.white,
        fontFamily: FONTS.appFont,
        marginTop: WP('3')

    },
    watchParty: {
        fontSize: WP('4'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.appColour,
        fontFamily: FONTS.appFont,
        marginBottom: WP('3')

    },
    purposedBet: {
        fontSize: WP('4'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.appColour,
        fontFamily: FONTS.appFont,
        marginTop: WP('3'),
        marginBottom: WP('3')

    },
    screenHeading: {
        fontSize: WP('4'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.appColour,
        fontFamily: FONTS.appFont,
        alignSelf: 'center',
        marginTop: WP('5')
    },
    screenDescription: {
        fontSize: WP('3'),
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        color: COLORS.lightGrey,
        fontFamily: FONTS.appFont,
        alignSelf: 'center',
        marginTop: WP('2')
    },
    btnContainer: {
        backgroundColor: 'transparent',
        borderColor: COLORS.white,
        height: WP('12'),
        width: WP('40'),
        borderWidth: 2,
        borderRadius: WP('3'),
        marginTop: WP('10'),
    },
    textBtn: {
        color: COLORS.white,
        textAlign: 'center'
    },
    addWager: {
        backgroundColor: 'transparent',
        borderColor: COLORS.white,
        height: WP('12'),
        width: WP('80'),
        borderWidth: 2,
        borderRadius: WP('3'),
        marginTop: WP('10'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: WP('4'),
        fontWeight: 'bold',
        fontFamily: FONTS.appFont,
        color: "#000",
        width: WP('90'),
        textAlign: 'center',
        height: WP('15'),
        borderWidth: WP('0.5'),
        borderColor: COLORS.borderColor,
        backgroundColor: "white",
        marginBottom: WP('2')
    },
    descriptionText: {
        fontSize: WP('3'),
        fontWeight: 'bold',
        fontFamily: FONTS.appFont,
        color: "#000",
        textAlign: 'center',

    },
    wagerBtn: {
        fontSize: WP('8'),
        fontWeight: 'bold',
        fontFamily: FONTS.appFont,
        color: "#000",
        borderColor: COLORS.borderColor,
        backgroundColor: "white",
        elevation: 3,
        shadowOpacity: 0.6,
        width: WP('60'),
        height: WP('10'),
        marginTop: WP('5'),
        borderRadius: WP('100'),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3
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
    userImageContainerInside: {
        height: '100%',
        width: '100%',
    },
    userImage: {
        display: 'flex',
        height: WP('10'),
        width: WP('10'),
        borderRadius: 100,
        marginRight: WP('3'),
        overflow: 'hidden'
    },
    addBtn: {
        display: 'flex',
        height: WP('7'),
        width: WP('7'),
        borderRadius: 100,
        position: 'absolute',
        right: WP('3')
    },
    memberBtn: {
        display: 'flex',
        height: WP('7'),
        width: WP('7'),
        borderRadius: 100,
        position: 'absolute',
        right: WP('3')
    },
    memberText: {
        display: 'flex',

        position: 'absolute',
        right: WP('3')
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    showParticipants: {
        display: 'flex',
        borderWidth: WP('1'),
        borderColor: COLORS.black,
        borderRadius: WP('1'),
        width: WP('90'),
        alignSelf: 'center',
        padding: WP('5')

    },
    rowStyles: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: WP('4'),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.borderColor,
        paddingBottom: WP('2'),
    },
    btn: {
        height: WP('8'),
        width: WP('25'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 3,
        shadowOpacity: 0.6,
        marginRight: WP('2'),
        marginTop: WP('2'),


    },
    contactParent: {
        marginTop: WP('5'),
        padding: WP('5')
    },
    title: {
        color: COLORS.appColour,
        fontWeight: '500',
        fontSize: WP('4')
    },
    searchContainer: {
        display: 'flex',
        elevation: 3,
        backgroundColor: COLORS.white,
        height: WP('10'),
        width: WP('90'),
        paddingLeft: WP('3'),
        // paddingRight:WP('3'),
        borderColor: COLORS.appColour,
        shadowOpacity: 3,
        alignSelf: 'center',
        borderRadius: WP('100'),
        justifyContent: 'center'

    },
    imagesContainer: {
        flexDirection: 'row',
    },
    profile_image: {
        height: WP('10'),
        width: WP('10'),
        resizeMode: 'cover',
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: WP('2')
    },
});