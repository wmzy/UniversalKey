import React, {Component} from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import Camera from 'react-native-camera';

export default class Main extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onCapture: PropTypes.func.isRequired
	};

	render() {
		return (<View style={styles.container}>
			<Text>图片路径： {path}</Text>
			<Text style={styles.capture} onPress={this.showCamera}>拍照</Text>
		</View>);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	}
});
