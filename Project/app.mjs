import { exportPreferences } from './preferences.mjs';
import React from 'react';
import { View } from 'react-native';

const folders = []; // Stored folders to search for songs
const library = []; // Placeholder for song library information array
let dir = "";       // Placeholder for user inputed directory string

function addFolder(fldr){
    folders.push(fldr);
}
const folderButton = ({ onPress }) => (
  // ...
);
const exportButton = ({ onPress }) => (
  // ...
);


// Base for dealing with react app button presses
const App = () => {
    // Handle folder addition
    const handleButtonPress = () => {
        addFolder(dir);
        alert('Button pressed!');
    };

    return (
        <View>
            <folderButton onPress={handleButtonPress} />
        </View>
    );


    // Handle Export Preferences
    const handleButtonPress = () => {
        exportPreferences(dir, library);
        alert('Button pressed!');
    };

  return (
    <View>
      <exportButton onPress={handleButtonPress} />
    </View>
  );
};
