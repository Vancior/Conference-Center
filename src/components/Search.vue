<template>
  <div>
    <background></background>
    <navbar></navbar>
    <div class="white" style="width: 100%;">
      <div class="row" style="height: 1rem;"></div>
      <div class="row container">
        <div class="container">
          <div class="nav-wrapper searchBar">
            <form>
              <div class="input-field">
                <input id="search" type="search" class="grey-text text-lighten-1" v-model="search_keyword"
                       @keypress="enter_search($event)" @click="clear_keyword()">
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--<div class="row" style="height: 0.2rem;"></div>-->
      <div class="row container" style="margin-bottom: 0; padding-bottom: 1rem;">
        <div class="container" style="margin-bottom: 0">
          <div class="row" style="margin-bottom: 0;">
            <a class="waves-effect waves-light btn-small  light-blue darken-1"
               style="margin:0;padding:0 0.5rem;"
               @click="setDateSearchState()">
              <i class="material-icons left" style="">date_range</i>使用日期检索
            </a>
            <a class="waves-effect waves-light btn-small blue-grey darken-1"
               @click="toggle_fields"
               style="margin:0;padding:0 0.5rem;">
              <i class="material-icons left" style="">menu</i>
              使用领域检索
            </a>
          </div>
          <div class="row" v-show="date_search_state" style="margin-bottom: 0;">
            <form>
              <div class="row" style="margin-top: 1rem; margin-bottom: 0;">
                <div class="input-field col s6">
                  <i class="prefix material-icons">title</i>
                  <select id="date-type-select" v-model="date_type">
                    <option value="" disabled selected>请选择</option>
                    <option value="start">开始日期</option>
                    <option value="end">结束日期</option>
                    <option value="paper">投稿截止日期</option>
                    <option value="register">注册截止日期</option>
                  </select>
                  <label>选择日期类型</label>
                </div>
                <div class="input-field col s6">
                  <i class="medium material-icons prefix">event</i>
                  <input id="date-select" type="text" class="datepicker" v-model="date_detail"/>
                  <label for="date-select">选择日期</label>
                </div>
              </div>
              <div class="row" style="margin-bottom: 0">
                <div class="input-field col s6">
                  <label>
                    <input type="checkbox" v-model="is_keyword"/>
                    <span>在结果中检索</span>
                  </label>
                </div>
                <div class="input-field col s6 right-align">
                  <a class="waves-effect waves-light btn-small blue" style="margin:0rem 0rem;padding:0rem 0.5rem;" @click="date_search()">
                    <i class="material-icons left" style="margin-right: 0.5rem">search</i>
                    检索
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div class="row" v-if="show_fields" style="margin-bottom: 0; padding-top: 1rem;">
            <div class="col s3" v-for="field in fields">
              <div class="card-panel center-align grey lighten-4 grey-text text-darken-2"
                   @click="search_by_field_id(field.id)"
                   style="padding: 0.5rem; cursor: pointer">
                {{field.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="height: 0.3rem;"></div>
    </div>
    <div style="height:20px;"></div>

    <div>
      <div class="row container"
           v-show="!is_loading"
           style="max-width: 65rem;">

        <div class="card hoverable"
             v-for="(res,id) in conferences.result"
             :key="id">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 8rem; background:black;">
            <img style="opacity: 0.5; object-fit: cover; object-position: center -15rem;"
                 :src="res.conf_bg_img"
                 @click="$router.push('/conference/'+res.id)">
            <span class="card-title"
                  style="font-weight: bold; cursor: pointer;"
                  @click="$router.push('/conference/'+res.id)">
              {{res.title}}
            </span>
          </div>
          <div class="card-content">
            <div style="font-size: 1rem;">
              <span><strong>{{res.start_date.substring(0, 10)}}，</strong> </span>
              <span><strong>{{res.convening_place}}</strong></span>
            </div>
            <p style="height:1rem;"></p>
            <p class="limited">{{res.introduction}}</p>
          </div>
        </div>
        <EmptyView v-if="conferences.total_num <= 0" style="height: 25rem;"></EmptyView>
        <div class="preloader-wrapper big active" v-show="is_loading">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>
        </div>
      </div>
      <!--<div class="center-align" v-if="conferences.total_num > 0">-->
        <!--<Pagination @page="page"-->
                    <!--v-if="!search_by_field"-->
                    <!--:number="number"-->
                    <!--:current="current">-->
        <!--</Pagination>-->
        <!--<Pagination @page="search_field_page"-->
                    <!--v-if="search_by_field"-->
                    <!--:number="number"-->
                    <!--:current="current">-->
        <!--</Pagination>-->
      <!--</div>-->
    </div>
    <div style="height: 3rem;"></div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
  import background from '@/include/Background'
  import getURL, { mapUrl } from '../router/APIget';
  import axios from 'axios';
  import Pagination from "@/include/Pagination";
  import EmptyView from "@/include/EmptyView";
  import humanize_time from "@/js/utils"

  export default {
    name: 'Search',
    components: { navbar, background, getURL, axios, Pagination, EmptyView },
    data: function () {
      return {
        is_loading: false,
        number: 1,
        current: 1,
        search_field: 0,
        search_keyword: this.$route.params.keyword,
        lazy_keyword: "",
        related: [],
        loader: {
          active: false
        },
        conferences: {
          page_number: 1,
          result: [],
          total_num: 10,
        },
        date_search_state: false,
        date_type:'none',
        date_detail:'',
        is_keyword:false,
        show_fields: false,
        search_by_field: false,
        search_field_id: null,
        fields: [
          {
            name: "人工智能",
            id: 1,
          },
          {
            name: "机器学习",
            id: 2,
          },
          {
            name: "自然语言处理",
            id: 3,
          },
          {
            name: "自然科学",
            id: 4,
          },
          {
            name: "机械设计",
            id: 5,
          },
          // {
          //   name: "医学",
          //   id: 6,
          // },
          {
            name: "化学工程",
            id: 7,
          },
          {
            name: "管理学",
            id: 8,
          },
          {
            name: "金融学",
            id: 9,
          },
          {
            name: "天文学",
            id: 10,
          },
          {
            name: "材料科学",
            id: 11,
          },
          {
            name: "交通运输工程",
            id: 12,
          },
          {
            name: "航空航天技术",
            id: 13,
          },
        ],
      }
    },
    methods: {
      clear_keyword:function () {
        this.search_keyword="";
      },
      toggle_fields() {
        this.show_fields = !this.show_fields;
        this.date_search_state = false;
      },
      init: function () {
        let keywords_param = this.$route.params.keyword;
        if(keywords_param=='none'){
          keywords_param='';
          this.search_keyword="";
        }
        this.date_type=this.$route.params.type;

        if(this.$route.params.date==='0')
          this.date_detail='';
        else{
          this.date_detail=this.$route.params.date;
          this.date_detail=this.str_insert(this.date_detail,3,' ');
          this.date_detail=this.str_insert(this.date_detail,6,' ');
          this.date_detail=this.str_insert(this.date_detail,this.date_detail.length,' 00:00:00');
        }

        this.is_loading = true;

        let that = this;
        // axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
        this.$axios.post('/api/SearchConferences', {
          "keyword": keywords_param,
          "index": 1,
          "size": 100,
          "date_type":this.date_type,
          "date":this.date_detail
        }).then(function (response) {
          let resp = response.data;
          if (resp.status === "succ") {
            that.conferences = resp.data;
            that.number = resp.data.page_num;
            that.current = 1;
            let results = that.conferences.result;
            for (let i = 0; i < results.length; i++) {
              let res = results[i];
              let start = 1;
              let img_num = (start + i) % 4 + 1;
              res.conf_bg_img = "/static/bg" + img_num + ".jpg";
            }
          } else {
            M.toast({
              html:"<span style='font-weight: bold'>请求错误:"+ resp.info +"</span>",
              classes: "rounded red"
            });
          }
        }).catch(function (error) {
          M.toast({
            html:"<span style='font-weight: bold'>处理请求时发生错误</span>",
            classes: "rounded red"
          });
        }).then(ret=>{
          this.is_loading = false;
        });
      },
      str_insert:function (str,pos,stmp) {
        return str.slice(0,pos)+stmp+str.slice(pos,str.length);
      },
      enter_search: function (event) {
        if (event.keyCode === 13 && this.search_keyword.length > 0)
          this.$router.push("/search/" + this.search_keyword+"/0/none");
      },
      page: function (page) {
        this.is_loading = true;
        this.search_by_field = false;
        const field = this.search_keyword;
        this.current=page;
        let that = this;
        this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchConferences', {
          "keyword": field,
          "index": page,
          "size": 100,
          "date_type":this.date_type,
          "date":this.date_detail
        }).then(function (response) {
            let resp = response.data;
            if (resp.status === "succ") {
              that.conferences = resp.data;
              that.number = resp.data.page_num;
              that.current = 1;
              let results = that.conferences.result;
              for (let i = 0; i < results.length; i++) {
                let res = results[i];
                let start = 1;
                let img_num = (start + i) % 3 + 1;
                res.conf_bg_img = "/static/bg" + img_num + ".jpg";
                console.log(res.conf_bg_img);
              }
            } else {
              M.toast({
                html:"<span style='font-weight: bold'> 请求错误:"+ resp.info +"</span>",
                classes: "rounded red"
              });
            }
          }).catch(function (error) {
            M.toast({
              html:"<span style='font-weight: bold'> 请求错误</span>",
              classes: "rounded red"
            });
          }).then(ret=>{
            this.is_loading = false;
        });
      },
      search_by_field_id: function (field_id) {
        this.search_field_id = field_id;
        this.search_by_field = true;
        this.search_keyword = "";
        this.search_field_page(1);
      },
      search_field_page: function (page) {
        let that = this;
        this.is_loading=true;
        axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/search/subject', {
          "id": this.search_field_id,
          "index": page,
          "size": 100
        }).then(function (response) {
          let resp = response.data;
          if (resp.status === "succ") {
            that.conferences = resp.data;
            that.number = resp.data.page_num;
            that.current = 1;
            let results = that.conferences.result;
            for (let i = 0; i < results.length; i++) {
              let res = results[i];
              let start = 1;
              let img_num = (start + i) % 3 + 1;
              res.conf_bg_img = "/static/bg" + img_num + ".jpg";
              console.log(res.conf_bg_img);
            }
          } else {
            M.toast({
              html:"<span style='font-weight: bold'> 请求错误:"+ resp.info +"</span>",
              classes: "rounded red"
            });
          }
        }).catch(function (error) {
            M.toast({
              html:"<span style='font-weight: bold'> 请求错误</span>",
              classes: "rounded red"
            });
          }).then(ret=>{
            this.is_loading = false;
        });
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      },
      setDateSearchState :function () {
        this.date_search_state=!this.date_search_state;
        this.search_by_field = false;
        this.show_fields = false;
      },
      date_search:function () {
        let keyword_info="none";
        if(this.is_keyword){
            keyword_info=this.$route.params.keyword;
            console.warn("zhuhui");
        }
        let date_type_info=this.date_type;
        let date_info;
        if(this.date_detail==="")
            date_info="Jul082018";
        else
            date_info=(this.date_detail).replace(/\s+/g,"");

        this.$router.push('/search/'+keyword_info+'/'+date_info+'/'+date_type_info);
        location.reload();
      }
    },
    created() {
    },
    mounted() {
      $(document).ready(function(){
      });

      this.init();
    },
    updated: function () {
      $('select').formSelect();
      let options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.date_detail = date;
          console.log("tom");
        }
      };
      let elem = document.querySelector('#date-select');
      let instance = M.Datepicker.init(elem, options);
//      $('.datepicker').datepicker();
    },
  };
</script>

<style scoped>
  .searchBar {
    border-color: white;
    border-style: groove;
    border-width: 2px 2px;
    background-color: white;
  }

  .coference-title {
    margin: 0;
  }

  .coference-date {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }

  .conference-introduction {
    font-size: 16px;
  }

  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }

  .limited {
    display: block; /* or inline-block */
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 3.6rem;
    line-height: 1.8rem;
  }
</style>
