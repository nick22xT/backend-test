const { EventoFecha } = require('../models/Models');
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
        const record = await EventoFecha.findByPk(id);

        if (!record)
            return res.status(400).json(`No se encontró EventoFecha con ID ${id}.`);

        return res.status(400).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const addEventoFecha = async (req, res) => {

}

const updateEventoFecha = async (req, res) => {

}

const deleteEventoFecha = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await EventoFecha.findByPk(id);

        if (!record)
            return res.status(400).json(`No se encontró EventoFecha con ID ${id}.`);

        await record.destroy();

        return res.status(400).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

module.exports = { searchEventosFechas, getEventoFechaById, addEventoFecha, updateEventoFecha, deleteEventoFecha };