'use strict';
const restaurants = require('./restaurant.json').results

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('restaurants', restaurants.map(restaurant => ({
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
      createdAt: new Date(), 
      updatedAt: new Date()   
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null, {});
    console.error("Error inserting seed data:", err);
  }
};
