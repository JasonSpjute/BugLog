<template>
  <!-- <div class="col-12" v-if="noteProp.creator">
    <span>{{ noteProp.content }} - {{ noteProp.creator.name }}</span>
    <i class="fas fa-edit"></i>
  </div> -->
  <tr>
    <td v-if="noteProp.creator">
      {{ noteProp.creator.name }}
    </td>
    <td v-else>
      <p>N/A</p>
    </td>
    <td :contenteditable="state.editPost" @blur="editPost">
      {{ noteProp.content }}
    </td>
    <td class="text-center">
      <i v-if="noteProp.creatorId == state.account.id && state.bug.closed == false" @click="state.editPost = !state.editPost" class="fas btn fa-edit text-primary"></i>
    </td>
    <td class="text-center">
      <i v-if="noteProp.creatorId == state.account.id && state.bug.closed == false" @click="deleteNote" class="fas fa-ban text-danger pointer"></i>
    </td>
  </tr>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import swal from 'sweetalert'
export default {
  name: 'Note',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      bug: computed(() => AppState.active),
      update: {
        content: props.noteProp.content
      }
    })
    return {
      state,
      editNote() {
        try {
          noteService.editNote(props.noteProp.id, state.update)
          bugService.editBug(state.bug.id, { lastModified: new Date().toLocaleDateString() })
        } catch (error) {
          logger.log(error)
        }
      },
      deleteNote() {
        swal({
          title: 'Are you sure?',
          text: 'Once deleted, you cannot get it back!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              try {
                noteService.deleteNote(props.noteProp)
                swal('Your note has been deleted', {
                  icon: 'success'
                })
              } catch (error) {
                logger.log(error)
              }
            } else {
              swal('Your note remains!')
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
