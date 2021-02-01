import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    return res.data.id
  }

  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.active = res.data
  }

  async editBug(id, body) {
    await api.put('api/bugs/' + id, body)
    this.getOne(id)
  }

  async changeStatus(id) {
    const change = {
      closed: true,
      lastModified: new Date().toLocaleDateString()
    }
    await api.put('api/bugs/' + id, change)
    this.getOne(id)
  }
}
export const bugService = new BugService()
