const assert = require('assert')
const User = require('../src/user')

describe('posts subdocs', () => {

	it('creates subdocs', (done) => {
		jurd = new User({ 
			name: 'jurd',
			posts: [{ title: 'Return service requested' }]
		})

		jurd.save()
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user.posts[0].title === 'Return service requested')
			done()
		})
	})

	it('adds subdocs', (done) => {
		jurd = new User ({
			name: 'jurd',
			posts: [{ title: 'jurdle' }]
		})
		jurd.save()
		.then(() => User.findOneAndUpdate({ name: 'jurd' }, [{ title: 'Jurdlys jurdles' }]))
		.then((user) => {
			assert(user.posts.length > 1)
			done()
		})
	});
})