let db = require('../configDb');


module.exports.vips = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NUMERO, VIP_PRENOM, VIP_NOM FROM vip ORDER BY VIP_NOM;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.premiereLettreFonction = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM, 1, 1) AS premiereLettreColonne FROM vip ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.VIPsCommencantParLettreFonction = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT vip.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM vip JOIN PHOTO ON vip.VIP_NUMERO = PHOTO.VIP_NUMERO " +
                "WHERE VIP_NOM like '"+lettre+"%'AND PHOTO_NUMERO=1 ORDER BY 1 ASC ;";
            connexion.query(sql,  callback);
            connexion.release();
        }
    });
};

module.exports.infoPersoVIP = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_NAISSANCE, NATIONALITE_NOM, PHOTO_ADRESSE, VIP_TEXTE "
            +"FROM vip v JOIN nationalite n ON v.NATIONALITE_NUMERO=n.NATIONALITE_NUMERO "
            +"JOIN PHOTO p ON v.VIP_NUMERO = p.VIP_NUMERO "
            +"WHERE v.VIP_NUMERO="+vip_num+" AND PHOTO_NUMERO=1;";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.infosActeur = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "select film_titre, film_daterealisation, v2.vip_nom as nom_real, v2.vip_prenom as prenom_real, v2.vip_numero as num_real, PHOTO_ADRESSE, v2.vip_texte as TEXTE " +
                "from vip v join acteur a on v.VIP_NUMERO=a.VIP_NUMERO " +
                "join joue j on j.VIP_NUMERO=a.VIP_NUMERO " +
                "join film f on f.film_NUMERO=j.FILM_NUMERO " +
                "join realisateur r on r.VIP_NUMERO=f.VIP_NUMERO " +
                "join vip v2 on v2.VIP_NUMERO=r.VIP_NUMERO " +
                "join photo p on v2.vip_numero=p.vip_numero " +
                "where v.VIP_NUMERO="+vip_num+" and photo_numero = 1;";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
}

module.exports.infosMannequin = function(vip_num,callback){
    db.getConnection(function(err,connexion){
        if (!err){
            let sql ="select defile_lieu, defile_date, v2.VIP_NOM as nom_cout, v2.VIP_PRENOM as pre_cout, v2.vip_numero as num_cout, PHOTO_ADRESSE, v2.VIP_TEXTE as VIP_TEXTE " +
                "from vip v join mannequin m on v.VIP_NUMERO=m.VIP_NUMERO " +
                "join defiledans dd on dd.VIP_NUMERO=m.VIP_NUMERO " +
                "join defile d on d.DEFILE_NUMERO=dd.DEFILE_NUMERO " +
                "join couturier c on c.VIP_NUMERO=d.VIP_NUMERO " +
                "join vip v2 on v2.VIP_NUMERO=c.VIP_NUMERO " +
                "join photo p on v2.vip_numero=p.vip_numero " +
                "where v.VIP_NUMERO="+vip_num+" and photo_numero = 1;";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
}

module.exports.infosChanteur = function(vip_num,callback){
    db.getConnection(function(err,connexion){
        if (!err){
            let sql ="select v.vip_numero as vip_num, album_titre, album_date, maisondisque_nom " +
                "from vip v join chanteur c on v.VIP_NUMERO=c.VIP_NUMERO " +
                "join composer co on co.VIP_NUMERO=c.VIP_NUMERO " +
                "join album a on a.ALBUM_NUMERO=co.ALBUM_NUMERO " +
                "join maisondisque md on md.MAISONDISQUE_NUMERO=a.MAISONDISQUE_NUMERO " +
                "where v.vip_numero="+vip_num+";";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
}

module.exports.estFemme = function(vip_num,callback){
    db.getConnection(function (err,connexion) {
        if (!err){
            let sql ="select vip_numero from vip where vip_numero = "+vip_num+" and vip_sexe='F';";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
}


module.exports.mariagesVIP = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT VIP_VIP_NUMERO, v2.VIP_NOM, v2.VIP_PRENOM, DATE_EVENEMENT, MARIAGE_FIN, MARIAGE_LIEU, PHOTO_ADRESSE, v2.vip_texte as TEXTE " +
            "FROM vip v JOIN mariage m ON v.VIP_NUMERO=m.VIP_VIP_NUMERO " +
            "join vip v2 on v2.vip_numero=m.vip_vip_numero "+
            "join photo p on v2.vip_numero=p.vip_numero " +
            "WHERE m.VIP_NUMERO="+vip_num+" and photo_numero = 1;";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.liaisonsVIP = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT VIP_VIP_NUMERO, VIP_NOM, VIP_PRENOM, DATE_EVENEMENT, LIAISON_MOTIFFIN, PHOTO_ADRESSE, VIP_TEXTE "
            +"FROM vip v JOIN liaison l ON v.VIP_NUMERO=l.VIP_VIP_NUMERO " +
            "join photo p on l.vip_vip_numero=p.vip_numero "
            +"WHERE l.VIP_NUMERO="+vip_num+" and photo_numero = 1;";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.photosVIP = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT PHOTO_ADRESSE, PHOTO_COMMENTAIRE "
            +"FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO "
            +"WHERE p.VIP_NUMERO="+vip_num+" AND PHOTO_NUMERO <> 1 " +
                "order by PHOTO_ADRESSE;";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.infosCouturier = function(vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT DEFILE_LIEU, DEFILE_DATE " +
                "FROM DEFILE " +
                "WHERE VIP_NUMERO = "+vip_num+";";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.infosRealisateur = function(vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT FILM_TITRE, FILM_DATEREALISATION " +
                "FROM FILM " +
                "WHERE VIP_NUMERO = "+vip_num+";";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.photosVIP2 = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT PHOTO_ADRESSE, PHOTO_COMMENTAIRE "
            +"FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO "
            +"WHERE p.VIP_NUMERO="+vip_num+";";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.ArticlesDuVip = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT ARTICLE_TITRE, ARTICLE_RESUME, ARTICLE_DATE_INSERT "
            +"FROM article a JOIN apoursujet s ON a.ARTICLE_NUMERO=s.ARTICLE_NUMERO "
            +"WHERE s.VIP_NUMERO="+vip_num+";";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.photos1 = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE"
            + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE PHOTO_NUMERO = 1 ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.photosToutes = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_COMMENTAIRE, PHOTO_ADRESSE, VIP_NOM, VIP_PRENOM, v.VIP_NUMERO"
            + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO"
            + " WHERE v.VIP_NUMERO = " +vip_num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.photosVIP2 = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT PHOTO_ADRESSE, PHOTO_COMMENTAIRE "
                +"FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO "
                +"WHERE p.VIP_NUMERO="+vip_num+";";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.ArticlesDuVip = function (vip_num,callback){
    db.getConnection(function (err,connexion){
        if (!err){
            let sql = "SELECT ARTICLE_TITRE, ARTICLE_RESUME, ARTICLE_DATE_INSERT, s.VIP_NUMERO "
                +"FROM article a JOIN apoursujet s ON a.ARTICLE_NUMERO=s.ARTICLE_NUMERO "
                +"WHERE s.VIP_NUMERO="+vip_num+";";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.photos1 = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE"
                + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE PHOTO_NUMERO = 1 ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.photosToutes = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_COMMENTAIRE, PHOTO_ADRESSE, VIP_NOM, VIP_PRENOM, v.VIP_NUMERO"
                + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO"
                + " WHERE v.VIP_NUMERO = " +vip_num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
