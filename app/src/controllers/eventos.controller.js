const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { Evento, EventoFecha } = require('../models/Models');

const getEventos = async (req, res) => {
    try {
        const { destacados } = req.query;
        const filters = {};

        if (destacados)
            filters.destacado = destacados.toLowerCase() === 'true';

        const resp = await Evento.findAll({
            where: filters,
            include: {
                association: Evento.EventosFechas,
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
                [{ model: EventoFecha, as: 'eventosFechas' }, 'inicio', 'ASC']
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
        const record = await Evento.findByPk(id);

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

        const result = await Evento.create(record, {
            include: [{
                association: Evento.EventosFechas
            }]
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const record = req.body;

        if (!await eventoExist(id))
            return res.status(404).json(`No se encontro Evento con ID ${id}`);

        await Evento.update(record, { where: { eventoId: id } });

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Evento.findByPk(id);

        if (!record)
            return res.status(400).json(`No se encontró Evento con ID ${id}.`);

        await EventoFecha.destroy({ where: { eventoId: id } });
        await record.destroy();

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const eventoExist = async (id) => await Evento.count({ where: { eventoId: id } }) > 0;

module.exports = { getEventos, getEventoById, addEvento, updateEvento, deleteEvento };