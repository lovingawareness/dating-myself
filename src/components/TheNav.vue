<template>
  <v-app-bar
    app
    color="black"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Your hands holding your own heart"
        class="shrink mr-2"
        contain
        :src="require('@/assets/manos-corazon-png.png')"
        transition="scale-transition"
        width="40"
      />
      Dating Myself
    </div>

    <v-spacer></v-spacer>

    <ThemeToggleButton />
  </v-app-bar>
</template>

<script>
import Vue from "vue"
import ThemeToggleButton from "@/components/ThemeToggleButton"

export default Vue.extend({
  name: "TheNav",
  components: {
    ThemeToggleButton
  }
})
</script>