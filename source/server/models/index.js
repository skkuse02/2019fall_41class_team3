const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const environment = require(path.join(__dirname, '../config/environment'));
const config = require('../config/config.json')[environment].db;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0) && (file !== basename)).forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
