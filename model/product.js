var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = new Schema({
  imagePath: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true}
});

module.exports = {
  Product: mongoose.model('Product', Product)
};
