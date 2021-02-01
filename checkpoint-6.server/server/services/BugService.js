import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugService {
  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async getAll() {
    return await dbContext.Bugs.find().populate('creator')
  }

  async getOne(bugId) {
    const bugFound = await dbContext.Bugs.findById(bugId).populate('creator')
    if (!bugFound) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return bugFound
  }

  async edit(id, title) {
    const update = await dbContext.Bugs.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return update
  }

  async delete(id) {
    return await dbContext.Bugs.findByIdAndDelete(id)
  }
}

export const bugService = new BugService()
