/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import NfcReader from './src/NfcReader';
import PinModal from './src/PinModal';
import HttpClient from './src/HttpClient';
import MessageModal from './src/MessageModal';

class App extends Component {
  state = {
    scriptRunner: '',
  };

  async getScript() {
    const script =
      '\
    const choice = await messageBox("ali?", true);\
    console.log(choice);\
    const ver = await getHttp("http://api.xebawallet.com/").toString();\
    console.log(ver);\
    const pin = await pinPad("Salam",6);\
    if(pin === "cancel")\
      return "user canceled!";\
    console.log(pin);\
    let r = await sendAPDU("00aa0000");\
    return r;';
    return script;
  }

  async componentDidMount() {
    global.nfcReader = new NfcReader();
    global.nfcReader.enableCardDetection(this.cardDetected.bind(this));

    const script = await this.getScript();
    const AsyncFunction = new Function(
      `return Object.getPrototypeOf(async function(){}).constructor`,
    )();
    const scriptRunner = new AsyncFunction(
      'sendAPDU',
      'getHttp',
      'pinPad',
      'messageBox',
      script,
    );
    this.setState({scriptRunner});
  }

  async cardDetected() {
    this.state
      .scriptRunner(
        global.nfcReader.transmit,
        HttpClient.get,
        global.pinModal.show.bind(global.pinModal),
        global.messageModal.show.bind(global.messageModal),
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <PinModal ref={pinModal => (global.pinModal = pinModal)} />
        <MessageModal
          ref={messageModal => (global.messageModal = messageModal)}
        />
        <SafeAreaView>
          <View>
            <Text></Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
