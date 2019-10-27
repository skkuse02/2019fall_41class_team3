module.exports = (sequelize, DataTypes) => {
    const field = sequelize.define('field', {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        comment: '필드'
      }
    }, {
      tableName: 'field',
      comment: '필드',
      classMethods: {
        associate(models) {
            field.belongsToMany(models.user, {foreignKey: 'field'});
            field.belongsToMany(models.question, {foreignKey: 'field'});
        }
      }
    });
    return field;
  };
  