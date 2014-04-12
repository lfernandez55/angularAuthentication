
exports.get = function(request, response, connection) {
      var url = require('url');
      var fs = require('fs');
      path = require("path");
      var uri = url.parse(request.url).pathname;
      var filename = path.join(process.cwd(), uri);
      
      request.requrl = url.parse(request.url, true);
      var pathvar = request.requrl.pathname;
      if (pathvar === '/' || pathvar === '/home') {
            fs.readFile('index.html', function(err, contents) {
              response.write(contents);
              response.end();
              return;
            });
      } else if ( pathvar === '/crud') {
         require('./controllers/crud').get(request, response, connection);
      } else if (pathvar === '/users') {
         require('./controllers/users').get(request, response, connection);
      }
      else 
      {

          path.exists(filename, function(exists) {
              if(!exists) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Error: Path/File Not Found: ' + path + " pathvar: " + pathvar);
                return;
              } else {

                fs.readFile(filename, "binary", function(err, file) {
                    if(err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.end(err + "n");
                        return;
                    }

                    response.writeHead(200);
                    response.end(file, "binary");
                });
              }

      
          });

      } 






}



