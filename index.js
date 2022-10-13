require('dotenv').config();
require('./config/db.config');
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
//routes
const home = require('./routes/index.route');
const shortUrl = require('./routes/short-url.route');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/', home);
app.use('/api', shortUrl);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
