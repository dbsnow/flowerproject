<template>
  <li>
    <slot></slot>
  </li>
</template>
<script>
export default{
  name: 'my-li',
  data () {
    return {}
  }
}
</script>
<style scoped>
  li{
    list-style: none;
  }
</style>
