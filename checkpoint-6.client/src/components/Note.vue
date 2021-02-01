<template>
  <div class="col-12" v-if="noteProp.creator">
    <p>{{ noteProp.content }} - {{ noteProp.creator.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    noteProp: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>
