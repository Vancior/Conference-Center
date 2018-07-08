<template>
  <div>
    <ul class="tabs">
      <li class="tab col s6"><a class="active" href="#tab1">未读</a></li>
      <li class="tab col s6"><a href="#tab2">已读</a></li>
    </ul>
    <div style="height: 1rem;"></div>
    <div id="tab1" class="row">
      <div class="container">
        <div v-for="item in notReadYet">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card">
              <div class="card-content">
                <h4 style="padding-top: 0;margin-top: 0;padding-bottom: 1%">{{readable_time(item.sent_time)}}</h4>
                <p>{{item.content}}.</p>
              </div>
              <div class="card-action right-align">
                <button class="btn green" @click="readMessage(item)">标记为已读</button>
              </div>
            </div>
          </div>
        </div>
        <pagination class="center-align" @page="go_not_read_page" v-bind:number="notread_total_num" v-bind:current="notread_index"></pagination>
      </div>
    </div>
    <div id="tab2" class="row">
      <div class="container">
        <div v-for="item in alreadyRead">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card">
              <div class="card-content">
                <h4 style="padding-top: 0;margin-top: 0">{{readable_time(item.sent_time)}}</h4>
                <p>{{item.content}}.</p>
              </div>
            </div>
          </div>
        </div>
        <pagination class="center-align" @page="go_read_page" v-bind:number="read_total_num" v-bind:current="read_index"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import Pagination from "../../include/Pagination";
    import {humanize_time} from "../../js/utils";
    export default {
        name: "PersonalMessage",
      components: {Pagination},
      data:function(){
          return{
            notReadYet:{},
            alreadyRead:{},
            notread_index:1,
            notread_total_num: 10,
            read_index:1,
            read_total_num: 10,
          }
        },
        methods:{
          readable_time:function(str){
            return humanize_time(str)
          },
          not_read_page: function (num) {
            this.notread_index = num;
          },
          read_page: function (num) {
            this.read_index = num;
          },
          not_read_refresh:function(){
            let that = this;
            this.$axios.post('/api/user/messages', {index:that.notread_index,size:3,state:0})
              .then(response => {
                  that.notReadYet=response.data.data.messages;
                  that.notread_total_num=response.data.data.page_num;
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
          read_refresh:function(){
            let that = this;
            this.$axios.post('/api/user/messages', {index:that.read_index,size:5,state:1})
              .then(response => {
                  that.alreadyRead=response.data.data.messages;
                  that.read_total_num=response.data.data.page_num;
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
          go_not_read_page: function(not_read_page) {
            this.notread_index = not_read_page;
            this.not_read_refresh();
          },
          go_read_page: function(read_page) {
            this.read_index = read_page;
            this.read_refresh();
          },
          readMessage:function(item){
            let that = this;
            this.$axios.post('/api/user/message/'+item.id, {})
              .then(response => {
                 ;
                }
              ).catch(
              error => {
                M.toast({
                  html: error,
                  classes: "rounded red darken-2"
                });
              }
            );
            this.read_refresh();
            this.not_read_refresh();
          }
        },
        computed:{
        },
        mounted(){
          this.$bus.emit('manage-change-title', {text: '我的消息'});
          let that = this;
          this.$axios.post('/api/user/messages', {index:that.notread_index,size:3,state:0})
            .then(response => {
                that.notReadYet=response.data.data.messages;
                that.notread_total_num=response.data.data.page_num;
              }
            ).catch(
            error => {
              M.toast({
                html: error,
                classes: "rounded red darken-2"
              });
            }
          );
          this.$axios.post('/api/user/messages', {index:that.read_index,size:5,state:1})
            .then(response => {
                that.alreadyRead=response.data.data.messages;
                that.read_total_num=response.data.data.page_num;
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
        created(){
          $(document).ready(function(){
            $('.tabs').tabs();
          });
        }
    }
</script>

<style scoped>
  .col .row {
    margin: 0;
  }
</style>
