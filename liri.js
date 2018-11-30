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
var userItemCommand = process.argv.slice(3).join(" ");

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
            console.log("Venue Name: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Event Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");

            // Finally, we append to log.txt
            var logArtistEvent = "----------Bands in Town Info----------" + "\n Artist(s): " + artist + "\n Venue Name: " + response.data[0].venue.name + "\n Venue Location: " + response.data[0].venue.city + "\n Event Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "--------------------" + "\n";

            fs.appendFile("log.txt", logArtistEvent, function (err) {
                if (err) throw err;
            });
    });
};



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
            return console.log("ERROR OCCURRED: " + err);
            // If no error happens (sourcing is successful), give us the following
        } 
            console.log("--------------------");
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name + "\r\n");
            console.log("Song: " + data.tracks.items[0].name + "\r\n");
            console.log("Link to sample: " + data.tracks.items[0].href + "\r\n");
            console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

                // Finally, we append to log.txt
                var logSong = "----------Spotify Music Info----------" + "\n Artist(s): " + data.tracks.items[0].album.artists[0].name + "\n Song: " + data.tracks.items[0].name + "\n Link to sample: " + data.tracks.items[0].href + "\n Album: " + data.tracks.items[0].album.name + "--------------------" + "\n";
                fs.appendFile("log.txt", logSong, function (err) {
                    if (err) throw err;
                });
            

        });
};


// Using OMDB for movie-this
function getOMDB(movie) {
    // If the song name is left blank, add the following movie as default
    if (!movie) {
        movie = "Como agua para chocolate";
    };

    // Next, we are creating the search logic
    var movieQuery = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQuery).then(
        function (response) {
            // If no error happens (sourcing is successful), give us the following
            console.log("--------------------");
            console.log("Movie Title: " + response.data.Title + "\r\n");
            console.log("Year: " + response.data.Year + + "\r\n");
            console.log("IMBD Rating: " + response.data.imdbRating + "\r\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Rating[1].Value + "\r\n");
            console.log("Country Produced: " + response.data.Country + "\r\n");
            console.log("Language: " + response.data.Language + "\r\n");
            console.log("Plot: " + response.data.Plot + "\r\n");
            console.log("Actors: " + response.data.Actors + "\r\n");

                // Finally, we append to log.txt
                var logMovie = "----------OMDB Info----------" + "\n Movie Title: " + response.data.Title + "\n Year: " + response.data.Year + "\n IMBD Rating: " + response.data.imdbRating + "\n Rotten Tomatoes Rating: " + response.data.Rating[1].Value + "\n Country Produced: " + response.data.Country + "\n Language: " + response.data.Language + "\n Plot: " + response.data.Plot + "\n Actors: " + response.data.Actors + "--------------------" + "\n";

                fs.appendFile("log.txt", logMovie, function (err) {
                    if (err) throw err;
                });
            });
};


// Random Feature Function
function getRandom() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);

            var randomData = data.split(",");
            liriCommandRun(randomData[0], randomData[1]);
        };
    });
};


// Function to log results to other functions
function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err) throw err;
    });
};


// Calling the search command function
liriCommandRun(actionCommand, userItemCommand)