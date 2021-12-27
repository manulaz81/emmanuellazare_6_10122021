const mongoose = require('mongoose');

const sauce = mongoose.Schema({
	userId: { type: String, required: true },//l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
	name: { type: String, required: true }, //nom de la sauce
    manufacturer : { type: String, required : true}, //fabricant de la sauce
    description : { type: String, required : true}, //description de la sauce
    mainPepper : { type: String, required : true}, //le principal ingrédient épicé de la sauce
    imageUrl : {  type: String, required : true}, //l'URL de l'image de la sauce téléchargée par l'utilisateur
    heat : { type: Number, required : true},//nombre entre 1 et 10 décrivant la sauce
    likes : { type: Number, default:0},
    dislikes : { type: Number, default :0}, // d'utilisateurs qui n'aiment pas (= dislike) la sauce
    usersLiked :[String], //[ "String <userId>" ] — tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
    usersDisliked :[String],// [ "String <userId>" ] — tableau des identifiants des  utilisateurs qui n'ont pas aimé (= disliked)
});


module.exports = mongoose.model('Saulce', sauce);
