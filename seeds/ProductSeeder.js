var mongoose = require('mongoose');
require('../model/product');
var Product = mongoose.model('Product');


mongoose.connect('mongodb://localhost/zonein');


var products = [
  new Product({
  imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
  name: "ZoneIn1",
  price: 50,
  description: "A vertical where student athletes get trained"
}),

new Product({
imagePath: "arm.jpg",
name: "ZoneIn2",
price: 100,
description: "A vertical where coaches get trained"
}),

new Product({
imagePath: "arm.jpg",
name: "ZoneIn3",
price: 150,
description: "A vertical where student athletes and coaches get trained"
})

];

var done = 0;

for(var i = 0; i < products.length; i++){
  products[i].save(function(err, result){
    done++;
    if(done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
