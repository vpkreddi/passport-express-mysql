var jwt = require('jsonwebtoken');
var authentication = {};

authentication.auth = function(req,res,next){
    var user = {};
    user = req.user;
    const token = jwt.sign(user, '$ecret123');
    res.json({user, token});
}

module.exports = authentication;