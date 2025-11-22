const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

router.get('/get-user-list', userController.GetUserList);
router.put('/update-differnt-bulk-user', userController.updateDiffertBulkUser); // uddate different info 
router.put('/update-same-bulk-user', userController.updateSameBulkUser); // update same info
router.get('/check-user-access/', userController.checkUserAccess);

module.exports = router;