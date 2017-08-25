var Asset = require('../model/Asset')
var fileUtils = require('../utils/file')
module.exports = {
  init(){
    Asset.find({},function(err,assets){
      assets.forEach((item,index)=>{
        fileUtils.upload(item.localPath,function(err,s3Url){
          item.url = s3Url;
          item.save()
        })
      })
    })
  }
}
