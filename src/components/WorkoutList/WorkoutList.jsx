import React from 'react';

import { View } from '../react-native';
import WorkoutItem from '../WorkoutItem';

const WorkoutList = ({ items, onStart, onEdit, onDelete }) => {
  return (
    <View>
      {items && items.map(({ id, name, work, rest, reps, recovery, sets }) =>
        <WorkoutItem
          key={id}
          id={id}
          name={name}
          work={work}
          rest={rest}
          reps={reps}
          recovery={recovery}
          sets={sets}
          onStart={onStart}
          onEdit={onEdit}
          onDelete={onDelete}
        />)}
    </View>
  );
};
export default WorkoutList;