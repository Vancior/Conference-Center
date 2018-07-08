<template>
  <div id="wrapper">
    <Loader v-show="is_loading"></Loader>
    <NavBar></NavBar>
    <div class="row" style="margin-bottom: 0;">
      <div class="col s1"></div>
      <div class="card customize z-depth-0"
           style="width: 100%; padding-top: 2rem;
                  padding-bottom: 1rem; margin: 0;">
        <div class="black-text row container">
          <div class="col s12">
            <h4 class="center" style="font-weight: bold">{{resp.data.title}}</h4>
            <h5 class="center">{{resp.data.start_date}}，{{resp.data.convening_place}}</h5>
            <h5 style="font-weight: bold" class="center">{{conferenceState}}</h5>
            <h5>&nbsp</h5>
            <div class="row center-align">
              <div class="btn btn-large transparent"
                   @click="toCollect">
                <div :class="{'black-text': hasCollect === 0, 'grey-text': hasCollect !== 0}">
                  <i class="material-icons left">star_border</i>
                  <span v-show="hasCollect === 1">已</span>收藏
                </div>
              </div>
              <div class="btn btn-large transparent"
                   @click="toContribute">
                <div :class="{'black-text': contributeToLink !== 0, 'grey-text': contributeToLink === 0}">
                  <i class="material-icons left">send</i>
                  投稿
                </div>
              </div>
              <div id="register" class="btn btn-large transparent"
                   @click="toRegisterConference">
                <div :class="{'black-text': contributeToLink !== 0, 'grey-text': registerToLink === 0}">
                  <i class="material-icons left">group_add</i>
                  注册参会
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section" style="min-height: 35rem;">
        <div class="container">
          <div class="row" style="margin-bottom: 0;">
            <!--<div class="col s3">-->
            <!--<div style="height:6rem;"></div>-->
            <!--<div class="card-panel center-align z-depth-0" style="width: 100%; max-width: 15rem;">-->
            <!--<ul class="section table-of-contents"-->
            <!--style="padding-top: 0; padding-bottom: 0; padding-right: 1rem;">-->
            <!--<li><a style="cursor: pointer" :class="{'active':active_tab===0}" @click="switch_tab(0)">会议介绍</a></li>-->
            <!--<li><a style="cursor: pointer" :class="{'active':active_tab===1}" @click="switch_tab(1)">投稿须知</a></li>-->
            <!--<li><a style="cursor: pointer" :class="{'active':active_tab===2}" @click="switch_tab(2)">日程安排</a></li>-->
            <!--<li><a style="cursor: pointer" :class="{'active':active_tab===3}" @click="switch_tab(3)">住宿交通</a></li>-->
            <!--<li><a style="cursor: pointer" :class="{'active':active_tab===4}" @click="switch_tab(4)">联系我们</a></li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--</div>-->
            <div class="col s8">
              <div id="introduction" class="card-container">
                <ul class="collection with-header">
                  <li class="collection-header"><h4 style="">会议介绍</h4></li>
                  <li class="collection-item">
                    <p class="coference-date"><strong>开始日期</strong>：<span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                    </p>
                    <p class="coference-date"><strong>结束日期</strong>：<span style="font-size:1.1rem;">{{resp.data.end_date}}</span>
                    </p>
                  </li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>会议简介</strong></p>
                    <pre style="overflow: auto">{{resp.data.introduction}}</pre>
                  </li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>注册须知</strong></p>
                    <pre>{{resp.data.register_information}}</pre>
                  </li>
                </ul>
              </div>
              <div id="register_notion" class="card-container">
                <ul class="collection with-header">
                  <li class="collection-header"><h4 style="">投稿须知</h4></li>
                  <li class="collection-item">
                    <p class="coference-date"><strong>征稿开始：</strong><span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                    </p>
                    <p class="coference-date"><strong>征稿截止：</strong><span style="font-size:1.1rem;">{{resp.data.paper_ddl}}</span>
                    </p>
                    <p class="coference-date"><strong>查看审核结果日期：</strong><span style="font-size:1.1rem;">{{resp.data.employ_date}}</span>
                    </p>
                  </li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>征文要求</strong></p>
                    <pre>{{resp.data.essay_instructions}}</pre>
                  </li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>投稿信息</strong></p>
                    <pre>{{resp.data.essay_information}}</pre>
                  </li>
                  <li class="collection-item">
                    <p class="coference-title">
                      <strong>论文模板</strong>:&nbsp &nbsp &nbsp &nbsp
                      <a v-bind:href="'http://140.143.19.133:8001' + resp.data.paper_template">点我获取</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col s4">
              <div id="schedule" class="card-container">
                <ul class="collection with-header">
                  <li class="collection-header"><h4 style="">日程安排</h4></li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>会议议程</strong></p>
                    <pre>{{resp.data.schedule}}</pre>
                  </li>
                </ul>
              </div>
              <div id="traffic" class="card-container">
                <ul class="collection with-header">
                  <li class="collection-header"><h4 style="">住宿交通</h4></li>
                  <li class="collection-item">
                    <p class="coference-title"><strong>安排方式</strong></p>
                    <pre>{{resp.data.ATinformation}}</pre>
                  </li>
                </ul>
              </div>
              <div id="relation" class="card-container">
                <ul class="collection with-header">
                  <li class="collection-header"><h4 style="">联系我们</h4></li>
                  <li class="collection-item">
                    <!--<i class="material-icons circle deep-orange lighten-1">dialer_sip</i>-->
                    <p class="coference-title"><strong>联系方式</strong></p>
                    <pre>{{resp.data.contact}}</pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/include/NavBar";
  import axios from 'axios';
  import getURL, { mapUrl } from '@/router/';
  import Loader from '@/include/Loader';

  export default {
    name: "Conference",
    components: { NavBar, axios, getURL, Loader },
    data() {
      return {
        is_loading: true,
        active_tab: 0,
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",

        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
        conferenceState: '默认',
        hasCollect: 0,
        contributeToLink: 0,
        registerToLink: 0,
        contributeLink: '',
        registerLink: '',
        resp: {
          data: {}
        },
        display_id: 1
      }
    },
    mounted: function () {
      this.$bus.emit("toCF");
      this.$bus.on("nextCollect", this.toCollect)
    },
    beforeDestroy: function () {
      this.$bus.off("nextCollect")
    },
    methods: {
      toContribute: function () {
        if (!sessionStorage.getItem("session")) {
          M.toast({
            html: "<span style='font-weight: bold;'>请先登录</span>",
            classes: 'yellow rounded darken-2'
          });
          this.$router.push('/login');
          return;
        }
        this.contributeLink = "/contribute/" + this.conference_id;
        this.$router.push(this.contributeLink);
      },
      toRegisterConference: function () {
        if (!sessionStorage.getItem("session")) {
          M.toast({
            html: "<span style='font-weight: bold;'>请先登录</span>",
            classes: 'yellow rounded darken-2'
          });
          this.$router.push('/login');
          return;
        }
        this.registerLink = "/conference/" + this.conference_id + '/join';
        this.$router.push(this.registerLink);
      },
      toCollect: function () {
        if (!sessionStorage.getItem("session")) {
          M.toast({
            html: "<span style='font-weight: bold;'>请先登录</span>",
            classes: 'yellow rounded darken-2'
          });
          this.$router.push('/login');
          return;
        }

        this.$axios.post('/api/user/collect', {
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id
        }).then(response => {
          let resp = response.data;
          if (resp.status === 'succ') {
            this.hasCollect = 1;
            M.toast({
              html: "<span style='font-weight: bold;'>已收藏</span>",
              classes: 'green rounded'
            });
          }
          else {
            M.toast({
              html: "<span style='font-weight: bold;'>收藏失败</span>",
              classes: 'red rounded'
            });
          }
        }).catch(error => {
          M.toast({
            html: "<span style='font-weight: bold;'>ERROR!</span>",
            classes: 'red rounded'
          });
        })
      },

      isUser: function () {
        this.$test.post('/api/user/token').then(response => {
          if (response.data.type !== "user") {
            this.registerToLink = 0;
            this.contributeToLink = 0;
            this.hasCollect = 2;
          }
        }).catch(error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        });
      },
      isAbleRegister: function () {
        if (this.conferenceState !== "征稿中" && this.conferenceState !== "会议注册中") {
          this.registerToLink = 0;
        }
        else {
          this.registerToLink = 1;
        }
      },
      isAbleContribute: function () {
        if (this.conferenceState === "征稿中") {
          this.contributeToLink = 1;
        }
        else {
          this.contributeToLink = 0;
        }
      },

      getConferenceImg: function () {
        //this.conferenceImg = 'global replacement' + this.resp.data.backimg;
      },
      getConferenceState: function () {
        let state = this.resp.data.state;
        console.log("state:");
        console.log(this.resp.data.state + '...' + state);
        if (this.resp.data.state & 0b1000) {
          this.conferenceState = '已结束';
        }
        else if (this.resp.data.state & 0b0100) {
          this.conferenceState = '正在进行中';
        }
        else if (this.resp.data.state & 0b0001) {
          this.conferenceState = '征稿中';
        }
        else if (this.resp.data.state & 0b0010) {
          this.conferenceState = '会议注册中';
        }
      },
      switch_tab(i) {
        this.active_tab = i;
      }
    },

    created() {
      this.conference_id = parseInt(this.$route.params.id);
      this.$axios.post('/api/conference/iscollect/' + this.conference_id).then(response => {
        if (response.data.data === 1) {
          this.hasCollect = 1;
        }
        else {
          this.hasCollect = 0;
        }
      }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
        console.log(1);
      });
      this.$axios.post('/api/conference/' + this.conference_id).then(response => {
        if (response.status === 200) {
          if (response.data.status === "succ") {
            this.resp = response.data;
            console.log(this.resp.data);
            this.getConferenceState();
            this.isAbleRegister();
            this.isAbleContribute();
            this.getConferenceImg();
            this.is_loading = false;
            console.log("contribute to link:" + this.contributeToLink);
            console.log("conference state:" + this.conferenceState);
            this.isUser();
          }
          else {
            M.toast({
              html: response.data.info,
              classes: "rounded red darken-2"
            });
            this.$router.push('/404');
          }
        }
        else {
          M.toast({
            html: response.statusText,
            classes: "rounded red darken-2"
          });
        }
      }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
        console.log(1);
      });
    }
  }
</script>

<style scoped>
  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }

  .collection {
    border: none !important;
  }

  .collection-header {
    border: none !important;
  }

  .collection-item {
    border: none !important;
  }

  .btn.disabled, .disabled.btn-large, .disabled.btn-small, .btn-floating.disabled, .btn-large.disabled, .btn-small.disabled, .btn-flat.disabled, .btn:disabled, .btn-large:disabled, .btn-small:disabled, .btn-floating:disabled, .btn-large:disabled, .btn-small:disabled, .btn-flat:disabled, .btn[disabled], .btn-large[disabled], .btn-small[disabled], .btn-floating[disabled], .btn-large[disabled], .btn-small[disabled], .btn-flat[disabled] {
    background-color: #434343 !important;
  }

  .table-of-contents a {
    font-size: 1.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
  }

  #wrapper .btn {
    box-shadow: none;
  }

  #wrapper {
    font-family: '华文宋体', Helvetica, Arial, sans-serif;
    /*background-color: #D9CD90;*/
    /*font-weight: bold;*/
  }

  #wrapper pre {
    font-family: '华文宋体', Helvetica, Arial, sans-serif;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  #wrapper strong {
    font-weight: bolder;
  }

</style>
