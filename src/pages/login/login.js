import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import styles from './login.style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

const Login = ({navigation}) => {
  const navigateRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const loginWithFB = async ({email = '', password = ''}) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      showToast();
      console.log(error);
    }
  };

  const showToast = () => {
    ToastAndroid.show('E-posta ya da Şifreniz Yanlış', ToastAndroid.LONG);
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen e-posta adresinizi giriniz')
      .required('E-pota Adresinizi Girmeniz Gerekiyor'),
    password: yup
      .string()
      .min(5, ({min}) => `Şifreniz minimum ${min} karakter olmalı`)
      .required('Şifrenizi Girmeniz Gerekiyor'),
  });

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={loginWithFB}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder="E-posta adresinizi giriniz."
              onChangeText={handleChange('email')}
              value={values.email}
              maxLength={40}
            />
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
            <Input
              placeholder="Şifrenizi giriniz."
              onChangeText={handleChange('password')}
              value={values.password}
              maxLength={40}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
            <Button onPress={handleSubmit} text="Giriş Yap" />
            <Button onPress={navigateRegisterScreen} text="Kayıt Ol" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
