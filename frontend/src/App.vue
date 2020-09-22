<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import DataTransport from "./dataTransport";

export default {
  name: "App",
  created() {
    const transport = new DataTransport();
    console.log(transport);
  },
};
</script>

<style>
</style>
