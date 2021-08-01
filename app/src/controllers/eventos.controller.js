const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const Eventos = require('../models/Eventos');
const EventosFechas = require('../models/EventosFechas');

const getEventos = async (req, res) => {
    try {
        const { destacados } = req.query;
        const filters = {};

        if (destacados)
            filters.destacado = destacados.toLowerCase() === 'true';

        const resp = await Eventos.findAll({
            where: filters,
            include: {
                association: Eventos.EventosFechas,
                where: {
                    inicio: {
                        [Op.eq]: Sequelize.literal(`(
                            SELECT MIN(Inicio)
                                FROM EventosFechas
                            WHERE Inicio > NOW()
                              AND EventoId = Eventos.EventoId
                        )`)
                    }
                }
            },
            order: [
                [{ model: EventosFechas, as: 'eventosFechas' }, 'inicio', 'ASC']
            ]
        });

        return res.status(200).json(resp);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Eventos.findOne({
            where: { eventoId: id },
            include: Eventos.EventosFechas
        });

        if (!record)
            return res.status(400).json(`No se encontró Evento con ID ${id}.`);

        return res.status(400).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const addEvento = async (req, res) => {
    try {
        let record = req.body;

        if (!record.titulo)
            return res.status(400).json("El título del evento es requerido.");
        if (!record.descripcion)
            return res.status(400).json("La descripción del evento es requerido.");
        if (!record.lugar)
            return res.status(400).json("El lugar del evento es requerido.");
        if (record.destacado === null || record.destacado === undefined)
            return res.status(400).json("Se debe indicar si el evento es o no destacado.");
        if (typeof record.destacado !== 'boolean')
            return res.status(400).json("Destacado no es un tipo de datos valido.");
        if (!record.eventosFechas)
            return res.status(400).json("Las fechas del evento son requeridas.");
        if (!Array.isArray(record.eventosFechas))
            return res.status(400).json("Debe proporcionarse una lista de fechas para el evento.");
        if (record.eventosFechas.length == 0)
            return res.status(400).json("Debe proporcionarse al menos una fecha para el evento.");

        record.eventosFechas.forEach(fecha => {
            const inicio = moment(fecha.inicio, 'YYYY-MM-DDTHH:mm:ssZ', true);
            const fin = moment(fecha.fin, 'YYYY-MM-DDTHH:mm:ssZ', true);

            if (!inicio.isValid())
                return res.status(400).json("La fecha de inicio no es valida.");
            if (!fin.isValid())
                return res.status(400).json("La fecha de fin no es valida.");
            if (inicio.isBefore(moment()))
                return res.status(400).json("La fecha de inicio no puede ser mayor a la fecha actual.");
            if (inicio.isAfter(fin))
                return res.status(400).json("La fecha de inicio no puede ser mayor a la fecha de fin.");
        });

        const result = await Eventos.create(record, {
            include: [{
                association: Eventos.EventosFechas
            }]
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const updateEvento = async (req, res) => {

}

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Eventos.findOne({
            where: { eventoId: id },
            include: Eventos.EventosFechas
        });

        if (!record)
            return res.status(400).json(`No se encontró Evento con ID ${id}.`);
        
        await EventosFechas.destroy({ where: { eventoId: id } });
        await record.destroy();

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

module.exports = { getEventos, getEventoById, addEvento, updateEvento, deleteEvento };