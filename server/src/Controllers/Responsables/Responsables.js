import Express from 'express';
const router = Express.Router();
import ResponsibleModel from '../../Models/Responsables/Responsables';
const responsibleModel = new ResponsibleModel();
import MiembrosModel from './../../Models/Miembros/Miembros';
const miembrosModel = new MiembrosModel();
router.get('/get/:id', (req, res) => {
  responsibleModel
    .read({ id: req.params.id })
    .then(queryResolve => res.json(queryResolve));
});
router.get('/getFromProcess/:id', async (req, res) => {
  let queryResponse = await responsibleModel.getFromProcess({
    id: req.params.id
  });
  res.json({
    status: 200,
    response: queryResponse.result,
    data_request: req.params.id
  });
});
router.post('/update', async (req, res) => {
  let query = await responsibleModel.update({
    nombre: req.body.name,
    color: req.body.color,
    descripcion: req.body.description,
    id: req.body.id
  });
  query['request_data'] = req.body;
  query['response'] = req.body;
  res.json(query);
  // Members
  let members = [];
  req.body.members.map(member => {
    members.push({
      fk_responsable: req.body.id,
      fk_usuario: member.value
    });
  });
  miembrosModel.updateFromJson(members);
});
router.post('/create', async (req, res) => {
  let query = await responsibleModel.create({
    nombre: req.body.name,
    color: req.body.color,
    descripcion: req.body.description,
    fk_proceso: req.body.fk_process
  });
  query['request_data'] = req.body;
  let response = req.body;
  response['id'] = query.result.insertId;
  query['response'] = response;
  res.json(query);
  // Members
  let members = [];
  req.body.members.map(member => {
    members.push({
      fk_responsable: req.body.id,
      fk_usuario: member.value
    });
  });
  miembrosModel.createFromJson(members);
});
router.post('/delete', async (req, res) => {
  let queryResult = await responsibleModel.delete({ id: req.body.id });
  let response = {
    status: 200,
    result: queryResult,
    request_data: req.body
  };
  res.json(response);
});

export default router;
