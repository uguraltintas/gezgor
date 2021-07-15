import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return <LottieView source={require('./loading.json')} autoPlay loop />;
};
export default Loading;
