/**
 * Created by bby on 11/12 0012.
 */
import {
  Dimensions,
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  fieldContainer: {
    padding: 10,
    margin: 40,
    height: 50
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
