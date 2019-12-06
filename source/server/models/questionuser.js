module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('questionuser', {
      qid:{
        type: DataTypes.INTEGER
      },
      userUid:{
        type: DataTypes.STRING
      }
    }, {
      tableName: 'questionuser',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  