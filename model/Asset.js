var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  url: {type: String, required: false},
  localPath: {type: String, required: true},
  verticalId: {type: String, required: false},
  verticalName: {type: String, required: true},
  createdAt : {type: Date, required: false},
  mimeType: {type: String, required: false},
});

module.exports = mongoose.model('Asset', schema);
//setup an aws account
//set up an s3 resource
//set up node.js code to upload s3
//its not gonna work
//CSP on S3 need to be set
//
