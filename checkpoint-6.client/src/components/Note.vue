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
    <td>
      {{ noteProp.content }}
    </td>
    <td class="text-center">
      <i v-if="noteProp.creatorId == state.account.id && state.bug.closed == false" class="fas fa-edit btn text-primary" data-toggle="modal" data-target="#editNoteModal"></i>
      <EditNoteModal :more-prop="noteProp" :bug-prop="state.bug.id" />
    </td>
    <td class="text-center text-danger">
      <i v-if="noteProp.creatorId == state.account.id && state.bug.closed == false" class="fas fa-ban"></i>
    </td>
  </tr>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      bug: computed(() => AppState.active)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
