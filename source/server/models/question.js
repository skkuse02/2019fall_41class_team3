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
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
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
          question.belongsTo(models.response_type, {foreignKey: 'type'});
          question.belongsTo(models.user, {foreignKey: 'uid'});
          question.belongsToMany(models.user, {foreignKey: 'qid'});
          question.belongsToMany(models.field, {foreignKey: 'qid'});
          question.belongsToMany(models.time, {foreignKey: 'qid'});
        }
      }
    });
    return question;
  };
  