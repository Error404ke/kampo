import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  school: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date },
  role: { type: String, enum: ['student', 'landlord'], default: 'student' },
  phone: { type: String }, // for Mpesa
  profilePic: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);