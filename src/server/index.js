const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const router = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

app.use('/api', router);

module.exports = app;