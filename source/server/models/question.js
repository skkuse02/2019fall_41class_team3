module.exports = (sequelize, DataTypes) => {
    const question = sequelize.define('question', {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '제목'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '내용'
      },
      reward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        comment: "보상"
      },
      tag: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "태그"
      }
    }, {
      tableName: 'question',
      comment: '질문',
      classMethods: {
        associate(models) {
          question.hasOne(models.response_type);
          question.hasOne(models.user);
          question.hasOne(models.answer);
          question.hasMany(models.field);
          question.hasMany(models.time);
        }
      }
    });
    return question;
  };
  