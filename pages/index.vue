<template>
  <div>
    <v-app-bar ref="appbar" fixed app>
      <div class="d-flex justify-space-between align-center nav-flex-row">
        <v-app-bar-title v-if="isNarrow" class="header-title-small"
          ><div>Alien</div>
          <div>Species</div>
          <div>Generator</div></v-app-bar-title
        >
        <h1 v-else class="header-title-large">Alien Species Generator</h1>
        <div class="nav-button-group">
          <v-btn
            color="primary"
            class="btn"
            :tile="!isNarrow"
            :rounded="isNarrow"
            :fab="isNarrow"
            :max-height="isNarrow ? 46 : undefined"
            :max-width="isNarrow ? 46 : undefined"
            @click="generate"
            >{{ isNarrow ? '' : 'Generate &nbsp;'
            }}<v-icon>mdi-autorenew</v-icon></v-btn
          >
          <v-btn
            :color="clipboardStatus < 1 ? 'primary' : 'success'"
            class="btn"
            :tile="!isNarrow"
            :rounded="isNarrow"
            :fab="isNarrow"
            :max-height="isNarrow ? 46 : undefined"
            :max-width="isNarrow ? 46 : undefined"
            @click="copyLinkToClipboard"
          >
            {{
              isNarrow
                ? ''
                : clipboardStatusOptions[clipboardStatus] + '&nbsp;'
            }}<v-icon>mdi-link-variant</v-icon></v-btn
          >
          <SaveModal
            :is-narrow="isNarrow"
            :pdf-saved="pdfSaved"
            @pdf-save-event="handlePDF"
          ></SaveModal>
        </div>
      </div>
    </v-app-bar>
    <ClientOnly>
      <v-main id="main">
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
          <v-progress-circular indeterminate size="100"></v-progress-circular>
          <h2>Generating...</h2>
        </div>
      </v-main>
    </ClientOnly>
  </div>
</template>

<script>
import { saveAsPDFMixin } from '../mixins/saveAsPDFMixin.js'
import InformationCard from '@/components/InformationCard.vue'
import SaveModal from '@/components/SaveModal.vue'
import speciesDataJSON from '@/data/species_data.json'

export default {
  name: 'IndexPage',
  components: { InformationCard, SaveModal },
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
      pdfSaved: false,
    }
  },
  computed: {
    isNarrow() {
      return this.$vuetify.breakpoint.width < 780
    },
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
      this.pdfSaved = false
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
          params.da > -1 ? this.speciesData.DIET_ADDITIONS[params.da] : false,
        styles: this.speciesData.DIET_STYLES[params.ds],
      }
      this.clipboardStatus = 0
    },
    handlePDF(speciesName) {
      this.saveAsPDF(speciesName, [
        this.parentingStyleInfo,
        this.reproductionInfo,
        this.anatomyInfo,
        this.dietInfo,
      ])
      this.pdfSaved = true
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-flex-row {
  width: 100%;
}
.header-logo {
  color: white;
  background-color: pink;
}
.header-title-small {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.75rem;
}
.header-title-large {
  font-size: 1.4rem;
  font-weight: normal;
}
.btn {
  font-size: 0.8rem;
  margin-right: 12px;
}
#loading-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
}
</style>
