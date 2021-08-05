const { EventoFecha, Evento } = require('../models/Models');
const { Op } = require("sequelize");
const moment = require('moment');

const searchEventosFechas = async (req, res) => {
    try {
        const { eventoId, fromDate, toDate } = req.query;
        const filters = {};

        if (eventoId)
            filters.eventoId = parseInt(eventoId);
        if (fromDate)
            filters.inicio = { [Op.gte]: moment(fromDate) };
        if (toDate)
            filters.fin = { [Op.lte]: moment(toDate) };

        const resp = await EventoFecha.findAll({
            where: filters,
            include: {
                association: EventoFecha.Evento
            }
        });

        return res.status(200).json(resp);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const getEventoFechaById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await EventoFecha.findByPk(id, { include: { association: EventoFecha.Evento } });

        if (!record)
            return res.status(400).json(`No se encontró EventoFecha con ID ${id}.`);

        return res.status(400).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const addEventoFecha = async (req, res) => {
    try {
        let record = req.body;

        if (await Evento.count({ where: { eventoId: record.eventoId } }) == 0)
            return res.status(400).json(`No se encontro Evento con ID ${record.eventoId}`);

        record = await EventoFecha.create(record);

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const updateEventoFecha = async (req, res) => {
    try {
        const { id } = req.params;
        let record = req.body;

        if (await EventoFecha.count({ where: { eventoFechaId: id } }) == 0)
            return res.status(400).json(`No se encontro EventoFecha con ID ${record.eventoId}`);

        if (await Evento.count({ where: { eventoId: record.eventoId } }) == 0)
            return res.status(400).json(`No se encontro Evento con ID ${record.eventoId}`);

        await EventoFecha.update(record, { where: { eventoFechaId: id } });

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const deleteEventoFecha = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await EventoFecha.findByPk(id);

        if (!record)
            return res.status(400).json(`No se encontró EventoFecha con ID ${id}.`);

        await record.destroy();

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

module.exports = { searchEventosFechas, getEventoFechaById, addEventoFecha, updateEventoFecha, deleteEventoFecha };