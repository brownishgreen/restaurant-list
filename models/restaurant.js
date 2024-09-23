'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.belongsTo(models.User)
    }
  }
  Restaurant.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false // 确保此字段不能为空
    },
    name_en: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    google_map: DataTypes.STRING,
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0, 
        max: 5
      }
    },
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'Restaurants',
    timestamps: true
  });
  return Restaurant;
};
