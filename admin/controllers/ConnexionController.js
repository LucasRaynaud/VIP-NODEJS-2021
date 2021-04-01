let model = require("../models/vip.js");
let Cryptr = require("cryptr");
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

//////////////////////////////////////////////////////////////// C O N N E X I O N

module.exports.verifConnexion = function(request, response, next){
  response.title = "Connexion";
  if (request.session.login == null) {
    response.render('connexion', response);
  } else {
    return next();
  }
};

module.exports.Connexion = function(request, response){
  response.title = "Connexion";
  model.connexion(function(err, result){
    if (err) {
        console.log(err);
        return;
    }
   let id = request.body.login;
   let mdp = request.body.pwd;

   let login = result[0]['LOGIN'];
   let encryptedString = result[0]['PASSWD'];

   let decryptedString = cryptr.decrypt(encryptedString);

   if (id === login) {
     if (mdp === decryptedString) {
       request.session.login = login;
       response.render('home', response);
     }
     else {
       response.render('connexion', response);
     }
   }
   else {
     response.render('connexion', response);
   }
 });
};

module.exports.Deconnexion = function(request, response){
  response.title = "Deconnexion";
  request.session.login = null;
  response.render('connexion', response);
};
