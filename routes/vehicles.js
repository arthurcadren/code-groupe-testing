const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vehicleCtrl = require('../controllers/vehicleController');

router.get('/', vehicleCtrl.getAll);
router.post('/', auth, vehicleCtrl.create);
router.put('/:id', auth, vehicleCtrl.update);
router.delete('/:id', auth, vehicleCtrl.remove);

module.exports = router;