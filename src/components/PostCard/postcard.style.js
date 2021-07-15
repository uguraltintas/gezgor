import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#FFAB73',
    height: 150,
    margin: 10,
  },
  locationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  locationName: {
    fontWeight: 'bold',
  },
  commentContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#987070',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
