'use strict';

/* eslint-disable no-unused-vars */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('services', [{
      name: 'Design de Sobrancelha',
      description: '',
      duration: 30,
      price: 60.0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Maquiagem Social com Cílios',
      description: '',
      duration: 90,
      price: 130.0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: ' Sobrancelhas',
      description: '',
      duration: 30,
      price: 40.0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Design Sobrancelha + Buço',
      description: '',
      duration: 60,
      price: 80.0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Sobrancelhas + Buço',
      description: '',
      duration: 30,
      price: 55.0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Penteado',
      description: '',
      duration: 60,
      price: 140.0,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('services', null, {});
  }
};
//# sourceMappingURL=20191015165035-services.js.map