<template>
  <div v-bind:style="{height: height+'px', width:width+'px', opacity:opacity}" class="blue-grey lighten-4" style="z-index:-1; opacity:0.2;position: fixed;top: 0;right: 0;top: 0;bottom: 0;margin: 0;">
  </div>
</template>

<script>
export default {
  props: {
    opacity: {
      default: 0.2
    },
//    src: {
//      default:
//        "/static/green_bg.jpg"
//    }
  },
  data: function() {
    let width = 0,
      height = 0;
    if (window) {
      window.addEventListener(
        "resize",
        function(event) {
          this.width = event.currentTarget.innerWidth;
          this.height = event.currentTarget.innerHeight;
        }.bind(this)
      );
      width = window.innerWidth;
      height = window.innerHeight;
    }
    return {
      width,
      height
    };
  },
  computed: {
    // width: function() {
    //   if (window) {
    //     return window.innerWidth;
    //   }
    //   return 0;
    // },
    // height: function() {
    //   if (window) {
    //     return window.innerHeight;
    //   }
    //   return 0;
    // }
  }
};
</script>

<style>
.fixe-position-background {
  position: fixed;
  top: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
}
</style>
