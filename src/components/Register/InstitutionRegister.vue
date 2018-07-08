<template>
<div>
  <navbar></navbar>
  <test-robot v-on:child-say="fill_form"></test-robot>
  <div class="card customize"
       style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
       :style="{'background-image':bg_overlay+'url(/static/bg5.jpg)'}">
    <div class="white-text row container">
      <div class="col s10 offset-s1">
        <h3 class="center">机构注册</h3>
      </div>
    </div>
  </div>

  <div class="white section">
    <div class="container" style="width: 60%;">

      <div class="row">
        <h5>基本信息</h5>
      </div>
      <div class="row">
        <div class="input-field col s5">
          <i class="medium material-icons prefix">account_circle</i>
          <input id="name" type="text" class="validate"  v-model="name"/>
          <label for="name" v-show="name===''">机构名</label>
        </div>
        <div class="input-field col s6 offset-l1">
          <i class="medium material-icons prefix">email</i>
          <input id="email" type="email" class="validate"  v-model="email"/>
          <label for="email" v-show="email===''">邮箱</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">add_location</i>
          <input id="location" type="text" class="validate"  v-model="location"/>
          <label for="location" v-show="location===''">地址</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">local_phone</i>
          <input id="phone" type="text" class="validate"  v-model="phone"/>
          <label for="phone" v-show="phone===''">联系电话</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">subject</i>
          <textarea id="introduction" class="materialize-textarea"  v-model="introduction"/>
          <label for="introduction" v-show="introduction===''">介绍</label>
        </div>
      </div>
      <div class="row">
        <h5>上传照片</h5>
      </div>
      <div class="row">
        <div class="file-field input-field">
          <div class="btn col s2 blue-grey white-text" @change="getImg($event)">
            <span>上传机构头像</span>
            <input type="file">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text"/>
          </div>
        </div>
      </div>
      <div class="row">
        <h5>上传证明材料</h5>
      </div>
      <div class="row">
        <div class="file-field input-field">
          <div class="btn col s2 blue-grey white-text" @change="getFile($event)">
            <span>上传证明材料</span>
            <input type="file">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text"/>
          </div>
        </div>
      </div>
      <div class="row">
        <h5>管理员信息</h5>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="medium material-icons prefix">account_circle</i>
          <input id="managerName" type="text" class="validate"  v-model="managerName"/>
          <label for="managerName" v-show="managerName===''">管理员姓名</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">email</i>
          <input id="confirmEmail" type="email" class="validate"  v-model="email"/>
          <label for="confirmEmail" v-show="email===''">再次确认邮箱</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">local_phone</i>
          <input id="managerPhone" type="text" class="validate"  v-model="managerPhone"/>
          <label for="managerPhone" v-show="managerPhone===''">管理员电话</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">vpn_key</i>
          <input id="password" type="password" class="validate"  v-model="password"/>
          <label for="password" v-show="password===''">密码</label>
        </div>
        <div class="input-field col s12">
          <i class="medium material-icons prefix">vpn_key</i>
          <input id="confirmPassword" type="password" class="validate"  v-model="confirmPassword"/>
          <label for="confirmPassword" v-show="confirmPassword===''">确认密码</label>
        </div>
      </div>
      <div class="center row">
        <button class="btn-large waves-effect waves-light blue darken-2" style="margin-top: 7px;" type="submit" @click="institutionRegisterFuc($event)">
          <i class="material-icons left">send</i>
          提交
        </button>
      </div>
      <div style="height: 4rem;"></div>
    </div>
  </div>
</div>
</template>

<script>
    import navbar from '@/include/NavBar';
    import axios from 'axios';
    import Vue from "vue"
    import VuejsDialog from "vuejs-dialog"
    import TestRobot from "../../include/TestRobot";

    Vue.use(VuejsDialog);

    export default {
      name: "InstitutionRegister",
      components: {TestRobot, navbar},
      data() {
        return {
          bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),",
          name: '',
          email : '',
          location : '',
          phone:'',
          introduction:'',
          password:'',
          confirmPassword:'',
          file:'',
          filePath:'',
          img:'',
          imgPath:'',
          managerName:'',
          managerPhone:'',
        }
      },
      created: function() {
      },
      methods:{
        fill_form:function(form_data){
          this.name=form_data.name;
          this.email = form_data.email;
          this.location = form_data.location;
          this.phone = form_data.phone;
          this.introduction=form_data.introduction;
          this.password=form_data.password;
          this.confirmPassword=form_data.confirmPassword;
          this.managerName=form_data.managerName;
          this.managerPhone=form_data.managerPhone;
        },
        getFile(event){
          this.file = event.target.files[0];
        },
        getImg(event){
          this.img = event.target.files[0];
        },
        institutionRegisterFuc(event) {

          event.preventDefault();

          let options = {
            cancelText: '确认',  // 本地化确认按钮文字提示内容
            animation: 'zoom', // 动画方式， 三选一: "zoom", "bounce", "fade"
            type: 'basic', // 确认类型，点击确认（basic）， 'soft'(软确认), 'hard'（硬确认)
            };

            const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(this.name===""|| this.email===""|| this.location===""|| this.phone===""||
            this.introduction===""||this.password===""|| this.confirmPassword===""||
            this.managerName===""|| this.managerPhone===""){
            M.toast({
              html:"<span style='font-weight: bold'>请完成所有表单</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }

          else if(this.email===''||!regEmail.test(this.email)){
            M.toast({
              html:"<span style='font-weight: bold'>邮箱不符合规范</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }
          else if(this.password!==this.confirmPassword){
            M.toast({
              html:"<span style='font-weight: bold'>两次密码不一致</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }


          let that = this;
          axios.all([this.upload_file(), this.upload_img()]).then(
            axios.spread(function (uf, ui) {
              if(uf===false||ui===false){
                return;
              }
               that.$user.post('/ins/register', {
                name:that.name,
                location: that.location,
                phone: that.phone,
                backimg:that.imgPath,
                introduction:that.introduction,
                evidence:that.filePath,
                principal: {
                  email: that.email,
                  name:that.managerName,
                  password:that.password,
                  phone:that.managerPhone
                }
              }).then(rsp => {
                if(rsp.data.code==="400"){
                  M.toast({
                    html:"<span style='font-weight: bold'>"+rsp.data.msg+"</span>",
                    classes: "rounded yellow darken-2"
                  });
                  return;
                }
                 M.toast({
                   html:"<span style='font-weight: bold'>信息已提交审核</span>",
                   classes: "rounded green"
                 });
                that.$router.push('/');
              }).catch(err => {
                console.log(err);
              })

            })
          );

        },
        upload_file: function() {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          if(!this.file){
            M.toast({
              html:"<span style='font-weight: bold'>请提交证明材料</span>",
              classes: "rounded yellow darken-2"
            });
            return false;
          }
          let FileData = new FormData();
          FileData.append('file',this.file);
          return this.$file.post('', FileData, config).then(response=>{
            this.filePath=response.data.link;
          });

        },
        upload_img: function() {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          if(!this.img){
            M.toast({
              html:"<span style='font-weight: bold'>请提交照片</span>",
              classes: "rounded yellow darken-2"
            });
            return false;
          }
          let ImgData = new FormData();
          ImgData.append('file',this.img);
          return this.$file.post('', ImgData, config).then(response => {
            this.imgPath=response.data.link;
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
