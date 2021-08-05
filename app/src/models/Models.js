const { DataTypes } = require('sequelize');
const db = require('../database');

const User = db.define('Users', {
    userId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated: {
        type: DataTypes.DATE
    }

}, {
    timestamps: false,
    hooks: {
        beforeValidate(user) {
            user.created = new Date();
        },
        beforeUpdate(user) {
            user.updated = new Date();
        }
    }
});

const Evento = db.define('Eventos', {
    eventoId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated: {
        type: DataTypes.DATE
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
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    eventoId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate(fecha) {
            fecha.created = new Date();
        },
        beforeUpdate(fecha) {
            fecha.created = new Date();
        }
    }
});

Evento.EventosFechas = Evento.hasMany(EventoFecha, { as: 'eventosFechas', foreignKey: 'eventoId' });
EventoFecha.Evento = EventoFecha.belongsTo(Evento, { as: 'evento', foreignKey: 'eventoId' });

module.exports = { User, Evento, EventoFecha };