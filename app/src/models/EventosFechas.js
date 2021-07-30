const Sequelize = require('sequelize');
const db = require('../database');

const EventosFechas = db.define('EventosFechas', {
    eventoFechaId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    eventoId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    inicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fin: {
        type: Sequelize.DATE,
        allowNull: false
    },
    precio: {
        type: Sequelize.INTEGER,
    },
    created: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updated: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate(evento) {
            evento.created = new Date();
        }
    }
});

module.exports = EventosFechas;
