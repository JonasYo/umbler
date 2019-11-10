'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable camelcase */


var _sequelize = require('sequelize');

var _Services = require('../models/Services');

var _Services2 = _interopRequireDefault(_Services);

var _Times = require('../models/Times');

var _Times2 = _interopRequireDefault(_Times);

var _Schedules = require('../models/Schedules');

var _Schedules2 = _interopRequireDefault(_Schedules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Op = _sequelize.Sequelize.Op;

var ServicesController = function () {
  function ServicesController() {
    _classCallCheck(this, ServicesController);
  }

  _createClass(ServicesController, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Services2.default.create(req.body);

              case 2:
                response = _context.sent;
                return _context.abrupt('return', res.json(response));

              case 4:
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
    key: 'listServicesAvailable',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Services2.default.findAll();

              case 2:
                response = _context2.sent;

                if (response) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({
                  message: 'Não há serviços disponiveis no momento.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 5:
                return _context2.abrupt('return', res.json(response));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function listServicesAvailable(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return listServicesAvailable;
    }()
  }, {
    key: 'listHoursAvailable',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$params, date, service_id, startDate, endDate, schedule, hourNotAvailable, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$params = req.params, date = _req$params.date, service_id = _req$params.service_id;
                startDate = new Date(date);
                endDate = new Date(date);


                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(0);
                startDate.setMinutes(0);

                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setMilliseconds(59);

                _context3.next = 12;
                return _Schedules2.default.findAll({
                  // eslint-disable-next-line camelcase
                  attributes: ['hour_id'],
                  where: {
                    service_id: service_id,
                    date_start: _defineProperty({}, Op.between, [startDate, endDate])
                  }
                });

              case 12:
                schedule = _context3.sent;
                hourNotAvailable = [];

                schedule.map(function (hour) {
                  return hourNotAvailable.push(hour.hour_id);
                });

                _context3.next = 17;
                return _Times2.default.findAll({
                  where: {
                    id: _defineProperty({}, Op.notIn, hourNotAvailable)
                  }
                });

              case 17:
                response = _context3.sent;

                if (response) {
                  _context3.next = 20;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({
                  message: 'Não há serviços disponiveis no momento.',
                  code: 'ERROR_BAD_REQUEST'
                }));

              case 20:
                return _context3.abrupt('return', res.json(response));

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listHoursAvailable(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return listHoursAvailable;
    }()

    // TODO: finalizar metodos Update e Delete

  }, {
    key: 'update',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Services2.default.update(req.body);

              case 2:
                response = _context4.sent;
                return _context4.abrupt('return', res.json({
                  response: response
                }));

              case 4:
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
  }, {
    key: 'delete',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _Services2.default.findAll();

              case 2:
                response = _context5.sent;
                return _context5.abrupt('return', res.json({
                  response: response
                }));

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return ServicesController;
}();

exports.default = new ServicesController();
//# sourceMappingURL=ServicesController.js.map