import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Home from './src/Home';

export default class App extends Component {
  render() {
    return (
      <View style={[{flex: 1}]}>
        <View style={{marginTop: 50}}>
          <Home />
        </View>

        <View style={{marginTop: 50}}>
          <Home fill />
        </View>
      </View>
    );
  }
}
