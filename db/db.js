const knexConfig = require('../knexfile');
const knex = require('knex'); // Import the knex function

const nodeEnv = process.env.NODE_ENV || 'development';
const config = knexConfig[nodeEnv]; // Select the config object

// Call the knex function with the selected config
const db = knex(config);

module.exports = db;