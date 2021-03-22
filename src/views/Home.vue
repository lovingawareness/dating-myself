<template>
  <div class="home">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" lg="8">
        <ProfileHeader />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8" sm="6" lg="5">
        <Essays />
        <AddEssay />
      </v-col>
      <v-col cols="4" sm="4" lg="3">
        <RightSidebar />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" lg="8">
        <ManageMyData />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue"
import ProfileHeader from "@/components/ProfileHeader"
import Essays from "@/components/Essays"
import AddEssay from "@/components/AddEssay"
import RightSidebar from "@/components/RightSidebar"
import ManageMyData from "@/components/ManageMyData"
import { mapActions } from "vuex"

export default Vue.extend({
  name: "Home",
  components: {
    ProfileHeader, Essays, AddEssay, RightSidebar, ManageMyData
  },
  methods: {
    ...mapActions(["tryLoadingDataFromUrl"])
  },
  mounted: function () {
    if(this.$route.params.data) {
      this.tryLoadingDataFromUrl(this.$route.params.data)
    }
    this.$nextTick(function() {
      const hours = new Date().getHours()
      const isNightTime = hours >= 20 || hours <= 6
      console.log(`isNightTime = ${isNightTime}, hours = ${hours}`)
      this.$vuetify.theme.dark = isNightTime
    })
  }
})
</script>
