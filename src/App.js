import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import {getInitialRoute, renderScene} from './core/router';
import './pages';

export default class UniversalKey extends Component {
  render() {
    return (
      <Navigator
        initialRoute={getInitialRoute()}
        renderScene={renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('UniversalKey', () => UniversalKey);

