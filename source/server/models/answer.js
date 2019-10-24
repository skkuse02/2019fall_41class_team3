module.exports = (sequelize, DataTypes) => {
    const answer = sequelize.define('answer', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '내용'
      }
    }, {
      tableName: 'answer',
      comment: '답변',
      classMethods: {
        associate(models) {
          answer.belongsTo(models.question, {foreignKey: 'qid'});
          answer.belongsTo(models.user, {foreignKey: 'mentorId'});
        }
      }
    });
    return answer;
  };
  