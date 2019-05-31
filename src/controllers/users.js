const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async( req, res) => {
	try{
		const users = await User.find();
		return res.render('listUsers.html', {users});
	}catch(err){
		return res.status(400).send({error : `Coudn't get users`})
	}
})

module.exports = app => app.use(router);