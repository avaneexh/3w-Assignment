import express from 'express';
import cloudinary from '../config/cloudinary.js';
import UserSubmission from '../models/userSubmission.js';

const router = express.Router();

// Handle User Submissions
router.post('/', async (req, res) => {
  try {
    const { name, socialHandle, images } = req.body;

    // Upload Images to Cloudinary
    const imageUploadPromises = images.map((image) =>
      cloudinary.uploader.upload(image, { folder: 'social_media_task' })
    );

    const uploadedImages = await Promise.all(imageUploadPromises);
    const imageUrls = uploadedImages.map((img) => img.secure_url);

    // Save to Database
    const submission = new UserSubmission({
      name,
      socialHandle,
      images: imageUrls,
    });

    await submission.save();
    res.status(201).json({ message: 'Submission successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while submitting data.' });
  }
});

// Fetch Submissions for Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const submissions = await UserSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching data.' });
  }
});

export default router;
