<template>
  <div class="container-fluid">
    <div class="row text-center m-5">
      <div class="col">
        <h1><i class="fas fa-bug text-success"></i> Bug Log</h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col" v-if="state.user.isAuthenticated">
        <button>Go to Bug Page</button>
      </div>
      <div class="col" v-else>
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
  .container-fluid{
    background-image: url(https://fourdeeroak.files.wordpress.com/2012/04/green-bug-on-log-pp.jpg);
    background-size: cover;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>
