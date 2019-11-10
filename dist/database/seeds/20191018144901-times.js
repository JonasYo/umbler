'use strict';

/* eslint-disable no-unused-vars */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('times', [{
      hour: '08:30',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      hour: '09:00',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      hour: '09:30',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      hour: '10:00',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      hour: '10:30',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('times', null, {});
  }
};
//# sourceMappingURL=20191018144901-times.js.map