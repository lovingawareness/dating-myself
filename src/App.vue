<template>
  <v-app>
    <TheNav />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue"
import TheNav from "@/components/TheNav"

export default Vue.extend({
  name: 'App',
  components: {
    TheNav
  },
})
</script>
