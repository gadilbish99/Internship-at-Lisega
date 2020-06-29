<template>
  <b-container id="view">
    <b-row>
      <b-col>
        <b-card-group columns>
          <Card v-for="feed in feeds" :key="feed.id" :feed="feed"/>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Card from "./Card.vue"

export default {
  components: {
    Card
  },
  props: {
    feeds: Array
  }
}
</script>

<style scoped>
#view {
  padding: 60px 5px;
}
</style>