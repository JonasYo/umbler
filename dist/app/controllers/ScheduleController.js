"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable camelcase */
var _sequelize = require('sequelize');

var _Schedules = require('../models/Schedules'); var _Schedules2 = _interopRequireDefault(_Schedules);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

const { Op } = _sequelize.Sequelize;

class ScheduleController {
  async create(req, res) {
    const { user_id } = req.params;
    const { hour_id, service_id, date_start, date_end } = req.body;

    const startDate = new Date(date_start);
    const endDate = new Date(date_start);

    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setMilliseconds(59);

    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const user = await _User2.default.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: 'Usuario não encontrado',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const scheduling = await _Schedules2.default.findAll({
      where: {
        service_id,
        user_id,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    if (scheduling.length > 0) {
      return res.status(400).json({
        message:
          'Parece que você já possui um agendamento para esse serviço na data escolhida.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const schedules = await _Schedules2.default.create({
      hour_id,
      service_id,
      user_id,
      date_start,
      date_end,
    });

    _Mail2.default.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `kobig10775@7dmail.com`,
      subject: `I'maria - Confirmação de agendamento`,
      template: 'scheduling',
      defaultLayout: 'scheduling',
      context: {
        user: `${user.name}`,
        location: 'Curitiba',
        hour: `${date_start}`,
        professional: 'Maria Ruth',
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return res.json(schedules);
  }

  async listUserSchedule(req, res) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.params;

    const user = await _User2.default.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: 'Usuario não encontrado',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const response = {};

    response.scheduled = await _Schedules2.default.findAll({
      where: {
        user_id,
        is_actived: 1,
        is_realized: 0,
      },
      include: { association: 'services' },
    });

    response.finished = await _Schedules2.default.findAll({
      where: {
        user_id,
        is_actived: 1,
        is_realized: 1,
      },
      include: { association: 'services' },
    });

    return res.json(response);
  }

  async listAccreditedSchedule(req, res) {
    const user = await _User2.default.findOne({
      where: {
        id: req.userId,
      },
      include: [
        {
          association: 'userRoles',
          where: {
            user_id: req.userId,
            role_id: {
              [Op.or]: [2, 3],
            },
          },
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        message: 'Usuario logado não possui permissão',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0);
    startDate.setMinutes(0);

    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const schedules = await _Schedules2.default.findAll({
      where: {
        is_actived: 1,
        is_realized: 0,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        { association: 'services', attributes: ['name', 'duration'] },
        { association: 'user', attributes: ['name', 'phone'] },
        { association: 'hour', attributes: ['hour'] },
      ],
    });

    return res.json(schedules);
  }

  async update(req, res) {
    // TODO: refatorar atualização de agendamento
    const { name: oldName, email, oldPassword } = req.body;

    await _Schedules2.default.findByPk(req.ScheduleId);

    if (!email || !oldName || oldPassword) {
      return res.status(400).json({
        message:
          'Você não pode deixar os campos de nome, email ou senha antiga vazios.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    if (oldPassword && !(await _Schedules2.default.checkPassword(oldPassword))) {
      return res.status(401).json({
        message: 'A senha sua senha antiga parece estar incorreta.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    await _Schedules2.default.update(req.body);

    const { id, name } = await _Schedules2.default.findByPk(req.ScheduleId);

    return res.json({
      id,
      name,
      email,
    });
  }
}

exports. default = new ScheduleController();
