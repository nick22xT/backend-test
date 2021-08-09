const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config({ path: '.env' });

const database = require('./database');
const eventosRoutes = require('./routes/eventos.routes');
const eventosFechasRoutes = require('./routes/fechas.routes');
const authRoutes = require('./routes/auth.routes');

database.authenticate()
    .then(() => console.log('Successful database connection'))
    .catch(err => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/eventos', eventosRoutes);
app.use('/eventosFechas', eventosFechasRoutes);
app.use('/auth', authRoutes);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});

module.exports = { app, server };