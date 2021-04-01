//////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Administration du site SIXVOIX (IUT du Limousin).";
    response.render('connexion', response);
};

module.exports.NotFound = function(request, response){
    response.title = "Administration du site SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
