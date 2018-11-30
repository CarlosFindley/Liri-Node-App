// For this app, we are using Spotify, OMDB, and  Bands in Town

// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// Core node package for reading and writing files
var fs = require("fs");

// Requiring the axios package...
var axios = require("axios");

// Requiring the Spotify API.  Example from npmjs.com/package/node-spotify-api
var Spotify = require("node-spotify-api");

// Requiring moment.js package
var moment = require("moment");


//---------------------------------------------------------------
// Grabbing user action command from CLI
var actionCommand = process.argv[2];
// Grabbing user item command (e.g. "concert-this") from CLI.  This will grab everything after index 3 and ignore anything prior
var userItemCommand = process.argv.slice(3).join(" ")

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
    function liriCommandRun(actionCommand, userItemCommand) {
        switch (actionCommand) {
            case "concert-this":
                getBandsInTown(userItemCommand);
                break;

            case "spotify-this-song":
                getSpotify(userItemCommand);
                break;

            case "movie-this":
                getOMDB(userItemCommand);
                break;
    
            case "do-what-it-says":
                getRandom();
                break;
            // If appCommand is left blank, return a default message to the user
            default:
                console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' in order to continue");
        }
    };



// Using Bands in Town for concert-this
function getBandsInTown(artist) {
    var artist = userItemCommand;
    var artistQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios.get(artistQuery).then(
        function (response) {
            console.log("--------------------");
            console.log(Name)
        }
    )
}



// Using Spotify for spotify-this-song
function getSpotify(songName) {
    // No, we use the Spotify keys
    var spotifyKey = new Spotify(keys.spotify);

    // If the song name is left blank, add the following song as default
    if (!songName) {
        songName = "Tonada de Luna Llena";
    };

    // Next, we are creating the search logic
    spotifyKey.search({
        type: "track",
        query: songName,
        limit: 5
        // adding error message
    }, function (err, data) {
        if (err) {
            return console.log("ERROR OCCURRED: " + ERR);
            // If no error happens (sourcing is successful), give us the following
        } 
            console.log("--------------------");
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name + "\r\n");
            console.log("Song: " + data.tracks.items[0].name + "\r\n");
            console.log("Link to sample: " + data.tracks.items[0].href + "\r\n");
            console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

                // Finally, we append to log.txt
                var logSong = "----------Spotify Music Info----------" + "\n Artist(s): " + data.tracks.items[0].album.artists[0].name + "\n Song: " data.tracks.items[0].name + "\n Link to sample: " + data.tracks.items[0].href + "\n Album: " + data.tracks.items[0].album.name + "--------------------" + "\n";

                fs.appendFile("log.txt", logSong, function (err) {
                    if (err) throw err;
                });
            

        });
};



// Calling the search command function
liriCommandRun(actionCommand, userItemCommand)