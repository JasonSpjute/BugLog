<template>
  <div class="container-fluid">
    <div class="row text-center m-5">
      <div class="col">
        <h1>
          <i class="fas fa-bug text-secondary"></i> Bug Log
        </h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col" v-if="state.user.isAuthenticated">
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-success border-dark text-dark">
            Go to Bug Page
          </button>
        </router-link>
      </div>
      <div class="col text-white" v-else>
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
  }
</style>
