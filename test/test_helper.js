const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test')
mongoose.connection
	.once('open', () => console.log('Pass Pass'))
	.on ('error', (error) => {
		console.warn('Look out fool', error)
	})

	beforeEach((done) => {
		mongoose.connection.collections.users.drop(() => {
		done();
		})
	})