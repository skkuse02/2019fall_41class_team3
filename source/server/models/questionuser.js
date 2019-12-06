module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('questionuser', {
      qid:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      userUid:{
        type: DataTypes.STRING,
        primaryKey: true
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
  