<template>
  <div class="modal fade"
       id="createBugModal"
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
        <form @submit.prevent="createBug">
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
              Make new bug
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const today = new Date().toLocaleDateString()
    const state = reactive({
      newBug: {
        title: '',
        description: '',
        lastModified: today
      }
    })
    return {
      state,
      async createBug() {
        try {
          const id = await bugService.createBug(state.newBug)
          state.newBug.title = ''
          state.newBug.description = ''
          $('#createBugModal').modal('toggle')
          router.push({ name: 'BugDetails', params: { id } })
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
