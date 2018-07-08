<template>
  <div id="top">
    <nav class="white" style="box-shadow: 0 3px 3px #aeaeae; -webkit-box-shadow:none;">
      <ul id="dropdown1" class="dropdown-content">
        <li><router-link class="grey-text text-darken-3" to="/login">登录</router-link></li>
        <li><router-link class="grey-text text-darken-3" to="/user/register">个人注册</router-link></li>
        <li><router-link class="grey-text text-darken-3" to="/institution/register">机构注册</router-link></li>
      </ul>
      <div class="nav-wrapper">
        <div class="brand-logo center"
             style="color: #313131; cursor: pointer; font-family: 'Avenir'; font-weight: 500;"
             @click="$router.push('/')"
             v-if="!in_search">
          <img src="/static/logo.png" style="height: 2rem;">
          Conference Center
        </div>
        <ul class="right hide-on-med-and-down"
            v-show="!in_search"
            style="color: #313131;">
          <li>
            <a style="color: #313131;" @click="toggle_search">
              <i class="material-icons left">search</i> 搜索
            </a>
          </li>
          <li v-if="!has_logged_in">
            <a class="dropdown-trigger" style="color: #313131;" data-target="dropdown1">
              <i class="material-icons left">account_circle</i>
              <span>登录/注册</span>
              <i class="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        </ul>
        <div class="input-field" style="color: #313131;" v-if="in_search">
          <input id="search" style="color: #313131;" type="search" v-model="search_keyword" @keypress="enter_search($event)">
          <label class="label-icon" style="color: #313131;" for="search">
            <i class="material-icons" style="color: #313131;">search</i>
          </label>
          <i class="material-icons" style="color: #313131;" @click="toggle_search">close</i>
        </div>
      </div>
    </nav>
    <div v-if="false" class="overlay-trigger">
      <div class="fixed-action-btn" v-if="has_logged_in === 1">
        <ul>
          <li v-if="user_type==='scholar'">
            <span class="mobile-fab-tip">个人空间</span>
            <a class="btn-floating btn-large grey darken-3"
               data-position="left"
               style="cursor: pointer"
               @click="jump_to('/personalspace')">
              <i class="large material-icons">person</i>
            </a>
          </li>
          <li v-if="user_type==='institution'">
            <span class="mobile-fab-tip">管理空间</span>
            <a class="btn-floating btn-large grey darken-3"
               data-position="left"
               style="cursor: pointer"
               @click="jump_to('/orgspace')">
              <i class="large material-icons">person</i>
            </a>
          </li>
          <li v-if="user_type==='manager'">
            <span class="mobile-fab-tip">管理空间</span>
            <a class="btn-floating btn-large grey darken-3"
               data-position="left"
               style="cursor: pointer"
               @click="jump_to('/review/application')">
              <i class="large material-icons">person</i>
            </a>
          </li>
          <li>
            <span class="mobile-fab-tip">注销</span>
            <a class="btn-floating red darken-2"  data-position="left" @click="choose_logout()">
              <i class="material-icons">exit_to_app</i>
            </a>
          </li>
          <li>
            <span class="mobile-fab-tip">返回顶部</span>
            <a class="btn-floating yellow darken-2"  data-position="left" @click="back_top()">
              <i class="material-icons">arrow_upward</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="fixed-action-btn" v-else>
        <a class="btn-floating btn-large grey darken-3" data-position="left" @click="back_top()">
          <i class="large material-icons">arrow_upward</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      in_search: false,
      search_keyword:"",
      has_logged_in: 0,
      user_type:""
    };
  },

  methods: {
    jump_to(link) {
      this.$router.push(link);
    },

    choose_login: function () {
      if(sessionStorage.getItem("session")) {
        this.has_logged_in = 1;
      }
      else {
        this.has_logged_in = 0;
      }
    },

    choose_logout: function () {
      sessionStorage.removeItem("session");
      this.$axios.post('/api/user/logout').then(response => {
        M.toast({
          html:"<span style='font-weight: bold'>已注销</span>",
          classes: "rounded yellow darken-2"
        });
        this.$router.replace("/");

        //renew
        this.choose_login();
        $(document).ready(function(){
          $('.fixed-action-btn').floatingActionButton();
          $(".dropdown-trigger").dropdown();
        });

      })
        .catch(error => {
          M.toast({
            html:"<span style='font-weight: bold'>注销失败</span>",
            classes: "rounded red darken-2"
          });
        })
    },

    toggle_search() {
      this.in_search = !this.in_search;
    },
    enter_search: function (event) {
      if (event.keyCode === 13 && this.search_keyword.length > 0)
        this.$router.push("/search/" + this.search_keyword+"/0/none");
    },
    back_top: function(){
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    },
    go_to_userspace: function() {
      this.$router.push("/personalspace");
    },
    overlay(event) {
      let ol = $('.overlay');
      if (ol.css('display') === 'none') {
        ol.css({
          'display': 'block'
        });
        width = window.innerWidth;
      }
    },
    hideOverlay(event) {
      let ol = $('.overlay');
      if (ol.css('display') === 'block') {
        ol.css({
          'display': 'none'
        });
      }
    },
    init_fab_tip: function () {
      let width = 0;
      $('.overlay-trigger').click(this.overlay);
      $('.overlay').click(this.hideOverlay);
      $(window).on("scroll", this.hideOverlay);
    }
  },
  created: function() {
    if(sessionStorage.getItem("type")){
      this.user_type=sessionStorage.getItem('type');
    }
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
      $(".dropdown-trigger").dropdown();
    });
    this.init_fab_tip();
    this.choose_login();
  },
}
</script>

<style scoped>
nav ul li a:hover {
  background-color: #f0f0f3;
}
.nav-fix{
  position:fixed;
  top:0;
  z-index:990;
  height:3rem;
  width:100%;
}

  .overlay {
    display: none;
    background-color: #E1E1E1;
    opacity: 0.80;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 900;
  }
  .fixed-action-btn ul {
    display: none;
  }
  .fixed-action-btn:hover ul {
    display: block;
  }
  .material-tooltip {
    display: none !important;
  }
  .mobile-fab-tip {
    position: fixed;
    right: 85px;
    padding: 4px 10px 4px 10px;
    text-align: right;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 2px;
    font-size: 14px;
    color: #424242;
    opacity: 0;
  }
  .mobile-fab-tip {
    -webkit-animation: fadein 1s;
    -moz-animation: fadein 1s;
    -o-animation: fadein 1s;
    animation: fadein 1s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    -o-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  @keyframes fadein {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-o-keyframes fadein {
    /* Opera */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

</style>
