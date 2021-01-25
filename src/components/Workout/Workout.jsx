import React from 'react';

import { View, Button, Text } from '../react-native';
import fancyTimeFormat from '../../utils/fancyTimeFormat';

const infoStyle = {
  flexDirection: 'row',
};

const InfoText = ({ label, value }) => (
  <View style={infoStyle}>
    <Text>{label}</Text>{': '}
    <Text>{value}</Text>
  </View>
);

const infoLineStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const buttonsWrapStyle = {
  flexDirection: 'row',
};

const Workout = ({ currentItem, onClose }) => {
  const { name, work, rest, reps, recovery, sets } = currentItem;
  const total = ((parseInt(work) + parseInt(rest)) * reps + parseInt(recovery)) * sets - parseInt(recovery);
  const remaining = total;
  const currentSet = 1;
  const currentRep = 1;

  return (
    <View>
      <View>
        <Text>Workout name:</Text>
        <Text>{name}</Text>
        <View style={infoLineStyle}>
          <InfoText label='SET' value={`${currentSet}/${sets}`} />
          <InfoText label='REP' value={`${currentRep}/${reps}`} />
        </View>
      </View>
      <View>
        <Text>123</Text>
        <Button title="play" />
      </View>
      <View>
        <View style={buttonsWrapStyle}>
          <Button title="sound" />
          <Button title="cancel" onPress={onClose} />
        </View>        
        <View style={infoLineStyle}>
          <InfoText label='REMAINING' value={fancyTimeFormat(remaining)} />
          <InfoText label='TOTAL' value={fancyTimeFormat(total)} />
        </View>      
      </View>
    </View>
  )
};

export default Workout;