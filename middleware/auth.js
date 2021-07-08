const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {

  //Get token from Header
  const token = req.header('x-auth-token');

  //check if not token
  if(!token) {
    return res.status(401).json({msg: 'No token, autorization denied'})
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user;
    next();

  } catch (err) {
    console.error(err.message);
    res.status(401).json({msg: 'Token is not valid'});
  }

}