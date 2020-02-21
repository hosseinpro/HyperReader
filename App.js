/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

class App extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    const funcBody = 'return sendAPDU()';
    const f = new Function('sendAPDU', funcBody);
    let r = f(this.transmit);
    this.setState({message: r});
  }

  transmit() {
    return 6 + 5;
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <Text>
              {this.state.message !== null
                ? this.state.message
                : 'Please wait...'}
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
