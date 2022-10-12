<template>
  <v-container v-if="parentingStyleInfo">
    <v-row justify="center" align="center" width="100%" height="100%">
      <v-col cols="12" sm="6" md="6">
        <InformationCard
          color="red"
          :content="parentingStyleInfo"
        ></InformationCard>
        <InformationCard
          color="yellow"
          :content="reproductionInfo"
        ></InformationCard>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <InformationCard color="green" :content="anatomyInfo"></InformationCard>
        <InformationCard color="blue" :content="dietInfo"></InformationCard>
      </v-col>
    </v-row>
    <v-btn @click="generate">Generate</v-btn>
  </v-container>
  <div v-else id="loading-message">
    <v-progress-circular
      indeterminate
      size="100"
      width="10"
    ></v-progress-circular>
    <h2>Generating...</h2>
  </div>
</template>

<script>
import InformationCard from '@/components/InformationCard.vue'
import speciesDataJSON from '@/data/species_data.json'

export default {
  name: 'IndexPage',
  components: { InformationCard },
  data() {
    return {
      speciesData: speciesDataJSON,
      parentingStyleInfo: false,
      reproductionInfo: false,
      anatomyInfo: false,
      dietInfo: false,
    }
  },
  beforeMount() {
    this.generate()
  },
  methods: {
    pickRandomParentingStyle() {
      const randIndex = Math.floor(
        Math.random() * this.speciesData.PARENTING_STYLE.length
      )
      return {
        main: this.speciesData.PARENTING_STYLE[randIndex],
        additions: false,
        styles: false,
      }
    },
    pickRandomReproduction() {
      const randMainInfoIndex = Math.floor(
        Math.random() * this.speciesData.REPRODUCTION.length
      )
      const randAdditionsIndex = Math.floor(
        Math.random() * this.speciesData.REPRODUCTION_ADDITIONS.length
      )

      return {
        main: this.speciesData.REPRODUCTION[randMainInfoIndex],
        additions: this.speciesData.REPRODUCTION_ADDITIONS[randAdditionsIndex],
        styles: false,
      }
    },
    pickRandomAnatomy() {
      const randMainInfoIndex = Math.floor(
        Math.random() * this.speciesData.ANATOMY.length
      )
      const randAdditionsIndex = Math.floor(
        Math.random() * this.speciesData.ANATOMY_ADDITIONS.length
      )

      return {
        main: this.speciesData.ANATOMY[randMainInfoIndex],
        additions: this.speciesData.ANATOMY_ADDITIONS[randAdditionsIndex],
        styles: false,
      }
    },
    pickRandomDiet() {
      const randMainInfoIndex = Math.floor(
        Math.random() * this.speciesData.DIET.length
      )
      const randAdditionsIndex = Math.floor(
        Math.random() * this.speciesData.DIET_ADDITIONS.length
      )
      const randStylesIndex = Math.floor(
        Math.random() * this.speciesData.DIET_STYLES.length
      )

      return {
        main: this.speciesData.DIET[randMainInfoIndex],
        additions: this.speciesData.DIET_ADDITIONS[randAdditionsIndex],
        styles: this.speciesData.DIET_STYLES[randStylesIndex],
      }
    },
    generate() {
      this.parentingStyleInfo = this.pickRandomParentingStyle()
      this.reproductionInfo = this.pickRandomReproduction()
      this.anatomyInfo = this.pickRandomAnatomy()
      this.dietInfo = this.pickRandomDiet()
    },
  },
}
</script>

<style lang="scss" scoped>
#loading-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20vh;
}
</style>
