import Express from 'express';
const router = Express.Router();
import ColumnaModel from './../../Models/Columnas/Columnas';
const columnaModal = new ColumnaModel();

router.get('/get/:id', (req, res) => {
  columnaModal
    .read({ id: req.params.id })
    .then(queryResponse => res.json(queryResponse));
});
router.get('/getAllData/:id', async (req, res) => {
  let queryResults = await columnaModal.getAllData({ id: req.params.id });
});
router.get('/getFromProcess/:id', async (req, res) => {
  let queryResults = await columnaModal.getFromProcess({ id: req.params.id });
  res.json({ status: 200, response: queryResults.result });
});
router.post('/update/start', (req, res) => {
  columnaModal
    .update({
      nombre: req.body.nombre,
      fk_tipo: req.body.fk_tipo,
      orden: req.body.orden,
      fk_responsable: req.body.fk_responsable,
      fk_estatus: req.body.fk_estatus,
      es_obligatorio: req.body.es_obligatorio,
      descripcion: req.body.descripcion,
      fk_proceso: req.body.fk_proceso,
      id: req.body.id
    })
    .then(queryResponse => {
      res.json(req.body);
    });
});
router.post('/update', (req, res) => {
  columnaModal
    .update({
      descripcion: req.body.descripcion,
      es_obligatorio: req.body.es_obligatorio,
      fk_estatus: req.body.fk_estatus,
      fk_proceso: req.body.fk_proceso,
      fk_responsable: req.body.fk_responsable,
      fk_tipo: req.body.fk_tipo,
      id: req.body.id,
      nombre: req.body.nombre,
      orden: req.body.orden
    })
    .then(queryResponse => {
      res.json(req.body);
    });
});
router.post('/create', async (req, res) => {
  let queryResults = await columnaModal.create({
    nombre: req.body.nombre,
    fk_tipo: req.body.fk_tipo,
    orden: req.body.orden,
    fk_responsable: req.body.fk_responsable,
    fk_estatus: req.body.fk_estatus,
    es_obligatorio: req.body.es_obligatorio,
    descripcion: req.body.descripcion,
    fk_proceso: req.body.fk_proceso,
    id: req.body.id
  });
  let request_data = req.body;
  request_data['id'] = queryResults.result.insertId;
  res.json({
    status: 200,
    response: queryResults.result,
    request_data: request_data
  });
});
router.post('/delete', async (req, res) => {
  let queryResult = await columnaModal.delete({ id: req.body.id });
  res.json({
    status: 200,
    response: queryResult.result,
    request_data: req.body
  });
});

export default router;
