const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}
// defines all the characteristics of a post
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'user',
                key:'id',
            }
          },
          title:{
            type: DataTypes.STRING,
            allowNull:false
          },
          content:{
            type: DataTypes.STRING,
            allowNull:false
          },
          date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'post',
    }
)

module.exports = Post;