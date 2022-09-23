import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = props => (
  <TouchableOpacity {...props} style={[s.default, s[props.type], props.style]}>
    <TextField style={[s.buttonText, s[`buttonText_${props.type}`]]}>
      {props.title}
    </TextField>
  </TouchableOpacity>
);

const TextField = props => {
  const style = React.useMemo(() => {
    return StyleSheet.flatten([props.style]);
  }, [props.style]);
  return <Text {...props} style={style} />;
};

export default Button;

const s = StyleSheet.create({
  default: {
    flex: 1,
    minWidth: 150,
    height: 40,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1A94FF',
  },
  primary: {
    backgroundColor: '#1A94FF',
  },
  buttonText: {
    color: '#1A94FF',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText_primary: {
    color: '#FFFFFF',
  },
});
