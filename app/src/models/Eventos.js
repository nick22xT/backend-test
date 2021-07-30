const Sequelize = require('sequelize');
const db = require('../database');
const EventosFechas = require('./EventosFechas');

const Evento = db.define('Eventos', {
    eventoId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lugar: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    destacado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING
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

Evento.EventosFechas = Evento.hasMany(EventosFechas, { as: 'eventosFechas', foreignKey: 'eventoId' });

module.exports = Evento;