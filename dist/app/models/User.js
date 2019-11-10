'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sequelize = require('sequelize');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Model) {
  _inherits(User, _Model);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'checkPassword',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _bcryptjs2.default.compare(password, this.password_hash);

              case 2:
                res = _context.sent;
                return _context.abrupt('return', res);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkPassword(_x) {
        return _ref.apply(this, arguments);
      }

      return checkPassword;
    }()
  }], [{
    key: 'init',
    value: function init(sequelize) {
      var _this2 = this;

      _get(User.__proto__ || Object.getPrototypeOf(User), 'init', this).call(this, {
        name: _sequelize.DataTypes.STRING,
        email: _sequelize.DataTypes.STRING,
        date_birth: _sequelize.DataTypes.STRING,
        phone: _sequelize.DataTypes.INTEGER,
        password: _sequelize.DataTypes.VIRTUAL,
        role_id: _sequelize.DataTypes.VIRTUAL,
        password_hash: _sequelize.DataTypes.STRING,
        alias: _sequelize.DataTypes.STRING,
        is_actived: _sequelize.DataTypes.TINYINT
      }, {
        sequelize: sequelize
      });

      this.addHook('beforeSave', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
          var password;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  password = user.password;

                  if (!password) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 4;
                  return _bcryptjs2.default.hash(password, 8);

                case 4:
                  user.password_hash = _context2.sent;

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());

      return this;
    }
  }, {
    key: 'associate',
    value: function associate(models) {
      this.hasMany(models.Schedules, { foreignKey: 'user_id', as: 'schedules' });
      this.hasMany(models.UserRole, {
        foreignKey: 'user_id',
        as: 'userRoles'
      });
      this.hasMany(models.Tokens, {
        foreignKey: 'user_id',
        as: 'userTokens'
      });
      this.hasMany(models.Device, {
        foreignKey: 'user_id',
        as: 'userDevice'
      });
    }
  }]);

  return User;
}(_sequelize.Model);

exports.default = User;
//# sourceMappingURL=User.js.map