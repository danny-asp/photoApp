const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/photo.js');
const path = require('path');
const fs = require('fs');


// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Create a photo
router.post('/', upload.single('image'), async (req, res) => {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // File uploaded successfully
    const newPhoto = new Photo({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file.filename, // Save only the filename in the database
    });
  
    try {
      // Save metadata to the database
      const savedPhoto = await newPhoto.save();
  
      // Return response
      return res.status(200).json({ message: 'Photo uploaded successfully', photo: savedPhoto });
    } catch (err) {
      // If an error occurs, delete the uploaded file
      fs.unlinkSync(req.file.path);
  
      return res.status(500).json({ error: 'Failed to upload photo' });
    }
  });
  

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch photos with pagination
// router.get('/', async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 6;
    
  
//     try {
//       const skip = (page - 1) * limit;
//       const photos = await Photo.find().skip(skip).limit(limit);
//       res.json(photos);
//     } catch (error) {
//       console.error('Error fetching photos:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// Get a photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a photo by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedPhoto = {
      title: req.body.title,
      imageUrl: req.file ? req.file.path : undefined
    };
    const photo = await Photo.findByIdAndUpdate(req.params.id, updatedPhoto, { new: true });
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a photo by ID
router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.status(200).json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
