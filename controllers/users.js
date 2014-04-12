exports.get = function(req, res, connection) {

  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if(typeof query.lastname != 'undefined'){
  	var sqlString = "SELECT * FROM users where lastname='" + query.lastname + "'" ;
  }else{
  	var sqlString = "SELECT * FROM users"  ;
  }
  connection.query(sqlString, function(err, rows){
          // There was a error or not?
          if(err != null) {
              res.end( JSON.stringify("Query error:" + err)  );
          } else {
              res.end(JSON.stringify(rows));
          }
          // Close connection
          connection.end();
  });





}