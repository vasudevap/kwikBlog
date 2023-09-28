const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model { }

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    posttitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postbody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postdate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

module.exports = BlogPost;
