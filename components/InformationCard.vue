<template>
  <v-sheet id="info-card" :color="color">
    <section>
      <h2>{{ content.main.name }}</h2>
      <p>{{ content.main.description }}</p>
    </section>
    <section v-if="content.additions">
      <h3>{{ content.additions.name }}</h3>
      <p>{{ content.additions.description }}</p>
    </section>
    <section v-if="content.styles">
      <h4>{{ content.styles.name }}</h4>
      <p>{{ content.styles.description }}</p>
    </section>
  </v-sheet>
</template>

<script>
export default {
  name: 'InformationCard',
  props: {
    color: {
      type: String,
      default: 'white',
    },
    content: {
      type: [Object, Boolean],
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
#info-card {
  color: black;
}
</style>
