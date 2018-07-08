<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a class="active" href="#test1">未开幕&nbsp{{total_num[0]}}</a></li>
      <li class="tab col s4"><a href="#test2">已开幕&nbsp{{total_num[1]}}</a></li>
      <li class="tab col s4"><a href="#test3">已结束&nbsp{{total_num[2]}}</a></li>
    </ul>

    <div id="test1" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="center-align row" v-if="conferencesBefore.length===0" style="margin-top: 12rem;">
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
            <i class="material-icons right">language</i>
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
            <i class="material-icons right">language</i>
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
              标题
            </span>

          </div>
          </router-link>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
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
  import EmptyView from '@/include/EmptyView'

  export default {
    name: 'RegisteredConferences',
    components: {EmptyView},
    created: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
      });


      let that = this;
      this.$axios.post('/api/user/getRegisterConference', {"type": 'notOpen'})
        .then(response => {
            that.conferencesBefore = response.data.data.result;
            that.total_num=response.data.data.total_num;
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );


      this.$axios.post('/api/user/getRegisterConference', {"type": 'opened'})
        .then(response => {
            that.conferencesOn = response.data.data.result;
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );


      this.$axios.post('/api/user/getRegisterConference', {"type": 'enden'})
        .then(response => {
            that.conferencesAfter = response.data.data.result;
            //console.log(JSON.stringify(that.conferencesOn));
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
    methods: {},
    mounted: function () {
      this.$bus.emit('manage-change-title', {text: '参加的会议'});
    },

  }
</script>

<style>
  .col .row {
    margin: 0;
  }
</style>
