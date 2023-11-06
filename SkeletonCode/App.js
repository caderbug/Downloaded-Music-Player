import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

const Stack = createNativeStackNavigator();
const Separator = () => <View style={styles.separator} />;

const MusicPlayerApp = () => {

  return (
    //defining some screens with the navigator
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{title: 'Title', headerShown: false}}
        />

        <Stack.Screen 
          name="Library Page" 
          component={LibraryScreen} 
        />

        <Stack.Screen 
          name="Editor Page" 
          component={EditorScreen} 
        />

        <Stack.Screen 
          name="Explore Page" 
          component={ExploreScreen} 
        />
        
        <Stack.Screen 
          name="Account Page" 
          component={AccountScreen} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

//title page, library page is set for inital landing page
const TitleScreen = ({navigation}) => {
  return (
   <View>
    <Text style={styles.logo}>
      Downloaded Music Player
    </Text>
    <Button 
      title="Start Listening"
      color="#000000" 
      onPress={() =>
        navigation.navigate('Library Page')}
    />
  </View>
  );
};

//library/player page goes here... placeholder for now
const LibraryScreen = ({navigation}) => {
  //define functions/vars up here
  //for audio playback...
  const [sound, setSound] = React.useState();

  //load track .. can stop by reloading track also
  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/track.mp3'));
    setSound(sound);
  }

  //play
  async function playSound() {
    console.log('Playing Sound');
    await sound.playAsync();
  }

  //pause
  async function pauseSound() {
    console.log('Pausing Sound');
    await sound.pauseAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //has working play button
  return (
   <View style={styles.screensize}>
     <Text style={styles.paragraph}>
       Welcome. Music library will be added soon.
     </Text>
     <Separator />
     <Text style={styles.paragraph}>
       Press play/pause/stop buttons to test audio. 
     </Text>

     <Button
          title="Load test track"
          color="#aaaaaa"
          onPress={loadSound}
      />

      <TouchableOpacity onPress={playSound}>
        <ImageBackground source={require("./assets/play.png")} style={styles.playbtn}>
          <Text style={styles.title}>Play</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseSound}>
        <ImageBackground source={require("./assets/pause.png")} style={styles.playbtn}>
          <Text style={styles.title}>Pause</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={loadSound}>
        <ImageBackground source={require("./assets/stop.png")} style={styles.playbtn}>
          <Text style={styles.title}>Stop</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.libbtn}>
        <Button
          title="Library"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Library Page')}
        />
      </View>
      <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
      <View style={styles.accbtn}>
        <Button
          title="Account"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Account Page')}
        />
      </View>
    </View>
  );
};

//where music editor page code goes... placeholder for now
const EditorScreen = ({navigation}) => {

  return(
    <View style={styles.screensize}>
    <Text style={styles.paragraph}>
      Welcome. This is the Editor page. More features will be added soon.
    </Text>

    <Separator />


     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('ibrary Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
     <View style={styles.accbtn}>
       <Button
         title="Account"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Account Page')}
       />
     </View>
   </View>
  );
}

//where explore screen code goes... placeholder for now
const ExploreScreen = ({navigation}) => {

  return(
    <View style={styles.screensize}>
    <Text style={styles.paragraph}>
      Welcome. This is the Explore page. More features will be added soon.
    </Text>

    <Separator />

     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Library Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
     <View style={styles.accbtn}>
       <Button
         title="Account"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Account Page')}
       />
     </View>
   </View>
  );
}

//where account page code goes... placeholder for now
const AccountScreen = ({navigation}) => {

  const [username, onChangeText] = useState('user');

  return(
    <View style={styles.screensize}>
    <Text style={styles.paragraph}>
      Welcome. This is the Account page. More features will be added soon.
    </Text>

    <Separator />
    <Text style={styles.paragraph}>
      Input a username.
    </Text>
     <TextInput
       style={styles.input}
       onChangeText={onChangeText}
       value={username}
     />
    <Text style={styles.paragraph}>
      Hello, {username}.
    </Text>
    <Separator />

     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Library Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
     <View style={styles.accbtn}>
       <Button
         title="Account"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Account Page')}
       />
     </View>
   </View>

  );
}

//styles go here...
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
  },
  logo: {
    paddingTop: 200,
    height: 400,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  screensize:{
    height: 755,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 12,
  },
  playbtn: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  libbtn: {
    right: 300,
    left: 0,
    width: 105,
    position: 'absolute',
    bottom: 0,
  },
  editbtn: {
    right: 200,
    left: 105,
    width: 105,
    position: 'absolute',
    bottom: 0,
  },
  explorebtn: {
    right: 100,
    left: 206,
    width: 105,
    position: 'absolute',
    bottom: 0,
  },
  accbtn: {
    right: 0,
    left: 307,
    width: 105,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    opacity: 0,
  }
});

export default MusicPlayerApp;
AppRegistry.registerComponent('MusicPlayerApp', () => MusicPlayerApp);
