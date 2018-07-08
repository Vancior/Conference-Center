<template>
  <div>
    <div class="row" style="height: 4rem;"></div>
    <div class="row">
      <div class="col s3"></div>
      <form class="col s6 center-align">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input disabled id="account_email" type="email" class="validate" v-model="email">
            <label for="account_email"  :class="{active:email}">账户邮箱</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_old" type="password" class="validate" v-model="origin_pass">
            <label for="password_old">旧密码</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_first" type="password" class="validate" v-model="first_pass">
            <label for="password_first">新密码</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_second" type="password" class="validate" v-model="second_pass">
            <label for="password_second">再次输入新密码</label>
          </div>
        </div>
        <div class="row">
          <div class="btn-large blue darken-1" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </div>
        </div>
      </form>
      <div class="col s3"></div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"Account",
    components:{},
    data:function () {
      return{
        email: "",
        origin_pass:"",
        first_pass:"",
        second_pass:""
      }
    },
    methods:{
      submit:function () {
        if(this.first_pass!=this.second_pass){
          M.toast({
            html: "<span style='font-weight: bold'>两次密码输入不一致</span>",
            classes: "rounded red"
          });
        }
        else{
          let updatePassword={
            origin_pass:this.origin_pass,
            new_pass:this.first_pass
          };
          this.$axios.post('/api/principal/password', updatePassword).then(response => {
            if (response.data.status === 'succ') {
              M.toast({
                html: "<span style='font-weight: bold'>修改成功</span>",
                classes: "rounded green"
              });
              this.$router.push('/orgspace');
            }
            else{
              M.toast({
                html: "<span style='font-weight: bold'>" + response.data.info + "</span>",
                classes: "rounded yellow darken-2"
              });
            }
          }).catch(error => {
            M.toast({
              html: "<span style='font-weight: bold'>error occurred</span>",
              classes: "rounded red"
            });
          })
        }
      },

    },
    created(){

    },
    mounted(){
      this.$bus.emit('manage-change-title', {text: '账户设置'});
      $(document).ready(function() {
        M.updateTextFields();
      });
      this.$axios.post('/api/principal/info', {
        token: sessionStorage.getItem("session")
      }).then(response => {
        if(response.data.status === "succ") {
          console.log("get email");
          console.log(response.data.data);
          this.email = response.data.data.principal.email;
        }
        else {
          M.toast({
            html: "<span style='font-weight: bold;'>信息获取失败</span>",
            classes: 'red darken-2'
          });
        }
      }).catch(error => {
        M.toast({
          html: "<span style='font-weight: bold;'>error occurred</span>",
          classes: 'red darken-2'
        });
      });
    },
  };
</script>

<style>
  .col .row {
    margin-left: 0;
    margin-right: 0;
  }
</style>
