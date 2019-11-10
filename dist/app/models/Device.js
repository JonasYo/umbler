"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Device extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        notification_id: _sequelize.DataTypes.STRING,
        name: _sequelize.DataTypes.STRING,
        platform: _sequelize.DataTypes.STRING,
        is_actived: _sequelize.DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

exports. default = Device;
