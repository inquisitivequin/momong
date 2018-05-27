const assert = require('assert')
const User = require('../src/user')

describe('Validation', () => {

	it('require name', () => {
		const user = new User({ name: undefined })
		const validationRes = user.validateSync()
		const { message } = validationRes.errors.name

		assert( message === 'You need a name fool!')
	})

	it('Name must be longer than two', () => {
		const user = new User({ name: 'aa'})
		const validationRes = user.validateSync()
		const { message } = validationRes.errors.name

		assert( message === 'You\'re name is too short fool! Make it greater than two')
	})

	it('no invalid records', (done) => {
		const user = new User({ name: 'aa' })
		user.save()
		.catch((err) => {
			const{ message } = err.errors.name

			assert(message === 'You\'re name is too short fool! Make it greater than two')
			done()
		})
	})
})