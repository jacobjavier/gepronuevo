import Mysql from './../../Models/Mysql';
import LoginModel from './../../Models/Login/Login';
const jwt = require('jsonwebtoken');
const loginModel = new LoginModel();

export default function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    console.log("token ",token);
  const secret = 'test';
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        console.log("now ",Date.now());
        console.log("token decoded.exp ",decoded.exp);
        if (decoded.exp <= Date.now()) {
          //	res.cookie('token', token);
        console.log("test1" );
          res.end('Access token has expired', 400);
        } else {
          //	res.cookie('token', token);
        console.log("test2" );
          req.decoded = decoded;
          next();
        }
      }
    });
  }
}
