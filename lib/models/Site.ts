import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['mall', 'waterfall', 'hotel', 'park', 'hostel'], required: true },
  description: { type: String },
  location: { type: String },
  coordinates: { lat: Number, lng: Number },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // for hostels
  rentPrice: { type: Number }, // for hostels
}, { timestamps: true });

export default mongoose.models.Site || mongoose.model('Site', SiteSchema);