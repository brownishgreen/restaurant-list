'use strict';
const restaurants = require('./restaurant.json').results

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', restaurants.map(restaurant => ({
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
      userId: restaurant.userId,
      created_at: new Date(), 
      updated_at: new Date()   
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
