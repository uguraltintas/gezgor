import React from 'react';
import LottieView from 'lottie-react-native';

const Splash = () => {
  return <LottieView source={require('./rocketSplash.json')} autoPlay loop />;
};
export default Splash;
