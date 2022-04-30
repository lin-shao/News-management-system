var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user')
/* GET users listing. */
router.post('/data', dataCtrl.create);
router.post('/login',dataCtrl.login)
router.post('/list',dataCtrl.list)
router.post('/updatePassword',dataCtrl.update)
router.delete('/delete/:id',dataCtrl.delete)
module.exports = router;
