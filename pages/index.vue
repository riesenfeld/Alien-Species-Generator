<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-title>Alien Species Generator</v-app-bar-title>
      <!-- <span> -->
      <v-spacer></v-spacer>
      <v-btn color="primary" class="btn" @click="generate"
        >Generate &nbsp;<v-icon>mdi-autorenew</v-icon></v-btn
      >
      <!-- <span> -->
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        :color="clipboardStatus < 1 ? 'primary' : 'success'"
        class="btn"
        @click="copyLinkToClipboard"
      >
        {{ clipboardStatusOptions[clipboardStatus] }}
        &nbsp;<v-icon>mdi-link-variant</v-icon></v-btn
      >
      <!-- <v-spacer></v-spacer> -->
      <!-- </span> -->
      <v-btn class="btn" color="primary" @click="handlePDF"
        >Save as PDF &nbsp;<v-icon>mdi-file-pdf-box</v-icon></v-btn
      >
      <!-- <v-text-field label="Name this species"></v-text-field> -->
      <!-- </span> -->

      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <ClientOnly>
      <v-main>
        <v-container v-if="parentingStyleInfo">
          <v-row ref="cards" justify="center" align="center">
            <v-col cols="12" sm="12" md="12" align="center">
              <InformationCard
                background-color="#200"
                :content="parentingStyleInfo"
              ></InformationCard>
              <InformationCard
                background-color="#220"
                :content="reproductionInfo"
              ></InformationCard>
              <!-- </v-col> -->
              <!-- <v-col cols="12" sm="6" md="6"> -->
              <InformationCard
                background-color="#020"
                :content="anatomyInfo"
              ></InformationCard>
              <InformationCard
                background-color="#002"
                :content="dietInfo"
              ></InformationCard>
            </v-col>
          </v-row>
        </v-container>
        <div v-else id="loading-message">
          <v-progress-circular
            indeterminate
            size="100"
            width="10"
          ></v-progress-circular>
          <h2>Generating...</h2>
        </div>
      </v-main>
    </ClientOnly>
  </div>
</template>

<script>
import { saveAsPDFMixin } from '../mixins/saveAsPDFMixin.js'
import InformationCard from '@/components/InformationCard.vue'
import speciesDataJSON from '@/data/species_data.json'

