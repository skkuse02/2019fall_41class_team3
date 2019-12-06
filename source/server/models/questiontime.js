module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('questiontime', {
      qid:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      timeId:{
        type: DataTypes.INTEGER,
        primaryKey: true
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
  