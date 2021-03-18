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
    <div class="row text-center">
      <div class="col">
        <button class="btn btn-success m-2" @click="state.view = 'open'">
          Show Only Open
        </button>
        <button class="btn btn-info m-2" @click="state.view = 'closed'">
          Show Only Closed
        </button>
        <button class="btn btn-warning m-2" @click="state.view = 'all'">
          Show All
        </button>
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
        <tbody v-if="state.view == 'closed'">
          <Bug v-for="bug in state.openBugs" :key="bug.id" :bug-prop="bug" />
        </tbody>
        <tbody v-else-if="state.view == 'open'">
          <Bug v-for="bug in state.closedBugs" :key="bug.id" :bug-prop="bug" />
        </tbody>
        <tbody v-else>
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
      openBugs: computed(() => AppState.bugs.filter(b => b.closed === true)),
      closedBugs: computed(() => AppState.bugs.filter(b => b.closed === false)),
      newBug: {},
      view: 'all'
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
.container-fluid{
    background-image: url(https://cobaltdigital.marketing/wp-content/uploads/2018/12/Light-Grey-Background-Texture-4.jpg);
    background-size: cover;
  }
</style>
