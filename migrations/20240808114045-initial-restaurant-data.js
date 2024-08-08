'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../seeders/restaurant (2).json'); // 更新為新的檔案名稱
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const restaurants = data.results.map((restaurant, index) => ({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
      userId: index < Math.ceil(data.results.length / 2) ? 3 : 4, // 分配 userId
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Restaurants', restaurants, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
