var express = require('express')
var router = express.Router()
var dataCtrl = require('../controllers/news')

router.post('/addNews',dataCtrl.create)
router.post('/showNews',dataCtrl.find)
router.delete('/deleteNews/:id',dataCtrl.delete)
router.post('/updateNews',dataCtrl.update)
router.post('/searchNews',dataCtrl.search)

module.exports = router;