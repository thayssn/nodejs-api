const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');
const upload = require('../upload');

const unlinkFile = (file) =>  new Promise(async (resolve) => {
	try{
		await resolve(fs.unlink(file, () => {
			console.log(`deleted -> ${file}`);
		}));
	}catch(err){
		console.log('Unlink error => ', err);
		return res.status(400).send({error: 'There was an error'});
	}
});

router.post('/register', upload.single('photo'), async( req, res) => {
	const {name, email, password} = req.body;
	
	if (await User.findOne({email})){
		await unlinkFile(req.file.path);
		return res.status(400).send({error: 'User Already Registered'});
	}

	try {
		console.log(req.file)
		const photo = req.file.filename;
		const user = await User.create({name, email, password, photo});
		
		user.password = undefined;

		return res.status(200).send(user);
	}catch(err){
		console.log('Registration error => ', err);
		return res.status(400).send({error : 'Registration failed'})
	}
});


module.exports = app => app.use('/auth', router)