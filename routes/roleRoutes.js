const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleModulController')

router.post('/update-access-module/:id', roleController.updateListAccessModule);
router.post('/remove-access-module/:id', roleController.removeAccessModule);
router.post('/add-role', roleController.addRole)
router.get('/get-roles', roleController.getRole)

module.exports = router;