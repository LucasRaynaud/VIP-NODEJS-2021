let db = require('../configDb');

//CONNEXION

module.exports.connexion = function(callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM PARAMETRES;";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}



//VIPS

module.exports.vips = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT * FROM VIP ORDER BY VIP_NOM;";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.nationalites = function(callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM NATIONALITE;";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.newVip = function(vip, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "INSERT INTO VIP SET NATIONALITE_NUMERO = " + vip.NATIONALITE_NUMERO
          + ", VIP_NOM = \"" + vip.VIP_NOM + "\", VIP_PRENOM = \"" +  vip.VIP_PRENOM
          + "\", VIP_SEXE = \"" + vip.VIP_SEXE + "\", VIP_NAISSANCE = \"" + vip.VIP_NAISSANCE
          + "\", VIP_TEXTE = \"" + vip.VIP_TEXTE + "\", VIP_DATE_INSERTION = NOW();";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.newPhoto = function(photoVip, vipNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "INSERT INTO PHOTO SET PHOTO_NUMERO = '1', VIP_NUMERO = " + vipNum + ", PHOTO_SUJET = \""+ photoVip.PHOTO_SUJET
          + "\", PHOTO_COMMENTAIRE = \"" + photoVip.PHOTO_COMMENTAIRE + "\", PHOTO_ADRESSE = \"" + photoVip.PHOTO_ADRESSE + "\";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.majVip = function(vip, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "UPDATE VIP SET VIP_NUMERO = " + vip.VIP_NUMERO;
          if (vip.NATIONALITE_NUMERO !== null){
            sql = sql + ", NATIONALITE_NUMERO = " + vip.NATIONALITE_NUMERO;
          }
          if (vip.VIP_NOM !== null){
            sql = sql + ", VIP_NOM = \"" + vip.VIP_NOM + "\"";
          }
          if (vip.VIP_PRENOM !== null){
            sql = sql + ", VIP_PRENOM = \"" +  vip.VIP_PRENOM + "\"";
          }
          if (vip.VIP_SEXE !== null){
            sql = sql + ", VIP_SEXE = \"" + vip.VIP_SEXE + "\"";
          }
          if (vip.VIP_NAISSANCE !== null){
            sql = sql + ", VIP_NAISSANCE = \"" + vip.VIP_NAISSANCE + "\"";
          }
          if (vip.VIP_TEXTE !== null){
            sql = sql + ", VIP_TEXTE = \"" + vip.VIP_TEXTE + "\"";
          }
          sql = sql + "\" WHERE VIP_NUMERO = " + vip.VIP_NUMERO + ";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.majPhoto = function(vip, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "UPDATE PHOTO SET PHOTO_NUMERO = 1, VIP_NUMERO = " + vip.VIP_NUMERO;
          if (vip.PHOTO_SUJET !== null){
            sql = sql + ", PHOTO_SUJET = \""+ vip.PHOTO_SUJET + "\"";
          }
          if (vip.PHOTO_COMMENTAIRE !== null){
            sql = sql + ", PHOTO_COMMENTAIRE = \"" + vip.PHOTO_COMMENTAIRE + "\"";
          }
          if (vip.PHOTO_ADRESSE !== null){
            sql = sql + ", PHOTO_ADRESSE = \"" + vip.PHOTO_ADRESSE + "\"";
          }
          sql = sql + " WHERE VIP_NUMERO = " + vip.VIP_NUMERO + ";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.supprVip = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
        let sql = "DELETE FROM APOURSUJET WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM DEFILEDANS WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM APOURAGENCE WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM COMPOSER WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM LIAISON WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM MARIAGE WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM JOUE WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM DEFILE WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM MANNEQUIN WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM CHANTEUR WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM ACTEUR WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM COUTURIER WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM REALISATEUR WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM ARTICLE WHERE VIP_NUMERO NOT IN APOURSUJET;"
        + "DELETE FROM FILM WHERE VIP_NUMERO = " + vipNum + ";";
        + "DELETE FROM VIP WHERE VIP_NUMERO = " + vipNum + ";";
        connexion.query(sql, callback);
        connexion.release();
      }
  });
}



//PHOTOS

module.exports.maxNumero = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT MAX(PHOTO_NUMERO) AS photoNum FROM PHOTO WHERE VIP_NUMERO = " + vipNum +";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.photo1Vip = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT * FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO != 1;";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.newPhoto = function(photoNum, photoVip, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "INSERT INTO PHOTO SET PHOTO_NUMERO = " + photoNum + ", VIP_NUMERO = " + photoVip.VIP_NUMERO
          + ", PHOTO_SUJET = \""+ photoVip.PHOTO_SUJET + "\", PHOTO_COMMENTAIRE = \"" + photoVip.PHOTO_COMMENTAIRE
          + "\", PHOTO_ADRESSE = \"" + photoVip.PHOTO_ADRESSE + "\";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.supprPhoto = function(vipNum, photoNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO = " + photoNum + ";";
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}
