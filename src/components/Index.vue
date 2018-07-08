<template>
  <div>
    <NavBar></NavBar>
    <!--<NEXT></NEXT>-->
    <div class="carousel carousel-slider center" style="height: 30rem;">

      <div class="carousel-item white-text index_page_slide" href="#one!"
           v-for="slide in slides.slides"
           :style="{'background': slides.bg_overlay+'url('+slide.bg+')'}">
        <div style="height: 5rem"></div>
        <h3 style="font-size:2.5rem; font-weight: bold">{{slide.title}}</h3>
        <h5>{{slide.time}},&nbsp{{slide.convening_place}}</h5>
        <h5>{{slide.event}}</h5>
        <div class="carousel-fixed-item center">
          <a class="btn btn-large waves-effect white grey-text text-darken-2"
             style="bottom: 3rem; font-weight: bold;" @click="$router.push('/conference/'+slide.conference_id)">
          了解更多
        </a>
      </div>
      </div>
    </div>

    <div class="grey section lighten-5" style="padding-top: 3rem; padding-bottom: 1rem;">
      <div class="container" style="width: 85%; max-width: 90rem;">
        <div class="row">
          <div class="col s7"
               style="height:100%;">

            <ul class="collection with-header hoverable" style="height:100%;width:100%;margin:0;">
                <li class="collection-header"><h4>活跃学者</h4></li>
                <li class="collection-item avatar" v-for="(res,id) in active_scholars" :key="id">
                  <img v-bind:src="file_server+res.avator" alt="" class="circle"></img>
                  <span class="title">{{res.name}}</span>
                  <p class="famous-expert-institution">{{res.agency}}</p>
                  <p style="height:10px;"></p>
                  <p class="famous-expert-intro">{{res.introduction}}
                  </p>
                  <a class="secondary-content"><i class="material-icons">grade</i></a>
                </li>
                <!--<li class="collection-item avatar">-->
                  <!--<img src="../../static/Image/C2.png" alt="" class="circle"></img>-->
                  <!--<span class="title">Dr. Michael S. Brown</span>-->
                  <!--<p class="famous-expert-institution">BSc PhD University of Kentucky</p>-->
                  <!--<p style="height:10px;"></p>-->
                  <!--<p class="famous-expert-intro">He is the Canada Research Chair in Computer Vision. His studys in several fields including omputer vision, image processing, and computer graphics.-->
                    <!--He is the Demo Chair of CVPR 2014.</p>-->
                  <!--<a class="secondary-content"><i class="material-icons">grade</i></a>-->
                <!--</li>-->
                <!--<li class="collection-item avatar">-->
                  <!--<img src="../../static/Image/C3.png" alt="" class="circle"></img>-->
                  <!--<span class="title">Walter J. Scheirer</span>-->
                  <!--<p class="famous-expert-institution">University of Notre Dame</p>-->
                  <!--<p style="height:10px;"></p>-->
                  <!--<p class="famous-expert-intro">His research is primarily focused around the problem of recognition, including the representations and algorithms supporting solutions to it. He is particularly interested in features and learning-based methods that apply to both vision and language.</p>-->
                  <!--<a class="secondary-content"><i class="material-icons">grade</i></a>-->
                <!--</li>-->
              </ul>
          </div>
          <div class="col s5"
               style="margin-left:0; padding-bottom: 1rem;">
            <ul class="collection with-header hoverable" style="height:100%;width:100%;margin:0;">
              <li class="collection-header"><h4>近期事项</h4></li>
              <li class="collection-item">
                <div class="row valign-wrapper"
                     v-for="schedule in recent_items"
                     style="margin-bottom: 0;">
                    <div class="col s2 center-align" style="padding-left: 0;">
                      <h5 style="margin: 0; font-weight: bold;">{{schedule.day}}</h5>
                      <p style="margin: 0;">{{schedule.mon}}</p>
                    </div>
                    <div class="col s10">
                      <div class="card-panel white-text"
                           :class="schedule.color"
                           style="margin-top: 0; margin-bottom: 1rem;
                              padding-top: 0.5rem; padding-bottom: 0.5rem;
                              box-shadow: unset;">
                        <div class="row" style="margin: 0; font-weight: bold;">
                          <router-link v-bind:to="'/conference/'+schedule.id"><span style="color: white;">{{schedule.name}}</span></router-link>

                        </div>
                        <div class="row" style="margin: 0;">
                          {{schedule.instructions}}
                        </div>
                      </div>
                    </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer grey lighten-3">
      <div class="center containe grey-text"
           style="padding-bottom: 1rem;">
        © 2018 Copyright 探玩揽月
      </div>
    </div>
  </div>
</template>

<script>

import Background from "../include/Background";
import NavBar from "../include/NavBar";
import NEXT from "../include/NEXT";

