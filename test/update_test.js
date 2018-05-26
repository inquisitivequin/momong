const assert = require('assert')
const User = require('../src/user')

describe('Update user', () => {
	let jurd;

		beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		jurd.save()
		.then(() => done())
	})

	it('Updates user', (done) => {
		jurd.update({ name: 'jerd' })
		.then(() => User.findOne({ name: 'jerd' }))
		.then((user) => {
			assert(user.name === 'jerd')
			done()
		})
	})

	it('Set and save', (done) => {
		jurd.set({ name: 'potato' }).save()
		.then(() => User.findOne({ name: 'potato' }))
		.then((user) => {
			assert(user.name === 'potato')
			done()
		})
	})

	it('Model update', (done) => {
		User.update({ name: 'jurd' }, { name: 'jerlo' })
		.then(() => User.findOne({ name: 'jerlo' }))
		.then((user) => {
			assert(user.name === 'jerlo')
			done()
		})
	})

	it('Model findOne and Update', (done) => {
		User.findOneAndUpdate({ name: 'jurd' }, { name: 'juro' })
		.then(() => User.findOne({ name: 'juro' }))
		.then((user) => {
			assert(user.name === 'juro')
			done()
		})
	})

	it('Model findByIdAndUpdate', (done) => {
		User.findByIdAndUpdate(jurd._id, { name: 'jerdly' })
		.then(() => User.findOne({ name: 'jerdly' }))
		.then((user) => {
			assert(user.name === 'jerdly')
			done()
		})
	})

})