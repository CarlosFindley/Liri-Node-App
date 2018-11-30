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
// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
// Grabbing user action command from CLI
var actionCommand = process.argv[2];
// Grabbing user item command (e.g. "concert-this") from CLI.  This will grab everything after index 3 and ignore anything prior
var userCommand = process.argv.slice(3).join(" ")



// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "total":
      total();
      break;
    
    case "deposit":
      deposit();
      break;
    
    case "withdraw":
      withdraw();
      break;
    
    case "lotto":
      lotto();
      break;
    }

    function liriRun(appCommand, userSearch) {
        switch (appCommand) {
            case "spotify-this-song":
                getSpotify(userSearch);
                break;
    
            case "concert-this":
                getBandsInTown(userSearch);
                break;
    
            case "movie-this":
                getOMDB(userSearch);
                break;
    
            case "do-what-it-says":
                getRandom();
                break;
            // If appCommand is left blank, return a default message to user
            default:
                console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' in order to continue");
        }
    };

