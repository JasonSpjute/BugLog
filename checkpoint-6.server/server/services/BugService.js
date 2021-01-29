import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'
class BugService {
  async create(body) {
    return await dbContext.Bugs.create(body)
  }
}

export const bugService = new BugService()
