// const keys = require('../keys');
const request = require('request');
const baseUri = 'https://api.spotify.com/v1';

console.log(process.env.clientid);
console.log(process.env.clientkey);

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.clientid + ':' + process.env.clientkey).toString('base64'))
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
            res.json('Error');
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

const getArtistById = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getArtistAlbums = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/albums?market=US&include_groups=album`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getArtistSingles = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/albums?market=US&include_groups=single`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getArtistCompilations = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/albums?market=US&include_groups=compilation`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getArtistAppearsOn = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/albums?market=US&include_groups=appears_on`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(err);
        }
    })
}

const getArtistTopTracks = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/top-tracks?country=us`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(response);
        }
    })
}

const getAlbumById = (req, res) => {
    request.get(`${baseUri}/albums/${req.params.id}?market=us`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(response);
        }
    })
}

const getArtistRelatedArtists = (req, res) => {
    request.get(`${baseUri}/artists/${req.params.id}/related-artists`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(response);
        }
    })
}

const searchSpotify = (req, res) => {
    request.get(`${baseUri}/search?q=${req.params.q}*&type=album,artist,playlist,track&market=us&limit=20&best_match=true`, authHeaders, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        } else {
            res.json(response);
        }
    })
}

module.exports = {
    authorizeSpotify: authorizeSpotify,
    getCategories: getCategories,
    getFeaturedPlaylists: getFeaturedPlaylists,
    getRecommendations: getRecommendations,
    getPlaylistById: getPlaylistById,
    getArtistById: getArtistById,
    getArtistTopTracks: getArtistTopTracks,
    getArtistAlbums: getArtistAlbums,
    getArtistSingles: getArtistSingles,
    getArtistCompilations: getArtistCompilations,
    getArtistAppearsOn: getArtistAppearsOn,
    getAlbumById: getAlbumById,
    getArtistRelatedArtists: getArtistRelatedArtists,
    searchSpotify: searchSpotify
}