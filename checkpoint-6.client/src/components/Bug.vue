<template>
  <!-- <div class="row">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id }}">
      <div class="col-12 text">
        <h2>{{ bugProp.title }} - {{ bugProp.creator.name }} - <span class="open" v-if="bugProp.closed==false">Open</span><span class="closed" v-else>Closed</span> - {{ bugProp.updatedAt }}</h2>
      </div>
    </router-link>
  </div> -->
  <tr>
    <td>
      <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id }}">
        {{ bugProp.title }}
      </router-link>
    </td>
    <td>{{ bugProp.creator.name }}</td>
    <td><span class="open" v-if="bugProp.closed==false">Open</span><span class="closed" v-else>Closed</span></td>
    <td v-if="bugProp.lastModified">
      {{ bugProp.lastModified }}
    </td>
  </tr>
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
.text{
  color: black;
}
.open{
  color: green;
}
.closed{
  color: red;
}

</style>
