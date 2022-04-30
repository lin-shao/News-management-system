var express = require("express")
var router = express.Router()
var dataCtrl = require("../controllers/comment")

router.post('/addComment',dataCtrl.create)
router.post('/showComment',dataCtrl.find)
router.delete('/deleteComment/:id',dataCtrl.delete)

module.exports = router;