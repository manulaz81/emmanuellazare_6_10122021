const express = require('express');
// const auth = require('../middleware/auth' );
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/ctrSauce');

const router = require ('express').Router();


router.post('/', multer, saucesCtrl.createSauce);// auth
router.get('/', saucesCtrl.getAllSauces); //auth
router.get('/:id', saucesCtrl.singleSauce);//auth
router.put('/:id', multer,saucesCtrl.modifySauce);//auth
router.delete('/:id', saucesCtrl.sauceDelete);//auth
router.post('/:id/like' , saucesCtrl.sauceLike);//auth


module.exports = router;