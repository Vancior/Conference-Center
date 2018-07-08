<template>
  <div>
    <test-robot v-on:child-say="fill_form"></test-robot>
    <navbar></navbar>
    <div class="row customize valign-wrapper" style="background: url(/static/bg1.jpg);background-size: cover; margin-bottom: 0"
         :style="{'min-height': (page_height-60)+'px'}">
      <div class="col s12 m4 offset-m4 l4 offset-l4" style="width:35%">
        <div class="card-panel" style="padding-bottom: 2.5%;padding-top: 4.7%;opacity: 0.95;">
          <div class="row center-align" style="margin-top:0; margin-bottom: 1.5rem;">
            <h3>登录</h3>
          </div>
          <div class="row">
            <div class="row" style="margin-bottom: 0;">
              <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px" >
                <i class="medium material-icons prefix">email</i>
                <input id="email" type="email" class="validate"  v-model="email"/>
                <label for="email" v-show="email===''">邮箱</label>
              </div>
              <span class="red-text" style="margin-left: 72px">{{emailMessage}}</span>
            </div>
            <div class="row">
              <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px">
                <i class="medium material-icons prefix">vpn_key</i>
                <input id="password" type="password" class="validate" v-model="password" />
                <label for="password" v-show="password===''">密码</label>
              </div>
              <span class="red-text" style="margin-left: 72px">{{passwordMessage}}</span>
            </div>
            <div class="row center-align">
              <p>
                <label class="col s3 offset-s1">
                  <input type="radio" name="scholar" value="scholar" v-model="isScholar" checked />
                  <span>学者</span>
                </label>
                <label class="col s4">
                  <input type="radio" name="institution" value="institution" v-model="isScholar" />
                  <span>主办方</span>
                </label>
                <label class="col s3">
                  <input type="radio" name="manager" value="manager" v-model="isScholar" />
                  <span>管理员</span>
                </label>
              </p>
            </div>
            <div class="row center-align">
              <button class="col s6 offset-s3 btn waves-effect waves-light" style="margin-top: 3%;" type="submit" id="submit" v-on:click="loginfuc()">
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
  import TestRobot from "../../include/TestRobot";
    export default {
        name: "Login",
        components: {TestRobot, navbar},
        data() {
          return {
            page_height:$(window).height(),
            email : '',
            password : '',
            isScholar: 'scholar',
            emailMessage: '',
            passwordMessage:'',
            token:'',
            uid:''
          }
        },
        methods:{
          fill_form:function(form_data){
              this.email=form_data.email;
              this.password = form_data.password;
              this.isScholar = form_data.isScholar;
          },
          loginfuc :function(){

              const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(this.email===''||!regEmail.test(this.email)){
                this.emailMessage="请输入正确的邮箱!";
                return
              }else{
                this.emailMessage="";
              }
              if(this.password===''){
                this.passwordMessage="请输入密码!";
                return
              }else{
                this.passwordMessage="";
              }
            let formData = new FormData();
            formData.append('email',this.email);
            formData.append('password',this.password);
              if(this.isScholar==='scholar') {
                this.$user.post('/user/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  sessionStorage.setItem('type','scholar');
                  this.session_callback();
                  this.$router.go(-1);

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                });
                console.log(this.token);
              }
              else if(this.isScholar==="institution"){
                this.$user.post('/pp/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  sessionStorage.setItem('type','institution');
                  this.session_callback();
                  this.$router.push('/orgspace');

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                })
              }
              else if (this.isScholar==="manager"){
                this.$user.post('/manager/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  sessionStorage.setItem('type','manager');
                  this.session_callback();
                  this.$router.push('/review/application');

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                })
              }
          },
          session_callback: function() {
            this.$axios.post('/api/user/token', {
              token: this.token,
            }).then(rsp => {
              sessionStorage.setItem('name',rsp.data.data.name);
            }).catch(err => {
              console.log(err);
            });
          }
        },
        computed:{
        },
        created(){
          this.$bus.emit("toOther")

        },
        mounted(){
          this.$bus.emit("toOther")
          this.page_height=$(window).height();
          const that = this;
          window.onresize = function temp() {
            that.page_height=$(window).height();
          };
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
