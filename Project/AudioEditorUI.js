import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react'
import { StyleSheet, View, Image,Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
 //import{AudioTools, AudioTools} from 'react-native-audio-video-tools'

import Button from './button.js';

export default function App() {

  
  let sharefileAsync = async () => {

    if (!(await Sharing.isAvailableAsync())) {
      alert(`sharing isn't available on platform`);
      return;
    }

    // In a real app you should verify that permissions were granted
    //await MediaLibrary.requestPermissionsAsync();
    let results = await MediaLibrary.getAssetsAsync(3);
    let asset = results.assets[0];

    if (!asset) {
      alert("No file available");
      return;
    }

    // Use FileSystem to copy the image from its original location to the app document directory
    let assetUriParts = asset.uri.split("/");
    let assetName = assetUriParts[assetUriParts.length - 1];
    let uri = `${FileSystem.documentDirectory}/${assetName}`;
    await FileSystem.copyAsync({
      from: asset.uri,
      to: uri,
    });

    // Share the image from the uri that you copied it to
    Sharing.shareAsync(uri);
  };
    //const audioTools = new AudioTools('./sound.mp3')


    const [range,setRange] = useState("50%");
    const [sliding,setSliding] = useState('Inactive');
  return (

    
    <View style={styles.container}>

      <View>
        <Button label="SHARE"  onPress={sharefileAsync} />
      </View>
      
      <View style={styles.songTitle}>
        <Text style={[styles.setSongColor,styles.setSongFont]}>Song Name</Text>  
      </View> 
      <View style={styles.artistName}>
        <Text style={[styles.setArtistColor,styles.setArtistFont]}>Artist Name</Text>  
      </View> 
      <Slider  
        style = {{ width: 280, height: 40}}
        //paddingTop={100}
        //top={280}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='red'
        maximumTrackTintColor='#000'
        thumbTintColor='red'
        value={0.5}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Fade In / Fade Out</Text>
      </View>
      <Slider 
        style = {{ width: 280, height: 60}}
        thumbTintColor='yellow'
        minimumTrackTintColor='yellow'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> L / R</Text>
      </View>
      <Slider 
        style = {{ width: 280, height: -40}}
        thumbTintColor='blue'
        minimumTrackTintColor='blue'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
        onValueChange={(value) => setRange(parseInt(value * 10) + 'x')}
      />
      <Text style={{fontSize: 10, fontWeight: 'bold',color: 'black'}}>{range}</Text>
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Speed </Text>
      </View>


      
      <Slider 
        style = {{ width: 280, height: -40}}
        thumbTintColor='green'
        minimumTrackTintColor='green'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}        
        value={0.5}
        onValueChange={(value) => setRange(parseInt(value * 100) + '%')}
        
      />
      <Text style={{fontSize: 10, fontWeight: 'bold',color: 'black'}}>{range}</Text>

      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Volume</Text>
      </View>

      <Slider 
        style = {{ width: 300, height: -40}}
        flex= {1}
        thumbTintColor='white'
        minimumTrackTintColor='white'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      /> 
      <View style = {styles.durationStart}>
        <Text styles={styles.durationStart}> 00:00 </Text>
      </View>
      <View style = {styles.durationStop}>
        <Text styles={styles.durationStop}> 00:00 </Text>
      </View>
      <View style={styles.footerContainer}>
        <Button label="Pause Play" />
        <Button label="Seek(RW)"/> 
        <Button label="Seek(FF)" />
        <Button label="Seek Start" />
        <Button label="Seek End" />
        <Button label="Cut" />
        <Button label="REC" />
      </View>
      <StatusBar style= 'auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  editors: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  setEditorColor: {
    color: 'green',
  },
  setEditorFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    paddingTop: 40,
    flex: 1 / 10,
    color: 'yellow',
    fontSize: 10,
  },
  setTitleColor: {
    color: 'white',
  },
  setTitleFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  songTitle: {
    paddingTop: 10,
    flex: 1 / 10,
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    left: -130,
  },
  setSongColor: {
    color: 'white',
  },
  setSongFont: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  artistName: {
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 10,
    left: -140,
    shadowColor: 'black',
    shadowOffset: 10,
    shadowOpacity: 40,
    shadowRadius: 100,
  },
  durationStart: {
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 10,
    left: -140,
    top: -60,
    shadowColor: 'black',

  },
  durationStop: {
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 10,
    left: 140,
    top: -70,
    shadowColor: 'black',
  },
  setArtistColor: {
    color: 'white',
  },
  setArtistFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
