const fs = require('node:fs');

function getFileParams(filename){
  const fileParamsPath = `./file-params/${filename}.json`;
  const isParamsExist = fs.existsSync(fileParamsPath);
  if(!isParamsExist) return null;

  try{
    const paramsBuffer = fs.readFileSync(fileParamsPath);
    const params = JSON.parse(paramsBuffer.toString());
    return params;
  } catch(error){
    console.log(`Error trying to read params for the file ${filename}`);
    return null;
  }
}

exports.getFileParams = getFileParams;