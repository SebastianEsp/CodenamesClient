<template>
  <Button text="Start Game" href="/game"></Button>
  
</template>

<script>
import Button from './Button.vue'
export default {
  name: "Home",
  components: {
    Button
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>