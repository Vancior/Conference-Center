<template>
  <div>
    <ul class="tabs">
      <li class="tab col s3"><a class="active" href="#test1">未审核&nbsp{{this.total_num[0]}}</a></li>
      <li class="tab col s3"><a href="#test4">需修改&nbsp{{this.total_num[2]}}</a></li>
      <li class="tab col s3"><a href="#test2">已录用&nbsp{{this.total_num[1]}}</a></li>
      <li class="tab col s3"><a href="#test3">被拒稿&nbsp{{this.total_num[3]}}</a></li>

    </ul>


    <div id="test1" class="col s12" style="padding-top: 1%">
      <div>

        <div class="center-align row" v-if="submissionsPending.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in submissionsPending">
          <div class="card-action">
        <span>
            投稿至 <span class="chip" style="margin: 0; cursor: pointer" v-on:click="goConference(item.conference_id)">{{item.conference_title}}</span>
          </span>
            <span class="right" style="line-height: 2.5rem;">
            <strong>创建于 {{ readable_time(item.total_submit) }} </strong>&nbsp&nbsp&nbsp
            <strong class="grey-text text-darken-1">未审核</strong>
          </span>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col s12 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5 style="font-weight: bold; margin: 0;cursor: pointer" v-on:click="goContribution(item.id)">
                  {{item.title}}</h5>
              </div>
            </div>
            <div class="row center-align" style="margin-bottom: 0;">
              <div v-bind:class="'col s'+12/(item.author.length < 4 ? item.author.length: 4)"
                   v-for="author in item.author">
                <h5 style="font-size: 1.25rem;">{{author.name}}</h5>
                <p>{{author.institution}}</p>
                <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="card" v-for="item in submissionsPending">-->
        <!--<div class="card-content">-->
        <!--<div class="row">-->
        <!--<div class="col s10 center-align">-->
        <!--&lt;!&ndash;<span class="flow-text">Card Title</span>&ndash;&gt;-->
        <!--<h5>{{item.title}}</h5>-->

        <!--</div>-->
        <!--<div class="col s2" style="text-align: right;">-->
        <!--<p style="color: #03a9f4">审稿中</p>-->
        <!--<p style="color: #4fc3f7">修改后录用</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row center-align">-->
        <!--<div v-bind:class="'col s'+12/item.author.length" v-for="author in item.author">-->
        <!--<p>{{author.email}}</p>-->
        <!--<p>{{author.name}}</p>-->
        <!--</div>-->

        <!--</div>-->

        <!--</div>-->
        <!--<div class="card-action" style="text-align: right">-->
        <!--<a href="#" style="color: #03a9f4">查看详情</a>-->
        <!--<a href="#" style="color: #bf360c">放弃投稿</a>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>


    <div id="test2" class="col s12" style="padding-top: 1%">
      <div>

        <div class="center-align row" v-if="submissionsPassed.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in submissionsPassed">
          <div class="card-action">
        <span>
            投稿至 <span class="chip" style="margin: 0;cursor: pointer" v-on:click="goConference(item.conference_id)">{{item.conference_title}}</span>
          </span>
            <span class="right" style="line-height: 2.5rem;">
            <strong>创建于 {{ readable_time(item.total_submit) }} </strong>&nbsp&nbsp&nbsp
            <strong class="green-text">通过</strong>
          </span>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col s12 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5 style="font-weight: bold; margin: 0;cursor: pointer" v-on:click="goContribution(item.id)">
                  {{item.title}}</h5>
              </div>
            </div>
            <div class="row center-align" style="margin-bottom: 0;">
              <div v-bind:class="'col s'+12/(item.author.length < 4 ? item.author.length: 4)"
                   v-for="author in item.author">
                <h5 style="font-size: 1.25rem;">{{author.name}}</h5>
                <p>{{author.institution}}</p>
                <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="test3" class="col s12" style="padding-top: 1%">
      <div>

        <div class="center-align row" v-if="submissionsRejected.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in submissionsRejected">
          <div class="card-action">
        <span>
            投稿至 <span class="chip" style="margin: 0;cursor: pointer" v-on:click="goConference(item.conference_id)">{{item.conference_title}}</span>
          </span>
            <span class="right" style="line-height: 2.5rem;">
            <strong>创建于 {{ readable_time(item.total_submit) }} </strong>&nbsp&nbsp&nbsp
            <strong class="red-text">拒稿</strong>
          </span>
          </div>
          <div class="card-content">
            <div class="row">

              <div class="col s12 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5 style="font-weight: bold; margin: 0;cursor: pointer" v-on:click="goContribution(item.id)">
                  {{item.title}}</h5>

              </div>

            </div>
            <div class="row center-align" style="margin-bottom: 0;">
              <div v-bind:class="'col s'+12/(item.author.length < 4 ? item.author.length: 4)"
                   v-for="author in item.author">
                <h5 style="font-size: 1.25rem;">{{author.name}}</h5>
                <p>{{author.institution}}</p>
                <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="test4" class="col s12" style="padding-top: 1%">
      <div>

        <div class="center-align row" v-if="submissionsFixing.length===0" style="margin-top: 12rem;">
          <i class="large material-icons">inbox</i>
          <h5 style="font-weight: bold;">暂无数据</h5>
        </div>

        <div class="card" v-for="item in submissionsFixing">
          <div class="card-action">
        <span>
            投稿至 <span class="chip" style="margin: 0; cursor: pointer" v-on:click="goConference(item.conference_id)">{{item.conference_title}}</span>
          </span>
            <span class="right" style="line-height: 2.5rem;">
            <strong>创建于 {{ readable_time(item.total_submit) }} </strong>&nbsp&nbsp&nbsp
            <strong class="blue-text">修改后录用</strong>
          </span>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col s12 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5 style="font-weight: bold; margin: 0;cursor: pointer" v-on:click="goContribution(item.id)">
                  {{item.title}}</h5>
              </div>
            </div>
            <div class="row center-align" style="margin-bottom: 0;">
              <div v-bind:class="'col s'+12/(item.author.length < 4 ? item.author.length: 4)"
                   v-for="author in item.author">
                <h5 style="font-size: 1.25rem;">{{author.name}}</h5>
                <p>{{author.institution}}</p>
                <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="card" v-for="item in submissionsPending">-->
        <!--<div class="card-content">-->
        <!--<div class="row">-->
        <!--<div class="col s10 center-align">-->
        <!--&lt;!&ndash;<span class="flow-text">Card Title</span>&ndash;&gt;-->
        <!--<h5>{{item.title}}</h5>-->

        <!--</div>-->
        <!--<div class="col s2" style="text-align: right;">-->
        <!--<p style="color: #03a9f4">审稿中</p>-->
        <!--<p style="color: #4fc3f7">修改后录用</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row center-align">-->
        <!--<div v-bind:class="'col s'+12/item.author.length" v-for="author in item.author">-->
        <!--<p>{{author.email}}</p>-->
        <!--<p>{{author.name}}</p>-->
        <!--</div>-->

        <!--</div>-->

        <!--</div>-->
        <!--<div class="card-action" style="text-align: right">-->
        <!--<a href="#" style="color: #03a9f4">查看详情</a>-->
        <!--<a href="#" style="color: #bf360c">放弃投稿</a>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>


    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h5>撤销投稿</h5>
        <p>你确定要撤销投稿吗？</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">确认</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">取消</a>
      </div>
    </div>


  </div>
