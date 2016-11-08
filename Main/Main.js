import React, {Component} from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

import Camera from '../Camera';

export default class Main extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
		text: PropTypes.string
	};

  showCamera = () => this.props.navigator.push(Camera);

	render() {
	  const {text} = this.props;

		return (<View style={styles.container}>
      <Text>router： {text}</Text>
      <TouchableHighlight style={styles.capture} onPress={this.showCamera}>
        <Text>拍照</Text>
      </TouchableHighlight>
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
