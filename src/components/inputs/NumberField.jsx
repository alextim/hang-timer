import React from 'react';

import { View, Text, TextInput, Button } from '../react-native';

const wrapStyle = {
  flexDirection: 'row',
};

const textStyle = {
  flex: 1,
};

const inputWrapStyle = {
  flexDirection: 'row',
  flex: 1,
};

const NumberField = ({ label, name, addValue, ...rest }) => (
  <View style={wrapStyle}>
    <Text style={textStyle}>{label}</Text>
    <View style={inputWrapStyle}>
      <Button title="-" onPress={() => addValue(name, -1)} />
      <TextInput name={name} {...rest} />
      <Button title="+" onPress={() => addValue(name, 1)} />
    </View>
  </View>
);

export default NumberField;