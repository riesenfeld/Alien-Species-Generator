<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn
        class="btn"
        :tile="!isNarrow"
        :rounded="isNarrow"
        :fab="isNarrow"
        :max-height="isNarrow ? 46 : undefined"
        :max-width="isNarrow ? 46 : undefined"
        :color="pdfSaved ? 'success' : 'primary'"
        v-bind="attrs"
        v-on="on"
      >
        <span v-if="isNarrow"><v-icon>mdi-file-pdf-box</v-icon></span>
        <span v-else
          >{{ pdfSaved ? 'PDF saved!' : 'Save as PDF' }}&nbsp;<v-icon
            >mdi-file-pdf-box</v-icon
          ></span
        >
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Give this species a name</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="speciesName"
          label="Name"
          hint="the name you want to give this species"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Never mind
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="speciesName.trim().length <= 0"
          @click="handleConfirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    pdfSaved: {
      type: Boolean,
      default: false,
    },
    isNarrow: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
    speciesName: '',
  }),
  methods: {
    handleConfirm() {
      this.$emit('pdf-save-event', this.speciesName)
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
