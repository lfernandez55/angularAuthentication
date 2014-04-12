if (typeof process.env.VMC_APP_PORT === 'undefined') {
    // variable is undefined run local server code

    var http_IP = '127.0.0.1';
    var http_port = 8898;
    var http = require('http');
    var mysql = require('mysql');
    var server = http.createServer(function (req, res) {
      var connection = mysql.createConnection({
          host : '127.0.0.1',
          port : 3306,
          database: 'test',
          user : 'root',
          password : 'root'
      });

      connection.connect(function(err){
          if(err != null) {
              res.end('Error connecting to mysql:' + err+'\n');
          }else{
              console.log('Connected!' +'\n');
          }
      });



      require('./router').get(req, res, connection);

    });// end server()
    server.listen(http_port,http_IP);
    console.log('listening to http://' + http_IP + ':' + http_port);



} else{
    // variable is defined.  run appfog code

    var mysql = require('mysql');
    var http = require('http');
    http.createServer(function (req, res) {
      
      var env = JSON.parse(process.env.VCAP_SERVICES);
      var cre = env['mysql-5.1'][0]['credentials'];
      var databaseName = env['mysql-5.1'][0]['name'];
      
      var connection = mysql.createConnection({
          
          host : cre.host,
          port : cre.port,
          //database : cre.databasename, 
          //in some environments the above line  needs to be used instead of the below.  if the connection fails swap these lines.
          database : cre.name,
          user : cre.user,
          password : cre.password


      });

      connection.connect(function(err){
          if(err != null) {
              res.end('Error connecting to mysql:' + err+'\n');
          }else{
              //res.writeHead(200, {'Content-Type': 'text/html'});
              //res.write('Connected!' +'\n');
              console.log('Connected!' +'\n');
          }
      });

      require('./router').get(req, res, connection);

    }).listen(process.env.VMC_APP_PORT || 1337, null);


}


    /* Code to dump out VCAP_SERVICES only use it if you have to debug the connection
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var cre = env['mysql-5.1'][0]['credentials'];
    var databaseName = env['mysql-5.1'][0]['name'];
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(env) + 'host: ' + cre.host + ' port ' + cre.port + ' database ' + databaseName + ' user: ' + cre.user + ' password: ' + cre.password);
    
    {"mysql-5.1":[{"name":"lukeMySQLDB","label":"mysql-5.1","plan":"free","tags":["mysql","mysql-5.1","relational","mysql-5.1","mysql"],"credentials":{"name":"d4843f98421924e9791968d71175cac0b","hostname":"10.0.36.169","host":"10.0.36.169","port":3306,"user":"ue8nQMI8E11k3","username":"ue8nQMI8E11k3","password":"pRncXYBk18Oaq"}}]}host: 10.0.36.169 port 3306 database lukeMySQLDB user: ue8nQMI8E11k3 password: pRncXYBk18Oaq

    */


