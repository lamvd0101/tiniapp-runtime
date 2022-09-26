import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../Button';

const DialogView = ({
  onCloseButtonPress,
  onApplyButtonPress,
  link,
  navigation,
}) => {
  const openLink = React.useCallback(async () => {
    navigation.navigate('Policy', {url: link});
  }, [link, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lưu ý</Text>
        <Text style={styles.textContent}>
          Khi sử dụng tiện ích đồng nghĩa với việc bạn chấp nhận{' '}
          <Text
            onPress={openLink}
            style={[styles.textContent, styles.textLink]}>
            Điều khoản sử dụng
          </Text>{' '}
          của nền tảng Tini App.
        </Text>
        <View style={styles.buttons}>
          <Button
            style={styles.buttonLeft}
            title="Thoát tiện ích"
            onPress={onCloseButtonPress}
          />
          <Button
            style={styles.buttonRight}
            title="Đồng ý"
            type="primary"
            onPress={onApplyButtonPress}
          />
        </View>
      </View>
    </View>
  );
};

const Container = props => {
  return (
    <View
      animationType="fade"
      style={styles.modal}
      backdropOpacity={0.4}
      isVisible={true}>
      <DialogView {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#27272A',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContent: {
    marginVertical: 16,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  textLink: {
    color: '#1A94FF',
  },
  buttons: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonLeft: {
    marginRight: 4,
  },
  buttonRight: {
    marginLeft: 4,
  },
});

export default React.memo(Container);
