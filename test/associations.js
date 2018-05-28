const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', ()  => {
	let jurd, blogPost, comment

	beforeEach((done) => {
		jurd = new User({ name: 'jurd' })
		blogPost = new BlogPost({ title: 'Blogly', content: 'Blogilicious' })
		comment = new Comment({ content: 'Blogerly' })

		jurd.blogPosts.push(blogPost)
		blogPost.comments.push(comment)
		comment.user = jurd

		Promise.all([jurd.save(), blogPost.save(), comment.save()])
		.then(() => done())
	})

	it('saves ref user to blogs', (done) => {
		User.findOne({ name: 'jurd' })
		.populate({
			path: 'blogPosts',
			select: 'title'
		})
		.then((user) => {
			assert(user.blogPosts[0].title === 'Blogly')
			done()
		})
	})

	it('saves a graph', (done) => {
		User.findOne({ name:'jurd' })
		.populate({
			path: 'blogPosts',
			populate: {
				path: 'comments',
				model: 'comment',
				populate: {
					path: 'user',
					model: 'user'
				}
			}
		})
		.then((user) => {
			assert(user.name === 'jurd')
			assert(user.blogPosts[0].title === 'Blogly')
			assert(user.blogPosts[0].comments[0].content === 'Blogerly')
			assert(user.blogPosts[0].comments[0].user.name === 'jurd')
			done()
		})
	})
});