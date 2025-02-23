const http = require('node:http');
const fs = require('node:fs');
const utils = require("./utils");
const port = 3002;

const server = http.createServer(function (req, res) {
  try{
    console.log(`Request: ${req.url}`);
    const smartUrl = new URL(`http://localhost${req.url}`);
    const filename = smartUrl.pathname.replace("/", "");
    const filepath = `./files/${filename}`;
    const isFileExist = fs.existsSync(filepath);
    if(isFileExist){
      const fileBuffer = fs.readFileSync(filepath);
      
      const fileParams = utils.getFileParams(filename);
      if(fileParams){
        if(fileParams.headers){
          for(const headerName in fileParams.headers){
            res.appendHeader(headerName, fileParams.headers[headerName]);
          }
        }
      }

      res.write(fileBuffer);
    } else{
      res.statusCode = 404;
      res.write("Not Found")
    }
  } catch (error){
    console.log("Error while handling the request");
    console.log(error);
    res.write("Error");
    res.statusCode = 500;
  }
  res.end();
})

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error);
    }
    else {
        console.log('Server is listening on port' + port);
    }
})