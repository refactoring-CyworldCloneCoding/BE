'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Myhomes, { foreignKey: 'myhomeId' });
      this.belongsTo(models.Diaries, { foreignKey: 'diaryId' });
      this.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        type: DataTypes.INTEGER,
      },
      myhomeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Myhomes',
          key: 'myhomeId',
        },
        onDelete: 'cascade',
      },
      diaryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Diaries',
          key: 'diaryId',
        },
        onDelete: 'cascade',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};
