const express = require('express');
const router = require ('express').Router();
const saucesCtrl = require('../controllers/ctrSauce');

const auth = require('../middleware/auth' );
const multer = require('../middleware/multer-config');



router.post('/',auth, multer, saucesCtrl.createSauce);// auth
router.get('/',auth, saucesCtrl.getAllSauces); //auth
router.get('/:id',auth, saucesCtrl.singleSauce);//auth
router.put('/:id',auth, multer,saucesCtrl.modifySauce);//auth

router.delete('/:id',auth, saucesCtrl.sauceDelete);//auth
router.post('/:id/like' ,auth, saucesCtrl.sauceLike);//auth


module.exports = router;