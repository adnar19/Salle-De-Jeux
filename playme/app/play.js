const mysql = require('mysql');
const config = require('../../config.json');
console.log(config.mysql);

var connection = mysql.createConnection({
  host     : config.mysql.host,
  user     : config.mysql.user,
  password : config.mysql.password,
  database : config.mysql.database
});

const cartes = config.cartes;

function maj(str) {
  let res = str.replace(/\&/g, "1").replace(/é/g, "2").replace(/"/g, "3").replace(/'/g, "4").replace(/\(/g, "5").replace(/\-/g, "6").replace(/è/g, "7").replace(/\_/g, "8").replace(/ç/g, "9").replace(/à/g, "0");
return res;
}


function maximize (){
  require('electron').remote.getCurrentWindow().maximize()
}
function minimize (){
  require('electron').remote.getCurrentWindow().minimize()
}
function closewin (){
  require('electron').remote.getCurrentWindow().close()
}

var audio = {
  player : null ,
  success : function(){
    audio.player = new Audio('assets/audio/success1.ogg');
    audio.player.play();
  } ,
  error : function(){
    audio.player = new Audio('assets/audio/error.ogg');
    audio.player.play();
  }
}

var errors = {
    'ECONNREFUSED':'mysql stopped' ,
    'ER_BAD_DB_ERROR':'DB not exist' ,
    'ER_NO_SUCH_TABLE':'Table not exist' ,
}
connection.connect();
function testConnexion(resultat,erreur) {
  connection.query('SELECT 1 + 1 AS solution', function (error, r, fields) {
    if (error) {console.log(error);if (erreur)erreur(error);/*throw error;*/}
if (resultat) resultat(r);
  });
  // connection.end();
}


function get(query,callback) {
// connection.connect();
connection.query(query, function (error, results, fields) {
  if (error) {console.log(error.code);return;}

callback(results);
});
// connection.end();
}
function insert(ins,data,callback) {
 connection.query(ins,data, function (error, results, fields) {
  if (error) throw error;
callback(results);
});
 }
