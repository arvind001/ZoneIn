
var Asset = require('../model/Asset');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
let verticalId = req.params.verticalId
  let onFound = function(err,assets){
    if(req.query.json) {

      return res.status(200).json(assets)
    }

    return res.render('assets', {assets});
  }

  Asset.find({verticalId},onFound)


});

module.exports = router;
