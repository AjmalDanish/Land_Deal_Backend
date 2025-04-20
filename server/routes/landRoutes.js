const express = require('express');
const router = express.Router();
const multer = require('multer');
const Land = require('../models/Land');
const path = require('path');

const storage = multer.diskStorage({
  destination: './server/uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Homepage
router.get('/', (req, res) => res.render('index'));

// Listing Page
router.get('/listings', async (req, res) => {
  const lands = await Land.find();
  res.render('listings', { lands });
});

// Individual Details Page
router.get('/land/:id', async (req, res) => {
  const land = await Land.findById(req.params.id);
  res.render('details', { land });
});

// Add Land Form Page
router.get('/add', (req, res) => res.render('add-land'));

// Add Land Submission
router.post('/add', upload.single('image'), async (req, res) => {
  const { address, contact, price } = req.body;
  const image = req.file.filename;

  const newLand = new Land({ address, contact, price, image });
  await newLand.save();

  res.redirect('/listings');
});

module.exports = router;
