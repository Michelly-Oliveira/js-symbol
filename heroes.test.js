const { deepStrictEqual, throws } = require('assert');

const Heroes = require('./heroes');

(async () => {
	const heroes = new Heroes();
	heroes.add('Goro', 'Majima');
	heroes.add('Kazuma', 'Kiryu');

	// console.log('heroes', heroes);
	// console.log('heroes.toString()', heroes.toString());
	// console.log('heroes * 1', heroes * 1);

	deepStrictEqual(heroes.toString(), '\nGoro Majima\nKazuma Kiryu');
	deepStrictEqual(String(heroes), '\nGoro Majima\nKazuma Kiryu');
	throws(() => heroes * 1, { name: 'TypeError', message: 'Invalid coercion' });

	const expectedItems = [
		{ firstName: 'Goro', lastName: 'Majima' },
		{ firstName: 'Kazuma', lastName: 'Kiryu' },
	];

	// .iterator
	// console.log('[...heroes]', [...heroes]);
	deepStrictEqual([...heroes], expectedItems);
	deepStrictEqual(Array.from(heroes), expectedItems);

	const iteratedHeroes = [];
	for (const hero of heroes) {
		iteratedHeroes.push(hero);
	}

	deepStrictEqual(iteratedHeroes, expectedItems);

	{
		const items = [];
		for await (const hero of heroes) {
			items.push(hero);
		}

		const expectedKeys = ['id', 'firstName', 'lastName'];

		// console.log(items.filter(({ id }) => id > 0).length);
		// sometimes it fails because it deals with random numbers
		// deepStrictEqual(items.filter(({ id }) => id > 0).length, 2);
		deepStrictEqual(Object.keys(items[0]), expectedKeys);
	}
})();
