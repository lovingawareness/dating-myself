<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        MANAGE MY DATA
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-btn
          @click="save"
          color="success"
          block
          x-large
        >
          Download My Data
        </v-btn>
        <v-file-input
          accept="application/json"
          label="Load Data From JSON File"
          id="jsonfileinput"
          @change="processFile"
          show-size
          full-width
        ></v-file-input>
        <v-btn
          @click="toggleOverlayClear"
          color="accent"
          block
          x-large
        >
          Clear Data
        </v-btn>

        <v-overlay
          v-model="overlayClear"
        >
          <v-card
            max-width="500px"
          >
            <v-card-title>
              Confirmation
            </v-card-title>
            <v-card-text>
              <h2>Are you sure you want to clear data? This will erase any new entries you've made that you haven't downloaded.</h2>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="clear"
                color="warning"
              >Yes, clear it</v-btn>
              <v-btn
                @click="toggleOverlayClear"
                color="success"
              >No, that was a mistake</v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { saveFile } from "@/utils/download"

export default Vue.extend({
  name: "ManageMyData",
  computed: {
    ...mapState(["identity", "essays"]),
    allData() {
      return {
        identity: this.identity,
        essays: this.essays
      }
    }
  },
  data() {
    return {
      overlayClear: false,
    }
  },
  methods: {
    ...mapActions(["clearAll", "loadStateFromFile"]),
    toggleOverlayClear() {
      this.overlayClear = !this.overlayClear
    },
    clear() {
      this.toggleOverlayClear()
      this.clearAll()
    },
    save() {
      let data = JSON.stringify(this.allData, null, 2)
      saveFile('dating-myself.json', data, 'application/json')
    },
    fileToJSON: async function (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
      })
    },
    processFile(file) {
      console.log(`processFile`)
      this.fileToJSON(file)
        .then(data => this.loadStateFromFile(data))
    }
  }
})
</script>