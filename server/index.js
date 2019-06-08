const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const spotifyController = require('./controllers/spotifyController');

app.use(cors());
spotifyController.authorizeSpotify();

app.use(express.static(__dirname + '/dist/Spoofify'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/Spoofify/index.html'));
});

app.get('/api/spotify/categories', spotifyController.getCategories);
app.get('/api/spotify/featured-playlists', spotifyController.getFeaturedPlaylists);
app.get('/api/spotify/recommendations', spotifyController.getRecommendations);
app.get('/api/spotify/playlist/:id', spotifyController.getPlaylistById);
app.get('/api/spotify/artist/:id', spotifyController.getArtistById);
app.get('/api/spotify/artist/:id/top-tracks', spotifyController.getArtistTopTracks);
app.get('/api/spotify/artist/:id/albums', spotifyController.getArtistAlbums);
app.get('/api/spotify/artist/:id/singles', spotifyController.getArtistSingles);
app.get('/api/spotify/artist/:id/compilations', spotifyController.getArtistCompilations);
app.get('/api/spotify/artist/:id/appears-on', spotifyController.getArtistAppearsOn);
app.get('/api/spotify/artist/:id/related-artists', spotifyController.getArtistRelatedArtists);
app.get('/api/spotify/album/:id', spotifyController.getAlbumById);
app.get('/api/spotify/search/:q', spotifyController.searchSpotify);

app.listen(port, () => console.log(`Example app listening on port ${port}`));