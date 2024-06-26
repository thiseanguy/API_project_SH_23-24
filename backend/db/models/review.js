'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Review.hasMany(
        models.ReviewImage,
        { foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true }
      );
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    review: {
      allowNull: false,
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
