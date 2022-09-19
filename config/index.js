const config = {
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'Flutterwave1@',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DATABASE: process.env.DATABASE || 'stackoverflow_db'
}

module.exports = config;