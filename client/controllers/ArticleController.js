
let model = require("../models/vip.js");
let async = require('async');

///////////////////////////

module.exports.Articles = 	function(request, response){
    response.title = 'Articles';
    model.vips(function(err, result)  // appel le module test qui exécute la requete SQL
        {
            if (err) {
                console.log(err);
                return;
            }
            response.vips = result;
            response.render('articles', response);
        }
    );
}
module.exports.ArticlesDuVip = function (request,response){
    response.title = "Articles";
    let data = request.params.vip_num;
    async.parallel([
            function(callback){
                model.vips(function(err, result0)  // appel le module test qui exécute la requete SQL
                    {callback(null, result0)}
                );
            },
            function(callback){
                model.ArticlesDuVip(data,(function (err,result1)
                    {callback(null,result1)}
                ));
            }
        ],
        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.vips = result[0];
            response.articles = result[1];
            response.render('articles', response);
        }
    );
}
