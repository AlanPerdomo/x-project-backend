const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.get('/dados', dataController.getAllData);
router.get('/dados/:id', dataController.getDataById);
router.post('/dados', dataController.createData);
router.put('/dados/:id', dataController.updateData);
router.delete('/dados/:id', dataController.deleteData);

module.exports = router;