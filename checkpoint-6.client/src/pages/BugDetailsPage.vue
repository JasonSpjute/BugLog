<template>
  <div class="container-fluid" v-if="state.bug.creator">
    <div class="row text-center">
      <div class="col">
        <h1>{{ state.bug.title }}</h1>
        <h5>Reported by - {{ state.bug.creator.name }}</h5>
        <p>{{ state.bug.description }}</p>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBugModal" v-if="state.bug.closed == false && state.bug.creatorId == state.account.id">
          Edit Bug
        </button>
        <EditBugModal :bug-prop="state.bug" />
        <button class="btn btn-danger" v-if="state.bug.closed == false && state.bug.creatorId == state.account.id" @click="changeStatus">
          Close bug
        </button>
        <button class="btn btn-danger" disabled v-if="state.bug.closed == true">
          This bug is closed
        </button>
      </div>
    </div>
    <div class="row">
      <Note v-for="note in state.notes" :key="note.id" :note-prop="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.notes),
      bug: computed(() => AppState.active),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
      } catch (error) {
        logger.log(error)
      }
      try {
        await noteService.getNotes(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      changeStatus() {
        try {
          bugService.changeStatus(route.params.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
