var express = require('express')
var router = express.Router()
var dataCtrl = require('../controllers/announcement')

router.post('/addAnnouncement',dataCtrl.create)
router.post('/showAnnouncement',dataCtrl.find)
router.delete('/deleteAnnouncement/:id',dataCtrl.delete)
router.post('/updateAnnouncement',dataCtrl.update)

module.exports = router;