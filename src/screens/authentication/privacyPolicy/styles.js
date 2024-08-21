import { StyleSheet, Platform } from 'react-native';
import { WP, COLORS, FONTS, HP } from '../../../services'
import { Colors } from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        backgroundColor: COLORS.appColour,
        // marginTop: 0,
        padding: WP(4)
    },
    policyHeadingPara: {
        color: COLORS.white,
        fontFamily: FONTS.appFont,
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('6'),
    },
    policyPara: {
        color: COLORS.white,
        fontFamily: FONTS.appFont,
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        fontSize: WP('3'),
    },
    buttonContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        padding: WP(4),
      },
      declineButton: {
        backgroundColor: "red",
      },
});