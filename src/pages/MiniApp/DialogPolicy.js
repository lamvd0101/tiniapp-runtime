import React from 'react';

import PolicyModal from '../../components/DialogPolicy';
import {getPolicy} from '../../services/policy';
import AsyncStorage from '../../utils/async-storage';

const KEY_POLICY_STORAGE = 'SAVE_POLICY_STORAGE';

class DialogPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {link: null};
  }

  showPolicy = async () => {
    const result = await AsyncStorage.getItem(KEY_POLICY_STORAGE);
    if (result === 'saved') {
      return;
    }
    try {
      const policyData = await getPolicy();
      this.setState({link: policyData.data.frameworkVersion.value});
    } catch {}
  };

  async onApplyButtonPress() {
    await AsyncStorage.setItem(KEY_POLICY_STORAGE, 'saved');
    this.setState({link: null});
  }
  render() {
    if (!this.state.link) {
      return false;
    }
    return (
      <PolicyModal
        {...this.props}
        link={this.state.link}
        onCloseButtonPress={() => this.props.exitMiniApp?.()}
        onApplyButtonPress={() => this.onApplyButtonPress()}
      />
    );
  }
}

export default DialogPolicy;
