import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAB73',
  },
  loadingContainer: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  pageTitleContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    color: '#fff',
    padding: 10,
    fontWeight: 'bold',
  },
});
