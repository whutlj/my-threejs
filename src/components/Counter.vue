<template>
  <div>
    <span class="count">{{count}}</span>
    <div @click="increment" class="btn">添加</div>
    <div class="fn-btn" @click="clickMe">出发</div>
    <child>
      <template v-slot:top="{ user }">
        <div>外部定义top{{user.name}}</div>
      </template>
      <template v-slot:default="{ person }">
        <div>外部定义default{{person.name}}</div>
      </template>
      <template v-slot:bot>
        <div>外部定义bot{{user.name}}</div>
      </template>
    </child>
    <div class="" @click="instanceCall">点击执行</div>
    <div class="not-visible" v-show="false">未显示</div>
  </div>
</template>
<script lang="ts">
import { getName, DecoratorClass } from '@/assets/js/nm'; // @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';
import sum from '../assets/js/jest';
import { DecoratedClass } from 'vue-class-component/lib/declarations';

@Component({
  name: 'counter11',
  components: { Child: () => import('./Child.vue') }
})
export default class Counter extends Vue {
  @Prop() private propClick: any;
  private count: number = 0;
  private instance!: DecoratorClass;
  private user: object = {
    name: 'outer'
  };
  mounted() {
    this.instance = new DecoratorClass('lj');
    console.log('组建二mounted');
  }
  beforeDestroy() {
    console.log('组建二beforeDestroy');
  }
  destroyed() {
    console.log('组建二destroyed');
  }
  public increment() {
    this.count++;
  }
  public instanceCall() {
    const index: number = Math.floor(Math.random() * 2);
    this.instance.method(['lj', 'ls'][index]);
  }
  public clickMe() {
    const arr: any[] = [1, '字符串', true];
    console.log(arr[1]);
    const num: number | undefined = undefined;
    console.log(
      'undefined和null是所有类型的子类型, strictNullChecks配置为true后，null和undefined只能用在void和自身，应该设置为true，使用联合类型'
    );
    this.propClick('yes');
    console.log(typeof this.clickMe);
    console.log(typeof Symbol.for('12'));
  }
}
</script>

