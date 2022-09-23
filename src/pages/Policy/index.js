import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default ({route, navigation}) => {
  navigation.setOptions({
    title: 'Điều khoản sử dụng',
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerTitleStyle: {
      left: -20,
      fontWeight: 'bold',
      fontSize: 18,
      color: '#28282B',
    },
    headerLeft: props => {
      return (
        <View style={s.backButton}>
          <HeaderBackButton
            {...props}
            style={s.backButton__icon}
            backImage={() => (
              <Image
                source={{
                  uri:
                    'https://salt.tikicdn.com/ts/tiniapp/19/d1/ed/8d72c048e88859c58fc8986ef72e7251.png',
                }}
                style={s.backButton__icon}
              />
            )}
            labelVisible={false}
          />
        </View>
      );
    },
  });
  const {url} = route.params;

  return <WebView originWhitelist={['*']} source={{uri: url}} />;
};

const s = StyleSheet.create({
  backButton: {
    marginLeft: 14,
    alignItems: 'center',
  },
  backButton__icon: {
    width: 24,
    height: 24,
  },
});
