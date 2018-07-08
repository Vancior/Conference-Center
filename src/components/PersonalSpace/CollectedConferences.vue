<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a href="#test1" class="active">未开幕&nbsp{{total_num[0]}}</a></li>
      <li class="tab col s4"><a href="#test2">已开幕&nbsp{{total_num[1]}}</a></li>
      <li class="tab col s4"><a href="#test3">已结束&nbsp{{total_num[2]}}</a></li>
    </ul>

    <div id="test1" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="center-align row"
             v-if="conferencesBefore.length===0"
             style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in this.conferencesBefore">
          <router-link v-bind:to="'/conference/'+item.id">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->

            <span class="card-title" style="font-weight: bold">
              {{item.title}}
            </span>

          </div>
          </router-link>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <!--<i class="material-icons right">language</i>-->
            <a class="secondary-content tooltipped" data-position="right" data-tooltip="取消收藏"
               @click="cancalCollect('notOpen',item.id)">
              <i class="material-icons">grade</i>
            </a>
          </span>
            <p>{{item.start_date.substr(0, 10)}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p>{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>
    <div id="test2" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="center-align row" v-if="conferencesOn.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in this.conferencesOn">
          <router-link v-bind:to="'/conference/'+item.id">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->

            <span class="card-title" style="font-weight: bold">
              {{item.title}}
            </span>

          </div>
          </router-link>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <!--<i class="material-icons right">language</i>-->
            <a class="secondary-content tooltipped" data-position="right" data-tooltip="取消收藏"
               @click="cancalCollect('opened', item.id)">
              <i class="material-icons">grade</i>
            </a>
          </span>
            <p>{{item.start_date.substr(0, 10)}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p>{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>


    <div id="test3" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="center-align row" v-if="conferencesAfter.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>


        <div class="card" v-for="item in conferencesAfter">
          <router-link v-bind:to="'/conference/'+item.id">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->

            <span class="card-title" style="font-weight: bold">
              {{item.title}}
            </span>

          </div>
          </router-link>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <!--<i class="material-icons right">language</i>-->
            <a class="secondary-content tooltipped" data-position="right" data-tooltip="取消收藏"
               @click="cancalCollect('enden', item.id)">
              <i class="material-icons">grade</i>
            </a>
          </span>
            <p>{{item.start_date.substr(0, 10)}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p class="conference-introduction">{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    name: 'CollectedConferences',
    created: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
        $('.tooltipped').tooltip();
      });

      let that = this;
      this.$axios.post('/api/user/getCollectConference', {"type": 'notOpen'})
        .then(response => {
            that.conferencesBefore = response.data.data.result;
            //console.log(JSON.stringify(response.data.data))
            that.total_num=response.data.data.total_num;
            //alert(JSON.stringify(response));
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );

      this.$axios.post('/api/user/getCollectConference', {"type": 'opened'})
        .then(response => {
            that.conferencesOn = response.data.data.result;
            //alert(JSON.stringify(response));
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );

      this.$axios.post('/api/user/getCollectConference', {"type": 'enden'})
        .then(response => {
            that.conferencesAfter = response.data.data.result;
            //alert(JSON.stringify(response));
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
    data: function () {
      return {
        conferencesBefore: {},
        conferencesOn: {},
        conferencesAfter: {},
        total_num:[]
      }
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', {text: '收藏的会议'});
    },
    methods: {
      cancalCollect: function (type, id) {
        this.$axios.post('/api/conference/cancel/collect/' + id, {
          token: sessionStorage.getItem("session")
        }).then(response => {
          let resp = response.data;
          if (resp.status === 'succ') {
            let that = this;
            this.$axios.post('/api/user/getCollectConference', {
              token: sessionStorage.getItem("session"),
              type: type
            }).then(response => {
              if (type === "notOpen") {
                that.conferencesBefore = response.data.data.result;
              }
              else if (type === 'opened') {
                that.conferencesOn = response.data.data.result;
              }
              else if (type === 'enden') {
                that.conferencesAfter = response.data.data.result;
              }
              M.toast({
                html: "<span style='font-weight: bold;'>取消成功</span>",
                classes: "rounded green darken-2"
              });
            }).catch(error => {
              M.toast({
                html: error,
                classes: "rounded red darken-2"
              });
            });
          }
          else {
            M.toast({
              html: "<span style='font-weight: bold;'>取消收藏失败</span>",
              classes: 'red rounded'
            });
          }
        }).catch(error => {
          M.toast({
            html: "<span style='font-weight: bold;'>ERROR!</span>",
            classes: 'red rounded'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .col .row {
    margin: 0;
  }
</style>
