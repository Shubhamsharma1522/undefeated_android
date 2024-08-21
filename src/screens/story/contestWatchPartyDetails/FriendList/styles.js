import { StyleSheet } from 'react-native';
import { WP, COLORS, FONTS } from '../../../../services'
export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 40

    },
    phoneBook: {
        color: COLORS.phoneBookPlaceHolder,
        fontWeight: 'bold',
        marginTop: WP('5'),
        fontSize: WP('4')
    },
    noContactText: {
        fontWeight: 'bold',
        fontSize: WP('8'),
        color: COLORS.appColour,
        marginTop: WP('80'),
        alignSelf: 'center'
    },
    noContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowStyles: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: WP('4'),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchbarContainer:{
        width:'100%',
    
      },
      searchBar: {
        width: '100%',
        borderColor: COLORS.textFieldBorder,
        // borderRadius:10,
        // marginHorizontal:10,
        paddingVertical:8,
        paddingHorizontal:10,
        borderWidth: 1,
      },
    rowText: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: WP('4'),
        width: WP('60')
    },
    contactParent: {
        marginTop: WP('5')
    },
    btn: {
        height: WP('6'),
        width: WP('18'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: WP('3')
    },
    nextBtn: {
        marginTop: WP('8'),
        width: WP('25'),
        alignSelf: 'flex-end'
    },
    searchContainer: {
        display: 'flex',
        elevation: 2,
        backgroundColor: COLORS.white,
        height: WP('10'),
        width: WP('90'),
        paddingLeft: WP('3'),
        paddingRight: WP('3'),
        borderColor: COLORS.appColour,
        shadowOpacity: 2,
        justifyContent: 'center'
    },
    searchInput: {
        color: COLORS.black
    }

});