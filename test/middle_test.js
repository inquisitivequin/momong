const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('middleware', () => {
		let jurd, blogPost

	beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		blogPost = new BlogPost({ title: 'Blogly', content: 'Blogilicious' })

		jurd.blogPosts.push(blogPost)

		Promise.all([jurd.save(), blogPost.save()])
		.then(() => done())
	})

	it('remove posts with user.remove', (done) => {
		jurd.remove()
		.then(() => BlogPost.count())
		.then((count) => {
			assert(count === 0)
			done()
		})
	})
	
});