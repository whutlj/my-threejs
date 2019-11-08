<template>
  <div>
    <slot name="top" :user="user">
      默认top
    </slot>
    <slot :person="person">
      默认default
    </slot>
    <slot name="bot" :address="address">
      默认bot
    </slot>
    <sv></sv>
  </div>
</template>
<script lang="ts">

interface User {
  name: string;
  age: number;
}
import { Vue, Component } from 'vue-property-decorator';
import Sv from './Sv.vue';

@Component({
  components: {
    Sv
  },
  props: {
    testProp: [Boolean],
    name: {
      default: function() {
        return [1]
      }
    }
  }
})
export default class Child extends Vue {
  private count: number = 0;
  private user: User = {
    name: '花椒',
    age: 20
  };
  private person: User = {
    name: '花音',
    age: 20
  };
  private address: object = {
    address: '成都'
  };
  mounted() {
    console.log('child组建挂载', this.testProp);
  }
  beforeDestroy() {
    console.log('组建三beforeDestroy');
  }
  destroyed() {
    console.log('组建三destroyed');
  }
  public callMe(name: string): string {
    console.log('emit call me');
    return name;
  }
}
</script>

