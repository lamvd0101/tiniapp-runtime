import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import MiniAppIcon from '../../components/MiniAppIcon';

export default function AppItem({appName, iconUrl, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.icon}>
        {iconUrl ? (
          <Image
            source={{uri: iconUrl}}
            style={styles.icon__image}
            resizeMode="contain"
          />
        ) : (
          <MiniAppIcon style={styles.icon__image} resizeMode="contain" />
        )}
      </View>
      <Text numberOfLines={2} style={styles.appName}>
        {appName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
  icon: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  icon__image: {
    width: 50,
    height: 50,
    borderRadius: 11,
  },
  appName: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
});
