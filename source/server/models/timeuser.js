module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('timeuser', {
      uid:{
        type: DataTypes.STRING
      },
      timeId:{
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'timeuser',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  