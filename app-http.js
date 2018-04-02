const http = require("http");
const fs = require("fs");

http.createServer(function(request, response){
    if(request.url.startsWith("/public/")){
        let filePath = request.url.substr(1);
        
        fs.readFile(filePath, function(error, data){
            if(error){
              let errorPage = fs.readFileSync("public/error.html");
                response.end(errorPage);
            }
            else{
                response.end(data);
            }
            return;
        })
    }
    else{
        response.end("app-http.js is ok");
    }
}).listen(3000, () => console.log('Server is working'));
