const assert = require('assert')
const User = require('../src/user')

describe('Update user', () => {
	let jurd;

	function asserty(act, name, done) {
		act
		.then(() => User.findOne({ name: name }))
		.then((user) => {
			assert(user.name === name)
			done()
		})
	}

		beforeEach((done) => {
		jurd = new User({ name: 'jurd', poops: 0 })
		jurd.save()
		.then(() => done())
	})

	it('Updates user', (done) => {
		asserty(jurd.update({ name: 'jerd' }), 'jerd', done)
	})

	it('Set and save', (done) => {
		asserty(jurd.set({ name: 'potato' }).save(), 'potato', done)
	})

	it('Model update', (done) => {
		asserty(User.update({ name: 'jurd' }, { name: 'jerlo' }), 'jerlo', done)
	})

	it('Model findOne and Update', (done) => {
		asserty(User.findOneAndUpdate({ name: 'jurd' }, { name: 'juro' }), 
			'juro', done)
	})

	it('Model findByIdAndUpdate', (done) => {
		asserty(User.findByIdAndUpdate(jurd._id, { name: 'jerdly' }), 
			'jerdly', done)
	})

	it('Increment post count', (done) => {
		User.updateMany({ name: 'jurd' }, { $inc: { poops: 10 }})
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user.poops === 10)
			done()
		})
	})

})