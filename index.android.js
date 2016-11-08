import React, {Component} from 'react';
import {
	AppRegistry,
	Navigator
} from 'react-native';

import Main from './Main';

export default class UniversalKey extends Component {
	render() {
		return (
			<Navigator
				initialRoute={Main}
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
