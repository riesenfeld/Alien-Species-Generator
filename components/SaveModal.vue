<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn> -->
        <v-btn class="btn" color="primary" v-bind="attrs" v-on="on"
          >Save as PDF &nbsp;<v-icon>mdi-file-pdf-box</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Give this species a name</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Name"
            hint="the name you want to give this species"
            :value="alienName"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Never mind
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleConfirm">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    alienName: '',
  }),
  methods: {
    handleConfirm() {
      this.dialog = false
      this.$emit('pdf-save-event', {
        name: this.alienName,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
