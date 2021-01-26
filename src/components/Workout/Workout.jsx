import React from 'react';

import { View, Button, Text } from '../react-native';

import fancyTimeFormat from '../../utils/fancyTimeFormat';
import useTimer from './useCountdownTimer';

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
  const workDuration = parseInt(work);
  const restDuration = parseInt(rest);
  const repDuration = workDuration + restDuration;
  const recoveryDuration = parseInt(recovery);
  const setDuration = repDuration * reps + recoveryDuration;
  const total = setDuration * sets - recoveryDuration;

  const { time, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(total);
  const remaining = total - time;
  const isFinished = remaining === 0;

  if (isFinished) {
    return (
      <View>
        <Text>Finished</Text>
        <Button title="Back" onPress={onClose} />
      </View>
    );
  }

  const currentSet = 1 + ~~(time / setDuration);
  let currentRep = 0;

  let isRest;
  let stateText 

  const isRecovery = time < currentSet * setDuration && time > currentSet * setDuration - recoveryDuration;
  const currentSetStartTime = (currentSet - 1) * setDuration;
  if (isRecovery) {
    isRest = false;
    stateText = `RECOVERY: ${currentSet * setDuration - time}`;
  } else {
    currentRep = ~~((time - currentSetStartTime) / repDuration) + 1;
    const currentRepStartTime = currentSetStartTime + (currentRep - 1) * repDuration;
    isRest = time - currentRepStartTime > workDuration;
    if (isRest) {
      stateText = `REST: ${currentRepStartTime + repDuration - time}`;
    } else {
      stateText = `WORK: ${time - currentRepStartTime}`;
    }
  }
  
  return (
    <View>

      <View>
        <Text>Workout name:</Text>
        <Text>{name}{`   ${work}/${rest} x ${reps} - ${recovery} ${sets}`}</Text>
        <View style={infoLineStyle}>
          <InfoText label='SET' value={`${currentSet}/${sets}`} />
          <InfoText label='REP' value={`${currentRep}/${reps}`} />
        </View>
      </View>

      <View>
        {isActive && <Text>{stateText}</Text>}
        {!isActive && !isPaused ? <Button title="Start" onPress={handleStart} /> : (
                isPaused ? <Button title="Pause" onPress={handlePause} /> :
                  <Button title="Resume" onPress={handleResume}  />
              )
        }
        <Button title="Reset" onPress={handleReset} disabled={!isActive} />
      </View>

      <View>
        <View style={buttonsWrapStyle}>
          <Button title="sound" />
          <Button title="cancel" onPress={() => { handleReset(); onClose(); }} />
        </View>        
        <View style={infoLineStyle}>
          <InfoText label='REMAINING' value={fancyTimeFormat(remaining)} />
          <InfoText label='TOTAL' value={fancyTimeFormat(total)} />
        </View>      
      </View>

    </View>
  );
};

export default Workout;