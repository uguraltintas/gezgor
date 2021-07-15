import database from '@react-native-firebase/database';

const SendDataToFb = (target, data) => {
  database().ref(target).set(data);
};

export default SendDataToFb;
