const assert = require('assert')
const User = require('../src/user')

describe('Virtual types', ()  => {
	it('returns number of posts', (done) => {
		const jurd = new User({
			name: 'jurd',
			posts: [{ title: 'Postler' }]
		})
		jurd.save()
		.then(() => User.findOne({ name: 'jurd' }))
		.then((user) => {
			assert(user.postCount === 1)
			done()
		})
	})
});