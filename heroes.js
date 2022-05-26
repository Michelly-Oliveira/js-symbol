const { promisify } = require('util');
const crypto = require('crypto');

// convert crypto.randomInt to Promise (callback -> promise)
const randomInt = promisify(crypto.randomInt);

const kItems = Symbol('kItems');
const kFormatName = Symbol('kFormatName');
const kIdLimit = Symbol('kIdLimit');

class Heroes {
	constructor() {
		this[kItems] = [];
		this[kIdLimit] = 10;
	}

	add(firstName, lastName) {
		this[kItems].push({ firstName, lastName });
	}

	[kFormatName](firstName, lastName) {
		return `${firstName} ${lastName}`;
	}

	toString() {
		const result = this[kItems]
			.map(item => this[kFormatName](item.firstName, item.lastName))
			.join('\n');

		return '\n'.concat(result);
	}

	[Symbol.toPrimitive](coercionType) {
		if (coercionType !== 'string') {
			throw new TypeError('Invalid coercion');
		}

		return this.toString();
	}

	*[Symbol.iterator]() {
		for (const item of this[kItems]) {
			yield item;
		}
	}

	async *[Symbol.asyncIterator]() {
		for (const item of this[kItems]) {
			const id = await randomInt(this[kIdLimit]);

			yield { id, ...item };
		}
	}
}

module.exports = Heroes;
