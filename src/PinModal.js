import React, {Component} from 'react';
import {Modal, View, Text, TouchableHighlight} from 'react-native';
import PinView from 'react-native-pin-view';
import Colors from './Colors';

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
        <View
          contentContainerStyle={{
            flex: 1,
            backgroundColor: Colors.primary,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: Colors.primaryText,
              alignSelf: 'center',
              marginBottom: 20,
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
            buttonBgColor={Colors.primaryText}
            buttonTextColor={Colors.secondary}
            inputBgColor={Colors.primaryText}
          />
          <TouchableHighlight
            transparent
            style={{
              alignSelf: 'flex-end',
              marginRight: 60,
            }}
            onPress={() => {
              this.setState({visible: false});
              if (this.state.onCancel !== null) this.state.onCancel();
            }}>
            <Text style={{fontSize: 16, color: Colors.secondary}}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}
