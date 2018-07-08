<template>
  <div class="row">
    <!--<loader v-show="is_loading"></loader>-->
    <div class="col s10 offset-s1">
      <div class="row" style="margin-top: 20px">
        <div class="col s6 m4" v-for="(one, index) in principals" v-bind:key="index">
          <div class="card user-card">
            <div class="row right-align" style="padding-right: .5em; padding-top: .5em">
              <i class="material-icons righe" style="cursor: pointer">close</i>
            </div>
            <div class="card-content center-align">
              <div class="row">
                <div class="col s6 offset-s3">
                  <div class="avatar">
                    <img v-bind:src="$image(one.avator)" alt="" class="circle" style="max-width: 100%"/>
                  </div>
                </div>
                <div class="col s3">
                  <span class="new red badge" v-if="one.power === 'all'">超级</span>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <h5>{{ one.name }}</h5>
                </div>
              </div>
              <!--<span class="new badge"></span><h5>{{ one.name }}</h5>-->
              <h6>{{ one.email }}</h6>
              <h6>{{ one.phone }}</h6>
              <h6>{{ one.location }}</h6>
            </div>
          </div>
        </div>
        <div class="col s6 m4" v-show="hack_show">
          <div class="card modal-trigger" style="cursor: pointer; min-height: 200px" data-target="add_modal"
               id="new-card">
            <div class="card-content valign-wrapper" style="height: 100%">
              <div class="center-align" style="width: 100%">
                <i class="medium material-icons">add</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="add_modal" class="modal">
        <div class="modal-content">
          <h5>添加工作人员</h5>
          <div class="row">
            <div class="input-field col s8">
              <i class="medium material-icons prefix">account_circle</i>
              <input id="new_name" type="text" class="validate" v-model="new_name">
              <label for="new_name">姓名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">email</i>
              <input id="new_email" type="email" class="validate" v-model="new_email">
              <label for="new_email">邮箱</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">local_phone</i>
              <input id="new_phone" type="tel" class="validate" v-model="new_phone">
              <label for="new_phone">手机</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">vpn_key</i>
              <input id="new_password" type="password" class="validate" v-model="new_password">
              <label for="new_password">密码</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">place</i>
              <input id="new_location" type="text" class="validate" v-model="new_location">
              <label for="new_location">工作地点</label>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="padding-top: 0;padding-right: 30px">
          <a style="cursor: pointer;" class="green white-text modal-close waves-effect waves-teal btn-flat"
             @click="add_princ()">添加</a>
          <a style="cursor: pointer;" class="black white-text modal-close waves-effect waves-teal btn-flat">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loader from '@/include/Loader';

  export default {
    name: "Principals",
    component: { loader },
    data: function () {
      return {
        principals: [],
        new_name: '',
        new_email: '',
        new_phone: '',
        new_password: '',
        new_location: '',
        hack_update: false,
        hack_show: false,
        is_loading: true
      };
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', { text: '工作人员管理' });
      this.refresh();
      $('.modal').modal();

        this.$bus.emit("toOS")

    },
    updated: function () {
      if (this.hack_update) {
        let height = $('.user-card').height();
        $('#new-card').css({ height: height + 'px' });
        this.hack_update = false;
        this.hack_show = true;
        console.log(height);
      }
    },
    methods: {
      refresh: function () {
        this.is_loading = true;
        this.$axios.post('/api/manage/principals', {}).then(rsp => {
          if (rsp.data.status === 'succ') {
            this.principals = rsp.data.data.principal;
            this.hack_update = true;
            this.hack_show = false;
          } else {
          }
          this.is_loading = false;
        });
      },
      add_princ: function () {
        this.$axios.post('/api/manage/addPrincipal', {
          email: this.new_email,
          password: this.new_password,
          name: this.new_name,
          location: this.new_location,
          phone: this.new_phone
        }).then(rsp => {
          if (rsp.data.status === 'succ') {
            M.toast({
              html: "<span style='font-weight: bold'>已添加工作人员</span>",
              classes: "rounded green"
            });
            this.new_email = '';
            this.new_name = '';
            this.new_password = '';
            this.new_location = '';
            this.new_phone = '';
            this.refresh();
          } else {
            M.toast({
              html: "<span style='font-weight: bold'>" + rsp.data.info + "</span>",
              classes: "rounded red"
            });
          }
        }).catch(err => {
          M.toast({
            html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
            classes: "rounded red"
          });
        })
      }
    }
  }
</script>

<style scoped>
  .col .row {
    margin-right: 0;
  }

  .modal {
    width: 40%;
    min-width: 40%;
  }

  .modal .row {
    margin-bottom: 0;
  }

  .card .row {
    margin: 0;
  }

  .card h5, h6 {
    margin-top: 0;
    margin-bottom: .2em;
  }

  .badge::after {
    content: ""
  }

  .card-content {
    padding-top: .5em;
  }
</style>
