const router = require('express').Router();
const { addImage, listImages, detailImage, deleteImage, updateImageInfo } = require('../controllers/Image.Controller');
const { imageMulter } = require('../libs/multer');

router.post('/images', imageMulter.single('gambar'), addImage);
router.get('/images', listImages);
router.get('/images/:id', detailImage);
router.delete('/images/:id', deleteImage);
router.put('/images/:id', updateImageInfo);

module.exports = router;