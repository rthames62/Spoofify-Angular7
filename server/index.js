const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const keys = require('./keys');
const request = require('request');

app.use(cors());

const spotifyAuthOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(keys.spotify.client_id + ':' + keys.spotify.client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
}

app.get('/api/spotify/auth', (req, res, next) => {
    request.post(spotifyAuthOptions, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            res.json(body);
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));