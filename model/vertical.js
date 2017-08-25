var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  createdAt : {type: Date, required: true}
});

module.exports = mongoose.model('Vertical', schema);
