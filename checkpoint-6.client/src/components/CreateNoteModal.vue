<template>
  <div class="modal fade"
       id="createNoteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="modal-body">
            <input
              type="text"
              name="content"
              id="content"
              v-model="state.newNote.content"
              class="form-control d-flex"
              aria-describedby="title"
              placeholder="content"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Submit Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { bugService } from '../services/BugService'
export default {
  name: 'CreateNoteModal',
  props: {
    bugProp: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      newNote: {
        content: '',
        bug: props.bugProp
      }
    })
    return {
      state,
      async createNote() {
        try {
          await noteService.createNote(props.bugProp, state.newNote)
          await bugService.editBug(props.bugProp, { lastModified: new Date().toLocaleDateString() })
          state.newNote.content = ''
          $('#createNoteModal').modal('toggle')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
