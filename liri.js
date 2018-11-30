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





// You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var userCommand = process.argv[2];


