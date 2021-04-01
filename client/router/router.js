let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let ArticleController = require('./../controllers/ArticleController');
let AlbumController = require('./../controllers/AlbumController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoireSuite/:lettre', VipController.RepertoireLettre);
    app.get('/profil/:vip_num',VipController.ProfilStar);

// articles
    app.get('/articles', ArticleController.Articles);
    app.get('/articles/:vip_num', ArticleController.ArticlesDuVip);

 // albums
    app.get('/album', AlbumController.Album);
    app.get('/album/:vip_num', AlbumController.Album);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
