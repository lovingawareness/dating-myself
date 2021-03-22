<template>
  <div>
    <v-row
      v-for="(essay, i) in essays"
      :key="i"
    >
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ essay.topic.toUpperCase() }}
          </v-card-title>

          <v-card-subtitle>
            <v-select
              v-model="selectedPrompt[essay.id]"
              :items="essay.prompts"
              @change="setPrompt(essay.id)"
              label="Choose a writing prompt!"
              solo
            ></v-select>
          </v-card-subtitle>

          <v-card-text>
            <div
              contenteditable
              v-text="essay.response"
              :essay-id="essay.id"
              @blur="updateEssay"
              class="essay-response"
            ></div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="essay-remove-link">
        <v-btn
          @click="removeEssayHandler(essay.id)"
          small
          block
        >
          REMOVE {{ essay.topic.toUpperCase() }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue"
import { mapState, mapActions } from "vuex"
import _ from "underscore"

export default Vue.extend({
  name: "Essays",
  computed: {
    ...mapState(["essays"])
  },
  data() {
    return {
      selectedPrompt: {},
    }
  },
  created() {
    _.each(this.essays, essay => {
      this.selectedPrompt[essay.id] = essay.prompt
    })
  },
  methods: {
    ...mapActions(["setEssayPrompt", "setEssayResponse", "removeEssay"]),
    setPrompt(id) {
      console.log(`setPrompt(${id})`)
      this.setEssayPrompt({ id, prompt: this.selectedPrompt[id] })
    },
    updateEssay(evt) {
      let id = evt.target.attributes['essay-id'].value
      let response = evt.target.innerText
      console.log(`updateEssay @blur event handler on contenteditable for essay id ${id}`)
      this.setEssayResponse({ id, response })
    },
    removeEssayHandler(id) {
      // Do some kind of confirmation first
      this.removeEssay(id)
    }
  }
})
</script>

<style scoped>
.essay-remove-link {
  text-align: center;
}

.essay-response {
  white-space: pre-wrap;
}

[contenteditable="true"]:active,
[contenteditable="true"]:focus {
  /* border: none; */
  outline: none;
}
</style>
