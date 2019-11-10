'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _UserController = require('./app/controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _AuthController = require('./app/controllers/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

var _ScheduleController = require('./app/controllers/ScheduleController');

var _ScheduleController2 = _interopRequireDefault(_ScheduleController);

var _ServicesController = require('./app/controllers/ServicesController');

var _ServicesController2 = _interopRequireDefault(_ServicesController);

var _DeviceController = require('./app/controllers/DeviceController');

var _DeviceController2 = _interopRequireDefault(_DeviceController);

var _auth = require('./app/middlewares/auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _validateAuthFields = require('./app/middlewares/global/validateAuthFields');

var _validateAuthFields2 = _interopRequireDefault(_validateAuthFields);

var _validateCreateFields = require('./app/middlewares/user/validateCreateFields');

var _validateCreateFields2 = _interopRequireDefault(_validateCreateFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers do projeto
var routes = new _express.Router();

// rotas do projeto


// validadores de dados
routes.post('/auth/singin', _validateAuthFields2.default, _AuthController2.default.singin);

routes.post('/auth/singin/alternative', _AuthController2.default.singinAlternative);

routes.post('/auth/forgot', _AuthController2.default.forgot);

routes.post('/auth/reset', _AuthController2.default.reset);

routes.post('/device', _DeviceController2.default.create);

routes.put('/device', _DeviceController2.default.update);

routes.post('/users', _validateCreateFields2.default, _UserController2.default.create);

routes.put('/users/:flag', _auth2.default, _UserController2.default.update);

routes.get('/services', _auth2.default, _ServicesController2.default.listServicesAvailable);

routes.get('/services/:date/schedule/:service_id', _auth2.default, _ServicesController2.default.listHoursAvailable);

routes.get('/schedule/user/:user_id', _auth2.default, _ScheduleController2.default.listUserSchedule);

routes.get('/schedule/:date/accredited/', _auth2.default, _ScheduleController2.default.listAccreditedSchedule);

routes.post('/services/:user_id/schedule', _auth2.default, _ScheduleController2.default.create);

// routes.put('/schedules', AuthController.singin);

// routes.get('/feed', AuthController.singin);

// routes.post('/feed', AuthController.singin);

// routes.put('/feed', AuthController.singin);

// routes.delete('/feed', AuthController.singin);

// routes.delete('/device', AuthController.singin);

exports.default = routes;
//# sourceMappingURL=routes.js.map