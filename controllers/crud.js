exports.get = function(req, res, connection) {

  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log('debugga ' + query.requestType);
  console.log('debuggb ' + query.firstname);
  console.log('debuggc ' + query.lastname);
  console.log('debuggd' + query.institution);




  if (query.requestType == 'createTable'){

	  var sqlString = "CREATE TABLE users (id INTEGER AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(40), lastname VARCHAR(40), institution VARCHAR(40));";
	  connection.query(sqlString, function(err, rows){
	          // There was a error or not?
	          if(err != null) {
	              res.end( JSON.stringify("Query error:" + err)  );
	          } else {
	              res.end( JSON.stringify("Users Table Created" ) );
	              //res.end("Success!");
	          }
	          // Close connection
	          connection.end();
	  });

  }
  else if (query.requestType == 'dropTable'){

	  var sqlString = "DROP TABLE users";
	  connection.query(sqlString, function(err, rows){
	          // There was a error or not?
	          if(err != null) {
	              res.end( JSON.stringify("Query error:" + err)  );
	          } else {
	              res.end( JSON.stringify("The Users Table Was Dropped" ) );
	              //res.end("Success!");
	          }
	          // Close connection
	          connection.end();
	  });

  }

  else if (query.requestType == 'createUser'){

	  var sqlString = "INSERT INTO users (firstname,lastname,institution) VALUES ('" + query.firstname  + "','" + query.lastname  + "','" + query.institution  + "');";
	  connection.query(sqlString, function(err, rows){
	          // There was a error or not?
	          if(err != null) {
	              res.end( JSON.stringify("Query error:" + err)  );
	          } else {
	              res.end( JSON.stringify("User Created" ) );
	          }
	          // Close connection
	          connection.end();
	  });

  }
  else if (query.requestType == 'showUsers'){

	  var sqlString = "SELECT * FROM users";
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
  else if (query.requestType == 'delete'){

	  var sqlString = "DELETE FROM users WHERE id=" + query.id;
	  connection.query(sqlString, function(err, rows){
	          // There was a error or not?
	          if(err != null) {
	              res.end( JSON.stringify("Query error:" + err)  );
	          } else {
	              res.end(JSON.stringify('User deleted'));
	          }
	          // Close connection
	          connection.end();
	  });

  }

  else if (query.requestType == 'updateUser'){

	  var sqlString = "UPDATE users SET firstname='" + query.firstname + "',lastname='" + query.lastname + "',institution='" + query.institution + "' WHERE id=" + query.id;
	  connection.query(sqlString, function(err, rows){
	          // There was a error or not?
	          if(err != null) {
	              res.end( JSON.stringify("Query error:" + err + sqlString)  );
	          } else {
	              res.end(JSON.stringify('User updated'));
	          }
	          // Close connection
	          connection.end();
	  });

  }


  else{

  	res.end( JSON.stringify('Wrong Password -- no SQL executed')  );

  }



}

