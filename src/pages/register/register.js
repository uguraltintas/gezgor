import React from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import styles from './register.style';
import SendDataToFB from '../../helpers/senddata.js';

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

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{username: '', email: '', password: ''}}
        onSubmit={createUserWithFB}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder="Kullanıcı adınızı giriniz."
              onChangeText={handleChange('username')}
              value={values.username}
            />
            <Input
              placeholder="E-posta adresinizi giriniz."
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <Input
              placeholder="Şifrenizi giriniz."
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry
            />
            <Button onPress={handleSubmit} text="Kayıt Ol" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
