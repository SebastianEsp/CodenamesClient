<template>
<NavMenu/>
<div class="bg-gray-700 flex items-center justify-center h-screen">
  <router-view />
</div>
</template>

<script>
import Home from './components/Home.vue'
import NavMenu from './components/NavMenu.vue'
export default {
  name: "app",
  components: {
    Home,
    NavMenu,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Fira Code', monospace;
}
</style>