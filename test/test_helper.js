const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test')
mongoose.connection
	.once('open', () => console.log('Good'))
	.on ('error', (error) => {
		console.warn('Look out fool', error)
	})