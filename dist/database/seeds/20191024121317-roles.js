'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('roles', [{
      name: 'USER',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'MANAGER',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
//# sourceMappingURL=20191024121317-roles.js.map