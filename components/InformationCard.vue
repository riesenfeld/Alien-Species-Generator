<template>
  <v-sheet class="info-card" :color="backgroundColor">
    <section>
      <h2>{{ category }}: {{ content.main.name }}</h2>
      <p>{{ content.main.description }}</p>
    </section>
    <section v-if="content.styles">
      <h3>{{ content.styles.name }}</h3>
      <p>{{ content.styles.description }}</p>
    </section>
    <section v-if="content.additions">
      <h3>{{ content.additions.name }}</h3>
      <p>{{ content.additions.description }}</p>
    </section>
  </v-sheet>
</template>

<script>
export default {
  name: 'InformationCard',
  props: {
    backgroundColor: {
      type: String,
      default: 'white',
    },
    category: {
      type: String,
      default: '',
    },
    content: {
      type: [Object, Boolean],
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.info-card {
  width: min(80vw, 760px);
  padding: 10px;
  text-align: left;
}
.info-card section {
  color: #bbb;
}
</style>
