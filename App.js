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

class App extends Component {
  state = {
    scriptRunner: '',
  };

  async getScript() {
    const script = 'let r = await sendAPDU("00aa0000");\
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
      'messageYesNo',
      'message',
      script,
    );
    this.setState({scriptRunner});
  }

  async cardDetected() {
    this.state
      .scriptRunner(global.nfcReader.transmit)
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
