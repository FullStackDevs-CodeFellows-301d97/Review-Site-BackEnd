'use strict';
console.log('Games API server is up!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth');
const getAllGames = require('./modules/getAllGames');
const postReviews = require('./modules/postReviews');
const deleteGame = require('./modules/deleteGame.js');
const updateGames = require('./modules/updateGames.js');
const getUserGames = require('./modules/getUserGames.js');

const app = express();
app.use(cors());
app.use(verifyUser); //codefellows middleware
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN


// **** CONNECT MONGODB USING MONGOOSE ***
// *** PER THE MONGOOSE DOCS - PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

// *** HELPFUL FOR TROUBLESHOOTING IN TERMINAL WHY YOU CAN'T CONNECT TO YOUR MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


//** ENDPOINT TO PULL GAMES FROM GAME API */
app.get('/games', getAllGames);


// *** ENDPOINT TO RETRIEVE ALL GAMES SAVED TO MY DATABASE ***
app.get('/myGames', getUserGames);


app.delete('/games/:gameID', deleteGame);



app.post('/games', postReviews);


app.put('/games/:gameID', updateGames);




app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`running on port ${PORT}`));
