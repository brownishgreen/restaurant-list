'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // 讀取 JSON 檔案
      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'restaurant.json'), 'utf8'));
      console.log('Data from JSON file:', data.results); // 輸出日誌以檢查資料

      // 插入資料到 Restaurants 表中
      await queryInterface.bulkInsert('Restaurants', data.results, {});
    } catch (error) {
      console.error('Error reading or inserting data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    // 回退操作：刪除 Restaurants 表中的所有資料
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
