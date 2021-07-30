const express = require('express');
const database = require('./database');
const routes = require('./routes/eventos.routes');
require('dotenv').config({ path: '.env' });

database.authenticate()
    .then(() => console.log('Successful database connection'))
    .catch(err => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/eventos', routes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});

module.exports = { app, server };