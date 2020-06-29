var express = require('express');
var router = express.Router();

import Model from './../../Models/ContenidoProceso/ContenidoProceso';
let model = new Model();
router.get('/getFromProcess/:id/:userId', (req, res) => {
  model
    .getFromProcess({ fk_proceso: req.params.id, user_id: req.params.userId })
    .then(queryResponse => {
      res.json(queryResponse);
    });
});

router.post('/delete', (req, res) => {
  res.json({ status: 500, errors: ['No implementado'] });
  // model.delete();
});

router.post('/update', (req, res) => {
  let id = req.body.id;
  let value = req.body.value;
  if (
    id !== null &&
    id !== undefined &&
    value !== null &&
    value !== undefined
  ) {
    model.updateContent({ id: id, value: value }).then(queryResponse => {
      if (queryResponse === 200) {
        res.json({
          status: 200,
          errors: [],
          message: 'Valores insertados correctamente'
        });
      }
    });
  } else {
    res.json({
      status: 400,
      errors: ['Valores o Id nulos'],
      message: 'Error de captura'
    });
  }
});

router.post('/create', (req, res) => {
  res.json({ status: 500, errors: ['No implementado'] });
  // model.create();
});

export default router;
