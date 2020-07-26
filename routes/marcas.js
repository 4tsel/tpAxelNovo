const express = require(`express`);
const router = express.Router();
const marcasController = require(`../controller/marcasController.js`)

router.get(`/`, marcasController.index)
router.get(`/:marca/`, marcasController.marca)
module.exports = router;