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
		const jurd = new User ({
			name: 'jurd',
			posts: []
		})
		jurd.save()
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			user.posts.push({ title: 'Posto' })
			return user.save()
		})
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user.posts[0].title === 'Posto')
			done()
		})
  })

  it('removes a subdoc', (done) => {
  	const jurd = new User ({
  		name: 'jurd',
  		posts: [{ title: 'Postly' }]
  	})
  	jurd.save()
  	.then(() => User.findOne({ name: 'jurd' }))
  	.then((user) => {
  		const post = user.posts[0]
  		post.remove()
  		return user.save()
  	})
  	.then(() => User.findOne({ name: 'jurd' }))
  	.then((user) => {
  		assert(user.posts.length === 0)
  		done()
  	})
  })
});