import React, {Component} from 'react';
import Server from '../lib/Server';
import firebase from 'react-native-firebase';
import {Text, Button, ListItem, Body, Right} from 'native-base';
import Colors from '../lib/Colors';

export default class UserItem extends Component {
  async onPressDel() {
    // await Server.removeUid(this.props.userid);

    await firebase
      .firestore()
      .collection('users')
      .doc(this.props.userid)
      .delete();
    await global.useridList.load();
  }

  render() {
    return (
      <ListItem>
        <Body>
          <Text style={{color: Colors.text}}>{this.props.userid}</Text>
        </Body>
        <Right>
          <Button bordered danger onPress={() => this.onPressDel()}>
            <Text>Del</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}
