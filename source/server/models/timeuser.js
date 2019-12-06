module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('timeuser', {
      uid:{
        type: DataTypes.STRING,
        primaryKey: true
      },
      timeId:{
        type: DataTypes.INTEGER,
        primaryKey: true
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
  