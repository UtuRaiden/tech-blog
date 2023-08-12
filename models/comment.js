const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

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