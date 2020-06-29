import Express from 'express';
const router = Express.Router();
import LoginModel from './../../Models/Login/Login';
import auth from './../../Middlewares/Auth/Auth';
const jwt = require('jsonwebtoken');
const loginModel = new LoginModel();

router.post('/', (req, res) => {
  let weraxUser = loginModel
    .checkUser(req.body.username, req.body.password)
    .then(queryResponse => {
      const secret = 'test';
      if (queryResponse.status == 200) {
        // Issue token
        console.log(queryResponse.response)
        let userData = {
          userid: queryResponse.response[0].id,
          username: queryResponse.response[0].usuario,
          email: queryResponse.response[0].email,
          department: queryResponse.response[0].departamento,
          admin: queryResponse.response[0].es_admin
        };
        const token = jwt.sign(userData, secret, { expiresIn: '1h' });
        queryResponse.token = token;
        res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie');
        res.cookie('token', token);

        res.json(queryResponse);
      } else {
        res.sendStatus(401);
      }
    });
});
export default router;
