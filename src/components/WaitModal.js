import React, {Component} from 'react';
import {Modal} from 'react-native';
import {Content, Text} from 'native-base';

export default class WaitModal extends Component {
  state = {
    visible: false,
    message: null,
  };

  show(message = null) {
    this.setState({
      visible: true,
      message,
    });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {}}>
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: Colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30, color: Colors.text}}>
            {this.state.message !== null
              ? this.state.message
              : 'Please wait...'}
          </Text>
        </Content>
      </Modal>
    );
  }
}
