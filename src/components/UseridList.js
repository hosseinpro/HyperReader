import React, {Component} from 'react';
import Server from '../lib/Server';
import firebase from 'react-native-firebase';
import {Content, Text, Button, List} from 'native-base';
import UserItem from './UserItem';
import runScript from '../lib/runScript';

export default class UseridList extends Component {
  state = {
    userids: [],
  };

  async load() {
    // const userids = await Server.getUids(token);

    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('token', '==', global.token)
      .get();

    let userids = [];
    snapshot.forEach(doc => {
      userids.push(doc.id);
    });
    this.setState({userids});
  }

  async onPressAdd() {
    const result = await global.tapCardModal.show(null);
    if (result === 'cancel') return;

    global.waitModal.show();

    // const script = await Server.uidScript();
    const doc = await firebase
      .firestore()
      .collection('setting')
      .doc('uidscript')
      .get();
    const script = doc.data().script;

    console.log('before runScript');
    const userid = await runScript(script);
    console.log('after runScript');

    await firebase
      .firestore()
      .collection('users')
      .doc(userid)
      .set({token: global.token});

    this.load();

    global.waitModal.hide();
  }

  render() {
    return (
      <Content contentContainerStyle={{flex: 1}}>
        <Content
          contentContainerStyle={{
            flex: 1,
            marginRight: 20,
          }}>
          <List>
            {this.state.userids.map(userid => (
              <UserItem key={userid} userid={userid} />
            ))}
          </List>
        </Content>
        <Button
          rounded
          block
          bordered
          success
          style={{margin: 20}}
          onPress={() => this.onPressAdd()}>
          <Text>Add</Text>
        </Button>
      </Content>
    );
  }
}
