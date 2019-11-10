"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Schedules extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        date_start: _sequelize.DataTypes.DATE,
        date_end: _sequelize.DataTypes.DATE,
        is_realized: _sequelize.DataTypes.TINYINT,
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
    this.belongsTo(models.Services, {
      foreignKey: 'service_id',
      as: 'services',
    });
    this.belongsTo(models.Times, { foreignKey: 'hour_id', as: 'hour' });
  }
}

exports. default = Schedules;
