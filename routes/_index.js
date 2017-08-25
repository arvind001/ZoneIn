var express = require('express');
var passport = require('passport')
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Courses = mongoose.model('Courses')
var Cart = require('../model/cart');
var verticals = require('../routes/verticals');
//var Cart = mongoose.model('Cart');
require('../model/product');
var Product = mongoose.model('Product');
require('../model/order');
var Order = mongoose.model('Order');
router.use(require('csurf')());
//var Product = mongoose.model('Product');

router.get('/nutrition', function(req, res, next){
  res.render('nutrition', {});
});

app.use('/verticals',verticals);


//verticals/mental
//verticals/injury
router.get('/verticals/:verticalName', function(req, res, next){
  //list of assets
  res.render('mental', {});
});

//verticals/mental/assets
//verticals/injury/assets
router.get('/verticals/:verticalName/:assetId', function(req, res, next){
    //asset details page : where the image/video shows
  res.render('mental', {});
});


router.get('/injury-prevention', function(req, res, next){
  res.render('injury-prevention', {});
});

router.get('/prepare-browse', function(req, res, next){
  res.render('prepare-browse', {});
});

router.get('/prepare-customize', function(req, res, next){
  res.render('prepare-customize', {csrfToken: req.csrfToken()});
});

router.post('/prepare-customize-result', function(req, res, next){
  res.render('prepare-customize-result', {});
})

router.get('/eat-browse', function(req, res, next){
  res.render('eat-browse', {});
});
/*
router.get('/user-recipes/:meal', function(req, res, next){
  if(req.params.meal !== 'dinner')
CustomRecipes.findOne({userId:req.user._id, meal:req.params.meal})
 res.send('the meal you are looking at is your ' + req.params.meal)
});
*/

router.post('/eat-customize-result', function(req, res, next){
  res.render('eat-customize-result', {

  });
});

router.get('/eat-customize', function(req, res, next){
  res.render('eat-customize', {csrfToken: req.csrfToken()});
});

router.get('/eat', function(req, res, next){
  res.render('eat', {});
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard', {});
});

router.get("/cart", function(req, res, next){
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs){
    res.render('cart', {
      product: docs,
      successMsg: successMsg,
      noMessages: !successMsg

    });
  })
});

router.get("/shopping-cart", function(req, res, next){
  if(!req.session.cart){
    return res.render('shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
  //res.render('shopping-cart', {});
});

router.get('/checkout', function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('checkout', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg,
    csrfToken: req.csrfToken()
  });
});

router.post('/checkout', function(req, res, next){
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")(
    "sk_test_cRYCStbOPLDb1GUULbvFXOkv"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
    }, function(err, charge) {
        if(err){
          req.flash('error', err.message);
          return res.redirect('/checkout');
        }
        var order = new Order({
          user: req.user,
          cart: cart,
          emailAddress: req.body.emailAddress,
          name: req.body.name,
          paymentId: charge.id
        });
        order.save(function(err, result){
          if(err){
            res.redirect('/checkout');
          }
          req.flash('success', 'Successfully bought product!');
          req.session.cart = null;
          res.redirect('/dashboard');
        });

  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ZoneIn' });
});

router.get('/home', function(req, res, next){
  res.render('home', {message: "Zone In"});
});



router.get('/Reflection-Log', function(req, res, next){
  res.render('reflectionlog', {});
});

//menu routes
router.get('/MyAccount', function(req, res, next){
  res.render('myaccount', {});
});

router.get('/Intro-Video', function(req, res, next){
  res.render('introvideo', {});
});

router.get('/Meet-The-Team', function(req, res, next){
  res.render('meettheteam', {});
});

router.get('/Rate-The-App', function(req, res, next){
  res.render('ratetheapp', {});
});

router.get("/Share-Your-Sessions", function(req, res, next){
  res.render('shareyoursessions', {});
});




router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product){
    if (err ){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/cart');
  });
});




// Login page
router.get('/login', function(req, res, next) {
    //res.render('login', {});
    //if (req.user === undefined) {
        // User has not logged in yet
        var response = {
          csrfToken: req.csrfToken(),
          title : "Login"
        };

        res.render('login', response);

    //}
    /*
    else {
        // User is already logged in
        res.redirect('/home');
     }
     */
});

router.post('/login', function(req,res,next) {

    passport.authenticate('local', function(err,user) {
        if(user) {
            req.logIn(user, function(err) {
              if(err) {
                loggger.error(err);
                return res.render('login', {message:'an error has occurred.'});
              }
                return res.redirect('/cart');
            });
        } else {
            return res.render('login', {message:'Your login or password is incorrect.'});
        }
    })(req, res, next);

});

// Register page
router.get('/register', function(req, res, next) {

    //if (req.user === undefined) {
        // No user is
  ///logged in yet
        var context = {};
        context.title = "Register";
        res.render('register', {csrfToken: req.csrfToken()});
    //}
    /*
    else {
        // User is already logged in, disables registration
        res.redirect('/');
    }
    */
});




router.post('/register', function(req, res) {
    logger.warn(req.body)

    var newObject = new User({username:req.body.username});
    User.register(newObject,
        req.body.password, function(err, user){
            if (err) {
                console.log(err);
                res.render('register', {message:'Your registration information is not valid'});
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/cart');
                });
            }
        });

});

// Logout page
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
