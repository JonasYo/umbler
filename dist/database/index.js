"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Services = require('../app/models/Services'); var _Services2 = _interopRequireDefault(_Services);
var _Schedules = require('../app/models/Schedules'); var _Schedules2 = _interopRequireDefault(_Schedules);
var _Times = require('../app/models/Times'); var _Times2 = _interopRequireDefault(_Times);
var _Role = require('../app/models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _UserRole = require('../app/models/UserRole'); var _UserRole2 = _interopRequireDefault(_UserRole);
var _Tokens = require('../app/models/Tokens'); var _Tokens2 = _interopRequireDefault(_Tokens);
var _Device = require('../app/models/Device'); var _Device2 = _interopRequireDefault(_Device);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [
  _User2.default,
  _Services2.default,
  _Schedules2.default,
  _Times2.default,
  _Role2.default,
  _UserRole2.default,
  _Tokens2.default,
  _Device2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.connection = new (0, _sequelize2.default)(_database2.default);

      models
        .map(model => model.init(this.connection))
        .map(
          model => model.associate && model.associate(this.connection.models)
        );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

exports. default = new Database();
