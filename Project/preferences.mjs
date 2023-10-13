import fs from 'fs';
import path from 'path';

// Template for User Preferences Export
const songPref = {
    playlists: [],
    playlistLoc: [], //Store location of song in 
    name: '',
    album: '',
    artist: '',
};

// Function to save user preferences to the user's computer
export function exportPreferences(dir, songs) {
    let json = '';
    songs.forEach(() => {
        json += JSON.stringify(songPref, null, 2);
        }
    );
    
    const baseDir = path.join(__dirname, dir);

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true }); // Creates the directory and its parents if they don't exist
    }

    // Open file and write to it
    fs.open(`${baseDir}+preferences.json`, 'wx', (err, desc) => {
        if (!err && desc) {
            fs.writeFile(fileName, json, (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                } else {
                    console.log(`Data has been stored in ${fileName}`);
                }
            });
        }
    });
    
}
