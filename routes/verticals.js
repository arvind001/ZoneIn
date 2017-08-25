
var Vertical = require('../model/vertical');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let onFound = function(err,verticals){
    if(req.query.json) {

      return res.status(200).json(verticals)
    }

    return res.render('verticals', {verticals});
  }

  Vertical.find({},onFound)


});

module.exports = router;
