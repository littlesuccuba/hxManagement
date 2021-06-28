<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 16px;
}
</style>
