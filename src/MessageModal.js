import React, {Component} from 'react';
import {Modal, View, Text, Button} from 'react-native';
import Colors from './Colors';

export default class MessageModal extends Component {
  state = {
    visible: false,
    yesNo: false,
    onComplete: null,
  };

  show(message = '', yesNo = false) {
    return new Promise((resolve, reject) => {
      this.setState({
        visible: true,
        message,
        yesNo,
        onComplete: choice => {
          resolve(choice);
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
          {!this.state.yesNo && (
            <Button
              title="Ok"
              rounded
              block
              style={{backgroundColor: Colors.secondary, margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null) this.state.onComplete('ok');
              }}></Button>
          )}
          {this.state.yesNo && (
            <Button
              title="Yes"
              rounded
              block
              style={{backgroundColor: Colors.secondary, margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null)
                  this.state.onComplete('yes');
              }}></Button>
          )}
          {this.state.yesNo && (
            <Button
              title="No"
              rounded
              block
              style={{backgroundColor: Colors.secondary, margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null) this.state.onComplete('no');
              }}></Button>
          )}
        </View>
      </Modal>
    );
  }
}
