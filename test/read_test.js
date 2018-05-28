const assert = require('assert')
const User = require('../src/user')

describe('Reading users', () => {

	let jurd, jerd, jurdly, jurdle;

	beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		jerd = new User({ name: 'jerd' })
		jurdly = new User({ name: 'jurdly' })
		jurdle = new User({ name: 'jurdle' })
		Promise.all([jurd.save(), jerd.save(), jurdly.save(), jurdle.save()])
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

	it('skip and limit', (done) => {
		User.find({})
		.sort({ name:1 })
		.skip(1)
		.limit(2)
		.then((users) => {
			assert(users.length === 2)
			assert(users[0].name === 'jurd')
			assert(users[1].name === 'jurdle')
		})
		done()
	})
})