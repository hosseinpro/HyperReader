import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Server from './Server';

export default class UserItem extends Component {
  async onPressDel() {
    await Server.removeUid(this.props.userid);
    global.app.load();
  }

  render() {
    return (
      <View style={styles.userItem}>
        <Text style={{flex: 1, fontSize: 18, textAlignVertical: 'center'}}>
          {this.props.userid}
        </Text>
        <Button title="DEL" color="red" onPress={() => this.onPressDel()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    padding: 12,
    marginBottom: 12,
  },
});
