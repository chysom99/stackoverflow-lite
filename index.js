const express = require('express');
const db = require('./models/index');
const routes = require('./routes/index');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 4040;

db.sequelize.sync().then(() => {
    console.log('Database Synced successfully')
}).catch((err) => {
    console.log('Database synchronization failed, ' + err)
})

app.listen(PORT, () => {
    console.log("Server started on port #" + PORT)
})

