'use strict';

const utils = require('./utils');
const _ = utils._;

exports.createSubscriberId = (group, target, email) => {
	if (typeof group === 'object') {
		target = group.target;
		email = group.email;
		group = group.group;
	}
	return utils.md5([group.trim().toLowerCase(), target.trim().toLowerCase(), email.trim().toLowerCase()].join('|'));
};

exports.normalizeSubscriber = (data) => {
	data = _.clone(data);

	data.group = data.group || '.';
	data.target = data.target || '.';

	data.group = data.group.trim().toLowerCase();
	data.target = data.target.trim().toLowerCase();
	data.email = data.email.trim().toLowerCase();
	data._id = exports.createSubscriberId(data);

	if (data.referer) {
		data.referer = data.referer.trim().substr(0, 255);
	}

	return data;
};
