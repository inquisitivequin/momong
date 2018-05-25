const assert = require('assert');
const User = require('../src/user')

describe('Creating records', () => {
	it('saves a user', (done) => {
		const jurd = new User({ name: 'Jurd' })

		jurd.save()
		.then(() => {
			assert(!jurd.isNew)
			done()
		})
		.catch(() => {
			console.log(err)
		});
	})
})