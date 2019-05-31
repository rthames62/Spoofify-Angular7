const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const spotifyController = require('./controllers/spotifyController');

app.use(cors());
spotifyController.authorizeSpotify();

app.get('/api/spotify/categories', spotifyController.getCategories);
app.get('/api/spotify/featured-playlists', spotifyController.getFeaturedPlaylists);
app.get('/api/spotify/recommendations', spotifyController.getRecommendations); 

app.listen(port, () => console.log(`Example app listening on port ${port}`));