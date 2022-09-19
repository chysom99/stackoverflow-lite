const Sequelize = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const db = {};

db.users = require('./users')(sequelize, Sequelize);
db.questions = require('./questions')(sequelize, Sequelize);
db.answers = require('./answers')(sequelize, Sequelize);
db.votes = require('./votes')(sequelize, Sequelize);
db.comments = require('./comments')(sequelize, Sequelize);
// ... your other models here

// defining relationships
db.users.hasMany(db.questions);
db.questions.belongsTo(db.users);
db.answers.belongsTo(db.answers);
db.votes.belongsTo(db.votes);
db.comments.belongsTo(db.comments);
//... your other relationships here

// defining relationship automatically
/* const fs = require('fs');
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;