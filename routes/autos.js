const express = require(`express`);
const router = express.Router();
const autosController = require(`../controller/autosController.js`)

router.get(`/`, autosController.index)
router.get(`/:marca/:dato?`, autosController.marca)

module.exports = router;