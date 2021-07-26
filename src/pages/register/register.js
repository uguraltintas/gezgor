import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import styles from './register.style';
import SendDataToFB from '../../helpers/senddata.js';
import * as yup from 'yup';

const Register = ({navigation}) => {
  const createUserWithFB = async ({
    username = '',
    email = '',
    password = '',
  }) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = await auth().currentUser;
      await SendDataToFB('/users/' + user.uid, {username, email, password});
    } catch (error) {
      console.log(error);
    }
  };
  const registerValidationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, ({min}) => `Kullanıcı adınız minimum ${min} karakter olmalı`)
      .required('Kullanıcı adınızı belirlemeniz gerekiyor'),
    email: yup
      .string()
      .email('Lütfen e-posta adresinizi giriniz')
      .required('E-pota adresinizi girmeniz gerekiyor'),
    password: yup
      .string()
      .min(5, ({min}) => `Şifreniz minimum ${min} karakter olmalı`)
      .required('Şifrenizi girmeniz gerekiyor'),
  });

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{username: '', email: '', password: ''}}
        onSubmit={createUserWithFB}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder="Kullanıcı adınızı giriniz."
              onChangeText={handleChange('username')}
              value={values.username}
              maxLength={40}
            />
            {errors.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )}
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
              secureTextEntry
              maxLength={40}
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
            <Button onPress={handleSubmit} text="Kayıt Ol" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
