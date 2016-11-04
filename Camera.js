import React, {Component, PropTypes} from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraView extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onCapture: PropTypes.func.isRequired
	};

	takePicture = () => {
		const {onCapture} = this.props;
		console.log('ssss.......');
		this.camera.capture({target: Camera.constants.CaptureTarget.disk})
			.then(result => {
				console.log(JSON.stringify(result), 'rrrr');
				onCapture(JSON.stringify(result));
				console.log(JSON.stringify(result), '.......');
			})
			.catch(err => console.error(err));
	};

	render() {
		return (<View style={styles.container}>
			<Camera
				ref={cam => (this.camera = cam)}
				style={styles.preview}
				aspect={Camera.constants.Aspect.fill}>
				<Text style={styles.capture} onPress={this.takePicture}>拍照</Text>
			</Camera>
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