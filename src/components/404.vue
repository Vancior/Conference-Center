<template>
  <div>
  <!--<div>-->
    <navbar></navbar>
    <div class="center white section" :style="{'height': page_height+'px'}">
      <h1 class="grey-text">404</h1>
      <h5>您访问的页面不存在</h5>
      <a style="cursor: pointer" @click="go_back()"><h5>返回</h5></a>
    </div>
  </div>
  <!--<div class="ui middle aligned grid container" style="height: 100%;">-->
  <!--<div class="ui center aligned sixteen wide column">-->
  <!--<h1>404</h1>-->
  <!--<h2>您访问的页面不存在</h2>-->
  <!--<div class="btn btn-large blue-grey" @click="to_home()">返回主页</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>
<script>
import navbar from "@/include/NavBar";

export default {
  data: function () {
    return {
      page_height: $(window).height(),
      height: document.documentElement.clientHeight,
    }
  },
  components: { navbar },
  methods: {
    to_home() {
      this.$router.replace("/");
    },
    go_back() {
      this.$router.go(-2);
    }
  }
};
</script>

<style scoped>
  .center {
    padding-top: 5em;
  }

  h1 {
    font-size: 12em;
    margin: 0;
  }

  /*html {*/
  /*background: white;*/
  /*}*/

  /*h1 {*/
  /*font-size: 180px;*/
  /*color: #99A7AF;*/
  /*margin: 70px 0 0 0;*/
  /*}*/

  /*h2 {*/
  /*color: #DE6C5D;*/
  /*font-family: arial;*/
  /*font-size: 30px;*/
  /*font-weight: bold;*/
  /*letter-spacing: -1px;*/
  /*margin: -3px 0 39px;*/
  /*}*/

  /*p {*/
  /*width: 320px;*/
  /*text-align: center;*/
  /*margin-left: auto;*/
  /*margin-right: auto;*/
  /*margin-top: 30px*/
  /*}*/

  /*div {*/
  /*width: 320px;*/
  /*text-align: center;*/
  /*margin-left: auto;*/
  /*margin-right: auto;*/
  /*}*/

  /*a:link {*/
  /*color: #34536A;*/
  /*}*/

  /*a:visited {*/
  /*color: #34536A;*/
  /*}*/

  /*a:active {*/
  /*color: #34536A;*/
  /*}*/

  /*a:hover {*/
  /*color: #34536A;*/
  /*}*/
</style>
