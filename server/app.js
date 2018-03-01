var express = require('express');
var morgan = require('morgan');
var axios = require('axios');


var app = express();

var database = {};


app.use(morgan("dev"));


app.get("/", function (req, res) {
    var movieId = req.query.i;
    var movieName = req.query.t;

    
    if (movieId) {
        
        if (database.movieId) {
                
            res.send(database.movieId);

        } else {
          
        axios
            .get('http://www.omdbapi.com/?i=' + movieId +
                '&apikey=8730e0e')
            .then(function (response) {
                database.movieId = response.data;
                res.send(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
        });

        }
        
    }

    else if (movieName) {

        if(database.movieName) {
        
            res.send(database.movieName);

        } else {
      
        axios
            .get('http://www.omdbapi.com/?t=' +
                movieName.replace(' ', '%20') + 
                '&apikey=8730e0e')
            .then(function (response) {
                database.movieName = response.data;
                res.send(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
        });

        }
          
    }
    res.send('ok');
});


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;