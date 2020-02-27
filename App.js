import React, {Component} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import NfcReader from './src/NfcReader';
import PinModal from './src/PinModal';
import HttpClient from './src/HttpClient';
import MessageModal from './src/MessageModal';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  onNotification: function(notification) {
    global.app.runScript(notification.script);

    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  senderID: '683964011296',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

class App extends Component {
  state = {
    scriptRunner: '',
  };

  componentDidMount() {
    global.nfcReader = new NfcReader();
    global.app = this;
  }

  runScript(script) {
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

    global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
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
        global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
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
