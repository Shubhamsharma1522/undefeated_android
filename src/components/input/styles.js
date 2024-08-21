import {StyleSheet} from 'react-native';
import {
  fieldBgColor,
  fieldTextColor,
  fieldHeight,
  fieldMarginVertical,
} from '../../services/utilities/styleHelper/appStyle';

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    backgroundColor: fieldBgColor,
    width: '90%',
    color: fieldTextColor,
    height: fieldHeight,
    alignSelf: 'center',
    marginVertical: fieldMarginVertical,
    fontSize: 16,
  },
});
