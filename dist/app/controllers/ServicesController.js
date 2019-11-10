"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable camelcase */
var _sequelize = require('sequelize');

var _Services = require('../models/Services'); var _Services2 = _interopRequireDefault(_Services);
var _Times = require('../models/Times'); var _Times2 = _interopRequireDefault(_Times);
var _Schedules = require('../models/Schedules'); var _Schedules2 = _interopRequireDefault(_Schedules);

const { Op } = _sequelize.Sequelize;

class ServicesController {
  async create(req, res) {
    // TODO: finalizar logica para consumir a API no Portal Web
    const response = await _Services2.default.create(req.body);

    return res.json(response);
  }

  async listServicesAvailable(req, res) {
    const response = await _Services2.default.findAll();
    if (!response) {
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }
    return res.json(response);
  }

  async listHoursAvailable(req, res) {
    const { date, service_id } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0);
    startDate.setMinutes(0);

    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const schedule = await _Schedules2.default.findAll({
      // eslint-disable-next-line camelcase
      attributes: ['hour_id'],
      where: {
        service_id,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const hourNotAvailable = [];
    schedule.map(hour => hourNotAvailable.push(hour.hour_id));

    const response = await _Times2.default.findAll({
      where: {
        id: { [Op.notIn]: hourNotAvailable },
      },
    });

    if (!response) {
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    return res.json(response);
  }

  // TODO: finalizar metodos Update e Delete
  async update(req, res) {
    const response = await _Services2.default.update(req.body);

    return res.json({
      response,
    });
  }

  async delete(req, res) {
    const response = await _Services2.default.findAll();

    return res.json({
      response,
    });
  }
}

exports. default = new ServicesController();
