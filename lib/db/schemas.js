'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('util');

const TABLE_PREFIX = process.env.COCOSHEL_TABLE_PREFIX || 'cocoshel_';

/**
 * Base schema
 */
function BaseSchema() {
	Schema.apply(this, arguments);

	if (!this.paths.createdAt) {
		this.add({
			createdAt: {
				type: Date,
				default: Date.now
			}
		});
	}
	if (!this.paths.updatedAt) {
		this.add({
			updatedAt: {
				type: Date
			}
		});
	}

	this.pre('save', function(next) {
		this.updatedAt = Date.now();
		next();
	});
}

util.inherits(BaseSchema, Schema);

/**
 * Subscriber schema
 */
const Subscriber = exports.Subscriber = new BaseSchema({
	// hash(group|target|email)
	_id: String,
	group: {
		type: String,
		index: true,
		lowercase: true,
		trim: true,
		minlength: 1,
		maxlength: 50
	},
	target: {
		type: String,
		index: true,
		lowercase: true,
		trim: true,
		minlength: 1,
		maxlength: 50
	},
	email: {
		type: String,
		// index: true,
		lowercase: true,
		trim: true,
		required: true,
		match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	},
	subscribed: {
		type: Boolean,
		index: true,
		default: true,
		required: true
	},
	name: {
		type: String,
		trim: true,
		maxlength: 200,
		minlength: 2
	},
	ip: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		minlength: 3,
		maxlength: 50
	},
	referer: {
		type: String,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	unsubscribedAt: {
		type: Date
	},
	lang: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 10
	},
	country: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 10
	},
	emailSentAt: {
		type: Date
	},
	props: Schema.Types.Mixed

}, {
	collection: [TABLE_PREFIX, 'subscribers'].join('')
});

Subscriber.set('toObject', {
	getters: true
});
