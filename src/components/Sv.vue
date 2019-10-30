<template>
  <div>这是sc{{$lj.name}}
  </div>
</template>
<script>
export default {
  name: 'sv',
  mounted() {
  },
  methods: {
    changeLj() {
      this.$lj.name = Math.random()
    }
  }
}
</script>