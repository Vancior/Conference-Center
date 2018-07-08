<template>
  <div>
    <div class="row" style="height: 1rem;"></div>
    <div class="row">
      <div class="col s6 offset-s3">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">email</i>
            <input disabled id="account_email" type="email" class="validate" v-model="email">
            <!--<label for="account_email">Email</label>-->
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">vpn_key</i>
            <input id="origin_pass" type=password v-model="origin_pass">
            <label for="origin_pass">旧的密码</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_first" type="password" class="validate" v-model="first_pass">
            <label for="password_first">新密码</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_second" type="password" class="validate" v-model="second_pass">
            <label for="password_second">再次输入新密码</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row center-align" style="margin-top: 3rem;">
      <div class="btn-large blue darken-1" @click="submit">
        <i class="material-icons left">send</i>
        提交
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"AccountSet",
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
          this.$axios.post('/api/user/password', updatePassword).then(response => {
            if (response.data.status === 'succ') {
              M.toast({
                html: "<span style='font-weight: bold'>修改成功</span>",
                classes: "rounded green"
              });
            }
            else{
              M.toast({
                html: "<span style='font-weight: bold'>" + response.data.info + "</span>",
                classes: "rounded yellow"
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
      this.$axios.post('/api/user/info', {
        token: sessionStorage.getItem("session")
      }).then(response => {
        if(response.data.status === "succ") {
          console.log("get email");
          console.log(response.data.data);
          this.email = response.data.data.email;
        }
        else {
          M.toast({
            html: "<span style='font-weight: bold;'>信息获取失败</span>",
            classes: 'red darken-2 rounded'
          });
        }
      }).catch(error => {
        M.toast({
          html: "<span style='font-weight: bold;'>error occurred</span>",
          classes: 'red darken-2 rounded'
        });
      });
    },
  };
</script>

<style scoped>
  .col .row {
    margin: 0;
  }
</style>
