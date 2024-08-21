import {StyleSheet} from 'react-native';
import {WP,COLORS, FONTS} from '../../../services'
import { Colors } from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems:'center',
      justifyContent:'center'
    },
    profileContainer:{
        display:'flex',
        height:WP('40'),
        width:WP('40'),
        borderRadius:100,
        borderWidth:1,
        borderColor:COLORS.appColour,
    },
    btn:{
        marginTop:WP('8'),
        width:WP('25')
    },
    signUpHeaderContainer:{
      flex:1,
      paddingBottom:0,
      backgroundColor:COLORS.appColour
    }
  });