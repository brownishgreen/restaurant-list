'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Restaurants',
      { userId: 3 },
      { id: [1, 2, 3, 4] }
    );

    await queryInterface.bulkUpdate('Restaurants',
      { userId: 4 },
      { id: [5, 6, 7, 8] }
    );
  },

  async down(queryInterface, Sequelize) {
    // 如果需要回滾，可以設定回到 `null`
    await queryInterface.bulkUpdate('Restaurants',
      { userId: null },
      { id: [1, 2, 3, 4, 5, 6, 7, 8] }
    );
  }
};
