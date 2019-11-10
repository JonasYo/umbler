"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Role extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.UserRole, {
      foreignKey: 'role_id',
      as: 'role',
    });
  }
}

exports. default = Role;
