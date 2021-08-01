const Sequelize = require('sequelize');
const db = require('../database');

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
        },
        beforeUpdate(evento) {
            evento.updated = new Date();
        }
    }
});

const EventoFecha = db.define('EventosFechas', {
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

Evento.EventosFechas = Evento.hasMany(EventoFecha, { as: 'eventosFechas', foreignKey: 'eventoId' });
EventoFecha.Evento = EventoFecha.belongsTo(Evento, { as: 'evento', foreignKey: 'eventoId' });

module.exports = { Evento, EventoFecha };