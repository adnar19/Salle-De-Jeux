const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'play'
});
connection.connect();
function testConnexion(resultat,erreur) {

  connection.query('SELECT 1 + 1 AS solution', function (error, r, fields) {
    if (error) {erreur(error);throw error;}
resultat(r);
  });
  // connection.end();
}


function get(query,callback) {
// connection.connect();
connection.query(query, function (error, results, fields) {
  if (error) throw error;
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
