"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class UserRole extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        is_actived: _sequelize.DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'userRoles' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'roles' });
  }
}

exports. default = UserRole;
