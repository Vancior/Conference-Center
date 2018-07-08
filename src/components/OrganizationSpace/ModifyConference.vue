<template>
  <div>
    <div class="row white section">
      <div class="col s10 offset-s1">
        <div style="height: 3rem;"></div>
        <form class="col s12">
          <div class="row">
            <div class="col s6">
              <h5>会议信息</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <i class="prefix material-icons">title</i>
              <input id="conf-topic" type="text" v-model="conf_topic" data-length="50"/>
              <label class="active" for="conf-topic">会议名称</label>
            </div>
            <div class="input-field col s4">
              <select id="conf-field-select" v-model="conf_field">
                <option value='' disabled selected>选择领域</option>
                <option v-bind:value="field.tag_id" v-bind:key="id" v-for="(field, id) in field_list">{{ field.name }}
                </option>
              </select>
              <label class="active" for="conf-field-select">会议领域</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-desc" class="materialize-textarea" v-model="conf_desc"></textarea>
              <label for="conf-desc">会议简介</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-start-date" type="text" class="datepicker" v-model="conf_start_date"/>
              <label for="conf-start-date">会议开始日期</label>
            </div>
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-end-date" type="text" class="datepicker" v-model="conf_end_date"/>
              <label for="conf-end-date">会议结束日期</label>
              <span class="helper-text red-text" v-show="end_date_invalid">非法日期</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m8">
              <i class="medium material-icons prefix">place</i>
              <input id="conf-location" type="text" v-model="conf_location"/>
              <label for="conf-location">会议地点</label>
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
              <label for="conf-essay-ddl">截稿日期</label>
              <span class="helper-text red-text" v-show="paper_date_invalid">非法日期</span>
            </div>
            <div class="input-field col s3">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-essay-time" type="text" class="timepicker" v-model="conf_essay_time"/>
              <label for="conf-essay-time">截稿时间</label>
            </div>
            <div class="input-field col s5">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-release-ddl" type="text" class="datepicker" v-model="conf_release_ddl"/>
              <label for="conf-release-ddl">录用通知日期</label>
              <span class="helper-text red-text" v-show="release_date_invalid">非法日期</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">library_books</i>
              <textarea id="conf-essay-info" class="materialize-textarea" v-model="conf_essay_info"></textarea>
              <label for="conf-essay-info">征文信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">event_note</i>
              <textarea id="conf-essay-inst" class="materialize-textarea" v-model="conf_essay_inst"></textarea>
              <label for="conf-essay-inst">投稿须知</label>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_template($event)">
                <span>上传论文模板</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="论文模板" v-model="template_path"/>
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
              <label for="conf-schedule">日程安排</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m5 l4 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-register-ddl" type="text" class="datepicker" v-model="conf_register_ddl"/>
              <label for="conf-register-ddl">注册截止日期</label>
              <span class="helper-text red-text" v-show="register_date_invalid">非法日期</span>
            </div>
            <div class="input-field col s5 m4 l4 xl3">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-register-time" type="text" class="timepicker" v-model="conf_register_time"/>
              <label for="conf-register-time">时间</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-register-info" class="materialize-textarea" v-model="conf_register_info"></textarea>
              <label for="conf-register-info">注册信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">airport_shuttle</i>
              <textarea id="conf-commute-info" class="materialize-textarea" v-model="conf_commute_info"></textarea>
              <label for="conf-commute-info">住宿交通</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">local_phone</i>
              <textarea id="conf-contact" class="materialize-textarea" v-model="conf_contact"></textarea>
              <label for="conf-contact">联系方式</label>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>页面外观</h5>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_image($event)">
                <span>上传背景图片</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="背景图片" v-model="image_path"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row white section">
      <div style="margin-top: 1em;">
        <div class="center-align">
          <div class="waves-effect waves-light btn btn-large" @click="submit_conference()">
            <i class="material-icons left">send</i>
            提交
          </div>
        </div>
      </div>
      <div style="height: 3rem;"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ModifyConference",
    data: function () {
      return {
        conf_id: 0,
        conf_topic: '',
        conf_field: '',
        conf_desc: '',
        conf_start_date: '',
        conf_end_date: '',
        conf_location: '',
        conf_essay_info: '',
        conf_essay_inst: '',
        conf_essay_ddl: '',
        // conf_essay_time: "23:59",
        conf_essay_time: '',
        conf_release_ddl: '',
        conf_release_time: '',
        conf_register_ddl: '',
        // conf_register_time: "23:59",
        conf_register_time: '',
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
        new_template: false,
        new_image: false,
        end_date_invalid: false,
        paper_date_invalid: false,
        release_date_invalid: false,
        register_date_invalid: false
      };
    },
    mounted: function () {

      this.$bus.emit("toOS");

      if (!this.$route.params.id)
        this.$router.replace('/404');
      this.conf_id = parseInt(this.$route.params.id);

      this.$bus.emit('manage-change-title', { text: '更新会议' });
      $('#conf-topic').characterCounter();
      $('.dropdown-trigger').dropdown();
      let start_date = new Date();
      let options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          start_date = new Date(date);
          this.conf_start_date = date;
        }
      };
      let start_date_elem = document.querySelector('#conf-start-date');
      let start_date_instance = M.Datepicker.init(start_date_elem, options);

      let end_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          end_date = new Date(date);
          if (end_date < start_date) {
            $('#conf-end-date').addClass('invalid');
            this.end_date_invalid = true;
          }
          else {
            $('#conf-end-date').removeClass('invalid');
            this.end_date_invalid = false;
          }
          this.conf_end_date = date;
        }
      };
      let end_date_elem = document.querySelector('#conf-end-date');
      let end_date_instance = M.Datepicker.init(end_date_elem, options);

      let paper_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          paper_date = new Date(date);
          if (paper_date > start_date) {
            $('#conf-essay-ddl').addClass('invalid');
            this.paper_date_invalid = true;
          }
          else {
            $('#conf-essay-ddl').removeClass('invalid');
            this.paper_date_invalid = false;
          }
          this.conf_essay_ddl = date;
        }
      };
      let essay_ddl_elem = document.querySelector('#conf-essay-ddl');
      let essay_ddl_instance = M.Datepicker.init(essay_ddl_elem, options);

      let release_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          release_date = new Date(date);
          if (release_date > start_date || release_date < paper_date) {
            $('#conf-release-ddl').addClass('invalid');
            this.release_date_invalid = true;
          }
          else {
            $('#conf-release-ddl').removeClass('invalid');
            this.release_date_invalid = false;
          }
          this.conf_release_ddl = date;
        }
      };
      let release_ddl_elem = document.querySelector('#conf-release-ddl');
      let release_ddl_instance = M.Datepicker.init(release_ddl_elem, options);

      let register_date = new Date();
      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          register_date = new Date(date);
          if (register_date > start_date || register_date < release_date) {
            $('#conf-register-ddl').addClass('invalid');
            this.register_date_invalid = true;
          }
          else {
            $('#conf-register-ddl').removeClass('invalid');
            this.register_date_invalid = false;
          }
          this.conf_register_ddl = date;
        }
      };
      let register_ddl_elem = document.querySelector('#conf-register-ddl');
      let register_ddl_instance = M.Datepicker.init(register_ddl_elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_essay_time = hour + ':' + minute;
        }
      };
      let essay_time_elem = document.querySelector('#conf-essay-time');
      let essay_time_instance = M.Timepicker.init(essay_time_elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_register_time = hour + ':' + minute;
        }
      };
      let register_time_elem = document.querySelector('#conf-register-time');
      let register_time_instance = M.Timepicker.init(register_time_elem, options);

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
      });

      this.$axios.post('/api/conference/' + this.conf_id, {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          let data = rsp.data.data;
          this.conf_topic = data.title;
          this.conf_field = data.field;
          this.conf_desc = data.introduction;
          start_date_instance.setDate(new Date(data.start_date));
          end_date_instance.setDate(new Date(data.end_date));
          this.conf_location = data.convening_place;
          this.conf_essay_info = data.essay_information;
          this.conf_essay_inst = data.essay_instructions;
          this.conf_conference_template = data.conference_template;

          let paper_ddl = new Date(data.paper_ddl);
          essay_ddl_instance.setDate(paper_ddl);
          let time = '';
          time += (paper_ddl.getHours() < 10 ? '0' : '') + paper_ddl.getHours() + ':';
          time += (paper_ddl.getMinutes() < 10 ? '0' : '') + paper_ddl.getMinutes();
          essay_time_instance.defaultTime = time;
          this.conf_essay_time = time;

          release_ddl_instance.setDate(new Date(data.employ_date));

          let register_ddl = new Date(data.register_ddl);
          register_ddl_instance.setDate(register_ddl);
          time = '';
          time += (register_ddl.getHours() < 10 ? '0' : '') + register_ddl.getHours() + ':';
          time += (register_ddl.getMinutes() < 10 ? '0' : '') + register_ddl.getMinutes();
          register_ddl.defaultTime = time;
          this.conf_register_time = time;

          this.conf_commute_info = data.ATinformation;
          this.conf_schedule = data.schedule;
          this.template_path = data.paper_template;
          this.conf_register_info = data.register_information;
          this.conf_contact = data.contact;
          this.image_path = data.backimg;
          $(document).ready(function () {
            M.updateTextFields();
            M.textareaAutoResize($('#conf-desc'));
            M.textareaAutoResize($('#conf-essay-info'));
            M.textareaAutoResize($('#conf-essay-inst'));
            M.textareaAutoResize($('#conf-schedule'));
            M.textareaAutoResize($('#conf-register-info'));
            M.textareaAutoResize($('#conf-commute-info'));
            M.textareaAutoResize($('#conf-contact'));
          })
        } else {
          M.toast({
            html: "<span style='font-weight: bold'>获取会议失败</span>",
            classes: "rounded red"
          });
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>内部错误</span>",
          classes: "rounded red"
        });
        console.log(err);
      })
    },
    updated: function () {
      $('select').formSelect();
    },
    methods: {
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
        let function_list = [];
        if (this.new_image)
          function_list.push(this.upload_image());
        if (this.new_template)
          function_list.push(this.upload_template());
        try {
          axios.all(function_list).then(
            axios.spread(function (...rsps) {
              that.$axios.post('/api/conference/modify/' + that.conf_id, {
                conference_id: that.conf_id,
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
                    html: "<span style='font-weight: bold'>更新会议成功</span>",
                    classes: "rounded green"
                  });
                  that.$router.push('/orgspace');
                }
                else {
                  M.toast({
                    html: "<span style='font-weight: bold'>更新会议失败</span>",
                    classes: "rounded red"
                  });
                }
              }).catch(err => {
                M.toast({
                  html: "<span style='font-weight: bold'>内部错误</span>",
                  classes: "rounded red"
                });
              });
            })
          );
        }
        catch (err) {
          M.toast({
            html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
            classes: "rounded red"
          });
        }
      },
      get_template: function (event) {
        this.paper_template = event.target.files[ 0 ];
        this.new_template = true;
      },
      get_image: function (event) {
        this.back_img = event.target.files[ 0 ];
        this.new_image = true;
      },
      upload_template: function () {
        if (!this.paper_template) {
          throw '模板未上传';
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.paper_template);
        return this.$file.post('', FileData, config).then(rsp => {
          this.template_path = rsp.data.link;
        });
      },
      upload_image: function () {
        if (!this.back_img) {
          throw '背景未上传';
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.back_img);
        return this.$file.post('', FileData, config).then(rsp => {
          this.image_path = rsp.data.link;
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
