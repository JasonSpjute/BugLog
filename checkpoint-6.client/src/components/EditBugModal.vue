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
              v-model="state.newBug.title"
              class="form-control d-flex"
              aria-describedby="title"
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              id="description"
              v-model="state.newBug.description"
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
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import $ from 'jquery'

export default {
  name: 'EditBugModal',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newBug: {
        title: props.bugProp.title,
        description: props.bugProp.description
      }
    })
    return {
      state,
      editBug() {
        // console.log(state.newBug)
        try {
          bugService.editBug(props.bugProp.id, state.newBug)
          $('#editBugModal').modal('toggle')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
