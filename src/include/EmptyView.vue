<template>
  <div class="center-align" style="width: 100%">
    <div class="center-align row">
      <i class="large material-icons">inbox</i>
      <h5 style="font-weight: bold;">暂无数据</h5>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<style scoped>
.text-prompt{
  font-weight:bold;
}
</style>

<script>
export default {
  name: "EmptyView",
  props: ["message"],
  created: function () {
  }
}
</script>
