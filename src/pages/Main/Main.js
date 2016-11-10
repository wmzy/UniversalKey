import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TesseractOcr from 'react-native-tesseract-ocr';

import router from '../../core/router';

var options = {
  title: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Main extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
  };

  state = {};

  showCamera = () => router.push('camera');

  handlePictureSelect = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const source = {uri: response.uri, isStatic: true};

        this.setState({source});
        console.log('Ocr start');
        TesseractOcr.startOcr(response.uri.slice(7), 'LANG_ENGLISH')
          .then(text => {
            console.log('Ocr ok');
            console.log('text: ', text);
            console.log('go back');
            this.setState({ttt: text});
          })
          .catch(e => {
            console.error(e);
          })
          .done();
      }
    });
  };

  render() {
    const {text} = this.props;
    const {source, ttt} = this.state;

    return (<View style={styles.container}>
      <Text>router： {text}</Text>
      <TouchableHighlight style={styles.capture} onPress={this.showCamera}>
        <Text>拍   tt 照</Text>
      </TouchableHighlight>
      {
        source && <Image source={source} />
      }
      <Text>source： {JSON.stringify(source)}</Text>
      <Text>{ttt}</Text>
      <TouchableHighlight onPress={this.handlePictureSelect}>
        <Text>选择图片</Text>
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
