'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false
        // TODO: Verificar necessidade do telefone ser unico
        // unique: true,
      },
      date_birth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING,
        defaultValue: 'NORMAL'
      },
      is_actived: {
        type: Sequelize.TINYINT,
        defaultValue: '1'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: function down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
//# sourceMappingURL=20190628220933-create-users.js.map