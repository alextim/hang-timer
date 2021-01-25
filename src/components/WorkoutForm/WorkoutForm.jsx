import React, { useState } from 'react';

import TextField from '../inputs/TextField';
import NumberField from '../inputs/NumberField';

import { View, Text, Button } from '../react-native';

const initialValues = {
  name: '',
  work: 0,
  rest: 0,
  reps: 0,
  recovery: 0,
  sets: 0,
};


const footerStyle = {
  flexDirection: 'row',
};

const WorkoutForm = ({ mode, currentItem, saveItem, addItem, onClose }) => {
  const [values, setValues] = useState(mode === 'new' ? initialValues : currentItem);

  const resetForm = () => {
    setValues(initialValues);
  };

  const allEmpty = () => {
    const keys = Object.keys(values);
    return !keys.some((key) => values[key]);
  };

  const add = () => {
    addItem(values);
    resetForm();
  };

  const save = () => {
    saveItem(values);
    resetForm();
  };

  const onChangeHandler = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const addValue = (name, value) => {
    const newValue = parseInt(values[name]) + parseInt(value);
    if (newValue < 0) {
      return;
    }
    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const formTitle = mode === 'new' ? 'New' : 'Edit';
  const saveHandler = mode === 'new' ? add : save;

  return (
    <View>
      <Text>{formTitle}</Text>
      <TextField  label="Workout Name" name="name" value={values.name} onChangeText={onChangeHandler} />
      <NumberField label="Work" name="work" value={values.work} addValue={addValue} onChangeText={onChangeHandler} />
      <NumberField label="Rest" name="rest" value={values.rest} addValue={addValue} onChangeText={onChangeHandler} />
      <NumberField label="Reps" name="reps" value={values.reps} addValue={addValue} onChangeText={onChangeHandler} />
      <NumberField label="Recovery" name="recovery" value={values.recovery} addValue={addValue} onChangeText={onChangeHandler} />
      <NumberField label="Sets"name="sets"  value={values.sets} addValue={addValue} onChangeText={onChangeHandler} />
      <View style={footerStyle}>
        <Button title="Save Workout" onPress={saveHandler} disabled={allEmpty()} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </View>
  );
};

export default WorkoutForm;