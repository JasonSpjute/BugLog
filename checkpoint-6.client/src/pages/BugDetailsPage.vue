<template>
  <div class="container-fluid" v-if="state.loaded">
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
        <EditBugModal />
        <button class="btn btn-danger" v-if="state.bug.closed == false && state.bug.creatorId == state.account.id" @click="changeStatus">
          Close bug
        </button>
        <button class="btn btn-danger" disabled v-if="state.bug.closed == true">
          This bug is closed
        </button>
      </div>
    </div>
    <div class="row">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createNoteModal" v-if="state.bug.closed == false">
        Add a Note
      </button>
    </div>
    <div class="row">
      <CreateNoteModal :bug-prop="state.bug.id" />
    </div>
    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              Written by
            </th>
            <th scope="col">
              Note
            </th>
            <th class="text-center" scope="col">
              Edit
            </th>
            <th class="text-center" scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <Note v-for="note in state.notes" :key="note.id" :note-prop="note" />
        </tbody>
      </table>
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
import swal from 'sweetalert'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.notes),
      bug: computed(() => AppState.active),
      account: computed(() => AppState.account),
      loaded: false
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
      } catch (error) {
        logger.log(error)
      } finally {
        state.loaded = true
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
        swal({
          title: 'Are you sure?',
          text: 'Once closed, you will not be able to edit this bug!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              try {
                bugService.changeStatus(route.params.id)
                swal('This bug has been closed!', {
                  icon: 'success'
                })
              } catch (error) {
                logger.log(error)
              }
            } else {
              swal('Your bug will remain open!')
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid{
    background-image: url(https://cobaltdigital.marketing/wp-content/uploads/2018/12/Light-Grey-Background-Texture-4.jpg);
    background-size: cover;
  }
</style>
