var express = require('express')
var router = express.Router()
var dataCtrl = require('../controllers/newsClassify')

router.post('/addNewsClassify',dataCtrl.create)
router.post('/showNewsClassify',dataCtrl.find)
router.delete('/deleteNewsClassify/:id',dataCtrl.delete)
router.post('/updateNewsClassify',dataCtrl.update)

module.exports = router;