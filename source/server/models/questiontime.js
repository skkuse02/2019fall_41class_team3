module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('questiontime', {
      qid:{
        type: DataTypes.INTEGER
      },
      timeId:{
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'questiontime',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  