import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  Clipboard,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TesseractOcr from 'react-native-tesseract-ocr';

import s from './styles';

var options = {
  title: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Main extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  state = {};

  handlePictureSelectForLock = () => {
    this.handlePictureSelect('lock');
  };

  handlePictureSelectForKey = () => {
    this.handlePictureSelect('key');
  };

  handlePictureSelect = field => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        this.setState({source});
        console.log('Ocr start');
        TesseractOcr.startOcr(response.uri.slice(7), 'LANG_ENGLISH')
          .then(text => {
            console.log('Ocr ok');
            console.log('text: ', text);
            console.log('go back');
            this.setState({[field]: text});
          })
          .catch(e => {
            console.error(e);
          })
          .done();
      }
    });
  };

  handleLockChange = lock => this.setState({lock});

  handleKeyChange = key => this.setState({key});

  handleSave = () => {
    const {lock, key} = this.state;
    AsyncStorage.setItem(`@locks:${lock}`, key);
  };

  handleCopy = () => {
    Clipboard.setString(this.state.key);
  };

  render() {
    const {source, lock, key} = this.state;

    return (<View style={s.container}>
      <View style={s.fieldContainer}>
        <Text>ID: </Text>
        <TextInput
          value={lock}
          onChangeText={this.handleLockChange}
        />
        <TouchableHighlight onPress={this.handlePictureSelectForLock}>
          <Text>选择图片</Text>
        </TouchableHighlight>
      </View>
      <View style={s.fieldContainer}>
        <Text>Key: </Text>
        <TextInput
          value={key}
          onChangeText={this.handleKeyChange}
        />
        <TouchableHighlight onPress={this.handlePictureSelectForKey}>
          <Text>选择图片</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight onPress={this.handleSave}>
          <Text>保存</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={this.handleCopy}>
        <Text>复制 Key</Text>
      </TouchableHighlight>
    </View>);
  }
}
