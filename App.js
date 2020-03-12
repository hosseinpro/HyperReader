import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import NfcReader from './src/NfcReader';
import PinModal from './src/PinModal';
import HttpClient from './src/HttpClient';
import MessageModal from './src/MessageModal';
import PushNotification from 'react-native-push-notification';
import Server from './src/Server';
import UserItem from './src/UserItem';
import firebase from 'react-native-firebase';

PushNotification.configure({
  onRegister: function(token) {
    global.app.load(token.token);
  },

  onNotification: function(notification) {
    global.app.run(
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
  state = {
    scriptRunner: '',
    token: '',
    userids: [],
    add: false,
  };

  componentDidMount() {
    global.nfcReader = new NfcReader();
    global.app = this;

    firebase.auth().signInAnonymously();
  }

  async load(token) {
    if (token == undefined) {
      token = this.state.token;
    }

    // const userids = await Server.getUids(token);

    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('token', '==', token)
      .get();

    let userids = [];
    snapshot.forEach(doc => {
      userids.push(doc.id);
    });
    this.setState({token, userids});
  }

  run(requestid, userid, text, script) {
    const AsyncFunction = new Function(
      `return Object.getPrototypeOf(async function(){}).constructor`,
    )();
    const scriptRunner = new AsyncFunction(
      '_requestid',
      '_userid',
      '_sendAPDU',
      '_getHttp',
      '_pinPad',
      '_messageBox',
      script,
    );
    this.setState({scriptRunner, requestid, userid});

    global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
  }

  cardDetected() {
    this.state
      .scriptRunner(
        this.state.requestid,
        this.state.userid,
        global.nfcReader.transmit,
        HttpClient.get,
        global.pinModal.show.bind(global.pinModal),
        global.messageModal.show.bind(global.messageModal),
      )
      .then(result => {
        console.log('before if');
        if (this.state.add) {
          console.log('after if');
          // Server.addUid(result, this.state.token).then(result => {

          firebase
            .firestore()
            .collection('users')
            .doc(result)
            .set({token: this.state.token})
            .then(result => {
              console.log('addUid');
              this.load();
            });
        }
      })
      .catch(error => {
        console.log(error);
        global.nfcReader.enableCardDetection(this.cardDetected.bind(this));
      });
  }

  async onPressAdd() {
    // const script = await Server.uidScript();

    const doc = await firebase
      .firestore()
      .collection('setting')
      .doc('uidscript')
      .get();
    const script = doc.data().script;
    this.setState({add: true});
    this.run(null, null, null, script);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <PinModal ref={pinModal => (global.pinModal = pinModal)} />
        <MessageModal
          ref={messageModal => (global.messageModal = messageModal)}
        />
        <SafeAreaView style={{flex: 1}}>
          <View style={{margin: 12, flex: 1}}>
            <View style={{flex: 1}}>
              {this.state.userids.map(userid => (
                <UserItem key={userid} userid={userid} />
              ))}
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
              }}>
              <Button title="ADD" onPress={() => this.onPressAdd()} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
