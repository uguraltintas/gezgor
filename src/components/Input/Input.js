import React from 'react';
import {TextInput} from 'react-native';
import styles from './Input.style';

const Input = ({
  onChangeText,
  value,
  placeholder,
  multiline = false,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={styles.container}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
