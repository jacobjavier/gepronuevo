import Express from 'express';
const router = Express.Router();
import ProcedureModel from './../../Models/Procesos/Procesos';
const procedureModal = new ProcedureModel();

router.get('/get/all', (req, res) => {
  procedureModal.readAll().then(queryResponse => res.json(queryResponse));
});
router.get('/get/fromId/:id', (req, res) => {
  procedureModal
    .read({ id: req.params.id })
    .then(queryResponse => res.json(queryResponse[0]));
});
router.get('/get/avaibles', async (req, res) => {
  try {
    let queryResponse = await procedureModal.getAvaibles();
    res.json({ status: 200, response: queryResponse.result });
  } catch (error) {
    res.json({
      status: 500,
      error: 'Error al consultar procesos disponbiles',
      message: 'Error en el servidor'
    });
  }
});
router.post('/getFromUser', async (req, res) => {
  try {
    let query = await procedureModal.getFromUser({ userId: req.body.userId });
    res.json({ status: 200, response: query.result });
  } catch (error) {
    res.json(error);
  }
});
router.post('/get/administrables', async (req, res) => {
  try {
    let queryResult = await procedureModal.getAdministrables({
      userId: req.body.userId
    });
    res.json({ status: 200, response: queryResult });
  } catch (error) {
    res.json(error);
  }
});
router.post('/update', (req, res) => {
  procedureModal.update(req.body).then(queryResponse => {
    res.json(req.body);
  });
});
router.post('/create', async (req, res) => {
  try {
    let queryResponse = await procedureModal.create(req.body);
    res.json({
      status: 200,
      data_request: req.body,
      response: { id: queryResponse.insertId, ...req.body }
    });
  } catch (error) {
    res.json({
      status: 500,
      error: 'Error en ruta proceso/create',
      message: 'Error en el servidor al momento de crear'
    });
  }
});
router.post('/delete', (req, res) => {
  procedureModal
    .delete({ id: req.body.id })
    .then(queryResponse => res.json(queryResponse));
});

export default router;
