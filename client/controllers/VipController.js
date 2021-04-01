
let model = require("../models/vip.js");
let async = require('async');

/////////////////////////// R E P E R T O I R E    D E S     S T A R S

//Liste des premières lettres
module.exports.Repertoire = 	function(request, response){
    response.title = 'Répertoire des stars';
    model.premiereLettreFonction(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.premiereLettreTableau = result;

        response.render('repertoireVips', response);
    });
}

//Affichage de tous les VIP commençants par :lettre
module.exports.RepertoireLettre = function(request, response){
    response.title = 'Répertoire des stars';
    let data = request.params.lettre;
    async.parallel([
            function(callback){
                model.premiereLettreFonction(function(err, result1)
                    {callback(null, result1)}
                );
            },
            function(callback){
                model.VIPsCommencantParLettreFonction(data,(function(err, result2)
                    {callback(null, result2)}
                ));
            }
        ],
        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.premiereLettreTableau = result[0];
            response.noms = result[1];
            response.render('repertoireVips', response);
        }
    );
}

module.exports.ProfilStar = function (request,response){
    response.title = "Profil de star";
    let data = request.params.vip_num;
    async.parallel([
            function(callback){
                model.premiereLettreFonction(function(err, result)  // appel le module test qui exécute la requete SQL
                    {callback(null, result)}
                );
            },function(callback){
                model.infoPersoVIP(data,(function (err,result1)
                    {callback(null,result1)}
                ));
            },
            function (callback){
                model.estFemme(data,(function (err,result)
                    {callback(null,result)}
                ));
            },
            function(callback){
                model.infosActeur(data,(function(err,result)
                    {callback(null,result)}
                ));
            },
            function(callback){
                model.infosMannequin(data,(function(err,result){
                    callback(null,result)
                }));
            },
            function(callback){
                model.infosChanteur(data,(function(err,result)
                    {callback(null,result)}
                ));
            },

            function(callback){
                model.mariagesVIP(data,(function (err,result2)
                    {callback(null,result2)}
                ));
            },
            function(callback){
                model.liaisonsVIP(data,(function (err,result3)
                    {callback(null,result3)}
                ));
            },
            function(callback) {
                model.photosVIP(data, (function (err, result4) {
                        callback(null, result4)
                    }
                ));
            },
            function(callback) {
                model.infosCouturier(data, (function (err, result4) {
                        callback(null, result4)
                    }
                ));
            },
            function(callback) {
                model.infosRealisateur(data, (function (err, result4) {
                        callback(null, result4)
                    }
                ));
            }
        ],
        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.premiereLettreTableau = result[0];

            response.estFemme = result[2];
            response.infosActeur = result[3];
            response.infosMannequin = result[4];
            response.infosChanteur = result[5];

            response.infosPersos = result[1];
            response.mariages = result[6];
            response.liaisons = result[7];
            response.photos = result[8];
            response.infosCouturier = result[9];
            response.infosRealisateur = result[10];

            response.render('repertoireVips', response);
        }
    );
}
