import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NoteService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async getNotes(query = {}) {
    return await dbContext.Notes.find(query).populate('creator')
  }

  async edit(id, title) {
    const update = await dbContext.Notes.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return update
  }

  async delete(id) {
    return await dbContext.Notes.findByIdAndDelete(id)
  }
}

export const noteService = new NoteService()
