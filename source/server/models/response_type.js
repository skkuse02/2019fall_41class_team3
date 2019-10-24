module.exports = (sequelize, DataTypes) => {
    const response_type = sequelize.define('response_type', {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        comment: '답변 종류'
      },
      minimum_point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        comment: '최소 비용'
      }
    }, {
      tableName: 'response_type',
      comment: '답변 종류',
      classMethods: {
        associate(models) {
        }
      }
    });
    return response_type;
  };
  