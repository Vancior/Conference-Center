<template>
  <div>
    <header>
      <nav class="top-nav" style="height: 6rem; background-color: white">
        <div id="top-title" class="container">
          <div class="nav-wrapper">
            <div class="row">
              <div class="col s12 m10 offset-m1">
                <h4 class="header red-text text-accent-2">{{ nav_title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--<div class="container">-->
      <div>
        <a href="#" data-target="nav-mobile" class="top-nav sidenav-trigger full hide-on-large-only">
          <i class="material-icons">menu</i>
        </a>
      </div>
      <ul id="nav-mobile" class="sidenav sidenav-fixed">
        <li>
          <div class="user-view">
            <div class="background" style="background-size: cover;"
                 v-bind:style="{'background-image': 'url(/static/bg12.jpg)'}">
            </div>
            <span><img class="circle" v-bind:src="user_type==='institution' ? $image(back_img): $image(user_avatar)"></span>
            <!-- 机构在注册时提示“上传机构头像”，且注册之后也没有地方修改，我的理解解释应该上传一个会徽，所以这个图应该显示在头像而不是背景 -->
            <h6><span class="white-text">{{ user_name }}</span></h6>
            <h6><span class="white-text">{{ user_email }}</span></h6>
            <h6><span class="white-text">{{ institution }}</span></h6>
          </div>
        </li>
        <li class="bold" v-bind:class="{ active: menu_active === 0 }">
          <router-link to="/orgspace" @click="toOS" class="waves-effect">会议管理</router-link>
        </li>
        <li class="bold" v-bind:class="{ active: menu_active === 1 }">
          <router-link to="/orgspace/new/conference" class="waves-effect">发布新会议</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold" v-if="is_superuser" v-bind:class="{ active: menu_active === 2 }">
          <router-link to="/orgspace/principals" class="waves-effect">工作人员管理</router-link>
        </li>
        <!--<li class="bold" v-if="is_superuser" v-bind:class="{ active: menu_active === 3 }">
          <router-link to="/orgspace/info" class="waves-effect">机构信息设置</router-link>
        </li>-->
        <li class="bold" v-bind:class="{ active: menu_active === 4 }">
          <router-link to="/orgspace/account" class="waves-effect">账户设置</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold">
          <!--<router-link to="/" class="waves-effect" @click="sessionStorage.removeItem('session')">退出管理中心并注销</router-link>-->
          <a class="waves-effect" @click="logout()" style="cursor: pointer">注销</a>
        </li>
        <li class="bold">
          <router-link to="/" class="waves-effect">回到主页</router-link>
        </li>
      </ul>
    </header>
    <main>
      <div class="row" style="margin-bottom: 0;">
        <div class="col s12" style="padding: 0;">
          <!--<transition name="slide">-->
          <router-view></router-view>
          <!--</transition>-->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';

  export default {
    name: "Main",
    components: { navbar },
    data: function () {
      return {
        nav_title: '',
        menu_active: 0,
        is_superuser: false,
        user_type: '',
        user_avatar: '',
        user_name: '',
        user_email: '',
        institution: '',
        back_img: ''
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      });
      this.$bus.on('manage-change-title', data => {
        this.nav_title = data.text;
        if (data.text === '会议管理')
          this.menu_active = 0;
        else if (data.text === '发布新会议')
          this.menu_active = 1;
        else if (data.text === '工作人员管理')
          this.menu_active = 2;
        /*else if (data.text === '机构信息设置')
          this.menu_active = 3;*/
        else if (data.text === '账户设置')
          this.menu_active = 4;
        // else {
        //   M.toast({
        //     html: "<span style='font-weight: bold'>非法页面</span>",
        //     classes: "rounded red"
        //   });
        // }
      });
    },
    mounted: function () {
      this.$bus.emit("toOS");

      if (!sessionStorage.getItem('session')) {
        this.$router.replace('/login');
      }
      if(sessionStorage.getItem("type")){
        this.user_type=sessionStorage.getItem('type');
        console.log(this.user_type);
      }
      this.$axios.post('/api/principal/info', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          if (rsp.data.data.principal.power === 'all') {
            this.is_superuser = true;
          }
          this.user_avatar = rsp.data.data.principal.avator;
          this.user_name = rsp.data.data.principal.name;
          this.user_email = rsp.data.data.principal.email;
          this.institution = rsp.data.data.institution.name;
          this.back_img = rsp.data.data.institution.backimg;
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })
      //   let module_path = Object.keys(this.routes).find(
      //     key => {
      //       let re = new RegExp('.*' + key + '.*');
      //       return re.test(this.$route.path);
      //     }
      //   );
      //   this.nav_title = this.routes[ module_path ];
      //   console.log(this.nav_title);
    },
    beforeDestroy: function () {
      this.$bus.off('manage-change-title');
    },
    methods: {
      toOS: function () {
        this.$bus.emit("toOS")
      }
      ,
      logout: function () {
        sessionStorage.removeItem('session');
        this.$bus.emit("toIndex");
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  nav.top-nav {
    height: 140px;
  }

  .user-view {
    height: 215px;
  }

  a.sidenav-trigger.top-nav {
    left: 0;
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
