import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#FFAB73',
    height: 150,
    margin: 10,
  },
  locationContainer: {
    flex: 1,
    backgroundColor: '#ededed',
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
    padding: 10,
    backgroundColor: '#e3dd9a',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  postDate: {
    color: '#9e9e9e',
    position: 'absolute',
    bottom: 2,
    right: 10,
  },
});
