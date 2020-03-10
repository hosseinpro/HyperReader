import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Colors from './Colors';

export default function UserItem(props) {
  return (
    <View style={styles.userItem}>
      <Text style={{flex: 1, fontSize: 18, textAlignVertical: 'center'}}>
        {props.userid}
      </Text>
      <Button title="DEL" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    padding: 12,
    marginBottom: 12,
  },
});
