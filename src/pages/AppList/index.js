import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import Loading from '../../components/Loading';
import Configs from '../../configs';
import {queryAppList} from '../../services/packages';
import MiniAppModel from '../MiniApp/index.model';
import AppItem from './AppItem';

export default function AppList(props) {
  const [apps, setApps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  const configs = new Configs();

  async function getAppList() {
    try {
      const appList = await queryAppList();
      setApps(appList);
      setLoading(false);
    } catch (error) {}
  }

  function onPress(app) {
    const {navigation} = props;
    const params = new MiniAppModel(app);
    navigation.dispatch(
      CommonActions.navigate({
        name: MiniAppModel.routeName,
        params,
      }),
    );
  }

  function renderItem({item}) {
    return <AppItem {...item} onPress={() => onPress(item)} />;
  }

  useEffect(() => {
    getAppList();
  }, []);

  if (loading || !ready) {
    return (
      <Loading
        onReady={() => {
          setReady(true);
        }}
      />
    );
  }

  return (
    <View style={s.wrapper}>
      <FlatList
        numColumns={3}
        data={apps}
        renderItem={renderItem}
        keyExtractor={({appId}) => appId}
        ListFooterComponent={
          <View style={s.footer}>
            <Text style={s.footer__text}>
              App Registry: {configs.package.APP_REGISTRY}
            </Text>
            <Text style={s.footer__text}>
              Framework: {configs.package.FRAMEWORK_CDN_BASE_URL}
            </Text>
          </View>
        }
        style={s.list}
        contentContainerStyle={s.list__container}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  list: {
    alignSelf: 'stretch',
  },
  list__container: {
    padding: 16,
  },
  footer: {
    alignItems: 'center',
  },
  footer__text: {
    color: '#333333',
    fontSize: 12,
  },
});

AppList.navigationOptions = {
  title: 'Mini App List',
};
