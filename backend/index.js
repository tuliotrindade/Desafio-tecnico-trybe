require('dotenv').config();

const bodyParser = require('body-parser');

const express = require('express');

const taskRoute = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/task', taskRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));