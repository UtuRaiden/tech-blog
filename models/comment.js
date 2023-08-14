//require the necessary files
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// comment is an extension of the model datatype from sequelize
class Comment extends Model {}
// defines all the possible characteristics of a comment
Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      comment_text:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'user',
          key:'id',
        }
      },
      post_id:{
        type: DataTypes.INTEGER,
          allowNull:false,
          references:{
            model:'post',
            key:'id',
          }
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
      modelName: 'comment',
    }
)

module.exports = Comment;