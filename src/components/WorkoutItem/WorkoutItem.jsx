import React from 'react';
import { View, Button, Text } from '../react-native';

const wrapStyle = {
  flexDirection: 'column',
};

const abbrWrapStyle = {
  flexDirection: 'row',
};

const footerStyle = {
  flexDirection: 'row',
};

const WorkoutItem = ({ id, name, work, rest, reps, recovery, sets, onStart, onEdit, onDelete }) => (
  <View style={wrapStyle}>
    <Text>{name}</Text>
    <View style={abbrWrapStyle}>
      <Text>({work}/{rest}) x {reps} - {recovery}</Text>
      {' '}
      <Text>{sets}</Text>
    </View>
    <View style={footerStyle}>
      <Button title="Start" onPress={() => onStart(id)} />
      <Button title="Edit" onPress={() => onEdit(id)} />
      <Button title="Delete" onPress={() => onDelete(id)} />
    </View>
  </View>
);

export default WorkoutItem;