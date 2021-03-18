<template>
  <div class="container">
    <div class="row text-center m-5">
      <div class="col">
        <h1><i class="fas fa-bug text-success"></i> Bug Log</h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <p>Please login to Begin</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Landing',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
