module.exports = (sequelize, DataTypes) => {
    const answer = sequelize.define('answer', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '내용'
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '피드백'
      },
      arrangement: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: '예약 시간'
      },
      qid:{
        type: DataTypes.INTEGER
      },
      mentorId: {
        type: DataTypes.STRING
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
  