"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Tokens extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        token: _sequelize.DataTypes.STRING,
        type: _sequelize.DataTypes.STRING,
        is_revoked: _sequelize.DataTypes.TINYINT,
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

exports. default = Tokens;
