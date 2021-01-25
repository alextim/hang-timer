import React, { useState } from 'react';

import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import Workout from './components/Workout';

import { Button } from './components/react-native';

const LS_KEY_NAME = 'items';

const getData = () => {
  const items = localStorage.getItem(LS_KEY_NAME);
  return items ? JSON.parse(items) : [];
};
const setData = (items) => localStorage.setItem(LS_KEY_NAME, JSON.stringify(items));

const getNewId = (items) => items.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;

function App() {
  const [workoutItems, setWorkoutItems] = useState(getData());
  const [mode, setMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const addNewHandler = () => {
    setCurrentItem(null);
    setMode('new');
  };

  const editHandler = (id) => {
    const item = workoutItems.find((item) => item.id === id);
    setCurrentItem(item);
    setMode('edit');
  };

  const addNewItem = (data) => {
    setWorkoutItems((prev) => {
      const items = [...prev];
      const id = getNewId(items);
      items.push({ id, ...data });
      setData(items);
      setMode(false);
      return items;
    });
  };

  const startWorkout = (id) => {
    setCurrentItem(workoutItems.find((item) => item.id === id));
    setMode('workout');
  };
  
  const saveItem = (data) => {
    setWorkoutItems((prev) => {
      const index = prev.findIndex(({ id }) => id === data.id);
      if (index === -1) {
        return;
      }
      const items = [...prev];
      items[index] = { ...data };
      setData(items);
      setMode(false);
      return items;
    });
  };

  const deleteItem = (id) => {
    setWorkoutItems((prev) => {
      const items = prev.filter((item) => item.id !== id);
      setData(items);
      return items;
    });
  };

  if (mode === 'workout') {
    return <Workout currentItem={currentItem} onClose={() => setMode(false)} />;
  }
  if (mode === 'new' || mode === 'edit') {
    return <WorkoutForm mode={mode} currentItem={currentItem} saveItem={saveItem} addItem={addNewItem} onClose={() => setMode(false)} />;
  }
  return (
    <>
      <WorkoutList
        items={workoutItems}
        onStart={startWorkout}
        onEdit={editHandler}
        onDelete={deleteItem}
      />
      <Button title="+" onClick={addNewHandler} />
    </>
  );
}

export default App;
