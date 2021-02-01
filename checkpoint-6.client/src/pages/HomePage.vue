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
          Report new Bug
        </button>
        <CreateBugModal />
      </div>
    </div>
    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              Title
            </th>
            <th scope="col">
              Reported by
            </th>
            <th scope="col">
              Status
            </th>
            <th scope="col">
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody>
          <Bug v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
        </tbody>
      </table>
    </div>
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
