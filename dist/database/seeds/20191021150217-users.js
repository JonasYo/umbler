'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('users', [{
      name: 'Jonas',
      email: 'jonas@jonas.com',
      phone: 4444444444,
      date_birth: '27-09-2997',
      password_hash: '$2a$08$Yvs0MP8lUYB8BVBYHf007ec9hRamf5WvqZ9eiANeSNXvBe4QokeBG',
      is_actived: 1,
      alias: 'NORMAL',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'I maria',
      email: 'imaria@imaria.com',
      phone: 4444444444,
      date_birth: '27-09-1997',
      password_hash: '$2a$08$Yvs0MP8lUYB8BVBYHf007ec9hRamf5WvqZ9eiANeSNXvBe4QokeBG',
      is_actived: 1,
      alias: 'NORMAL',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
//# sourceMappingURL=20191021150217-users.js.map