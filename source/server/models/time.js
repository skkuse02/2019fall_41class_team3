module.exports = (sequelize, DataTypes) => {
    const time = sequelize.define('time', {
      day_of_week:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "월,화,수,목,금,토,일"
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "시작 시간"
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "끝 시간"
      }
    }, {
      tableName: 'time',
      comment: '활동 시간',
      classMethods: {
        associate(models) {
        
        }
      }
    });
    return time;
  };
  