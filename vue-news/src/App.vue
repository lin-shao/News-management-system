<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import home from "./components/home.vue"
export default {
  components: { home },
  name: 'App'
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
