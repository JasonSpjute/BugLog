import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: String, ref: 'Bug', required: true },
  flagged: { type: String, enum: ['pending', 'completed', 'rejected'] },
  creatorEmail: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
