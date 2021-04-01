let ConnexionController = require('./../controllers/ConnexionController');
let HomeController = require('./../controllers/HomeController');
let VipsController =  require('./../controllers/VipsController');
let PhotosController =  require('./../controllers/PhotosController');



// Routes
    module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/Home', HomeController.Index);

//Connexion
    app.post('/connexion', ConnexionController.Connexion);
    app.get('/deconnexion', ConnexionController.Deconnexion);

//Vips
    app.get('/Vips', ConnexionController.verifConnexion, VipsController.vips);
    app.get('/Vips/ajouter', ConnexionController.verifConnexion, VipsController.Ajouter);
    app.post('/Vips/ajouterVip', ConnexionController.verifConnexion, VipsController.AjouterVip);
    app.get('/Vips/modifier', ConnexionController.verifConnexion, VipsController.Modifier);
    app.post('/Vips/modifierVip', ConnexionController.verifConnexion, VipsController.ModifierVip);
    app.get('/Vips/supprimer', ConnexionController.verifConnexion, VipsController.Supprimer);
    app.post('/Vips/supprimerVip',  ConnexionController.verifConnexion, VipsController.SupprimerVip);

//Photos
    app.get('/Photos', ConnexionController.verifConnexion, PhotosController.photos);
    app.get('/Photos/ajouter', ConnexionController.verifConnexion, PhotosController.Ajouter);
    app.post('/Photos/ajouterPhoto', ConnexionController.verifConnexion, PhotosController.AjouterPhoto);
    app.get('/Photos/supprimer', ConnexionController.verifConnexion, PhotosController.Supprimer);
    app.post('/Photos/supprimerPhoto', ConnexionController.verifConnexion, PhotosController.SelectionnerPhoto);
    app.post('/Photos/supprimerPhoto/:vipNum', ConnexionController.verifConnexion, PhotosController.SupprimerPhoto);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
