import React from 'react';
import {View} from 'react-native';
import styles from './login.style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const navigateRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const loginWithFB = async ({email = '', password = ''}) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={{email: '', password: ''}} onSubmit={loginWithFB}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder="E-posta adresinizi giriniz."
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <Input
              placeholder="Şifrenizi giriniz."
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <Button onPress={handleSubmit} text="Giriş Yap" />
            <Button onPress={navigateRegisterScreen} text="Kayıt Ol" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
