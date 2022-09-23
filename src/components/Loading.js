import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

import MiniAppIcon from './MiniAppIcon';

export default function Loading({iconUrl, onReady = () => {}}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = progress + Math.random();
    let timeOut;
    if (progress < 1) {
      timeOut = setTimeout(() => {
        setProgress(newProgress);
      }, Math.random() * 200 + 200);
    } else {
      onReady();
    }
    return () => clearTimeout(timeOut);
  }, [progress, onReady]);

  return (
    <View style={s.loading}>
      {iconUrl ? (
        <Image source={{uri: iconUrl}} style={s.loading__icon} />
      ) : (
        <MiniAppIcon style={s.loading__icon} />
      )}

      <Progress.Circle
        style={s.loading__progress}
        progress={progress}
        size={120}
        color="#1BA8FF"
        borderColor="rgba(0,0,0,0,0)"
        unfilledColor="#E6EBF5"
      />
      <Text style={s.loading__progressText}>
        {progress > 1 ? 100 : (progress * 100).toFixed(1)}%
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading__icon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  loading__progress: {
    marginTop: 22,
  },
  loading__progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1BA8FF',
    fontWeight: '500',
  },
});
