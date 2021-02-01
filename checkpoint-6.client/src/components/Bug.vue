<template>
  <div class="row">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id }}">
      <div class="col-12">
        <h2>{{ bugProp.title }} - {{ bugProp.creator.name }} - {{ bugProp.closed }} - {{ bugProp.updatedAt }}</h2>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Bug',
  props: {
    bugProp: { type: Object, required: true }
  }

}
</script>
<style lang="scss" scoped>

</style>
