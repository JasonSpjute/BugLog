import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.active = res.data
  }
}
export const bugService = new BugService()
