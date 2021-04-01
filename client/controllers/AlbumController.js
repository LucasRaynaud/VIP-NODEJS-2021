let model = require("../models/vip.js");
let async = require('async');

// //////////////////////  A L B U M

module.exports.Album = 	function(request, response){
   response.title = 'Album des stars';
   let data = request.params.vip_num;
   async.parallel ([
     function (callback){
       model.photos1(function(err, result0){callback(null, result0)});
     },
     function (callback){
       model.photosToutes(data,(function(err, result1){callback(null, result1)}));
     }
   ],
     function(err, result){
       if (err) {
         console.log(err);
         return;
       }
       response.photos1 = result[0];
       response.commentaire = result[1];
       response.render('album', response);
     }
   );
 }
