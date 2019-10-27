module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '이름'
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '별명'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'sha256 hash 사용'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '멘토 OR 멘티'
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
      comment: '유저 등급'
    },
    points: {
      type: DataTypes.INTEGER,
      default: 0
    }
  }, {
    tableName: 'user',
    comment: '유저',
    classMethods: {
      associate(models) {
        user.belongsToMany(models.time, {foreignKey: 'uid'});
      }
    }
  });
  return user;
};
