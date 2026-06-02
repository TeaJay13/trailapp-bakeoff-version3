import mongoose from 'mongoose'

const TrailSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  difficulty:  { type: String, enum: ['easy', 'moderate', 'hard'], required: true },
  length:      { type: Number },
  location:    { type: String },
  createdAt:   { type: Date, default: Date.now },
})

export default mongoose.model('Trail', TrailSchema)
