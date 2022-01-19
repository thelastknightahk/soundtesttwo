import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import SystemSetting from 'react-native-system-setting-ts'
import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

var whoosh = new Sound('alert.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  
});

export default class App extends Component {
  changeSetting = () => {
    
    // change the volume
    SystemSetting.setVolume(1);
    //get the current volume
    SystemSetting.getVolume().then((volume) => {
      if (volume === 0) {
        SystemSetting.setVolume(1);
        SystemSetting.getVolume().then((volume) => {

          console.log('Current volume Zero is ' + volume);
        });

      }
      
      console.log('Current volume is ' + volume);
    });
 whoosh.play();
    // listen the volume changing if you need
const volumeListener = SystemSetting.addVolumeListener((data) => {
  const volume = data.value;
  console.log(volume);
});

//remove listener when you need it no more
SystemSetting.removeVolumeListener(volumeListener)   


  }
  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }} >
        <TouchableWithoutFeedback onPress={
          this.changeSetting
        } >
          <View style={{
            width: 100,
            height: 50,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
            <Text>CLick</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
