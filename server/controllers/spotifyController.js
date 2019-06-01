const keys = require('../keys');
const request = require('request');
const baseUri = 'https://api.spotify.com/v1';

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(keys.spotify.client_id + ':' + keys.spotify.client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
}
const authHeaders = {
    headers: {
        'Authorization' : ''
    },
    json: true
};

const authorizeSpotify = () => {
    request.post(authOptions, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            authHeaders.headers.Authorization = `Bearer ${body.access_token}`;
        }
    });
}

const getCategories = (req, res) => {
    request.get(`${baseUri}/browse/categories`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getFeaturedPlaylists = (req, res) => {
    request.get(`${baseUri}/browse/featured-playlists`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getRecommendations = (req, res) => {
    request.get(`${baseUri}/recommendations`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getPlaylistById = (req, res) => {
    request.get(`${baseUri}/playlists/${req.params.id}`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

module.exports = {
    authorizeSpotify: authorizeSpotify,
    getCategories: getCategories,
    getFeaturedPlaylists: getFeaturedPlaylists,
    getRecommendations: getRecommendations,
    getPlaylistById: getPlaylistById
}