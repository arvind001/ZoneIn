const config = require('../config.json'),
 pkgcloud = require('pkgcloud'),
 logger = require('tracer').colorConsole(),
 fs = require('fs');


module.exports = {
  upload(filePath,cb){
    var client = require('pkgcloud').storage.createClient({
       provider: 'amazon',
       keyId: config.AWS_ACCESS_KEY, // access key id
       key: config.AWS_SECRET_KEY, // secret key
       region: 'us-west-2' // region
    });
    var readStream = fs.createReadStream(filePath);
    var newFileName = filePath.split('/').pop()
    var writeStream = client.upload({
      container: 'zonein69',
      remote: newFileName
    });

    writeStream.on('error', function(err) {
      // handle your error case
      logger.error(err)
      if(cb) return cb(err)
    });

    writeStream.on('success', function(file) {
        logger.info(file)
        if(cb)  return cb(null,file.location)
    });

    readStream.pipe(writeStream);
  }
}
//csvUpload

function csvUpload(){
  readFile('assets.csv')
   {
     //filePath, fileType,Vertical name,fileName
     //c:\donloads\arm.jpg',video,mental,arm.jpg
   //read csv
     csvData.forEach(function(rowOfCSVFile){
       //for each record
       //upload asset to s3
       //get s3 urlencoded
       //save the record of that file with s3 url in mongo

       s3.upload(rowOfCSVFile.filePath,row.fileName,function(err,s3Url){
         Vertical.fineOne({name:row.name},function(err,vertical){
           //vertical._id
           var asset = new Asset()
           asset.path = s3Url
           Assets.save()
         })
       })
     })
   }
}
