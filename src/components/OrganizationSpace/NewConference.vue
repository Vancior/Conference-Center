<template>
  <div>
    <test-robot v-on:child-say="fill_form"></test-robot>
    <div class="row white section">
      <div class="col s10 offset-s1">
        <div style="height: 2.3rem;"></div>
        <form class="col s12">
          <div class="row">
            <div class="col s6">
              <h5>会议信息</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <i class="prefix material-icons">title</i>
              <input id="conf-topic" type="text" v-model="conf_topic" data-length="40"/>
              <label for="conf-topic" :class="{active:conf_topic}">会议名称</label>
            </div>
            <div class="input-field col s4">
              <select id="conf-field-select" v-model="conf_field">
                <option value='' disabled selected>选择领域</option>
                <option v-bind:value="field.tag_id" v-bind:key="id" v-for="(field, id) in field_list">{{ field.name }}
                </option>
              </select>
              <label for="conf-field-select">会议领域</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-desc" class="materialize-textarea" v-model="conf_desc"></textarea>
              <label for="conf-desc" :class="{active:conf_desc}">会议简介</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-start-date" type="text" class="datepicker" v-model="conf_start_date"/>
              <label for="conf-start-date" :class="{active:conf_start_date}">会议开始日期</label>
            </div>
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-end-date" type="text" class="datepicker" v-model="conf_end_date"/>
              <label for="conf-end-date" :class="{active:conf_end_date}">会议结束日期</label>
              <span class="helper-text red-text" v-show="end_date_invalid">非法日期</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m8">
              <i class="medium material-icons prefix">place</i>
              <input id="conf-location" type="text" v-model="conf_location"/>
              <label for="conf-location" :class="{active:conf_location}">会议地点</label>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>稿件信息</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-essay-ddl" type="text" class="datepicker" v-model="conf_essay_ddl"/>
              <label for="conf-essay-ddl" :class="{active:conf_essay_ddl}">截稿日期</label>
              <span class="helper-text red-text" v-show="paper_date_invalid">非法日期</span>
            </div>
            <div class="input-field col s4">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-essay-time" type="text" class="timepicker" v-model="conf_essay_time"/>
              <label for="conf-essay-time" :class="{active:conf_essay_time}">截稿时间</label>
            </div>
            <div class="input-field col s4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-release-ddl" type="text" class="datepicker" v-model="conf_release_ddl"/>
              <label for="conf-release-ddl" :class="{active:conf_release_ddl}">录用通知日期</label>
              <span class="helper-text red-text" v-show="release_date_invalid">非法日期</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">library_books</i>
              <textarea id="conf-essay-info" class="materialize-textarea" v-model="conf_essay_info"></textarea>
              <label for="conf-essay-info" :class="{active:conf_essay_info}">征文信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">event_note</i>
              <textarea id="conf-essay-inst" class="materialize-textarea" v-model="conf_essay_inst"></textarea>
              <label for="conf-essay-inst" :class="{active:conf_essay_inst}">投稿须知</label>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_template($event)">
                <span>上传论文模板</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="论文模板"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>日程及其他</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">event</i>
              <textarea id="conf-schedule" class="materialize-textarea" v-model="conf_schedule"></textarea>
              <label for="conf-schedule" :class="{active:conf_schedule}">日程安排</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-register-ddl" type="text" class="datepicker" v-model="conf_register_ddl"/>
              <label for="conf-register-ddl" :class="{active:conf_release_ddl}">注册截止日期</label>
              <span class="helper-text red-text" v-show="register_date_invalid">非法日期</span>
            </div>
            <div class="input-field col s3 offset-l1">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-register-time" type="text" class="timepicker" v-model="conf_register_time"/>
              <label for="conf-register-time" :class="{active:conf_register_time}">时间</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-register-info" class="materialize-textarea" v-model="conf_register_info"></textarea>
              <label for="conf-register-info" :class="{active:conf_register_info}">注册信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">airport_shuttle</i>
              <textarea id="conf-commute-info" class="materialize-textarea" v-model="conf_commute_info"></textarea>
              <label for="conf-commute-info" :class="{active:conf_commute_info}">住宿交通</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">local_phone</i>
              <textarea id="conf-contact" class="materialize-textarea" v-model="conf_contact"></textarea>
              <label for="conf-contact" :class="{active:conf_contact}">联系方式</label>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>页面外观</h5>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h6>选择模板</h6>
            </div>
          </div>
          <choseTemplate></choseTemplate>
          <div class="row">
            <div class="col l1">
              <a class=" btn-floating btn-large waves-effect waves-light blue" @click="choseTP()"><i
                class="material-icons">color_lens</i></a>
            </div>

            <div class="col l2 my-mt-5">
              <h6>{{TPName}}</h6>
            </div>

            <!--<a  class="waves-effect waves-light btn" ><i class="material-icons left">cloud</i>选择模板</a>-->
          </div>
          <div class="row">
            <div class="col s6">
              <h6>背景图</h6>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_image($event)">
                <span>上传背景图片</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="背景图片"/>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col s12 white section">
        <div style="margin-top: 1em;">
          <div class="center-align">
            <div class="waves-effect waves-light btn btn-large blue" @click="submit_conference()">
              <i class="material-icons left">send</i>
              发布
            </div>
          </div>
        </div>
        <div style="height: 3rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import TestRobot from "../../include/TestRobot";
  import choseTemplate from "./choseTemplate"

  export default {
    name: "NewConference",
    components: { choseTemplate, TestRobot },
    // components: { NavBar },
    data: function () {
      return {
        TPName: "尚未选择风格",
        conf_topic: '',
        conf_field: '',
        conf_desc: '',
        conf_start_date: '',
        conf_end_date: '',
        conf_location: '',
        conf_essay_info: '',
        conf_essay_inst: '',
        conf_essay_ddl: '',
        conf_essay_time: "23:59",
        // conf_essay_time: '',
        conf_release_ddl: '',
        conf_release_time: '',
        conf_register_ddl: '',
        conf_register_time: "23:59",
        // conf_register_time: '',
        conf_schedule: '',
        conf_paper_template: '',
        conf_register_info: '',
        conf_commute_info: '',
        conf_contact: '',
        conf_conference_template: 1,
        conf_bg_img: '',
        field_list: [],
        paper_template: '',
        back_img: '',
        template_path: '',
        image_path: '',
        end_date_invalid: false,
        paper_date_invalid: false,
        release_date_invalid: false,
        register_date_invalid: false
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#conf-topic').characterCounter();
        $('.dropdown-trigger').dropdown();
      });
    },
    beforeDestroy: function () {
      this.$bus.off("TPChoseOver")
    },
    mounted: function () {
      this.$bus.on("TPChoseOver", (num) => {
        this.conf_conference_template = num;
        let tpName = "";
        if (num === 1) {
          tpName = "质感风格"
        } else if (num === 2) {
          tpName = "科技风格"
        } else {
          tpName = "极简风格"
        }
        this.TPName = tpName;
      });
      this.$bus.emit('manage-change-title', { text: '发布新会议' });
      let start_date = new Date();
      let options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          start_date = new Date(date);
          this.conf_start_date = date;
        }
      };
      let elem = document.querySelector('#conf-start-date');
      let instance = M.Datepicker.init(elem, options);

      let end_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          end_date = new Date(date);
          if (end_date < start_date) {
            $('#conf-end-date').addClass('invalid');
            this.end_date_invalid = true;
          } else {
            $('#conf-end-date').removeClass('invalid');
            this.end_date_invalid = false;
          }
          this.conf_end_date = date;
        }
      };
      elem = document.querySelector('#conf-end-date');
      instance = M.Datepicker.init(elem, options);

      let paper_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          paper_date = new Date(date);
          if (paper_date > start_date) {
            $('#conf-essay-ddl').addClass('invalid');
            this.paper_date_invalid = true;
          } else {
            $('#conf-essay-ddl').removeClass('invalid');
            this.paper_date_invalid = false;
          }
          this.conf_essay_ddl = date;
        }
      };
      elem = document.querySelector('#conf-essay-ddl');
      instance = M.Datepicker.init(elem, options);

      let release_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          release_date = new Date(date);
          if (release_date < paper_date || release_date > start_date) {
            $('#conf-release-ddl').addClass('invalid');
            this.release_date_invalid = true;
          } else {
            $('#conf-release-ddl').removeClass('invalid');
            this.release_date_invalid = false;
          }
          this.conf_release_ddl = date;
        }
      };
      elem = document.querySelector('#conf-release-ddl');
      instance = M.Datepicker.init(elem, options);

      let register_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          register_date = new Date(date);
          if (register_date < release_date || register_date > start_date) {
            $('#conf-register-ddl').addClass('invalid');
            this.register_date_invalid = true;
          } else {
            $('#conf-register-ddl').removeClass('invalid');
            this.register_date_invalid = false;
          }
          this.conf_register_ddl = date;
        }
      };
      elem = document.querySelector('#conf-register-ddl');
      instance = M.Datepicker.init(elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_essay_time = hour + ':' + minute;
        }
      };
      elem = document.querySelector('#conf-essay-time');
      instance = M.Timepicker.init(elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_register_time = hour + ':' + minute;
        }
      };
      elem = document.querySelector('#conf-register-time');
      instance = M.Timepicker.init(elem, options);
      // });

      // get fields
      this.$axios.post('/api/subjects', {}).then(rsp => {
        let data = rsp.data;
        if (data.status === 'succ') {
          this.field_list = data.data;
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>获取领域失败</span>",
          classes: "rounded red"
        });
      })
    },
    updated: function () {
      $('select').formSelect();
    },
    methods: {
      fill_form: function (form_data) {
        this.conf_topic = form_data.conf_topic;
        this.conf_field = form_data.conf_field;
        this.conf_desc = form_data.conf_desc;
        this.conf_start_date = form_data.conf_start_date;
        this.conf_end_date = form_data.conf_end_date;
        this.conf_location = form_data.conf_location;
        this.conf_essay_info = form_data.conf_essay_info;
        this.conf_essay_inst = form_data.conf_essay_inst;
        this.conf_essay_ddl = form_data.conf_essay_ddl;
        // conf_essay_time: "23:59",
        this.conf_essay_time = form_data.conf_essay_time;
        this.conf_release_ddl = form_data.conf_release_ddl;
        this.conf_register_ddl = form_data.conf_release_ddl;
        // conf_register_time: "23:59",
        this.conf_register_time = form_data.conf_register_time;
        this.conf_schedule = form_data.conf_schedule;
        this.conf_register_info = form_data.conf_register_info;
        this.conf_commute_info = form_data.conf_commute_info;
        this.conf_contact = form_data.conf_contact;

      },
      choseTP: function () {
        this.$bus.emit("showChose")
      },

      submit_conference: function () {
        if (!this.conf_topic || !this.conf_start_date || !this.conf_desc || !this.conf_end_date ||
          !this.conf_location || !this.conf_essay_info || !this.conf_essay_inst || !this.conf_essay_ddl ||
          !this.conf_essay_time || !this.conf_release_ddl || !this.conf_register_ddl ||
          !this.conf_register_time || !this.conf_schedule || !this.conf_register_info ||
          !this.conf_commute_info || !this.conf_contact || this.conf_field === '') {
          M.toast({
            html: "<span style='font-weight: bold'>信息未填写完整</span>",
            classes: "rounded yellow darken-2"
          });
          return;
        }
        if (this.register_date_invalid || this.release_date_invalid || this.paper_date_invalid || this.end_date_invalid) {
          M.toast({
            html: "<span style='font-weight: bold'>日期填写错误</span>",
            classes: "rounded yellow darken-2"
          });
          return;
        }
        let that = this;
        try {
          axios.all([ this.upload_template(), this.upload_image() ]).then(
            axios.spread(function (...rsps) {
              // rsps.forEach()
              that.$axios.post('/api/postConference', {
                // institution_id: 1,
                title: that.conf_topic,
                field: parseInt(that.conf_field),
                introduction: that.conf_desc,
                start_date: that.conf_start_date + ' 00:00:00',
                end_date: that.conf_end_date + ' 23:59:59',
                convening_place: that.conf_location,
                essay_information: that.conf_essay_info,
                essay_instructions: that.conf_essay_inst,
                paper_ddl: that.conf_essay_ddl + ' ' + that.conf_essay_time + ':59',
                employ_date: that.conf_release_ddl + ' 00:00:00',
                register_ddl: that.conf_register_ddl + ' ' + that.conf_register_time + ':59',
                schedule: that.conf_schedule,
                paper_template: that.template_path,
                register_information: that.conf_register_info,
                ATinformation: that.conf_commute_info,
                contact: that.conf_contact,
                conference_template: that.conf_conference_template,
                backimg: that.image_path
              }).then(rsp => {
                if (rsp.data.status === 'succ') {
                  M.toast({
                    html: "<span style='font-weight: bold'>发布会议成功</span>",
                    classes: "rounded green"
                  });
                  that.$router.push('/orgspace');
                }
                else {
                  M.toast({
                    html: "<span style='font-weight: bold'>发布会议失败</span>",
                    classes: "rounded red"
                  });
                }
              }).catch(err => {
                M.toast({
                  html: "<span style='font-weight: bold'>内部错误</span>",
                  classes: "rounded red"
                });
                console.log(err.toString());
              });
            })
          ).catch(err => {
            M.toast({
              html: "<span style='font-weight: bold'>内部错误</span>",
              classes: "rounded red"
            });
          });
        } catch (err) {
          M.toast({
            // template and image required
            html: "<span style='font-weight: bold'>" + err + "</span>",
            classes: "rounded red"
          });
        }
      },
      get_template: function (event) {
        this.paper_template = event.target.files[ 0 ];
      },
      get_image: function (event) {
        this.back_img = event.target.files[ 0 ];
      },
      upload_template: function () {
        if (!this.paper_template) {
          throw '论文模板未上传';
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.paper_template);
        return this.$file.post('', FileData, config).then(response => {
          this.template_path = response.data.link;
        });
      },
      upload_image: function () {
        if (!this.paper_template) {
          throw '背景图片未上传';
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.back_img);
        return this.$file.post('', FileData, config).then(response => {
          this.image_path = response.data.link;
        });
      }
    }
  }
</script>

<style scoped>
  /*#conf-topic {*/
  /*font-size: 5em;*/
  /*}*/
  .col .row {
    margin-right: 0;
  }

  .my-mt-5 {

    margin-top: 15px;
  }
</style>
