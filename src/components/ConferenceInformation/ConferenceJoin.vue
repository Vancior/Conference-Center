<template>
  <div class="width: 100%">
    <NavBar></NavBar>

    <div class="card customize"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':bg_overlay+'url(/static/bg1.jpg)'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h5>参与会议</h5>
          <h4 style="font-weight: bold; cursor: pointer;"
              @click="$router.push('/conference/'+conference_id)">
            {{resp.data.title}}
          </h4>
          <h5>&nbsp</h5>
          <h5>{{resp.data.convening_place}}</h5>
          <h5>{{resp.data.start_date}}</h5>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light blue"
             style="right:25%;"
             @click="submit">
            <!--<span class="mobile-fab-tip">注销</span>-->
            <i class="material-icons tooltipped" data-position="top" data-tooltip="提交">send</i>
          </a>
        </div>
      </div>
    </div>

    <div class="section white">
      <div class="row container">
        <div class="col s1"></div>
        <div class="col s10">
          <div class="row" style="margin-bottom: 0;">
            <h5>以{{identify}}身份注册会议</h5>
          </div>
          <div class="center row">
            <div class="container" style="width:100%;">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="papers.length===0">
                您没有参会论文
              </h5>
              <div class="card" v-for="item in papers">
                <div class="card-action">
                  <span>
                    #<span class="chip" style="margin: 0; cursor: pointer">{{item.paper_number}}</span>
                  </span>
                </div>
                <div class="card-content">
                  <div class="row">
                    <div class="col s12 center-align">
                      <h4 style="font-weight: bold; margin: 0;cursor: pointer">{{item.title}}</h4>
                    </div>
                  </div>
                  <div class="row center-align" style="margin-bottom: 0;">
                    <div v-bind:class="'col s'+12/(item.authors.length < 4 ? item.authors.length: 4)"
                         v-for="author in item.authors">
                      <h5>{{author.name}}</h5>
                      <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <h5>参会人</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="participants.length === 0">
                在这里添加参会人
              </h5>
              <!--<div v-if="plength!==0">-->
                <div class="col s4" v-for="(participant, idx) in participants" style="margin-bottom: 1rem;">
                  <div class="card-panel" style="padding-top: 0.5rem;" v-bind:id=idx>
                    <div style="height: 24px;">
                      <i class="material-icons right" style="cursor: pointer"
                         @click="participants.splice(idx, 1)">
                        clear
                      </i>
                    </div>
                    <div @click="update_participant(idx)">
                    <div>
                      <h5 style="font-weight: bold; margin-top: 0;" v-if="participant.name">{{participant.name}}</h5>
                    </div>
                    <i class="material-icons prefix"
                    :class="{ green: participant.sex === '男', red: participant.sex === '女'}">
                      person</i>
                    <i class="material-icons prefix" v-show="participant.is_book">home</i>
                    <div>{{participant.contract}}</div>
                    <div>{{participant.job}}</div>
                  </div>
                  </div>
                <!--</div>-->
              </div>
            </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;">
                <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="first_name" type="text" disabled v-model="participant_field.name" v-if="identify==='聆听者'">
                  <input id="first_name" type="text"  v-model="participant_field.name" v-else>
                  <label for="first_name" :class="{active:participant_field.name}" >姓名</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">call</i>
                  <input id="phone" type="text" v-model="participant_field.contract">
                  <label for="phone">联系方式</label>
                </div>
              </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;padding-top: 3px;padding-bottom: 3px;">
                  <div class="col s2 valign-wrapper">
                    <i class="material-icons prefix">person</i>
                    <span style="margin-left: 1rem;">性别</span>
                  </div>
                  <label class="col s2">
                    <input type="radio" value="男" v-model="participant_field.sex" />
                    <span>男</span>
                  </label>
                  <label class="col s2">
                    <input type="radio" value="女" v-model="participant_field.sex" />
                    <span>女</span>
                  </label>
                  <div class="col s3 valign-wrapper">
                    <i class="material-icons prefix">home</i>
                    <span style="margin-left: 1rem;">预定住宿</span>
                  </div>
                  <div class="switch col s3">
                    <label>
                      否
                      <input type="checkbox" v-model="participant_field.is_book">
                      <span class="lever"></span>
                      是
                    </label>
                </div>
              </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">work</i>
                <input id="job" type="text" v-model="participant_field.job">
                <label for="job">工作</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">note</i>
                <input id="note" type="text" v-model="participant_field.note">
                <label for="note">备注</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="waves-effect waves-light btn green col s1" @click="add_participant">添加
                <i class="material-icons right">add</i>
              </div>
            </div>
            </div>
          <div class="row">
            <h5>缴费凭证</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row" v-if="upload.files.length===0">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                在这里上传文件
              </h5>
            </div>
            <div class="center row" v-if="upload.files.length>0">
              <div class="col s12" style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                <button class="btn"
                        style="cursor: pointer"
                        :class="{ green: file.success, teal: file.active, red: file.error, 'blue-grey': !file.success && !file.active && !file.error}"
                        v-for="(file, index) in upload.files" :key="file.id">
                  {{file.name}}&nbsp
                  <span v-if="file.error">{{file.error}}</span>
                  <span v-else-if="file.success">成功</span>
                  <span class="detail" v-else-if="file.active">{{file.progress}}%</span>
                  <span class="detail" v-else></span>
                  <i class="material-icons right"
                     style="cursor: pointer"
                     @click.prevent="$refs.upload.remove(file)">
                    clear
                  </i>
                </button>
              </div>
            </div>
            <div class="center row">
              <file-upload
                class="waves-effect waves-light btn blue-grey lighten-1"
                :post-action="upload.url"
                :size="upload.size"
                :maximum="upload.maximum"
                v-model="upload.files"
                ref="upload">
                <i class="material-icons right">attach_file</i>
                选择文件
              </file-upload>
              <button type="button" class="btn green"
                      v-if="!$refs.upload || !$refs.upload.active"
                      @click.prevent="$refs.upload.active = true">
                <i class="material-icons right" aria-hidden="true">file_upload</i>
                开始上传
              </button>
              <button type="button" class="btn red" v-else @click.prevent="$refs.upload.active = false">
                <i class="material-icons right" aria-hidden="true">clear</i>
                停止上传
              </button>
            </div>
          </div>
          <div class="row" style="height: 0.5rem;">
          </div>
          <div class="row center-align">
            <div class="btn-large blue darken-1" @click="submit">
              <i class="material-icons left">send</i>
              提交
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/include/NavBar";
  import FileUpload from "vue-upload-component";
  import axios from 'axios';

  export default {
    name: "ConferenceJoin",
    components: { NavBar, FileUpload },
    data: function () {
      return {
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
        conferenceState: '默认',
        contributeToLink: 0,
        registerToLink: 0,
        identify: "初始值",
        resp: {
          data: {}
        },
        user_name: "",
        participants: [],
        papers: [],
        upload: {
          name: "",
          files: [],
          web_io: 'global replacement',
          url: 'global replacement',
          size: 100 * 1024 * 1024,
          maximum: 1
        },
        participant_field: {
          name: "",
          contract: "",
          sex:"",
          is_book: false,
          job: "",
          note: "",
        },
      }
    },
    created: function() {
      $(document).ready(function(){
        $('.tooltipped').tooltip();
      });

      if (this.$route.params.id) {
        this.conference_id = this.$route.params.id;
      } else {
        M.toast({
          html: "<span style='font-weight: bold;'>需要路由参数</span>",
          classes: 'red rounded'
        });
        this.$router.go(-1);
      }
      if (!sessionStorage.getItem("session"))  {
        this.$router.replace("/login");
      }
      //
      this.participant_field = {
        name: "",
          contract: "",
          sex:"",
          is_book: false,
          job: "",
          note: ""
      };

      this.load_user_info();
      this.load_conference();
      this.load_papers_info();
    },

    mounted: function () {
    },
    methods: {
      demo_oriented_upload() {
        if (this.upload.files[0]) {
          this.upload.files[0].success = true;
          M.toast({
            html: "<span style='font-weight: bold;'>上传成功</span>",
            classes: 'green rounded'
          });
        }
        else {
          M.toast({
            html: "<span style='font-weight: bold;'>请先选择文件</span>",
            classes: 'yellow darken-2 rounded'
          });
        }
      },
      load_user_info() {
        let that = this;
        this.$axios.post('api/user/info', {})
          .then(response => {
            console.log("response:"+JSON.stringify(response));
              if(response.data.status === "succ") {
                that.user_name = response.data.data.name;
                that.participant_field.name = that.user_name;
                console.log("user info user name:" + that.user_name);
              }
              else {
                that.$router.push("/login");
              }
            }
          ).catch(
          error => {
            M.toast({
              html: error,
              classes: "rounded red"
            });
          }
        );
      },
      load_conference() {
        this.$axios.post('api/conference/' + this.conference_id).then(response => {
          this.resp = response.data;
          this.getConferenceState();
          this.isAbleRegister();
          this.getConferenceImg();
          // this.load_papers_info();
        }).catch(error => {
        });
      },
      load_papers_info: function() {
        let originThis=this;
        /*let thats = this;*/
        this.$axios.post('/api/user/getRegister',{
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id
        }).then(response => {
          if(response.data.data.type === 0) {
            originThis.identify = "作者";
            originThis.papers = response.data.data.papers;
            console.log("go to type === 0");
          }
          else {
            originThis.identify = "聆听者";
          }
          console.log("response.data.data");
          console.log(response.data.data);
        }).catch(error => {
          console.log(1);
        });
      },

      isAbleRegister: function () {
        if (!(this.resp.data.state & 0b0011)) {
          M.toast({
            html: "<span style='font-weight: bold'>注册截止</span>",
            classes: "rounded red"
          });
          this.$router.go(-1);
        }
      },
      getConferenceImg: function () {
        this.conferenceImg = 'global replacement' + this.resp.data.backimg;
      },
      getConferenceState: function () {
        if (this.resp.data.state & 0b1000) {
          this.conferenceState = '已结束';
        }
        else if (!this.resp.data.state & 0b0100) {
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

      update_participant: function(idx) {
        //add shadow
        $('#'+idx).addClass("z-depth-5");
        //auto fill name
        this.participant_field = this.participants[idx];
        console.log("participant field:");
        console.log(this.participant_field);
      },
      add_participant() {
        console.log("participants:");
        console.log(this.participants);

        let name = this.participant_field.name.trim();
        let telephone = this.participant_field.contract.trim();
        let gender = this.participant_field.sex.trim();
        let job = this.participant_field.job.trim();
        let note = this.participant_field.note.trim();
        let accommodate = 0;
        if(this.participant_field.is_book === true) {
          accommodate = 1;
        }

        if (name.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填写作者姓名</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (telephone.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填联系方式</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (gender.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请选择性别</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (job.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填工作</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }

        //participant is a person in papers.authors
        if(this.identify === "聆听者") {
          if(name !== this.user_name) {
            M.toast({
              html: "<span style='font-weight: bold;'>您只能本人参会</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        else if(this.identify === "作者"){
          let inAuthor = false;
          for (let i = 0; i < this.papers.length; i++) {
            for (let j = 0; j < this.papers[i].authors.length; j++) {
              if (name === this.papers[i].authors[j].name) {
                inAuthor = true;
                break;
              }
            }
          }
          if (!inAuthor) {
            M.toast({
              html: "<span style='font-weight: bold;'>参会人员必须是作者之一</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        //update or insert
        let tempParticipant = {
          name: name,
          contract: telephone,
          sex: gender,
          job: job,
          note: note,
          is_book: accommodate
        };
        let index = this.participants.findIndex(function(item) {
          return item.name === tempParticipant.name;
        });
        console.log("index==" + index);
        if(index === -1) {
          this.participants.push(tempParticipant);
        }
        else {
          this.participants[index] = tempParticipant;
        }

        //remove shadow
        $('#'+index).removeClass("z-depth-5");
        //clear
        this.participant_field.name = "";
        this.participant_field.contract = "";
        this.participant_field.job = "";
        this.participant_field.note = "";
        this.participant_field.sex = "";
        this.participant_field.is_book = false;
      },

      submit() {
        let files = this.upload.files;
        let paper_numbers = [];
        for(let i = 0; i < this.papers.length; i++) {
          paper_numbers.push(this.papers[i].paper_number);
        }
        let paper_number_str = paper_numbers.toString();

        let type = 0;
        //update participant type
        if(this.identify === "聆听者") {
          type = 1;
        }
        //check participants including the user himself
        let ok = false;
        for(let i = 0; i < this.participants.length; i++) {
          if(this.participants[i].name == this.user_name) {
            ok = true;
            break;
          }
        }
        if(type === 1 && ok === false) {
          M.toast({
            html: "<span style='font-weight: bold;'>您只能本人参会</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        //identify == author
        if(type === 0) {
          for(let i = 0; i < this.papers.length; i++) {
            this.papers[i].hasParticipants = 0;
            for(let j = 0; j< this.papers[i].authors.length; j++) {
              for(let k = 0; k < this.participants.length; k++) {
                if (this.papers[i].authors[j].name === this.participants[k].name) {
                  this.papers[i].hasParticipants = 1;
                  break;
                }
              }
              if(this.papers[i].hasParticipants === 1) {
                break;
              }
            }
          }
          //no participants
          if(this.participants.length === 0) {
            console.log("this participants length = 0");
            M.toast({
              html: "<span style='font-weight: bold;'>请输入参会者</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
          for(let i = 0; i < this.papers.length; i++) {
            if(this.papers[i].hasParticipants !== 1) {
              M.toast({
                html: "<span style='font-weight: bold;'>每篇论文至少有一位参会者</span>",
                classes: 'yellow darken-2 rounded'
              });
              return;
            }
          }
        }
        console.log("check participants information");
        //check have pdf or picture
        if (files.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请上传文件</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        } else {
          if (!files[0].success) {
            M.toast({
              html: "<span style='font-weight: bold;'>请先点“开始上传”</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        //set parameters to transmit
        console.log("submit participants");
        console.log(this.participants);
        let upload_resp = JSON.parse(files[0].response);
        let file_url = "/" + upload_resp.link;
        console.log("file url:");
        console.log(file_url);
        let params = {
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id,
          payment: file_url,
          type: type,
          paper_number: paper_number_str,
          participants: this.participants
        };
        console.log("set parameters to transmit");
        console.log(params);
        //transmit message
        this.$axios.post("/api/user/register",params).then(response => {
          let data = response.data;
          if(data.status === "succ") {
            console.log("transmit message:");
            console.log(data.status);
            M.toast({
              html: "<span style='font-weight: bold;'>会议注册成功</span>",
              classes: 'green rounded'
            });
            this.$router.push("/conference/"+this.conference_id);
          }
          else {
            console.log("response fail");
            M.toast({
              html: "<span style='font-weight: bold;'>会议注册失败</span>",
              classes: 'red rounded'
            });
          }
        }).catch(error => {
          M.toast({
            html: "<span style='font-weight: bold;'>error occurred</span>",
            classes: 'red rounded'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
</style>
