<template>
  <div id="app">
    <Home />
    <router-view />
  </div>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');

#app {
  font-family: 'Prompt', sans-serif;
}
</style>
