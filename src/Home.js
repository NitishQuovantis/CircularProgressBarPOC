import React, {Component} from 'react';
import {Text, View, Animated, StyleSheet} from 'react-native';
import Semicircle from './Semicircle';
import * as Constants from './Constants';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.progress, {
        toValue: Constants.PROGRESS,
        duration: 6000,
      }),
    ).start();
  }

  render() {
    const topViewRotationInterpolation = this.progress.interpolate({
      inputRange: [0, 50],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp',
    });

    const topViewOpacity = this.progress.interpolate({
      inputRange: [0, 49.99, 50.001],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const bottomViewRotationInterpolation = this.progress.interpolate({
      inputRange: [50, 100],
      outputRange: ['0deg', '-180deg'],
      extrapolate: 'clamp',
    });

    const animatedColor = this.progress.interpolate({
      inputRange: [0, 50, 100],
      outputRange: ['#ff0000', '#00ff00', '#00f'],
    });

    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Top semicircle */}
          <View style={[localStyle.topSemiCircleStyle]}>
            <Semicircle color={animatedColor} />
            <Animated.View
              style={[
                localStyle.animatingCircle,
                {
                  transform: [
                    {translateY: Constants.RADIUS / 2},
                    {rotate: topViewRotationInterpolation},
                    {translateY: -Constants.RADIUS / 2},
                  ],
                  opacity: topViewOpacity,
                },
              ]}>
              <Semicircle color={Constants.NON_PROGRESS_COLOR} />
            </Animated.View>
          </View>

          {/* Bottom semicircle */}
          <View style={localStyle.bottomSemicircle}>
            <Semicircle color={animatedColor} />
            <Animated.View
              style={[
                localStyle.animatingCircle,
                {
                  transform: [
                    {translateY: Constants.RADIUS / 2},
                    {rotate: bottomViewRotationInterpolation},
                    {translateY: -Constants.RADIUS / 2},
                  ],
                },
              ]}>
              <Semicircle color={Constants.NON_PROGRESS_COLOR} />
            </Animated.View>
          </View>

          {this.props.fill && (
            <View
              style={{
                zIndex: 10,
                width: Constants.RADIUS * 2 - 40,
                height: Constants.RADIUS * 2 - 40,
                borderRadius: (Constants.RADIUS * 2 - 40) / 2,
                position: 'absolute',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const localStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topSemiCircleStyle: {
    zIndex: 1,
  },

  bottomSemicircle: {
    transform: [{rotateX: '180deg'}],
  },

  animatingCircle: {
    ...StyleSheet.absoluteFillObject,
  },
});
