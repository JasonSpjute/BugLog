<template>
  <div class="container-fluid" v-if="state.bug.creator">
    <div class="row text-center">
      <div class="col">
        <h1>{{ state.bug.title }}</h1>
        <h3>{{ state.bug.description }}</h3>
        <h5>{{ state.bug.creator.name }}</h5>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBugModal">
          Edit Bug
        </button>
        <EditBugModal :bug-prop="state.bug" />
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
      bug: computed(() => AppState.active)
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
      state
    }
  }
}
</script>
