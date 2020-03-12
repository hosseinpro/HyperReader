import React, {Component} from 'react';
import {Modal, Image} from 'react-native';
import {Content, Text, Button} from 'native-base';

export default class TabCardModal extends Component {
  state = {
    visible: false,
    message: null,
    onComplete: null,
    onCancel: null,
  };

  show(message) {
    return new Promise(async (resolve, reject) => {
      this.setState({
        message,
        onComplete: () => {
          resolve('ok');
        },
        onCancel: () => {
          resolve('cancel');
        },
      });

      this.setState({visible: true});
      global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
    });
  }

  async onPressCancel() {
    global.nfcReader.disableCardDetection();
    this.setState({visible: false});
    this.state.onCancel();
  }

  async cardDetected() {
    try {
      this.setState({visible: false});
      this.state.onComplete();
    } catch (error) {
      console.log(error);
      global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
    }
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
            <Image
              source={require('../img/card.png')}
              style={{width: 350, height: 350}}
            />
            <Text style={{fontSize: 30, color: Colors.text}}>
              {this.state.message !== null
                ? this.state.message
                : 'tap your card'}
            </Text>
          </Content>
          <Button
            rounded
            block
            bordered
            warning
            style={{margin: 20}}
            onPress={() => this.onPressCancel()}>
            <Text>Cancel</Text>
          </Button>
        </Content>
      </Modal>
    );
  }
}
