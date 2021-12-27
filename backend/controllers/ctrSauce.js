const sauceModel = require('../models/modelsSauce');

// importation package file System por avoir acces aux systemes de fichiers
const fs = require('fs');

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new sauceModel({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
	sauceModel
		.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

exports.singleSauce = (req, res) => {
	sauceModel
		.findOne({ _id: req.params.id })
		.then((sauceModel) => res.status(200).json(sauceModel))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		  }
		: { ...req.body };
	sauceModel
		.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Sauce modifié' }))
		.catch(() => res.status(400).json({ error }));
};

exports.sauceDelete = (req, res, next) => {
	sauceModel.findOne({ _id: req.params.id }).then((sauce) => {
		const filename = sauce.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			sauceModel
				.deleteOne({ _id: req.params.id })
				.then(() => res.status(200).json({ message: 'Sauce supprimé' }))
				.catch((error) => res.status(400).json({ error }));
		});
	});
};

exports.sauceLike = (req, res, next) => {    
    const like = req.body.like;
    if(like === 1) { // Option like
        sauceModel.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))        
        .catch( error => res.status(400).json({ error}))

    } else if(like === -1) { // Option dislike
        sauceModel.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !' }))
        .catch( error => res.status(400).json({ error}))

    } else {    // Annuler like ou dislike
        sauceModel.findOne( {_id: req.params.id})
        .then( sauce => {
            if( sauce.usersLiked.indexOf(req.body.userId)!== -1){
				sauceModel.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
                .then( () => res.status(200).json({ message: 'Vous n\'aimez plus cette sauce !' }))
                .catch( error => res.status(400).json({ error}))
                }
            else if( sauce.usersDisliked.indexOf(req.body.userId)!== -1) {
                sauceModel.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
                .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
                .catch( error => res.status(400).json({ error}))
                }           
        })
        .catch( error => res.status(400).json({ error}))             
    }   
};

///courage 