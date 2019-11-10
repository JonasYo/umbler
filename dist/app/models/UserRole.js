'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sequelize = require('sequelize');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRole = function (_Model) {
  _inherits(UserRole, _Model);

  function UserRole() {
    _classCallCheck(this, UserRole);

    return _possibleConstructorReturn(this, (UserRole.__proto__ || Object.getPrototypeOf(UserRole)).apply(this, arguments));
  }

  _createClass(UserRole, null, [{
    key: 'init',
    value: function init(sequelize) {
      _get(UserRole.__proto__ || Object.getPrototypeOf(UserRole), 'init', this).call(this, {
        is_actived: _sequelize.DataTypes.INTEGER
      }, {
        sequelize: sequelize
      });
      return this;
    }
  }, {
    key: 'associate',
    value: function associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'userRoles' });
      this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'roles' });
    }
  }]);

  return UserRole;
}(_sequelize.Model);

exports.default = UserRole;
//# sourceMappingURL=UserRole.js.map