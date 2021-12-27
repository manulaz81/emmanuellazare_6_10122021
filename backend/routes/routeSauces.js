const express = require('express');
const auth = require('../middleware/auth' );
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/ctrSauce');

const router = require ('express').Router();


router.post('/',auth , multer, saucesCtrl.createSauce);
router.get('/',auth , saucesCtrl.getAllSauces);
router.get('/:id',auth , saucesCtrl.singleSauce);
router.put('/:id',auth , multer,saucesCtrl.modifySauce);
router.delete('/:id',auth , saucesCtrl.sauceDelete);
router.post('/:id/like',auth , saucesCtrl.sauceLike);


module.exports = router;