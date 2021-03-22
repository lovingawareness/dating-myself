import Vue from 'vue'
import Vuex from 'vuex'
import VuexReset from '@ianwalter/vuex-reset'
import _ from 'underscore'
import { nanoid } from 'nanoid'
import { topics } from '../data/topics.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [VuexReset()],
  state: {
    dataUrl: "",
    identity: {
      name: "",
      age: -1,
      location: "",
      genders: [],
      orientations: [],
      relationshipStatus: "",
      relationshipTypes: [],
      pronouns: "",
      looks: {
        heightCm: -1,
        bodyType: "",
      },
      background: {
        ethnicity: "",
        politics: "",
        languages: [
          ""
        ],
        education: "",
        employment: "",
        occupationName: "",
        employer: "",
        religion: "",
        religionSeriousness: "",
        astrologicalSign: "",
      },
      lifestyle: {
        smoking: "",
        drinking: "",
        marijuana: "",
        diet: "",
      },
      family: {
        children: "",
        pets: [
          "",
          ""
        ]
      }
    },
    essays: [
    ],
    topics: topics
  },
/*
███╗   ███╗██╗   ██╗████████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
████╗ ████║██║   ██║╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
██╔████╔██║██║   ██║   ██║   ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
██║╚██╔╝██║██║   ██║   ██║   ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║ ╚═╝ ██║╚██████╔╝   ██║   ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

*/
  mutations: {
    // For vuex-reset
    reset: () => { },

    initializeStore(state, data) {
      console.log(`Vuex mutation initializeStore with data from file:`)
      console.dir(data)
      this.replaceState(
        Object.assign(state, data)
      )
    },

    initializeStoreFromLocalStorage(state) {
      console.log("Vuex mutation initializeStore called.")
      if (localStorage.getItem('store')) {
        console.log(`Vuex mutation initializeStore: found localStorage item "store"`)
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },

    clearLocalStorage() {
      console.log("Vuex mutation clearLocalStorage called.")
      if (localStorage.getItem('store')) {
        localStorage.removeItem('store')
        console.log("Vuex mutation clearLocalStorage: CLEARED")
      }
    },

    addNewEssay(state, topicName) {
      console.log(`Vuex mutation addNewEssay with topicName ${topicName} called.`)
      let topic = _.findWhere(state.topics, { name: topicName })
      if (topic) {
        let id = nanoid(5)
        console.log(`Vuex mutation addNewEssay creating new essay with id ${id}`)
        state.essays.push({
          id: id,
          topic: topic.name,
          prompt: "",
          prompts: topic.prompts,
          response: "Click here to edit"
        })
      }
    },

    setEssayPrompt(state, { id, prompt }) {
      console.log(`Vuex mutation setEssayPrompt with id ${id} and prompt ${prompt}`)
      console.log("Current state.essays:")
      console.dir(state.essays)
      let essay = _.findWhere(state.essays, { id: id })
      if (essay) {
        // Check that there's not already an essay with this 
        // topic/prompt combo, so we can avoid accidental duplicates.
        if (!_.findWhere(state.essays, { topic: essay.topic, prompt: prompt })) {
          // Then let's update this essay
          essay.prompt = prompt
        }
      } else {
        console.log(`Oops, setEssayPrompt tried to add a prompt to a non-existent essay by ID ${ id }`)
      }
    },

    setEssayResponse(state, { id, response }) {
      let essay = _.findWhere(state.essays, { id: id })
      if (essay) {
        if (response) {
          essay.response = response
        } else {
          console.log(`Oops, mutation setEssayResponse isn't going to set a blank response to essay id ${id}.`)
        }
      } else {
        console.log(`Oops, setEssayResponse tried to add a response to a non-existent essay by ID ${ id }`)
      }
    },

    removeEssay(state, id) {
      console.log(`Vuex mutation removeEssay on essay id ${id}`)
      state.essays = _.filter(state.essays, essay => essay.id !== id)
    },

    updateOrientations(state, orientations) {
      state.identity.orientations = orientations
    },

    updateGenders(state, genders) {
      state.identity.genders = genders
    },

    updateRelationshipTypes(state, relationshipTypes) {
      state.identity.relationshipTypes = relationshipTypes
    },

    updateRelationshipStatus(state, relationshipStatus) {
      state.identity.relationshipStatus = relationshipStatus
    }
  },
/*
         █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
        ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
        ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
        ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
        ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
        ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

*/
  actions: {
    // Not going to work, URL size limit is 2K and we'll hit that with one essay
    // Still it's neat to think about
    // tryLoadingDataFromUrl({ commit }, uriEncodedData) {
    //   let data = JSON.parse(decompressFromEncodedURIComponent(uriEncodedData))
    //   if (data) {
    //     commit("loadDataFromUrl", data)
    //   }
    // },
    // createDataUrl({ commit }) {
    //   commit("createDataUrl")
    // },

    loadStateFromFile({ commit }, jsonData) {
      commit("initializeStore", jsonData)
    },

    clearLocalStorage({ commit }) {
      commit("clearLocalStorage")
    },

    clearState({ commit }) {
      commit("reset")
    },

    clearAll({ commit }) {
      commit("clearLocalStorage")
      commit("reset")
    },

    addNewEssay({ commit }, topic) {
      console.log(`Vuex action addNewEssay with topic ${topic}`)
      commit("addNewEssay", topic)
    },

    setEssayPrompt({ commit }, { id, prompt }) {
      console.log(`Vuex action setEssayPrompt on essay id ${id} with prompt ${prompt}`)
      commit("setEssayPrompt", { id, prompt })
    },

    setEssayResponse({ commit }, { id, response }) {
      console.log(`Vuex action setEssayResponse on essay id ${id}`)
      commit("setEssayResponse", { id, response })
    },
    
    removeEssay({ commit }, id) {
      console.log(`Vuex action removeEssay on essay id ${id}`)
      commit("removeEssay", id)
    },

    updateOrientations({ commit }, orientations) {
      commit("updateOrientations", orientations)
    },

    updateGenders({ commit }, genders) {
      commit("updateGenders", genders)
    },

    updateRelationshipTypes({ commit }, relationshipTypes) {
      commit("updateRelationshipTypes", relationshipTypes)
    },

    updateRelationshipStatus({ commit }, relationshipStatus) {
      commit("updateRelationshipStatus", relationshipStatus)
    },
  },
  modules: {
  }
})

// https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  console.log(`Saving current state to localStorage...`)
  localStorage.setItem('store', JSON.stringify(state))
})

export default store