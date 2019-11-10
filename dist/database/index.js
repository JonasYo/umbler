'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User');

var _User2 = _interopRequireDefault(_User);

var _Services = require('../app/models/Services');

var _Services2 = _interopRequireDefault(_Services);

var _Schedules = require('../app/models/Schedules');

var _Schedules2 = _interopRequireDefault(_Schedules);

var _Times = require('../app/models/Times');

var _Times2 = _interopRequireDefault(_Times);

var _Role = require('../app/models/Role');

var _Role2 = _interopRequireDefault(_Role);

var _UserRole = require('../app/models/UserRole');

var _UserRole2 = _interopRequireDefault(_UserRole);

var _Tokens = require('../app/models/Tokens');

var _Tokens2 = _interopRequireDefault(_Tokens);

var _Device = require('../app/models/Device');

var _Device2 = _interopRequireDefault(_Device);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var models = [_User2.default, _Services2.default, _Schedules2.default, _Times2.default, _Role2.default, _UserRole2.default, _Tokens2.default, _Device2.default];

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);

    this.init();
  }

  _createClass(Database, [{
    key: 'init',
    value: function init() {
      var _this = this;

      try {
        this.connection = new _sequelize2.default(_database2.default);

        models.map(function (model) {
          return model.init(_this.connection);
        }).map(function (model) {
          return model.associate && model.associate(_this.connection.models);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }]);

  return Database;
}();

exports.default = new Database();
//# sourceMappingURL=index.js.map