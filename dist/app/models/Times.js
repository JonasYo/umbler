"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Times extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        hour: _sequelize.DataTypes.STRING,
        is_actived: _sequelize.DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Schedules, {
      foreignKey: 'hour_id',
      as: 'hours',
    });
  }
}

exports. default = Times;
