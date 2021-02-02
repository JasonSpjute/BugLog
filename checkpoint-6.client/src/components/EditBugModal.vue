<template>
  <div class="modal fade"
       id="editBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editBug">
          <div class="modal-body">
            <input
              type="text"
              name="title"
              id="title"
              v-model="newBug.title"
              class="form-control d-flex"
              aria-describedby="title"
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              id="description"
              v-model="newBug.description"
              class="form-control d-flex"
              aria-describedby="description"
              placeholder="Description"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Update Bug
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import $ from 'jquery'
import { AppState } from '../AppState'

export default {
  name: 'EditBugModal',
  // props: {
  //   bugProp: { type: Object, required: true }
  // },
  setup() {
    const today = new Date().toLocaleDateString()
    const state = reactive({
      bug: computed(() => AppState.active)
    })
    return {
      state,
      newBug: {
        title: state.bug.title,
        description: state.bug.description,
        lastModified: today
      },
      editBug() {
        try {
          bugService.editBug(state.bug.id, this.newBug)
          $('#editBugModal').modal('toggle')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
