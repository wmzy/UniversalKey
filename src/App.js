import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import {getInitialRoute} from './core/router';
import './pages';

export default class UniversalKey extends Component {
  render() {
    return (
      <Navigator
        initialRoute={getInitialRoute()}
        renderScene={(route, navigator) => {
          const Component = route.component;
          const props = route.props || {};
          return <Component {...props} navigator={navigator} />;
        }}
      />
    );
  }
}

AppRegistry.registerComponent('UniversalKey', () => UniversalKey);

