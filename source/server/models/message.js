module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('message', {
      qid:{
        type: DataTypes.INTEGER
      },
      user: {
        type: DataTypes.STRING
      },
      message:{
        type: DataTypes.TEXT
      },
      order: {
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'message',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  