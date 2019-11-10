"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Services extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
        description: _sequelize.DataTypes.STRING,
        price: _sequelize.DataTypes.INTEGER,
        duration: _sequelize.DataTypes.INTEGER,
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
      foreignKey: 'service_id',
      as: 'services',
    });
  }
}

exports. default = Services;
