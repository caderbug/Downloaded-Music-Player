import React from 'react';
import logo from './play.png';
import './Library.css';
import { clear } from '@testing-library/user-event/dist/clear';

export default function Library() {
	var filter_open = false;
	var persistent_list = {};
	var current_sort = "Title";
	var track_list = {};
	/*
	Tracklist:
	  1: {
		Title: "SongName"
		Artist: "ArtistName"
		Album: "AlbumName"
		Path: "filename.mp3"
		// possibly need to add more fields here
	  }
	*/

	function play(track_index){
		// for now, won't actually play the track. it's just to be able to determine the currently playing track
		var file = track_list[track_index].Path;
		console.log(file);
	}

	function find(list, value){
		for(let i = 0; i < list.length; i++){
			if(list[i] == value){
				return i;
			}
		}
		return -1;
	}

	function get_names(category){
		var list = [];
		for(let i = 0; i < Object.keys(persistent_list).length; i++){
			var name = persistent_list[i][category];
			if(find(list, name) == -1){
				list.push(name);
			}
		}
		return list;
	}

	// still arbitrary data, will read metadata once it's added
	function load_info(){ 
		for(let i = 0; i < 20; i++){ // COPY PASTED CODE FROM HERE
			var new_info = {};
			new_info["Title"] = "Track" + (Math.floor(Math.random() * 90)+10);
			var a = "Helo";
			if(i < 10){
				a = "Jelo";
			}
			new_info["Artist"] = a;
			new_info["Album"] = "AlbumName";
			new_info["Path"] = "placeholder.mp3";
			persistent_list[i] = new_info;
			//track_list[i] = new_info;
		} // UNTIL HERE
		track_list = persistent_list;
	}

	function get_songs(dst_list, src_list, by, name){ // COPY PASTED CODE FROM HERE
		var index = 0;
		for(let i = 0; i < Object.keys(src_list).length; i++){
			if(src_list[i][by] == name){ // if a track's title/album/artist name matches the given name
				dst_list[index] = src_list[i];
				index += 1;
			}
		}
	} // UNTIL HERE

	function sort(list, by){ // COPY PASTED CODE FROM HERE
		// for now uses bubble sort, but could be revised for faster sorting later
		var length = Object.keys(list).length;
		for(let i = 0; i < length - 1; i++){
			var swap_necessary = false;
			for(let j = 0; j < length - 1 - i; j++){
				if(list[j][by] > list[j+1][by]){
					swap_necessary = true;
					var entry = list[j];
					list[j] = list[j+1];
					list[j+1] = entry;
				}
			}
	
			if(swap_necessary == false){
				break;
			}
		}
	} // UNTIL HERE

	function apply_changes(behavior, by, name){ // COPY PASTED CODE FROM HERE
		// 'behavior' determines if it's sort or filter
		// 'by' determines what to sort or filter by ("Title", "Artist", "Album")
		// 'name' is what artist/playlist/album name to filter by
		//load_info();
		track_list = persistent_list;

		if(behavior == "sort"){
			if(by == "Title"){
				sort(track_list, by);
			}else{
				var index = 0;
				var all_artists = {}; // list of all artists/albums in the library
				for(let i = 0; i < Object.keys(track_list).length; i++){
					var do_not_add = false;
					for(let j = 0; j < Object.keys(all_artists).length; j++){
						if(all_artists[j][by] == track_list[i][by]){
							do_not_add = true;
							break;
						}
					}
					if(do_not_add == false){
						var new_info = {};
						new_info[by] = track_list[i][by];
						all_artists[index] = new_info;
						index += 1;
					}
				}

				sort(all_artists, by);
				var temp_list = {};
				for(let k = 0; k < Object.keys(all_artists).length; k++){
					var filtered_songs = {};
					get_songs(filtered_songs, track_list, by, all_artists[k][by]); // partitions by category
					sort(filtered_songs, "Title"); // sorts each category
					
					var start = Object.keys(temp_list).length;
					for(let i = 0; i < Object.keys(filtered_songs).length; i++){ // adds to main list
						temp_list[start+i] = filtered_songs[i];
					}
				}
				track_list = temp_list;
			}
		}else if(behavior == "filter"){
			var filtered_list = {};
			get_songs(filtered_list, track_list, by, name);
			sort(filtered_list, current_sort);
			track_list = filtered_list;
		}
	} // UNTIL HERE

	function display_songs(){
		const lib = document.getElementById("library");

		for(let i = 0; i < Object.keys(track_list).length; i++){
			var title = track_list[i].Title;
			var artist = track_list[i].Artist;

			const separator_div = document.createElement("div");
			const list_div = document.createElement("div");
			const button_div = document.createElement("div");
			const text_div = document.createElement("div");

			const play_button = document.createElement("button");
			const title_text = document.createElement("p");
			const title_node = document.createTextNode(title);
			const artist_text = document.createElement("p");
			const artist_node = document.createTextNode(artist);
			list_div.setAttribute("class", "track");
			button_div.setAttribute("class", "button_section");
			text_div.setAttribute("class", "text_section");
			play_button.setAttribute("class", "play_button")
			separator_div.setAttribute("style", "height: 5px; width: 100%;")
			title_text.setAttribute("class", "title_class");
			artist_text.setAttribute("class", "artist_class");

			const image = document.createElement("img");
			image.setAttribute("src", logo)
			image.setAttribute("class", "play_image");
			play_button.appendChild(image);
			play_button.addEventListener("click", (event) => {
				play(i);
			})

			// adds button section to row
			button_div.appendChild(play_button);
			list_div.appendChild(button_div);

			// adds text section to row
			text_div.appendChild(title_text);
			list_div.appendChild(text_div);
			text_div.appendChild(artist_text)

			title_text.appendChild(title_node);
			artist_text.appendChild(artist_node);
			lib.appendChild(list_div);
			lib.appendChild(separator_div);
		}
	}

	function clear_songs(){
		const lib = document.getElementById("library");

		while(lib.hasChildNodes()){
			lib.removeChild(lib.firstChild);
		}
	}

	function sort_clicked(){
		if(current_sort == "Title"){
			current_sort = "Artist";
		}else if(current_sort == "Artist"){
			current_sort = "Album";
		}else if(current_sort == "Album"){
			current_sort = "Title";
		}

		const sort_text = document.getElementById("sort_text");
		sort_text.textContent = "Sorting by " + current_sort;
		apply_changes("sort", current_sort);
		clear_songs();
		display_songs();
	}

	function clear_filter(){
		const filter = document.getElementById("filter");
		while(filter.hasChildNodes()){
			filter.removeChild(filter.firstChild);
		}
	}

	function filter_chosen(by, name){
		clear_filter();
		filter_open = false;
		apply_changes("filter", by, name);
		clear_songs();
		display_songs();
	}

	function fill_filter(by){
		const filter = document.getElementById("filter");
		clear_filter();
		var list = get_names(by);
		for(let i = 0; i < list.length; i++){
			const button = document.createElement("button");
			const button_text = document.createElement("p");
			const button_node = document.createTextNode(list[i]);
			button_text.setAttribute("class", "filter_text");
			button.setAttribute("class", "filter_option");
			button.addEventListener("click", () => filter_chosen(by, list[i]));
			button_text.appendChild(button_node);
			button.appendChild(button_text);
			filter.appendChild(button);
		}
	}

	function filter_clicked(){
		const filter = document.getElementById("filter");
		if(filter_open){
			clear_filter();
			filter_open = false;
		}else{
			filter_open = true;
			const artist = document.createElement("button");
			const artist_text = document.createElement("p");
			const artist_node = document.createTextNode("Artists");
			artist_text.setAttribute("class", "filter_text");
			artist.setAttribute("class", "filter_option");
			artist.addEventListener("click", () => fill_filter("Artist"));
			artist_text.appendChild(artist_node);
			artist.appendChild(artist_text);
			filter.appendChild(artist);

			const album = document.createElement("button");
			const album_text = document.createElement("p");
			const album_node = document.createTextNode("Albums");
			album_text.setAttribute("class", "filter_text");
			album.setAttribute("class", "filter_option");
			album.addEventListener("click", () => fill_filter("Album"));
			album_text.appendChild(album_node);
			album.appendChild(album_text);
			filter.appendChild(album);
		}
	}

	function playlist_clicked(){

	}

	React.useEffect(() => {
		const filter_div = document.createElement("div");
		filter_div.setAttribute("class", "filter");
		filter_div.setAttribute("id", "filter");
		document.body.appendChild(filter_div);

		const lib = document.createElement("div");
		lib.setAttribute("id", "library");
		document.body.appendChild(lib);

		load_info();
		apply_changes("sort", "Title"); // sorts by title name by default
		display_songs();
	});

	// default HTML to be edited by the code above
	return(
		<div id="top_bar">
			<button id="sort_button" class="top_button" onClick={sort_clicked}>
				<p id = "sort_text" class="top_text">Sorting by Title</p>
			</button>
			
			<button id="filter_button" class="top_button" onClick={filter_clicked}>
				<p class="top_text">Filter</p>
			</button>

			<button id="playlist_button" class="top_button" onClick={playlist_clicked}>
				<p class="top_text">Playlists</p>
			</button>
		</div>
	);
}
