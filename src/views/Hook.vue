<template>
  <div>
    <Counter></Counter>
  </div>
</template>  

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Counter: () =>
      import(/* webpackChunkName: "CounterCom" */ '@/components/Counter.vue')
  }
})
class Hook extends Vue {
  mounted() {
    console.log('组建一mounted');
  }
  beforeDestroy() {
    console.log('组建一beforeDestroy');
  }
  destroyed() {
    console.log('组建一destroyed');
  }
}

export default Hook;
</script>