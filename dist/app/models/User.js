"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
        email: _sequelize.DataTypes.STRING,
        date_birth: _sequelize.DataTypes.STRING,
        phone: _sequelize.DataTypes.INTEGER,
        password: _sequelize.DataTypes.VIRTUAL,
        role_id: _sequelize.DataTypes.VIRTUAL,
        password_hash: _sequelize.DataTypes.STRING,
        alias: _sequelize.DataTypes.STRING,
        is_actived: _sequelize.DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      const { password } = user;

      if (password) {
        user.password_hash = await _bcryptjs2.default.hash(password, 8);
      }
    });

    return this;
  }

  async checkPassword(password) {
    const res = await _bcryptjs2.default.compare(password, this.password_hash);
    return res;
  }

  static associate(models) {
    this.hasMany(models.Schedules, { foreignKey: 'user_id', as: 'schedules' });
    this.hasMany(models.UserRole, {
      foreignKey: 'user_id',
      as: 'userRoles',
    });
    this.hasMany(models.Tokens, {
      foreignKey: 'user_id',
      as: 'userTokens',
    });
    this.hasMany(models.Device, {
      foreignKey: 'user_id',
      as: 'userDevice',
    });
  }
}

exports. default = User;
