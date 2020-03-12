import React, {Component} from 'react';
import {Modal} from 'react-native';
import {Content, Text, Button} from 'native-base';
import PinView from 'react-native-pin-view';
import Colors from '../lib/Colors';

export default class PinModal extends Component {
  state = {
    visible: false,
    pinLength: 4,
    onComplete: null,
    onCancel: null,
  };

  show(message = '', pinLength = 4) {
    return new Promise((resolve, reject) => {
      this.setState({
        visible: true,
        message,
        pinLength,
        onComplete: pin => {
          resolve(pin);
        },
        onCancel: () => {
          resolve('cancel');
        },
      });
    });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {}}>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.background,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: Colors.text,
              alignSelf: 'center',
              margin: 30,
            }}>
            {this.state.message}
          </Text>
          <PinView
            onComplete={(pin, clear) => {
              clear();
              this.setState({visible: false});
              this.state.onComplete(pin);
            }}
            pinLength={this.state.pinLength}
            inputViewEmptyStyle={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#FFF',
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: '#FFF',
            }}
            buttonTextStyle={{
              color: '#FFF',
            }}
          />
          <Button
            transparent
            style={{
              alignSelf: 'flex-end',
              marginRight: 60,
            }}
            onPress={() => {
              this.setState({visible: false});
              if (this.state.onCancel !== null) this.state.onCancel();
            }}>
            <Text style={{fontSize: 16, color: Colors.text}}>Cancel</Text>
          </Button>
        </Content>
      </Modal>
    );
  }
}
