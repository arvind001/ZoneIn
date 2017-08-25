var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var URLSlugs = require('mongoose-url-slugs');
var bcrypt = require('bcrypt-nodejs');


var User = new Schema({
  //prefGroups: [{type: Schema.Types.ObjectId, ref: 'Preferences'}]
  //prefGroups: [Preferences],
  //output: [topOutput]
  name: String
});

var Course = new Schema({
  courseName: String,
  courseId: Number,
  courseLink: String
});
/*
var Reflections = new Schema({
  String:
})
*/
var Courses = new Schema({
  courses: [Course]
})

User.plugin(passportLocalMongoose, {});
User.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
/*
User.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};
*/

module.exports = {
  User: mongoose.model('User', User),
  //Preferences: mongoose.model('Preferences', Preferences),
  //Stocks: mongoose.model('Stocks', Stocks),
  //topOutput: mongoose.model('topOutput', topOutput)
  Course: mongoose.model('Course', Course),
  Courses: mongoose.model('Courses', Courses)
};


// is the environment variable, NODE_ENV, set to PRODUCTION?
 if (process.env.NODE_ENV == 'PRODUCTION') {
  // if we're in PRODUCTION mode, then read the configration from a file
   // use blocking file io to do this...
    var fs = require('fs');
     var path = require('path');
      var fn = path.join(__dirname, 'config.json');
       var data = fs.readFileSync(fn);

        // our configuration file will be in json, so parse it and set the
         // conenction string appropriately!
          var conf = JSON.parse(data);
           var dbconf = conf.dbconf;
           } else {
            // if we're not in PRODUCTION mode, then use
             dbconf = 'mongodb://localhost/zonein';
             }

mongoose.connect(dbconf);

//mongoose.connect('mongodb://localhost/zonein')
