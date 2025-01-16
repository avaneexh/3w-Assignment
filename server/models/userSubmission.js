import mongoose from 'mongoose';

const userSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialHandle: { type: String, required: true },
  images: { type: [String], required: true }, // Cloudinary image URLs
}, { timestamps: true });

export default mongoose.model('UserSubmission', userSubmissionSchema);
