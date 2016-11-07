import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Navigator,
	TouchableHighlight,
	Text,
	View
} from 'react-native';

import Camera from './Camera';

export default class UniversalKey extends Component {
	state = {};

	showCamera = () => this.navigator.push({title: '拍照中', index: 1});

	handleCameraOk = path => {
		this.navigator.pop();
		this.setState({path});
	};

	render() {
		const {path} = this.state;
		return (
			<Navigator
				initialRoute={{title: 'Universal Key', index: 0}}
				renderScene={(route, navigator) => {
					this.navigator = navigator;

					if (route.index === 0) {
						return (
							<View style={styles.container}>
								<Text>图片路径： {path}</Text>
								<Text>router： {JSON.stringify(route)}</Text>
								<TouchableHighlight style={styles.capture} onPress={this.showCamera}>
									<Text>拍照</Text>
								</TouchableHighlight>
							</View>
						)
					}

					return (
						<View style={styles.container}>
							<Camera onCapture={this.handleCameraOk} title={route.title} />
						</View>
					)
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('UniversalKey', () => UniversalKey);
