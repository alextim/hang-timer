import React from 'react';

import { View, Text, TextInput } from '../react-native';

const TextField = ({ label, name, ...rest }) => (
  <View>
    <Text>{label}</Text>
    <TextInput type="text" name={name} {...rest} />
  </View>
);

export default TextField;