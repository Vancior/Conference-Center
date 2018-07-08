<template>
<div>
  <!--<NEXT></NEXT>-->
    <header>
      <nav class="top-nav white" style="height: 5.6rem;">
        <div id="top-title" class="container">
          <div class="nav-wrapper">
            <div class="row">
              <div class="col s12 m10 offset-m1">
                <h4 class="header red-text text-accent-2" style="font-size: 2rem;">{{ nav_title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <a href="#" data-target="nav-mobile" class="top-nav sidenav-trigger full hide-on-large-only">
          <i class="material-icons">menu</i>
        </a>
      </div>
      <ul id="nav-mobile" class="sidenav sidenav-fixed">
        <li>
          <div class="user-view" style="padding-top: 16%">
            <div class="background"
                 style="background-image: url(/static/office.jpg); background-size: cover; ">
              <!--<img src="https://materializecss.com/images/office.jpg">-->
            </div>

            <span v-on:click="goPersonalInfo" style="cursor: pointer"><img class="circle" v-bind:src=''global replacement'+personalInfo.avator' ></span>
            <span class="white-text name">{{personalInfo.name}}</span>
            <span class="white-text email">{{personalInfo.email}}</span>

          </div>
        </li>
        <li class="bold">
          <router-link to="/personalspace/collectedconferences" class="waves-effect">收藏的会议</router-link>
        </li>

        <li class="bold">
          <router-link to="/personalspace/registeredconferences" class="waves-effect">参加的会议</router-link>
        </li>
        <li class="bold">
          <router-link to="/personalspace/mysubmissions" class="waves-effect">我的投稿</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold">
          <router-link to="/personalspace/personalinformation" class="waves-effect">个人信息</router-link>
        </li>
        <li class="bold">
          <router-link to="/personalspace/accountset" class="waves-effect">账户设置</router-link>
        </li>
        <li class="bold">
          <router-link to="/personalspace/personalmessage" class="waves-effect">我的消息</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold">
          <a class="waves-effect" @click="logout()" style="cursor: pointer">注销</a>
        </li>
        <li class="bold">
          <router-link to="/" class="waves-effect">回到主页</router-link>
        </li>
      </ul>
    </header>
    <!--</div>-->
    <!--<div class="col s8">-->
      <!--<div class="contianer">-->
    <main>
      <div class="row">
        <div class="col s12" style="padding: 0;">
          <router-view></router-view>
        </div>
      </div>
    </main>

</div>
</template>


<script>
  import navbar from '@/include/NavBar';
  import NEXT from "../../include/NEXT";

  export default {
    name: "PersonalSpace",
    components: {NEXT, navbar },
    data: function () {
      return {
        nav_title: '',
        routes: {
          '/personalspace': '参加的会议',
        },
        personalInfo:{}
      };
    },
    methods:{
      goPersonalInfo:function () {
        this.$router.push({path:'/personalspace/personalinformation'})
      },
      logout: function () {
        sessionStorage.removeItem('session');
        this.$bus.emit("toIndex");
        this.$router.push('/');
      }
    },
    created: function () {
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      });
      this.$bus.on('manage-change-title', data => {
        this.nav_title = data.text;
      });



      let that = this;
      this.$axios.post('api/user/info', {})
        .then(response => {
            that.personalInfo = response.data.data;
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );
    },
    mounted: function () {
      this.$bus.emit("toPS");
      if (!sessionStorage.getItem('session')) {
        this.$router.replace('/login');
      }
      let module_path = Object.keys(this.routes).find(
        key => {
          let re = new RegExp('.*' + key + '.*');
          return re.test(this.$route.path);
        }
      );
      this.nav_title = this.routes[ module_path ];
      console.log(this.nav_title);
    },
    beforeDestroy: function() {
      this.$bus.off('manage-change-title');
    }
  }
</script>

<style scoped>
  /*@media only screen and (max-width: 992px) {*/
  /*nav .nav-wrapper {*/
  /*text-align: center;*/
  /*}*/
  /*header {*/
  /*padding-left: 0;*/
  /*}*/
  /*}*/

  /*header {*/
  /*padding-left: 300px;*/
  /*}*/

  /*#top-nav {*/
  /*height: 110px;*/
  /*}*/
  nav.top-nav {
    height: 140px;
  }

  .user-view {
    height: 220px;
  }

  a.sidenav-trigger.top-nav {
    left: 0;
  }

  body{
    color:#1a237e;
  }
  #top-title {
    margin: 0;
    max-width: 4160px;
    height: 100%;
  }

  #top-title .row {
    margin-bottom: 0;
  }

</style>


