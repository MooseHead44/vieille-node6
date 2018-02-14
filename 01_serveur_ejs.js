const express = require('express');
const fs = require("fs");
const app = express();
const MongoClient = require('mongodb').MongoClient; // le pilote MongoDB
const ObjectID = require('mongodb').ObjectID;
 var util = require("util");
app.use(express.static('public'));


/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template


app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.render('formulaire.ejs');

})

app.get('/membres', (req, res) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
		 if (err) return console.log(err)
		 console.log('util = ' + util.inspect(resultat));
		 // transfert du contenu vers la vue gabarit.ejs (renders)
		 // affiche le contenu de la BD
		 res.render('membres.ejs', {membres: resultat})
	})
})


app.get('/', (req, res) => {
	console.log('accueil')
   	res.render('accueil.ejs');
})





app.get('/ajouter', function (req, res) {

 console.log('la route /ajouter')

	db.collection('adresse').save(req.query, (err, result) => {
		if (err) return console.log(err)
		console.log('sauvegarder dans la BD')
		res.redirect('/membres')

	})
})


app.get('/supprimer/:id', (req, res) => {
 console.log(req.params.id)
 //console.log(res)
 var id = req.params.id
console.log('***************************');
 console.log(id)
 db.collection('adresse').findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('/membres')  // redirige vers la route qui affiche la collection
 })
})






 let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })

})