import {StyleSheet,Platform} from 'react-native';
import { WP, COLORS, FONTS } from '../../../services';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifyBox:{
        display:'flex',
        height:WP('15'),
        width:WP('15'),
        borderWidth:1,
        borderColor:COLORS.appColour,
        marginRight:WP('4'),
        alignItems:'center',
        justifyContent:'center'
    },
    boxParentContainer:{
        display:'flex',
        flexDirection:'row'
    },
    text:{
        color:COLORS.appColour,
        fontFamily:FONTS.appFont,
        fontWeight:Platform.OS === 'ios'?'bold':null,
        textAlign:'center'

    },
    submitBtn:{
        marginTop:WP('10')
    },
    OTP:{
        color:COLORS.appColour,
        fontFamily:FONTS.appFont,
        fontWeight:Platform.OS === 'ios'?'bold':null, marginBottom:WP('10'),
        fontSize:WP('5')
    },
    resendContainer:{
        display:'flex',
        alignSelf:'center',
        marginTop:WP('5')
    },
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color:COLORS.appColour
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
      otpContainer:
      {
          width: '80%', height: 200
        }
  });