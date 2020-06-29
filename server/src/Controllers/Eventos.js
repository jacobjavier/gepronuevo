import Model from '../Models/Eventos/Eventos';
import Express from 'express';
import TextVal from './../Utilities/BasicTextValidation';
import IntVal from './../Utilities/PositiveIntegerValidation';
let router = Express.Router();
let model = new Model();
router.post('/create', async (req, res) => {
  let validation =
    IntVal(req.body.processId) &&
    TextVal(req.body.keyEvent) &&
    IntVal(req.body.userId);
  if (validation === true) {
    try {
      let queryResponse = await model.create({
        processId: req.body.processId,
        userId: req.body.userId,
        keyEvent: req.body.keyEvent
      });
      if (queryResponse.status === 200) {
        res.json({
          status: 200,
          error: null,
          message: 'Evento creado satisfactoriamente',
          response: queryResponse.response
        });
      } else {
        throw 'Error al momento de crear el evento:Eventos.js';
      }
    } catch (error) {
      res.json({
        status: 500,
        error: error,
        message: 'Error al momento de crear el evento',
        response: null
      });
    }
  } else {
    res.json({
      status: 400,
      error: 'Eventos.js: Error al momento de validar',
      message: 'Error en algun campo, revisar valores nulos'
    });
  }
});
router.post('/update/status', async (req, res) => {
  try {
    if (IntVal(req.body.eventId) === true && IntVal(req.body.status) === true) {
      let values = { id: req.body.eventId, status: req.body.status };
      let update = await model.updateStatus(values);
      res.json({ status: 200, error: null, message: 'Valor actualizado' });
    } else {
      throw {
        status: 400,
        error: 'Los valores no fueron aprobados por los validadores',
        message: 'Valores ingresados no validos'
      };
    }
  } catch (error) {
    res.json(error);
  }
});

export default router;
