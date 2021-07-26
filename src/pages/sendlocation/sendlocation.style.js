import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAB73',
  },
  mapViewContainer: {
    flex: 1,
    margin: 15,
  },
  loadingContainer: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    margin: 30,
    alignItems: 'center',
    flex: 1,
  },
  pageTitleContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
  },
  pageTitle: {
    fontSize: 20,
    color: '#fff',
    padding: 10,
    fontWeight: 'bold',
  },
});
