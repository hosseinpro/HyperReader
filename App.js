import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import NfcReader from './src/lib/NfcReader';
import PinModal from './src/components/PinModal';
import MessageModal from './src/components/MessageModal';
import PushNotification from 'react-native-push-notification';
import UseridList from './src/components/UseridList';
import firebase from 'react-native-firebase';
import TapCardModal from './src/components/TapCardModal';
import WaitModal from './src/components/WaitModal';
import RemoteRun from './src/components/RemoteRun';

PushNotification.configure({
  onRegister: function(token) {
    global.useridList.load(token.token);
  },

  onNotification: function(notification) {
    global.remoteRun.run(
      notification.requestid,
      notification.userid,
      notification.text,
      notification.script,
    );
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
  componentDidMount() {
    global.nfcReader = new NfcReader();

    firebase.auth().signInAnonymously();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <TapCardModal
          ref={tapCardModal => (global.tapCardModal = tapCardModal)}
        />
        <PinModal ref={pinModal => (global.pinModal = pinModal)} />
        <MessageModal
          ref={messageModal => (global.messageModal = messageModal)}
        />
        <WaitModal ref={waitModal => (global.waitModal = waitModal)} />
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
          <UseridList ref={useridList => (global.useridList = useridList)} />
          <RemoteRun ref={remoteRun => (global.remoteRun = remoteRun)} />
        </SafeAreaView>
      </>
    );
  }
}

export default App;
