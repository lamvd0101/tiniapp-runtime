import {ContactList, SettingsList} from '@hoangviet/tf-miniapp-core';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import AppList from './pages/AppList';
import AppListModel from './pages/AppList/index.model';
import MiniApp from './pages/MiniApp';
import MiniAppModel from './pages/MiniApp/index.model';
import Policy from './pages/Policy';
import Splash from './pages/Splash';
import SplashModel from './pages/Splash/index.model';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SplashModel.routeName}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name={AppListModel.routeName} component={AppList} />
        <Stack.Screen
          name={MiniAppModel.routeName}
          component={MiniApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsList"
          component={SettingsList}
          options={{
            title: 'Thiết lập',
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ContactList"
          component={ContactList}
          options={{
            title: 'Danh bạ',
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Policy"
          component={Policy}
          options={{
            title: 'Điều khoản sử dụng',
            headerTintColor: '#000',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
