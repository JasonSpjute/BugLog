<template>
  <div class="modal fade"
       id="editNoteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editNote">
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
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
// import { bugService } from '../services/BugService'
import $ from 'jquery'
import { noteService } from '../services/NoteService'

export default {
  name: 'EditNoteModal',
  props: {
    moreProp: { type: Object, required: true },
    bugProp: { type: String, required: true }
  },
  setup(props) {
    // const today = new Date().toLocaleDateString()
    const state = reactive({
      newNote: {
        content: props.moreProp.content
      }
    })
    return {
      state,
      editNote() {
        try {
          noteService.editNote(props.moreProp.id, state.newNote, props.bugProp)
          $('#editNoteModal').modal('toggle')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
