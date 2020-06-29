import Express from 'express';
const router = Express.Router();
import Model from './../Models/Users';
const usersModel = new Model();

router.get('/get', async (req, res) => {
  let query = await usersModel.get();
  res.json({ status: 200, response: query.result });
});

export default router;
