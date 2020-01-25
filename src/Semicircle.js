import React, {Component} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import * as Constants from './Constants';

export default class Semicircle extends Component {
  render() {
    return (
      <View
        style={[
          {height: Constants.RADIUS, overflow: 'hidden'},
          this.props.style,
        ]}>
        <Animated.View
          style={[
            localStyle.containerStyle,
            {backgroundColor: this.props.color},
          ]}
        />
      </View>
    );
  }
}

const localStyle = StyleSheet.create({
  containerStyle: {
    width: Constants.RADIUS * 2,
    height: Constants.RADIUS * 2,
    borderRadius: Constants.RADIUS * 2,
  },
});
