'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable camelcase */


var _sequelize = require('sequelize');

var _Schedules = require('../models/Schedules');

var _Schedules2 = _interopRequireDefault(_Schedules);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Mail = require('../../lib/Mail');

var _Mail2 = _interopRequireDefault(_Mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Op = _sequelize.Sequelize.Op;

var ScheduleController = function () {
  function ScheduleController() {
    _classCallCheck(this, ScheduleController);
  }

  _createClass(ScheduleController, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user_id, _req$body, hour_id, service_id, date_start, date_end, startDate, endDate, user, scheduling, schedules;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user_id = req.params.user_id;
                _req$body = req.body, hour_id = _req$body.hour_id, service_id = _req$body.service_id, date_start = _req$body.date_start, date_end = _req$body.date_end;
                startDate = new Date(date_start);
                endDate = new Date(date_start);


                startDate.setHours(0);
                startDate.setMinutes(0);
                startDate.setMilliseconds(59);

                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setMilliseconds(59);

                _context.next = 12;
                return _User2.default.findByPk(user_id);

              case 12:
                user = _context.sent;

                if (user) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  message: 'Usuario não encontrado',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 15:
                _context.next = 17;
                return _Schedules2.default.findAll({
                  where: {
                    service_id: service_id,
                    user_id: user_id,
                    date_start: _defineProperty({}, Op.between, [startDate, endDate])
                  }
                });

              case 17:
                scheduling = _context.sent;

                if (!(scheduling.length > 0)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  message: 'Parece que você já possui um agendamento para esse serviço na data escolhida.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 20:
                _context.next = 22;
                return _Schedules2.default.create({
                  hour_id: hour_id,
                  service_id: service_id,
                  user_id: user_id,
                  date_start: date_start,
                  date_end: date_end
                });

              case 22:
                schedules = _context.sent;


                _Mail2.default.sendMail({
                  from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
                  to: 'kobig10775@7dmail.com',
                  subject: 'I\'maria - Confirma\xE7\xE3o de agendamento',
                  template: 'scheduling',
                  defaultLayout: 'scheduling',
                  context: {
                    user: '' + user.name,
                    location: 'Curitiba',
                    hour: '' + date_start,
                    professional: 'Maria Ruth'
                  },
                  attachments: [{
                    filename: 'image.png',
                    path: process.cwd() + '/src/resources/images/logo.png',
                    cid: 'logo'
                  }]
                });

                return _context.abrupt('return', res.json(schedules));

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'listUserSchedule',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user_id, user, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // eslint-disable-next-line camelcase
                user_id = req.params.user_id;
                _context2.next = 3;
                return _User2.default.findByPk(user_id);

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({
                  message: 'Usuario não encontrado',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 6:
                response = {};
                _context2.next = 9;
                return _Schedules2.default.findAll({
                  where: {
                    user_id: user_id,
                    is_actived: 1,
                    is_realized: 0
                  },
                  include: { association: 'services' }
                });

              case 9:
                response.scheduled = _context2.sent;
                _context2.next = 12;
                return _Schedules2.default.findAll({
                  where: {
                    user_id: user_id,
                    is_actived: 1,
                    is_realized: 1
                  },
                  include: { association: 'services' }
                });

              case 12:
                response.finished = _context2.sent;
                return _context2.abrupt('return', res.json(response));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function listUserSchedule(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return listUserSchedule;
    }()
  }, {
    key: 'listAccreditedSchedule',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var user, date, startDate, endDate, schedules;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _User2.default.findOne({
                  where: {
                    id: req.userId
                  },
                  include: [{
                    association: 'userRoles',
                    where: {
                      user_id: req.userId,
                      role_id: _defineProperty({}, Op.or, [2, 3])
                    }
                  }]
                });

              case 2:
                user = _context3.sent;

                if (user) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({
                  message: 'Usuario logado não possui permissão',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 5:
                date = req.params.date;
                startDate = new Date(date);
                endDate = new Date(date);


                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(0);
                startDate.setMinutes(0);

                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setMilliseconds(59);

                _context3.next = 17;
                return _Schedules2.default.findAll({
                  where: {
                    is_actived: 1,
                    is_realized: 0,
                    date_start: _defineProperty({}, Op.between, [startDate, endDate])
                  },
                  include: [{ association: 'services', attributes: ['name', 'duration'] }, { association: 'user', attributes: ['name', 'phone'] }, { association: 'hour', attributes: ['hour'] }]
                });

              case 17:
                schedules = _context3.sent;
                return _context3.abrupt('return', res.json(schedules));

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listAccreditedSchedule(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return listAccreditedSchedule;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$body2, oldName, email, oldPassword, _ref5, id, name;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // TODO: refatorar atualização de agendamento
                _req$body2 = req.body, oldName = _req$body2.name, email = _req$body2.email, oldPassword = _req$body2.oldPassword;
                _context4.next = 3;
                return _Schedules2.default.findByPk(req.ScheduleId);

              case 3:
                if (!(!email || !oldName || oldPassword)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', res.status(400).json({
                  message: 'Você não pode deixar os campos de nome, email ou senha antiga vazios.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 5:
                _context4.t0 = oldPassword;

                if (!_context4.t0) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 9;
                return _Schedules2.default.checkPassword(oldPassword);

              case 9:
                _context4.t0 = !_context4.sent;

              case 10:
                if (!_context4.t0) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt('return', res.status(401).json({
                  message: 'A senha sua senha antiga parece estar incorreta.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 12:
                _context4.next = 14;
                return _Schedules2.default.update(req.body);

              case 14:
                _context4.next = 16;
                return _Schedules2.default.findByPk(req.ScheduleId);

              case 16:
                _ref5 = _context4.sent;
                id = _ref5.id;
                name = _ref5.name;
                return _context4.abrupt('return', res.json({
                  id: id,
                  name: name,
                  email: email
                }));

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return ScheduleController;
}();

exports.default = new ScheduleController();
//# sourceMappingURL=ScheduleController.js.map