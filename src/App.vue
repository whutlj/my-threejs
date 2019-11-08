<template>
  <div id="app">
    <router-view />
    <my-router>
      <template v-slot:default>
        我是默认的
      </template>
      <template v-slot:top="{user: {name}}">
        我是top{{name}}
      </template>
      <template v-slot:bot="{address: {address}}">
        我是bot{{address}}
      </template>
    </my-router>
    <my-link to="/path">跳转1</my-link>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      type: '1'
    };
  }
  // mounted() {},
  // methods: {
  //   changeType() {
  //     this.$lj.name = Math.random();
  //   }
  // }
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
a {
  text-decoration: none;
}
.btn {
  height: 32px;
  line-height: 32px;
  border-radius: 8px;
  display: inline-block;
  padding: 6px 8px;
  background: #ffff00;
}
</style>
