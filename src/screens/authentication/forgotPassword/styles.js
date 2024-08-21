import {StyleSheet,Platform} from 'react-native';
import {WP,COLORS, FONTS} from '../../../services'
import { Colors } from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor:COLORS.appColour,
    },
    welcomeBanner:{
      display:'flex',
      height:WP('80'),
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
    },
    title:{
      color:COLORS.white,
      fontFamily:FONTS.appFont,
      fontWeight:Platform.OS === 'ios'?'bold':null,
      fontSize:WP('10')
    },
    subTitle:{
      color:COLORS.white,
      fontFamily:FONTS.appFont,
      fontWeight:Platform.OS === 'ios'?'bold':null,
      fontSize:WP('4'),
      marginRight:WP('12')
    },
    welcomeContainer:{
      display:'flex',
      alignSelf:'center'
    //   padding:WP('15'),
    },
    welcomeText:{
      color:COLORS.black,
      fontWeight:Platform.OS === 'ios'?'bold':null,
      fontSize:WP('8'),
      fontFamily:FONTS.appFont,
    },
    inputContainer:{
      display:'flex',
      height:WP('11'),
      width:WP('65'),
      borderColor:COLORS.white,
      borderBottomWidth:WP('1'),
      marginTop:WP('3'),
      marginBottom:WP('2'),
      justifyContent:'center',
      
    },
    placeholder:{
      fontWeight:Platform.OS === 'ios'?'bold':null,
      fontFamily:FONTS.appFont,
      color:COLORS.white
    },
    loginBtn:{
        display:'flex',
        borderColor:COLORS.white,
        borderWidth:WP('1'),
        marginTop:WP('10')
    },
    forgetPassword:{
        alignSelf:'flex-end'
    },
    signUp:{
        alignSelf:'center',
        marginTop:WP('8')
    },
    signUpText:{
        color:COLORS.white,
        fontSize:WP('5'),
        fontWeight:Platform.OS === 'ios'?'bold':null,
        alignSelf:'center'
    }
  });