export default{
  name:'Index',
  components: {NEXT, NavBar, Background},
  data: function(){
    return{
      itId:0,
      active_scholars:[],
      recent_items:[],
      file_server: 'global replacement',
      slides: {
        instance: null,
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        slides: [
          {
            name: "AAAI Conference on Artificial Intelligence",
            time: "2018年2月7日",
            venue: "New Orleans Riverside, USA",
            state: "征稿中",
            bg: "/static/bg1.jpg",
          },
          {
            name: "IEEE Conference on Computer Vision and Pattern Recognition",
            time: "2018年8月9日",
            venue: "盐湖城, USA",
            state: "已开幕",
            bg: "/static/bg3.jpg",
          },
          {
            name: "Annual Conference on Neural Information Processing Systems",
            time: "2018年11月2日",
            venue: "Palais des Congres de Montreal, CANADA",
            state: "征稿中",
            bg: "/static/bg2.jpg",
          },
        ],
      },
      scheds: [
        {
          day: 5,
          month: "JUN",
          year: 2018,
          color: 'grey darken3',
          conference: {
            id: 1,
            title: "CVPR2018"
          },
          event: "公布接收稿件"
        },
        {
          day: 14,
          month: "FEB",
          year: 2019,
          color: 'purple lighten3',
          conference: {
            id: 1,
            title: "AAAI2018"
          },
          event: "开幕"
        },
        {
          day: 23,
          month: "OCT",
          year: 2018,
          color: 'teal darken3',
          conference: {
            id: 1,
            title: "IJCAI2018"
          },
          event: "开始征稿"
        },
        {
          day: 5,
          month: "JUN",
          year: 2018,
          color: 'blue darken3',
          conference: {
            id: 1,
            title: "CVPR2018"
          },
          event: "公布接收稿件"
        },
        {
          day: 14,
          month: "FEB",
          year: 2019,
          color: 'red darken3',
          conference: {
            id: 1,
            title: "AAAI2018"
          },
          event: "开幕"
        },
        {
          day: 23,
          month: "OCT",
          year: 2018,
          color: 'purple lighten3',
          conference: {
            id: 1,
            title: "IJCAI2018"
          },
          event: "开始征稿"
        },
      ],
    }
  },
  methods: {
    learn_more() {
      this.$router.push("/conference/1");
    },
    init:function () {
      this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/home/newest', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          this.slides.slides=[];
          for(let i=0;i<rsp.data.data.length;i++){
            let conference_ret=(rsp.data.data)[i];
            let date_ret=conference_ret.start_date;
            let date_str=date_ret.slice(0,4)+"年"+date_ret.slice(5,7)+"月"+date_ret.slice(8,10)+"日";
            $(conference_ret).attr('time',date_str);
            delete conference_ret.start_date;

            let state=conference_ret.state;
            let event;
            if (state & 0b1000) {
              event = '已结束';
            }
            else if (state & 0b0100) {
              event = '正在进行中';
            }
            else if (state & 0b0001) {
              event = '征稿中';
            }
            else if (state & 0b0010) {
              event = '会议注册中';
            }
            $(conference_ret).attr('event',event);
            delete conference_ret.state;
            $(conference_ret).attr('bg','/static/bg'+(i+1).toString()+'.jpg');

            this.slides.slides.push(conference_ret);
          }
          console.log( rsp.data.data);
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })

      this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/home/activeScholars', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          this.active_scholars=rsp.data.data;
          if(this.active_scholars.length>4)
            this.active_scholars=this.active_scholars.slice(0,4);
          console.log(this.active_scholars);
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })

      this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/home/recentlyItem', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          let mon_json={
              '01':'Jan',
              '02':'Feb',
              '03':'Mar',
              '04':'Apr',
              '05':'May',
              '06':'Jun',
              '07':'Jul',
              '08':'Aug',
              '09':'Sep',
              '10':'Oct',
              '11':'Nov',
              '12':'Dec'
          };

          let color_arr=['grey darken3','purple lighten3','teal darken3','blue darken3','red darken3', 'purple lighten3'];
          this.recent_items=[];
          for(let i=0;i<rsp.data.data.length;i++){
              let json_ret=(rsp.data.data)[i];
              let date_ret=json_ret.date;
              $(json_ret).attr('mon',mon_json[date_ret.slice(5,7)]);
              $(json_ret).attr('day',date_ret.slice(8,10));
              $(json_ret).attr('color',color_arr[i]);
              delete json_ret.date;
              this.recent_items.push(json_ret);
          }

        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })
    },
    goNext:function () {
      $('.carousel').carousel('next');
    }
  },
  created(){
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
    // setTimeout(autoplay, 5000);
    // function autoplay() {
    //   $('.carousel').carousel('next');
    //   setTimeout(autoplay, 5000);
    // }
  },
  mounted() {
    this.$bus.emit("toIndex");
    this.init();

    this.itId=setInterval(this.goNext,5000)
  },
  beforeDestroy: function() {
    clearInterval(this.itId)
  }

};
</script>

<style scoped>
  .title {
    font-weight: bold !important;
  }
  .index_page_slide {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
  .famous-expert-institution{
    font-size: 14px;
  }
  .famous-expert-intro{
    font-size: 16px;
  }
</style>
