<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels
          v-model="panelNewTopic"
          focusable
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              ADD MORE ESSAYS
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-btn
                  v-for="(topic, i) in topics"
                  :key="i"
                  @click="addEssayFromTopic(topic.name)"
                  class="topic-chooser-button"
                >
                  {{ topic.name }}
                </v-btn>
                <v-btn
                  @click="panelNewTopic = []"
                  color="blue"
                  outlined
                  block
                >
                  Close
                </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue"
import { mapState, mapActions } from "vuex"

export default Vue.extend({
  name: "AddEssay",
  computed: {
    ...mapState([ "topics" ]),
  },
  data() {
    return {
      panelNewTopic: []
    }
  },
  methods: {
    ...mapActions(["addNewEssay"]),
    addEssayFromTopic(topicName) {
      this.panelNewTopic = []
      this.addNewEssay(topicName)
    }
  }
})
</script>

<style scoped>
.topic-chooser-button {
  margin: 5px !important;
}
</style>