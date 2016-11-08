'use strict';

const Model = require('./model');
const helpers = require('./helpers');

module.exports = class Subscriber extends Model {
	constructor(db) {
		super(db, 'Subscriber');
	}

	subscribe(data) {
		return this.create(data);
	}

	unsubscribe(data) {
		data.subscribed = false;
		data.unsubscribedAt = data.unsubscribedAt || new Date();
		return this.update(data);
	}

	createId() {
		return helpers.createSubscriberId.apply(null, arguments);
	}

	static createId() {
		return helpers.createSubscriberId.apply(null, arguments);
	}
};
