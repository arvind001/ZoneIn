var homepage = require('../routes/homepage.js')
var verticals = require('../routes/verticals.js')
var assets = require('../routes/assets.js')
module.exports = function(app){
  app.use('/',homepage)
  app.use('/verticals',verticals)
  app.use('/assets/:verticalId',assets)
}