export default {
  name: 'IndexPage',
  components: { InformationCard },
  mixins: [saveAsPDFMixin],
  data() {
    return {
      speciesData: speciesDataJSON,
      parentingStyleInfo: false,
      reproductionInfo: false,
      anatomyInfo: false,
      dietInfo: false,
      clipboardStatusOptions: ['Copy permalink', 'Copied!'],
      clipboardStatus: 0,
    }
  },
  beforeMount() {
    if (this.validateQueryParams()) {
      this.setDataByQueryParams()
    } else {
      this.generate()
    }
  },
  methods: {
    pickRandomTrait(traitArray) {
      /* Gets the rarity classes from each trait and uses them to
        pick a trait based on those rarity classes.

        1. assign a value to each trait based on its rarity_class
        2. the total probability is the sum of those values, so...
            [id1, id1, id1, id1, id2, id2, id3, id4, id4...]
      */
      const probabilityArray = []
      for (let i = 0; i < traitArray.length; i++) {
        if (traitArray[i].rarity_class === 'COMMON') {
          for (let j = 0; j < 8; j++) probabilityArray.push(traitArray[i].id)
        } else if (traitArray[i].rarity_class === 'UNCOMMON') {
          for (let j = 0; j < 4; j++) probabilityArray.push(traitArray[i].id)
        } else if (traitArray[i].rarity_class === 'RARE') {
          for (let j = 0; j < 2; j++) probabilityArray.push(traitArray[i].id)
        } else if (traitArray[i].rarity_class === 'EXTRAORDINARY') {
          probabilityArray.push(traitArray[i].id)
        }
      }
      const randIndex = Math.floor(Math.random() * probabilityArray.length)
      const randID = probabilityArray[randIndex]

      /* IDs match indices, so this is fine, no fancy array methods needed */
      return traitArray[randID]
    },
    copyLinkToClipboard() {
      navigator.clipboard.writeText(
        `${window.location.origin}${this.$route.fullPath}`
      )
      this.clipboardStatus = 1
    },
    setQueryParams(
      parentingStyleInfo,
      reproductionInfo,
      anatomyInfo,
      dietInfo
    ) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          a: anatomyInfo.main.id,
          aa: anatomyInfo.additions === false ? -1 : anatomyInfo.additions.id,
          d: dietInfo.main.id,
          ds: dietInfo.styles.id,
          da: dietInfo.additions === false ? -1 : dietInfo.additions.id,
          r: reproductionInfo.main.id,
          ra:
            reproductionInfo.additions === false
              ? -1
              : reproductionInfo.additions.id,
          p: parentingStyleInfo.main.id,
        },
      })
    },
    pickRandomParentingStyle() {
      return {
        main: this.pickRandomTrait(this.speciesData.PARENTING_STYLE),
        additions: false,
        styles: false,
      }
    },
    pickRandomReproduction() {
      const chanceOfAddition = Math.floor(Math.random() * 4)

      let reproductionAdditions = false

      /* 25% chance */
      if (chanceOfAddition < 1) {
        reproductionAdditions = this.pickRandomTrait(
          this.speciesData.REPRODUCTION_ADDITIONS
        )
      }

      return {
        main: this.pickRandomTrait(this.speciesData.REPRODUCTION),
        additions: reproductionAdditions,
        styles: false,
      }
    },
    pickRandomAnatomy() {
      const chanceOfAddition = Math.floor(Math.random() * 5)

      let anatomyAdditions = false

      /* 40% chance */
      if (chanceOfAddition < 2) {
        anatomyAdditions = this.pickRandomTrait(
          this.speciesData.ANATOMY_ADDITIONS
        )
      }

      return {
        main: this.pickRandomTrait(this.speciesData.ANATOMY),
        additions: anatomyAdditions,
        styles: false,
      }
    },
    pickRandomDiet() {
      const chanceOfAddition = Math.floor(Math.random() * 4)

      let dietAdditions = false

      /* 25% chance */
      if (chanceOfAddition < 1) {
        dietAdditions = this.pickRandomTrait(this.speciesData.DIET_ADDITIONS)
      }

      return {
        main: this.pickRandomTrait(this.speciesData.DIET),
        additions: dietAdditions,
        styles: this.pickRandomTrait(this.speciesData.DIET_STYLES),
      }
    },
    generate() {
      this.parentingStyleInfo = this.pickRandomParentingStyle()
      this.reproductionInfo = this.pickRandomReproduction()
      this.anatomyInfo = this.pickRandomAnatomy()
      this.dietInfo = this.pickRandomDiet()
      this.clipboardStatus = 0
      this.setQueryParams(
        this.parentingStyleInfo,
        this.reproductionInfo,
        this.anatomyInfo,
        this.dietInfo
      )
    },
    validateQueryParams() {
      const keys = Object.keys(this.$route.query)
      const compareAgainst = ['a', 'aa', 'd', 'ds', 'da', 'r', 'ra', 'p']
      const lengths = {
        a: this.speciesData.ANATOMY.length,
        aa: this.speciesData.ANATOMY_ADDITIONS.length,
        d: this.speciesData.DIET.length,
        ds: this.speciesData.DIET_STYLES.length,
        da: this.speciesData.DIET_ADDITIONS.length,
        r: this.speciesData.REPRODUCTION.length,
        ra: this.speciesData.REPRODUCTION_ADDITIONS.length,
        p: this.speciesData.PARENTING_STYLE.length,
      }
      if (keys.length < 8) {
        return false
      }
      for (let i = 0; i < keys.length; i++) {
        /* Make sure all the keys are there */
        if (!keys.includes(compareAgainst[i])) {
          return false
        }
        /* Make sure we don't index OOB */
        if (this.$route.query[keys[i]] >= lengths[keys[i]]) {
          return false
        }
        if (
          this.$route.query.a < 0 ||
          this.$route.query.d < 0 ||
          this.$route.query.ds < 0 ||
          this.$route.query.p < 0 ||
          this.$route.query.r < 0
        ) {
          return false
        }
      }
      return true
    },
    setDataByQueryParams() {
      const params = this.$route.query
      this.parentingStyleInfo = {
        main: this.speciesData.PARENTING_STYLE[params.p],
        additions: false,
        styles: false,
      }
      this.reproductionInfo = {
        main: this.speciesData.REPRODUCTION[params.r],
        additions:
          params.ra > -1
            ? this.speciesData.REPRODUCTION_ADDITIONS[params.ra]
            : false,
        styles: false,
      }
      this.anatomyInfo = {
        main: this.speciesData.ANATOMY[params.a],
        additions:
          params.aa > -1
            ? this.speciesData.ANATOMY_ADDITIONS[params.aa]
            : false,
        styles: false,
      }
      this.dietInfo = {
        main: this.speciesData.DIET[params.d],
        additions:
          params.da > -1
            ? this.speciesData.ANATOMY_ADDITIONS[params.da]
            : false,
        styles: this.speciesData[params.ds],
      }
      this.clipboardStatus = 0
    },
    handlePDF() {
      this.saveAsPDF([
        this.parentingStyleInfo,
        this.reproductionInfo,
        this.anatomyInfo,
        this.dietInfo,
      ])
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  font-size: 0.8rem;
  margin-right: 12px;
}
#loading-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20vh;
}
</style>
