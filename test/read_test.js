const assert = require('assert')
const User = require('../src/user')

describe('Reading users', () => {

	let jurd;

	beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		jurd.save()
			.then(() => done())
	})

	it('find jurd', (done) => {
		User.find({ name: 'jurd' })
		.then((users) => {
			assert(users[0]._id.toString() === jurd._id.toString())
			done();
		})
	})

	it('find user by id', (done) => {
		User.findOne({ _id: jurd._id })
		.then((user) => {
			assert(user.name === 'jurd')
			done()
		})
	})
})