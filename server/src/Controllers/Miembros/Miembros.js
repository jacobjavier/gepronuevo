import Express from 'express';
const router = Express.Router();
import MemberModel from './../../Models/Miembros/Miembros';
const memberModel = new MemberModel();

router.get('/get/:id', (req, res) => {
  memberModel
    .read({ id: req.params.id })
    .then(queryResponse => res.json(queryResponse));
});
router.get('/getFromProcess/:id', (req, res) => {
  memberModel
    .getFromProcess({ id: req.params.id })
    .then(queryResponse => res.json(queryResponse));
});
router.get('/getFromResponsible/:id', async (req, res) => {
  let queryResponse = await memberModel.getFromResponsible({
    id: req.params.id
  });
  res.json({
    status: 200,
    response: queryResponse.result
  });
});
router.post('/update', (req, res) => {
  memberModel
    .update({
      id: req.body.id,
      fk_responsable: req.body.fk_responsable,
      fk_usuario: req.body.fk_usuario
    })
    .then(queryResponse => {
      res.json(req.body);
    });
});
router.post('/create', (req, res) => {
  memberModel
    .create({
      fk_responsable: req.body.fk_responsable,
      fk_usuario: req.body.fk_usuario
    })
    .then(queryResponse => {
      req.body.id = queryResponse.insertId;
      res.json(req.body);
    });
});
router.post('/delete', (req, res) => {
  memberModel
    .delete({ id: req.body.id })
    .then(queryResponse => res.json(queryResponse));
});

export default router;
