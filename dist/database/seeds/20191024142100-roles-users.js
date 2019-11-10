'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('user_roles', [{
      user_id: 1,
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: 1,
      role_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: 2,
      role_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('user_roles', null, {});
  }
};
//# sourceMappingURL=20191024142100-roles-users.js.map