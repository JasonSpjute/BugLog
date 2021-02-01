<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col">
        <h1>BUGS</h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createBugModal">
          Create new Bug
        </button>
        <CreateBugModal />
      </div>
    </div>
    <Bug v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
