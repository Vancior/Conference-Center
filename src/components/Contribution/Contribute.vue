<template>
  <div class="width: 100%">
    <NavBar></NavBar>

    <div class="card customize"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':bg_overlay+'url(/static/bg1.jpg)'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h5>投稿至</h5>
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
            <i class="material-icons tooltipped" data-position="top" data-tooltip="提交">send</i>
          </a>
        </div>
      </div>
    </div>

    <div class="section white">
      <div class="row container">
        <div class="col s10 offset-s1">
          <div class="row" style="margin-bottom: 0;">
            <h5>论文信息</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">title</i>
              <input id="title" type="text" v-model="title">
              <label for="title">标题</label>
            </div>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">subject</i>
              <textarea id="abstract" class="materialize-textarea" v-model="abstract"></textarea>
              <label for="abstract">摘要</label>
            </div>
          </div>
          <div class="row">
            <h5>作者</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="row center-align">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="authors.length===0">
                在这里添加作者
              </h5>
              <div class="col s4" v-for="(author, idx) in authors" style="margin-bottom: 1rem;">
                <div class="card-panel"
                     style="padding-top: 0.5rem;">
                  <div style="height: 24px;">
                    <i class="material-icons right"
                       @click="authors.splice(idx, 1)"
                       style="cursor: pointer">
                      clear
                    </i>
                  </div>
                  <div><h5 style="font-weight: bold; margin-top: 0;">{{author.name}}</h5></div>
                  <div>{{author.institution}}</div>
                  <div style="font-family: Courier; font-size: 13px; overflow-wrap: break-word">{{author.email}}</div>
                </div>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s4">
                <i class="material-icons prefix">account_circle</i>
                <input id="first_name" type="text" v-model="authors_field.name">
                <label for="first_name">姓名</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">account_balance</i>
                <input id="institution" type="text" v-model="authors_field.institution">
                <label for="institution">机构</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">email</i>
                <input id="email" type="email" v-model="authors_field.email">
                <label for="email">邮箱</label>
              </div>
              <div class="waves-effect waves-light btn green col s1" @click="add_author">添加
                <i class="material-icons right">add</i>
              </div>
            </div>
          </div>
          <div class="row">
            <h5>上传文件</h5>
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
import NavBar from "../../include/NavBar";
import FileUpload from "vue-upload-component";

export default {
  name: "Contribute",
  components: { NavBar, FileUpload },
  data: function () {
    return {
      session_token: '',
      bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
      conference_id: 1,
      conferenceImg: "/static/bg1.jpg",
      conferenceState: '默认',
      resp: {
        data: {}
      },
      user: null,
      display_id: 1,
      title: "",
      abstract: "",
      authors: [
      ],
      authors_field: {
        name: "",
        institution: "",
        email: "",
      },
      upload: {
        files: [],
        web_io: "http://118.89.229.204:8080",
        url: 'http://118.89.229.204:8080/ERM-WebIO-1.0/file/upload.do',
        size: 100 * 1024 * 1024,
        maximum: 1
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
      this.$router.replace("/404");
    }

    this.session_token = sessionStorage.getItem('session');

    if (!this.session_token)  {
      this.$router.replace("/login");
    }

    this.load_user_info().then(ret => {
      this.load_conference();
    })
  },
  mounted: function () {
  },
  methods: {
    demo_oriented_upload() {
      if (this.upload.files[0]) {
        this.upload.files[0].success = true;
        M.toast({html: "<span style='font-weight: bold;'>上传成功</span>", classes: 'green rounded'});
      } else {
        M.toast({html: "<span style='font-weight: bold;'>请先选择文件</span>", classes: 'yellow darken-2 rounded'});
      }
    },
    load_user_info() {
      let that = this;
      return this.$axios.post("/api/user/token", {token: this.session_token}).then(response => {
        let resp = response.data;
        if (resp.status === "succ") {
          that.user_info = resp.data;
        } else {
          that.$router.replace("/login");
        }
      });
    },
    load_conference() {
      this.$axios.post('api/conference/' + this.conference_id).then(response => {
        this.resp = response.data;
        this.getConferenceState();
        this.isAbleContribute();
        this.getConferenceImg();
      }).catch(error => {
        M.toast({
          html: "<span style='font-weight: bold;'>加载会议信息时出错</span>",
          classes: 'red rounded'
        });
      });
    },
    isAbleContribute: function () {
      if (this.conferenceState !== "征稿中") {
        M.toast({
          html: "<span style='font-weight: bold'>征稿截止</span>",
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
    add_author() {
      let name = this.authors_field.name.trim();
      let institution = this.authors_field.institution.trim();
      let email = this.authors_field.email.trim();
      if (name.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写作者姓名</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (institution.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写作者单位</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (email.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写邮箱</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      let author = {
        name: name,
        institution: institution,
        email: email
      };
      this.authors.push(author);
      this.authors_field.name = "";
      this.authors_field.institution = "";
      this.authors_field.email = "";
    },
    submit() {
      let title = this.title;
      let abstract = this.abstract;
      let authors = this.authors;
      let files = this.upload.files;
      if (title.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写标题</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (abstract.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写摘要</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (authors.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写作者</span>", classes: 'yellow darken-2 rounded'});
        return;
      } else {
        let ok = false;
        for (let i = 0; i < authors.length; i++) {
          if (authors[i].name === this.user_info.name) {
            ok = true;
            break;
          }
        }
        if (!ok) {
          M.toast({
            html: "<span style='font-weight: bold;'>你必须是作者之一才能投递这篇论文</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
      }
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
      let authors_str = JSON.stringify(authors);
      let upload_resp = JSON.parse(files[0].response);
      let file_url = upload_resp.link;
      let params = {
        conference_id: this.conference_id,
        title: title,
        abstract: abstract,
        authors: authors_str,
        file_url: file_url,
      };
      let that = this;
      this.$axios.post("/api/contribute", params).then(
        rsp => {
          let data = rsp.data;
          if (data.status==="succ") {
            let contribution_id = data.data.contribution_id;
            this.$router.push("/contribution/"+contribution_id);
            M.toast({
              html: "<span style='font-weight: bold;'>投稿成功</span>",
              classes: 'green rounded'
            });
          } else {
            M.toast({
              html: "<span style='font-weight: bold;'>投稿失败</span>",
              classes: 'red rounded'
            });
          }
        }
      ).catch(err=>{
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
