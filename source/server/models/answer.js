module.exports = (sequelize, DataTypes) => {
    const answer = sequelize.define('answer', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '내용'
      },
      reward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        comment: "답변 보상"
      }
    }, {
      tableName: 'answer',
      comment: '답변',
      classMethods: {
        associate(models) {
          answer.belongsTo(models.question);
          answer.hasOne(models.user);
        }
      }
    });
    return answer;
  };
  