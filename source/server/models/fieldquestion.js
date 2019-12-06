module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('fieldquestion', {
      qid:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      field:{
        type: DataTypes.STRING,
        primaryKey: true
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
  