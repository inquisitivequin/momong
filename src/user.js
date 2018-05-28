const mongoose = require('mongoose')
const PostSchema = require('./post')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'You\'re name is too short fool! Make it greater than two'
		},
		required: [true, 'You need a name fool!']
	},
	posts: [PostSchema],
	poops: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
})

UserSchema.virtual('postCount').get(function() {
	return this.posts.length
})

const User = mongoose.model('user', UserSchema)

module.exports = User;