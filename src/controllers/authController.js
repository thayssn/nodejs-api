const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');
const upload = require('../upload');

const unlinkFile = (file) =>  new Promise((resolve) => {
	resolve(fs.unlink(file, () => {
		console.log(`deleted -> ${file}`);
	}));
});

router.post('/register', async( req, res) => {

	upload(req, res, async (err) => {
		if (err) {
          return res.send({error: 'File could not be uploaded'});
       	}

		const {name, email, password} = req.body;
		
		if (await User.findOne({email})){
			try{
				await unlinkFile(req.file.path);
			}catch(err){
				console.log('Unlink error => ', err);
				return res.status(400).send({error: 'There was an error'});
			}

			return res.status(400).send({error: 'User Already Registered'});
		}

		try {
			const photo = req.file.path.replace('\\', '/');
			const user = await User.create({name, email, password, photo});
		
			user.password = undefined;

			return res.render(`userDetail.html`, {user});
		}catch(err){
			console.log('Registration error => ', err);
			return res.status(400).send({error : 'Registration failed'})
		}
	})
	
});


module.exports = app => app.use('/auth', router)