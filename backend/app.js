const express = require('express');
require('dotenv').config({ path : './config/.env'});

const app = express();

//nous donne accès au corps de la requete
app.use(express.json());

const mongoose = require('mongoose');

// gestionnaire de routage
const path = require ('path');

const usersRoute = require('./routes/routeUsers');
const sauceRoute =  require('./routes/routeSauces');


//connection base de données
mongoose
.connect('mongodb+srv://'+ process.env.DB_USER_PASS + '!@cluster0.kknpc.mongodb.net/sauceUsers?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});


app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth',usersRoute);
app.use ('/api/sauces', sauceRoute);

module.exports = app;
