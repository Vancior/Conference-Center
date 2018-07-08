<template>
  <div>
    <div class="row" style="height: 1rem;"></div>
    <div class="row">
      <form class="col s8 offset-s1">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" v-model="individual_information.name">
            <label for="icon_prefix">姓名</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">account_balance</i>
            <input id="icon_telephone_1" type="text" class="validate" v-model="individual_information.institution">
            <label for="icon_telephone_1">单位</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input id="icon_prefix_1" type="tel" class="validate" v-model="individual_information.telephone">
            <label for="icon_prefix_1">联系方式</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">email</i>
            <input disabled id="icon_telephone_2" type="email" class="validate" v-model="individual_information.email">
            <label for="icon_telephone_2">电子邮件</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">description</i>
            <textarea id="textarea1" class="materialize-textarea" v-model="individual_information.profile"></textarea>
            <label for="textarea1">介绍</label>
          </div>
        </div>
        <div class="row center-align">
          <div class="btn-large blue darken-1" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </div>
        </div>
      </form>
      <div class="col s2" style="margin-left: 3rem;">
        <div class="card" style="box-shadow: none; background-color: #f5f5f7">
          <div class="card-image">
            <img v-bind:src="this.file_server+this.individual_information.avator"></img>
          </div>
          <div class="card-content" style="padding-left:0rem;padding-right:0rem;">
            <vue-core-image-upload
              class="center-align"
            @imageuploaded="avatar_uploaded"
            :crop="true"
            :max-file-size="5242880"
            :url="avatar.url"
            :headers="avatar.headers"
            :credentials="avatar.credentials"
            >
            <button type="button" class="btn green" style="cursor: pointer">
              <i class="material-icons right" aria-hidden="true">file_upload</i>
              更新头像
            </button>
          </vue-core-image-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";
import VueCoreImageUpload from 'vue-core-image-upload';

export default{
  name:"PersonalInformation",
  components:{FileUpload, 'vue-core-image-upload': VueCoreImageUpload,},
  data: function () {
    return{
        individual_information:{
          name: "李某某",
          email: "li@qq.com",
          avator: "",
          profile: "简介",
          telephone:"18811526200",
          institution:"斯坦福大学"
        },
        file_server: 'global replacement',
//        upload: {
//          files: [],
//          web_io: "http://118.89.229.204:8080",
//          url: 'http://118.89.229.204:8080/ERM-WebIO-1.0/file/upload.do',
//          size: 100 * 1024 * 1024,
//          maximum: 1
//        },
        avatar: {
          credentials: false,
          url: 'http://118.89.229.204:8080/ERM-WebIO-1.0/file/upload.do',
          headers: {}
        },
        files: [],
    }
  },
  methods:{
    submit: function () {
      let session_token = sessionStorage.getItem('type');
      console.log("xingzhe");
      console.log(session_token);
      console.log("wu");
      let individual_update={
          name:this.individual_information.name,
          avator:this.individual_information.avator,
          profile:this.individual_information.profile,
          phone:this.individual_information.telephone,
          agency: this.individual_information.institution
      };
      this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/user/modify', individual_update).then(rsp => {
        if (rsp.data.status === 'succ') {
          M.toast({
            html: "<span style='font-weight: bold'>" + "修改成功" + "</span>",
            classes: "rounded green"
          });
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })
    },
    avatar_uploaded(ret) {
      if (ret && ret.link) {
        this.individual_information.avator=ret.link;
        console.warn("wuxingzhe")
        console.warn(this.individual_information.avator)
      } else {
        console.log(ret);
      }
    },

  },
  created(){

  },
  mounted(){
    $(document).ready(function() {
      M.updateTextFields();
    });
    this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/user/info', {}).then(rsp => {
      if (rsp.data.status === 'succ') {
        let individual_info=rsp.data.data;
        this.individual_information.name=individual_info.name;
        this.individual_information.email=individual_info.email;
        this.individual_information.avator=individual_info.avator;
        this.individual_information.profile=individual_info.profile;
        this.individual_information.institution=individual_info.agency;
        this.individual_information.telephone=individual_info.phone;
      }
    }).catch(err => {
      M.toast({
        html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
        classes: "rounded red"
      });
    }).then(ret=>{
      M.textareaAutoResize($('#textarea1'));
    });
    this.$bus.emit('manage-change-title', {text: '个人信息'});
  },
};
</script>
<style scoped>
</style>
