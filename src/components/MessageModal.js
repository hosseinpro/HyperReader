import React, {Component} from 'react';
import {Modal} from 'react-native';
import {Content, Text, Button} from 'native-base';
import Colors from '../lib/Colors';

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
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: Colors.background,
          }}>
          <Content
            contentContainerStyle={{
              flex: 1,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: Colors.text,
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              {this.state.message}
            </Text>
          </Content>
          {!this.state.yesNo && (
            <Button
              rounded
              block
              bordered
              success
              style={{margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null) this.state.onComplete('ok');
              }}>
              <Text>Ok</Text>
            </Button>
          )}
          {this.state.yesNo && (
            <Button
              rounded
              block
              bordered
              success
              style={{margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null)
                  this.state.onComplete('yes');
              }}>
              <Text>Yes</Text>
            </Button>
          )}
          {this.state.yesNo && (
            <Button
              rounded
              block
              bordered
              danger
              style={{margin: 20}}
              onPress={() => {
                this.setState({visible: false});
                if (this.state.onComplete !== null) this.state.onComplete('no');
              }}>
              <Text>No</Text>
            </Button>
          )}
        </Content>
      </Modal>
    );
  }
}
