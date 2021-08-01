const express = require('express');
require('dotenv').config({ path: '.env' });

const database = require('./database');
const eventosRoutes = require('./routes/eventos.routes');
const eventosFechasRoutes = require('./routes/eventosFechas.routes');

database.authenticate()
    .then(() => console.log('Successful database connection'))
    .catch(err => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/eventos', eventosRoutes);
app.use('/eventosFechas', eventosFechasRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});

module.exports = { app, server };