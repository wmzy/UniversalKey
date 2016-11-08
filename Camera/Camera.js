import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import TesseractOcr from 'react-native-tesseract-ocr';

export default class CameraView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    onCapture: PropTypes.func.isRequired
  };

  takePicture = () => {
    const {onCapture, navigator} = this.props;
    console.log('takePicture start');
    this.camera.capture({target: Camera.constants.CaptureTarget.disk})
      .then(({path}) => {
        console.log('takePicture end');
        console.log('Picture path: ', path);
        console.log('Ocr start');
        TesseractOcr.startOcr(path.slice(7), 'LANG_ENGLISH')
          .then(text => {
            console.log('Ocr ok');
            console.log('text: ', text);
            console.log('go back');
            const routes = navigator.getCurrentRoutes();
            const pr = routes[routes.length - 2];
            navigator.replacePreviousAndPop({...pr, props: {text}});
          })
          .catch(e => {
            console.error(e);
            onCapture('error: ' + e);
          })
          .done();
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
