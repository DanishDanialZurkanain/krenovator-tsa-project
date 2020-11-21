<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="2">
          <navigation></navigation>
        </b-col>
        <b-col sm="10">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navigation from "./components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
