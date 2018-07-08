<template>
<div class="page-loader"
     :style="{'width': page_width+'px', 'height': page_height+'px'}">
  <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Loader",
  data: function() {
    return {
      page_width: $(window).width(),
      page_height: $(window).height(),
    }
  }
}
</script>

<style scoped>
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
