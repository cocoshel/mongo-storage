'use strict';

const Subscriber = require('./subscriber');
const db = require('./db');
const mongoose = require('mongoose');

exports.mongoose = mongoose;
exports.Subscriber = Subscriber;
exports.db = db;
exports.connect = (connectionString, options, cb) => {
	return mongoose.createConnection(connectionString, options, cb);
};
