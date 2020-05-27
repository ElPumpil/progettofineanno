var express = require('express');
var router = express.Router();

const sql = require('mssql');

const config = {
  user: 'pumapillo.giacomo',
  password: 'xxx123#',
  server: "213.140.22.237",
};

let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request();
    request.query(query, function (err, result) {
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
             sql.close();
        return;
      }
      res.send(result.recordset);
      sql.close();
    });

  });
}

router.get('/api/pokemon', function (req, res, next) {
  let sqlQuery = "select * from dbo.[pokemon]";
  executeQuery(res, sqlQuery, next);
});

router.post('/api/catchpkmn', function (req, res, next) {
  let pkmn = req.body;
  
  if (!pkmn) {
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return;
  }
  let sqlInsert = `INSERT INTO dbo.[pokemon] (Nome, Tipo, Lvl) VALUES ('${pkmn.Nome}','${pkmn.Tipo}',${pkmn.Lvl})`;
  executeQuery(res, sqlInsert, next);
  res.send({success:true, message: "pokemnon inserita con successo", pkmn: pkmn})
});
        

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
