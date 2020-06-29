import Express from 'express';
const router = Express.Router();
import CatalogoModel from './../../Models/Catalogos/Catalogos';
const catalogoModel = new CatalogoModel();

router.get('/getUsersCatalog', (req, res) => {
  catalogoModel
    .getUsersCatalog()
    .then(queryResponse => res.json(queryResponse));
});
router.get('/getStatus', async (req, res) => {
  let queryResponse = await catalogoModel.getStatusCatalog();
  res.json({
    status: 200,
    response: queryResponse.result
  });
});
router.get('/getDataTypes', async (req, res) => {
  let queryResponse = await catalogoModel.getDataTypes();
  res.json({
    status: 200,
    response: queryResponse.result
  });
});
router.get('/getDateTypesCatalog', (req, res) => {
  catalogoModel
    .getDataTypesCatalog()
    .then(queryResponse => res.json(queryResponse));
});
router.get('/getResponsibleTypes', async (req, res) => {
  try {
    let results = await catalogoModel.getResponsibleTypes();
    res.json({ status: 200, response: results });
  } catch (error) {
    res.json(error);
  }
});

export default router;
