<template>
  <v-row justify="center" align="center" width="100%" height="100%">
    <v-col cols="12" sm="6" md="6">
      <InformationCard
        color="red"
        :content="pickRandomParentingStyle()"
      ></InformationCard>
      <InformationCard
        color="yellow"
        :content="pickRandomReproduction()"
      ></InformationCard>
    </v-col>
    <v-col cols="12" sm="6" md="6">
      <InformationCard
        color="green"
        :content="pickRandomAnatomy()"
      ></InformationCard>
      <InformationCard
        color="blue"
        :content="pickRandomDiet()"
      ></InformationCard>
    </v-col>
    <!-- <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card> -->
    <!-- <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card> -->
    <!-- </v-col> -->
  </v-row>
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
    }
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
  },
}
</script>
