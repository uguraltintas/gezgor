import React from 'react';
import {TextInput} from 'react-native';
import styles from './Input.style';

const Input = ({
  onChangeText,
  value,
  placeholder,
  multiline = false,
  secureTextEntry = false,
  maxLength = 0,
}) => {
  return (
    <TextInput
      style={styles.container}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
    />
  );
};

export default Input;
