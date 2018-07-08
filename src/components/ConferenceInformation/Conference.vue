<template>

  <div>
    <div v-if="conference_template===1">

      <Loader v-show="is_loading"></Loader>
      <NavBar></NavBar>
      <div class="row" style="margin-bottom: 0;">
        <div class="col s1"></div>
        <div class="card customize"
             style="width: 100%; padding-top: 2rem;
                  padding-bottom: 2rem; margin: 0;"
             :style="{'background': bg_overlay+'url('+conferenceImg+')'}">
          <div class="white-text row container">
            <div class="col s12">
              <h4 class="center" style="font-weight: bold">{{resp.data.title}}</h4>
              <h5 class="center">{{resp.data.start_date}}，{{resp.data.convening_place}}</h5>
              <h5 style="font-weight: bold" class="center">{{conferenceState}}</h5>
              <h5>&nbsp</h5>
              <div class="row center-align">
                <!--<div class="btn btn-large teal" @click="toCollect">
                  <div class="white-text">-->
                <div class="btn btn-large teal"
                     :class="{ disabled: hasCollect > 0 }"
                     @click="toCollect">
                  <div :class="{'white-text': hasCollect === 0, 'grey-text': hasCollect !== 0}">
                    <i class="material-icons left">star_border</i>
                    <span v-show="hasCollect === 1">已</span>收藏
                  </div>
                </div>
                <div class="btn btn-large green"
                     :class="{ disabled: contributeToLink === 0 }"
                     @click="toContribute">
                  <div :class="{'white-text': contributeToLink !== 0, 'grey-text': contributeToLink === 0}">
                    <i class="material-icons left">send</i>
                    投稿
                  </div>
                </div>
                <div id="register" class="btn btn-large blue lighten-1"
                     @click="toRegisterConference"
                     :class="{ disabled: registerToLink !== 1 }">
                  <div :class="{'white-text': registerToLink === 1, 'grey-text': registerToLink !== 1}">
                    <i class="material-icons left">group_add</i>
                    <span v-show="registerToLink === 0">已</span>注册<span v-show="registerToLink !== 0">参会</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="white section" style="min-height: 35rem;">
          <div class="container">
            <div class="row" style="margin-bottom: 0;">
              <div class="col s3">
                <div style="height:6rem;"></div>
                <div class="card-panel center-align" style="width: 100%; max-width: 15rem;">
                  <ul class="section table-of-contents"
                      style="padding-top: 0; padding-bottom: 0; padding-right: 1rem;">
                    <li><a style="cursor: pointer" :class="{'active':active_tab===0}" @click="switch_tab(0)">会议介绍</a>
                    </li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===1}" @click="switch_tab(1)">投稿须知</a>
                    </li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===2}" @click="switch_tab(2)">日程安排</a>
                    </li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===3}" @click="switch_tab(3)">住宿交通</a>
                    </li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===4}" @click="switch_tab(4)">联系我们</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col s9">
                <div id="introduction" class="card-container" v-if="active_tab===0">
                  <ul class="collection with-header">
                    <li class="collection-header"><h4 style="">会议介绍</h4></li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle red lighten-1">schedule</i>
                      <p class="coference-date"><strong>开始日期</strong>：<span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                      </p>
                      <p style="height:0.5rem;"></p>
                      <p class="coference-date"><strong>结束日期</strong>：<span style="font-size:1.1rem;">{{resp.data.end_date}}</span>
                      </p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle light-blue darken-1">description</i>
                      <p class="coference-title"><strong>会议简介</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <p>{{resp.data.introduction}}</p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle grey darken-1">assignment</i>
                      <p class="coference-title"><strong>注册须知</strong></p>
                      <pre>{{resp.data.register_information}}</pre>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle red lighten-1">schedule</i>
                      <p class="coference-date"><strong>注册截止日期</strong>：<span style="font-size:1.1rem;">{{register_endtime}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="register_notion" class="card-container" v-if="active_tab===1">
                  <ul class="collection with-header">
                    <li class="collection-header"><h4 style="">投稿须知</h4></li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle red lighten-1">schedule</i>
                      <p class="coference-date"><strong>征稿开始：</strong><span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                      </p>
                      <p class="coference-date"><strong>征稿截止：</strong><span style="font-size:1.1rem;">{{resp.data.paper_ddl}}</span>
                      </p>
                      <p style="height:0.5rem;"></p>
                      <p class="coference-date"><strong>查看审核结果日期：</strong><span style="font-size:1.1rem;">{{resp.data.employ_date}}</span>
                      </p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle light-blue darken-1">description</i>
                      <p class="coference-title"><strong>征文要求</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.essay_instructions}}</pre>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle grey darken-1">assignment</i>
                      <p class="coference-title"><strong>投稿信息</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.essay_information}}</pre>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle deep-orange lighten-1">picture_as_pdf</i>
                      <p class="coference-title">
                        <strong>论文模板</strong>:&nbsp &nbsp &nbsp &nbsp
                        <a class="btn blue-grey" v-bind:href="$image(resp.data.paper_template)">点我获取</a>
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="schedule" class="card-container" v-if="active_tab===2">
                  <ul class="collection with-header">
                    <li class="collection-header"><h4 style="">日程安排</h4></li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle red lighten-1">schedule</i>
                      <p class="coference-title"><strong>会议议程</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.schedule}}</pre>
                    </li>
                  </ul>
                </div>
                <div id="traffic" class="card-container" v-if="active_tab===3">
                  <ul class="collection with-header">
                    <li class="collection-header"><h4 style="">住宿交通</h4></li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle light-blue darken-1">flight</i>
                      <p class="coference-title"><strong>安排方式</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.ATinformation}}</pre>
                    </li>
                  </ul>
                </div>
                <div id="relation" class="card-container" v-if="active_tab===4">
                  <ul class="collection with-header">
                    <li class="collection-header"><h4 style="">联系我们</h4></li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle deep-orange lighten-1">dialer_sip</i>
                      <p class="coference-title"><strong>联系方式</strong></p>
                      <p style="height: 0.5rem;"></p>
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
    <div v-if="conference_template===2">
      <Loader v-show="is_loading"></Loader>
      <NavBar></NavBar>
      <div class="row" style="margin-bottom: 0;">
        <div class="col s1"></div>
        <div class="card customize"
             style="width: 100%; padding-top: 2rem;
                  padding-bottom: 2rem; margin: 0;"
             :style="{'background': bg_overlay+'url('+conferenceImg2+')'}">
          <div class="white-text row container">
            <div class="col s12">
              <h4 class="center" style="font-weight: bold">{{resp.data.title}}</h4>
              <h5 class="center">{{resp.data.start_date}}，{{resp.data.convening_place}}</h5>
              <h5 style="font-weight: bold" class="center">{{conferenceState}}</h5>
              <h5>&nbsp</h5>
              <div class="row center-align my-tech-blue">
                <!--<div class="btn btn-large teal" @click="toCollect">
                  <div class="white-text">-->
                <div class="btn btn-large yellow teal my-trans my-not-inline hoverable my-margin-5"
                     :class="{ disabled: hasCollect > 0 }"
                     @click="toCollect">
                  <div :class="{'white-text': hasCollect === 0, 'grey-text': hasCollect !== 0}">
                    <i class="material-icons  left">star_border</i>
                    <span v-show="hasCollect === 1">已</span>收藏
                  </div>
                </div>
                <div class="btn btn-large green my-trans my-not-inline hoverable my-margin-5"
                     :class="{ disabled: contributeToLink === 0 }"
                     @click="toContribute">
                  <div :class="{'white-text': contributeToLink !== 0, 'grey-text': contributeToLink === 0}">
                    <i class="material-icons left">send</i>
                    投稿
                  </div>
                </div>
                <div id="register" class="btn btn-large blue lighten-1 my-trans my-not-inline hoverable my-margin-5"
                     @click="toRegisterConference"
                     :class="{ disabled: registerToLink !== 1 }">
                  <div :class="{'white-text': registerToLink === 1, 'grey-text': registerToLink !== 1}">
                    <i class="material-icons left">group_add</i>
                    <span v-show="registerToLink === 0">已</span>注册<span v-show="registerToLink !== 1">参会</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-blue-dark section" style="min-height: 35rem;">
          <div class="container">
            <div class="row" style="margin-bottom: 0;">
              <div class="col s3  ">
                <div style="height:6rem;"></div>
                <div class="card-panel center-align my-trans hoverable" style="width: 100%; max-width: 15rem;">
                  <ul class="section table-of-contents  "
                      style="padding-top: 0; padding-bottom: 0; padding-right: 1rem;">
                    <li><a style="cursor: pointer" :class="{'active':active_tab===0} " class="my-tech-blue"
                           @click="switch_tab(0)">会议介绍</a></li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===1}" class="my-tech-blue"
                           @click="switch_tab(1)">投稿须知</a></li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===2}" class="my-tech-blue"
                           @click="switch_tab(2)">日程安排</a></li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===3}" class="my-tech-blue"
                           @click="switch_tab(3)">住宿交通</a></li>
                    <li><a style="cursor: pointer" :class="{'active':active_tab===4}" class="my-tech-blue"
                           @click="switch_tab(4)">联系我们</a></li>
                  </ul>
                </div>
              </div>
              <div class="col s9 hoverable my-trans my-tech-blue">
                <div id="introduction" class="card-container my-total-trans" v-if="active_tab===0">
                  <ul class="collection with-header my-total-trans">
                    <li class="collection-header my-total-trans"><h5 style="">会议介绍</h5></li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle red lighten-1 my-trans hoverable">schedule</i>
                      <p class="coference-date"><strong>开始日期</strong>：<span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                      </p>
                      <p style="height:0.5rem;"></p>
                      <p class="coference-date"><strong>结束日期</strong>：<span style="font-size:1.1rem;">{{resp.data.end_date}}</span>
                      </p>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle  my-trans hoverable">description</i>
                      <p class="coference-title"><strong>会议简介</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <p>{{resp.data.introduction}}</p>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">assignment</i>
                      <p class="coference-title"><strong>注册须知</strong></p>
                      <pre>{{resp.data.register_information}}</pre>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle red lighten-1 my-trans hoverable">schedule</i>
                      <p class="coference-date"><strong>注册截止日期</strong>：<span style="font-size:1.1rem;">{{register_endtime}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="register_notion" class="card-container my-total-trans" v-if="active_tab===1">
                  <ul class="collection with-header my-total-trans">
                    <li class="collection-header my-total-trans"><h4 style="">投稿须知</h4></li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">schedule</i>
                      <p class="coference-date"><strong>征稿开始：</strong><span style="font-size:1.1rem;">{{resp.data.start_date}}</span>
                      </p>
                      <p class="coference-date"><strong>征稿截止：</strong><span style="font-size:1.1rem;">{{resp.data.paper_ddl}}</span>
                      </p>
                      <p style="height:0.5rem;"></p>
                      <p class="coference-date"><strong>查看审核结果日期：</strong><span style="font-size:1.1rem;">{{resp.data.employ_date}}</span>
                      </p>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">description</i>
                      <p class="coference-title"><strong>征文要求</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.essay_instructions}}</pre>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">assignment</i>
                      <p class="coference-title"><strong>投稿信息</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.essay_information}}</pre>
                    </li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">picture_as_pdf</i>
                      <p class="coference-title">
                        <strong>论文模板</strong>:&nbsp &nbsp &nbsp &nbsp
                        <a class="btn blue-grey" v-bind:href="$image(resp.data.paper_template)">点我获取</a>
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="schedule" class="card-container my-total-trans" v-if="active_tab===2">
                  <ul class="collection with-header my-total-trans">
                    <li class="collection-header my-total-trans"><h4 style="">日程安排</h4></li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">schedule</i>
                      <p class="coference-title"><strong>会议议程</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.schedule}}</pre>
                    </li>
                  </ul>
                </div>
                <div id="traffic" class="card-container my-total-trans" v-if="active_tab===3">
                  <ul class="collection with-header my-total-trans">
                    <li class="collection-header my-total-trans"><h4 style="">住宿交通</h4></li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-total-trans">flight</i>
                      <p class="coference-title"><strong>安排方式</strong></p>
                      <p style="height: 0.5rem;"></p>
                      <pre>{{resp.data.ATinformation}}</pre>
                    </li>
                  </ul>
                </div>
                <div id="relation" class="card-container my-total-trans" v-if="active_tab===4">
                  <ul class="collection with-header my-total-trans">
                    <li class="collection-header my-total-trans"><h4 style="">联系我们</h4></li>
                    <li class="collection-item avatar my-total-trans">
                      <i class="material-icons circle my-trans hoverable">dialer_sip</i>
                      <p class="coference-title"><strong>联系方式</strong></p>
                      <p style="height: 0.5rem;"></p>
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
    <div v-if="conference_template===3">
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
                  <div class="col s4 right-align">
                    <a class="black-text" v-if="hasCollect === 0" style="cursor: pointer"
                       @click="toCollect">
                      <i class="material-icons">star_border</i>
                      收藏
                    </a>
                    <div class="grey-text" v-else>
                      <i class="material-icons">star_border</i>
                      <span v-show="hasCollect === 1">已</span>收藏
                    </div>
                  </div>
                  <div class="col s4 center-align">
                    <a class="black-text" v-if="contributeToLink !== 0" style="cursor: pointer" @click="toContribute">
                      <i class="material-icons">send</i>
                      投稿
                    </a>
                    <div class="grey-text" v-else>
                      <i class="material-icons">send</i>
                      投稿
                    </div>
                  </div>
                  <div class="col s4 left-align">
                    <a class="black-text" v-if="registerToLink === 1" style="cursor: pointer"
                       @click="toRegisterConference">
                      <i class="material-icons">group_add</i>
                      注册参会
                    </a>
                    <div class="grey-text" v-else>
                      <i class="material-icons">group_add</i>
                      <span v-show="registerToLink === 0">已</span>注册<span v-show="registerToLink === 2">参会</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section" style="min-height: 35rem;">
            <div class="container">
              <div class="row" style="margin-bottom: 0;">
                <div class="col s8">
                  <div id="introduction" class="card-container">
                    <ul class="collection with-header">
                      <li class="collection-header"><h5 style="">会议介绍</h5></li>
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
                      <li class="collection-item">
                        <p class="coference-date"><strong>注册截止日期</strong>：<span style="font-size:1.1rem;">{{register_endtime}}</span>
                        </p>
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
                          <a v-bind:href="$image(resp.data.paper_template)">点我获取</a>
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
        conference_template: 1,
        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
        conferenceImg2: "/static/bg2.jpg",
        conferenceImg3: "/static/bg3.jpg",
        conferenceState: '默认',
        hasCollect: 0,
        contributeToLink: 0,
        registerToLink: 0,
        contributeLink: '',
        registerLink: '',
        register_endtime: '',
        resp: {
          data: {}
        },
        display_id: 1
      }
    },
    created() {
      this.conference_id = parseInt(this.$route.params.id);
      this.$axios.post('/api/conference/' + this.conference_id).then(response => {
        if (response.status === 200) {
          if (response.data.status === "succ") {
            this.resp = response.data;
            this.conference_template = this.resp.data.conference_template;
            console.log(this.resp.data);
            this.getConferenceState();
            this.getRegisterEndtime();
            this.isAbleRegister();
            this.isAbleContribute();
            this.isCollect();
            let that = this;
            axios.all([ this.isAbleRegister(), this.isAbleContribute(), this.isCollect() ]).then(
              axios.spread(function (ut, ui, uc) {
                that.$axios.post('/api/user/token').then(res => {
                  /*console.log("user type:" + res.data.data.type);*/
                  // console.log(res);
                  if (res.data.status === 'succ') {
                    if (res.data.data.type !== "user") {
                      console.log("no user!");
                      that.registerToLink = 2;
                      that.contributeToLink = 0;
                      that.hasCollect = 2;
                    }
                  }
                }).catch(err => {
                  M.toast({
                    html: "<span style='font-weight: bold'>获取用户失败</span>",
                    classes: "rounded red"
                  });
                });
              })
            );
            this.getConferenceImg();
            this.is_loading = false;
            // console.log("contribute to link:" + this.contributeToLink);
            // console.log("conference state:" + this.conferenceState);
            // console.log(this.hasCollect + "  " + this.contributeToLink + "  " + this.registerToLink);
          }
          else {
            M.toast({
              html: "<span style='font-weight: bold'>获取会议失败</span>",
              classes: "rounded red darken-2"
            });
            this.$router.replace('/404');
          }
        }
        else {
          M.toast({
            html: "<span style='font-weight: bold'>网络错误</span>",
            classes: "rounded red darken-2"
          });
        }
      }).catch(error => {
        M.toast({
          html: "<span style='font-weight: bold'>内部错误</span>",
          classes: "rounded red darken-2"
        });
        // console.log(1);
      });
    }
    ,
    mounted: function () {
      this.$bus.emit("toCF");

      this.$bus.on("nextCollect", this.toCollect)
    },
    beforeDestroy: function () {
      this.$bus.off("nextCollect")
    }
    ,
    methods: {
      getRegisterEndtime: function() {
        let month = this.resp.data.register_ddl.substring(5,7);
        let day = this.resp.data.register_ddl.substring(8,10);
        let year = this.resp.data.register_ddl.substring(0,4);
        let hour = this.resp.data.register_ddl.substring(11,13);
        let minite = this.resp.data.register_ddl.substring(14,16);
        let newmonth = '';
        console.log(year + ' ' + month + ' ' + day + ' ' + hour + ' ' + minite);

        switch(month) {
          case '01':
            newmonth = 'Jan';
            break;
          case '02':
            newmonth = 'Feb';
            break;
          case '03':
            newmonth = 'March';
            break;
          case '04':
            newmonth = 'April';
            break;
          case '05':
            newmonth = 'May';
            break;
          case '06':
            newmonth = 'June';
            break;
          case '07':
            newmonth = 'July';
            break;
          case '08':
            newmonth = 'Aug';
            break;
          case '09':
            newmonth = 'Sept';
            break;
          case '10':
            newmonth = 'Oct';
            break;
          case '11':
            newmonth = 'Nov';
            break;
          case '12':
            newmonth = 'Dec';
            break;
        }
        this.register_endtime = newmonth + ' ' + day + ',' + year + ' ' + hour + ':' + minite;
      },

      toContribute: function () {
        this.contributeLink = "/contribute/" + this.conference_id;
        this.$router.push(this.contributeLink);
      },
      toRegisterConference: function () {
        this.registerLink = "/conference/" + this.conference_id + '/join';
        console.log(this.registerLink);
        this.$router.push(this.registerLink);
      },
      toCollect: function () {
        if (!sessionStorage.getItem("session")) {
          M.toast({
            html: "<span style='font-weight: bold;'>请先登录</span>",
            classes: 'yellow darken-2 rounded'
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

      isCollect: function () {
        this.$axios.post('/api/conference/iscollect/' + this.conference_id).then(response => {
          console.log("user is collect: " + response.data.data);
          if (response.data.data === 1) {
            this.hasCollect = 1;
          }
          else if (response.data.data === 0) {
            this.hasCollect = 0;
          }
          console.log("hasCollect==" + this.hasCollect);
        }).catch(error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
          console.log(1);
        });
      },
      isUser: function () {
        this.$axios.post('/api/user/token').then(response => {
          console.log("user type:" + response.data.data.type);
          if (response.data.data.type !== "user") {
            console.log("no user!");
            this.registerToLink = 2;
            this.contributeToLink = 0;
            this.hasCollect = 2;
          }
          console.log("check is user,hasCollect" + this.hasCollect);
        }).catch(error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        });
      },
      isAbleRegister: function () {
        if(!sessionStorage.getItem("session")) {
          this.registerToLink = 2;
        }
        else {
          if (this.conferenceState !== "征稿中" && this.conferenceState !== "会议注册中") {
            this.registerToLink = 2;
          }
          else {
            this.$axios.post('/api/conference/isregister/' + this.conference_id).then(response => {
              let resp = response.data;
              if (resp.status === "succ") {
                if (resp.data === 1) {
                  this.registerToLink = 0;
                }
                else if (resp.data === 0) {
                  this.registerToLink = 1;
                }
                else if (resp.data === -1) {
                  M.toast({
                    html: "<span style='font-weight: bold;'>请求错误</span>",
                    classes: 'yellow darken-2 rounded'
                  });
                }
              }
            }).catch(error => {
              M.toast({
                html: error.info,
                classes: 'red darken-2 rounded'
              });
            });
          }
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
        else if(!(this.resp.data.state & 0b1111)) {
          this.conferenceState = '即将开始';
        }
      },
      switch_tab(i) {
        this.active_tab = i;
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: '方正清刻本悦宋简体';
    src: url('/static/方正清刻本悦宋简体.TTF') format('truetype');
    font-weight: normal;
    font-style: normal;

  }

  pre {
    white-space: pre-wrap !important;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word !important;
  }

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
    font-size: 1.2rem;
    height: 2.4rem;
    line-height: 2.4rem;
  }

  .my-trans {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }

  .my-total-trans {
    background-color: rgba(0, 0, 0, 0) !important;;
  }

  .my-blue {
    color: #00ffff !important;
    border-color: #00ffff !important;
    border-width: 2px !important;
  }

  .my-not-inline {
    display: inline-block !important;
  }

  .my-margin-5 {
    margin: 5px;
  }

  .my-blue-dark {
    background-color: #183336 !important;
  }

  .my-tech-blue {
    color: #00ffff !important;
  }

  .my-tech-blue-dark {
    color: #00cccc !important;
  }

  #wrapper .btn {
    box-shadow: none;
  }

  #wrapper {
    font-family: '方正清刻本悦宋简体', Helvetica, Arial, sans-serif;
    /*background-color: #D9CD90;*/
    /*font-weight: bold;*/
  }

  #wrapper pre {
    font-family: '方正清刻本悦宋简体', Helvetica, Arial, sans-serif;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  #wrapper strong {
    font-weight: bolder;
  }

</style>
