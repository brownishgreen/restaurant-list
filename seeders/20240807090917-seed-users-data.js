'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'User1',
        email: 'user1@example.com',
        password: '12345678',
        created_at: new Date('2024-09-04 19:54:05'),
        updated_at: new Date('2024-09-05 21:32:02'),
      },
      {
        id: 2,
        name: 'User2',
        email: 'user2@example.com',
        password: '12345678',
        created_at: new Date('2024-09-05 05:51:09'),
        updated_at: new Date('2024-09-05 21:31:50'),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
