<template>
  <div class="crash" ref="box">
    <div @click="changeQuery">改变query</div>
    <div @click="changeMsg" class="heightBox" ref="inter2">改变Msg</div>
    <div v-lazy="msg" ref="intersection" class="inter">哈哈</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Register the router hooks with their names
// Component.registerHooks([
//   'beforeRouteEnter',
//   'beforeRouteLeave',
//   'beforeRouteUpdate' // for vue-router 2.2+
// ])
@Component
class UpdateTest extends Vue {
  public msg: string = '1231';
  public intersectionObserver!: IntersectionObserver;
  beforeRouteEnter(to, from, next): void {
    console.log('beforeRouteEnter');
    next();
  }
  beforeRouteUpdate(to, from, next): void {
    console.log('beforeRouteUpdate');
    next();
  }
  beforeRouteLeave(to, from, next): void {
    console.log('beforeRouteLeave');
    next();
  }
  mounted() {
    console.log('挂载');
    this.intersectionObserver = new IntersectionObserver(this.observerHandle);
    this.intersectionObserver.observe(this.$refs.intersection as HTMLElement);
    this.intersectionObserver.observe(this.$refs.inter2 as HTMLElement);
  }
  observerHandle(entries) {
    entries.forEach(item => {
      if (item.intersectionRatio > 0) {
        console.log(
          item.target.innerText + ' intersection交叉了 ',
          item.intersectionRatio
        );
      }
    });
  }
  changeQuery(): void {
    console.log('修改query');
    this.$router.push({ name: 'updateTest', params: { plan: 'private' } });
  }
  changeMsg(): void {
    this.msg = '' + Math.random();
  }
}
export default UpdateTest;
</script>
<style scoped>
.heightBox {
  height: 1500px;
  background-color: #cccccc;
}
.inter {
  height: 60px;
  background-color: #ff0000;
}
</style>