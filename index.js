const express = require('express');
const db = require('./models/index');
const routes = require('./routes/index');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', routes);

const PORT = process.env.PORT || 4040;

db.sequelize
    .sync()
    .then(() => {
        console.log('Database Synced successfully');
    })
    .catch((err) => {
        console.log('Database synchronization failed, ' + err);
    });

app.listen(PORT, () => {
    console.log('Server started on port #' + PORT);
});

module.exports = app;
