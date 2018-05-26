const assert = require('assert')
const User = require('../src/user')

describe('Delete user', () => {
	let jurd;

	beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		jurd.save()
		.then(() => done())
	})

	it('model instance remove', (done) => {
		jurd.remove()
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user === null)
			done()
		})
	})

	it('class method remove', (done) => {
		User.remove({ name: 'jurd' })
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user === null)
			done()
		})
	})

	it('class method find remove', (done) => {
		User.findOneAndRemove({ name: 'jurd'})
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user === null)
			done()
		})
	})

	it('class method find ID remove', (done) => {
		User.findByIdAndRemove(jurd._id)
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user === null)
			done()
		})
	})

})