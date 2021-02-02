import { AppState } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNote(bugId, data) {
    await api.post('api/notes', data)
    this.getNotes(bugId)
  }

  async editNote(id, body) {
    await api.put('api/notes/' + id, body)
  }

  async deleteNote(note) {
    await api.delete('api/notes/' + note.id)
    this.getNotes(note.bug)
  }
}
export const noteService = new NoteService()
