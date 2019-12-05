module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('fieldquestion', {
      qid:{
        type: DataTypes.INTEGER
      },
      field:{
        type: DataTypes.STRING
      }
    }, {
      tableName: 'fieldquestion',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  