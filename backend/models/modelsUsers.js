const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const utilisateur = mongoose.Schema(
	{
		email: { type: String, unique: true, lowercase: true, trim: true, required: true },
		password: { type: String, required: true, max: 1024, minLenght: 6 },
	},
	{ timestamps: true },
);

utilisateur.plugin(uniqueValidator);


module.exports = mongoose.model('essaiusers', utilisateur);