</template>

<script>
  import {humanize_time} from '@/js/utils';

  export default {
    name: 'MySubmissions',
    data: function () {
      return {
        submissionsPending: {},
        submissionsPassed: {},
        submissionsRejected: {},
        submissionsFixing: {},
        selectedId: 0,
        total_num:[]
      }
    },
    methods: {
      readable_time: function (str) {
        return humanize_time(str);
      },
      cancelContribution: function (id) {

      },
      goContribution: function (id) {
        this.$router.push({
          path: '/contribution/' + id
        })
      },
      goConference: function (id) {
        this.$router.push({
          path: '/conference/' + id
        })
      }
    },
    created: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
        $('.modal').modal();
      });


      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
      });


      let that = this;
      this.$axios.post('/api/user/getContribution', {type: 'pending'})
        .then(response => {
          that.submissionsPending = response.data.data.contributions;
          that.total_num=response.data.data.total;
        }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });


      this.$axios.post('/api/user/getContribution', {type: 'passed'})
        .then(response => {
          //console.log('ok');
          that.submissionsPassed = response.data.data.contributions;
          //console.log(JSON.stringify(that.submissionsPassed));
        }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });


      this.$axios.post('/api/user/getContribution', {type: 'rejected'})
        .then(response => {
          //console.log('ok');
          that.submissionsRejected = response.data.data.contributions;
          //console.log(JSON.stringify(that.submissionsPending));
        }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });


      this.$axios.post('/api/user/getContribution', {type: 'fixing'})
        .then(response => {
          //console.log('ok');
          that.submissionsFixing = response.data.data.contributions;
          //console.log(JSON.stringify(that.submissionsPending));
        }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', {text: '我的投稿'});
    },
  }
</script>
