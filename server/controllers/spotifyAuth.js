const keys = require('../keys.js');
const http = require('http');

const getSpotifyAuthToken = (req, res) => {
    console.log(keys);
}

module.exports = {
    getSpotifyAuthToken: getSpotifyAuthToken
}