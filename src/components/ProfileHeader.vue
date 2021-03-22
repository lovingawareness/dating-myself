<template>
  <v-row>
    <v-col cols="2" class="profile-thumbnail-container">
      <v-img
        :src="require('@/assets/placekitten_200.jpeg')"
        max-height="200"
        max-width="200"
        class="profile-thumbnail"
      ></v-img>
    </v-col>
    <v-col cols="10">
      <h1>{{ identity.name }}</h1>
      <h2>{{ identity.age }} 🫀 {{ identity.location }}</h2>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue"
import { mapState } from "vuex"

export default Vue.extend({
  name: "ProfileHeader",
  computed: {
    ...mapState(["identity"])
  }
})
</script>

<style scoped>
.profile-thumbnail {
  border-radius: 50%;
}
</style>