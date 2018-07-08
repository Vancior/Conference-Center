<template>
  <div>
    <NavBar></NavBar>
    <div class="divider"></div>
    <div class="center red accent-2 section" v-if="apps.length>0">
      <h5 style="margin-top: 0;margin-bottom: 0;">有 {{apps.length}} 个待处理的申请</h5>
    </div>

    <div class="center green accent-2 section" v-if="apps.length===0">
      <h5 style="margin-top: 0;margin-bottom: 0;">有 {{apps.length}} 个待处理的申请</h5>
    </div>

    <div class="row container">
      <div style="height: 3rem;"></div>
      <EmptyView v-if="apps.length === 0"
                 message="还没有新的申请"
                 :style="{'height': page_height*0.6+'px'}"></EmptyView>
      <div class="card" v-for="app in apps">
        <div class="card-content">
          <div class="card-title">{{app.name}}</div>
          <div class="row"><div class="divider"></div></div>
          <div class="row">
            <div class="col s3 grey-text text-darken-2" style="font-weight: bold;">
              <i class="material-icons left">location_on</i>
              地址
            </div>
            <div class="col s9">{{app.location}}</div>
          </div>
          <div class="row">
            <div class="col s3 grey-text text-darken-2" style="font-weight: bold;">
              <i class="material-icons left">phone</i>
              联系方式
            </div>
            <div class="col s9">{{app.phone}}</div>
          </div>

          <div class="row">
            <div class="col s3 grey-text text-darken-2" style="font-weight: bold;">
              <i class="material-icons left">subject</i>
              简介
            </div>
            <div class="col s9">{{app.introduction}}</div>
          </div>

          <div class="row">
            <div class="col s3 grey-text text-darken-2" style="font-weight: bold;">
              <i class="material-icons left">insert_drive_file</i>
              证明材料
            </div>
            <div class="col s9">
              <div class="chip">
                {{app.evf_name}}
                <i class="material-icons download" @click="download_ev(app.evidence)">file_download</i>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col s3 grey-text text-darken-2" style="font-weight: bold;">
              <i class="material-icons left">image</i>
              背景图片
            </div>
            <div class="col s9">
              <div class="card-panel teal" style="display:inline-block; padding: 0;">
                <img class="materialboxed" style="height: 10rem; object-fit: contain;" :src="file_server+app.backimg">
              </div>
            </div>
          </div>


        </div>
        <div class="card-action right-align">
          <a class="green-text" @click="reviewPass(app.id)" style="cursor: pointer">通过</a>
          <a class="red-text" @click="reviewReject(app.id)" style="cursor: pointer">拒绝</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/include/NavBar";
import BackGround from "@/include/Background";
import EmptyView from "../../include/EmptyView";

export default {
  name:"ReviewApplication",
  components:{EmptyView, NavBar, BackGround},
  data: function() {
    return {
      page_height: $(document).height(),
      file_server: 'global replacement',
      apps: [],
    }
  },

  created: function() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });

    if (this.verify_session())
      this.load_apps();
  },


  methods: {
    verify_session() {
      let session_token = sessionStorage.getItem("session");
      if (!session_token) {
        M.toast({
          html:"<span style='font-weight: bold'>请先登录</span>",
          classes: "rounded yellow darken-2"
        });
        this.$router.push("/login");
        return false;
      }
      return true;
    },

    load_apps: function() {
      let that = this;
      this.verify_session();
      this.$axios.post('/api/getInstitutionToCheck').then(response => {
        let resp = response.data;
        if (resp.status === "succ") {
          let apps = resp.data;
          for (let i = 0; i < apps.length; i++) {
            let ind = apps[i].evidence.lastIndexOf("/");
            apps[i].evf_name = apps[i].evidence.substring(ind);
          }
          console.log(apps);
          that.apps = apps;
        } else {
          if (resp.info === "没有管理员权限") {
            M.toast({
              html:"<span style='font-weight: bold'>你无权访问该页面</span>",
              classes: "rounded  red"
            });
            this.$router.go(-1);
          } else if (resp.info === "no institution") {
          } else {
            M.toast({
              html:"<span style='font-weight: bold'>请求发生错误</span>",
              classes: "rounded  red"
            });
            console.log(resp.info);
            this.$router.push("/");
          }
        }
      }).catch(error => {
        M.toast({
          html:"<span style='font-weight: bold'>请求发生错误</span>",
          classes: "rounded  red"
        });
        console.log(error);
        this.$router.push("/");
      });
    },

    download_ev(link) {
      window.open(this.file_server + link, '_blank');
    },

    reviewPass: function (applyid) {
      //console.log(localStorage);
      let that = this;
      sessionStorage.getItem('session');
      this.$axios.post('/api/setInstitutionStatus/'+applyid+'/1').then(response => {
        //set status
        M.toast({
          html:"<span style='font-weight: bold'>已通过该请求</span>",
          classes: "rounded green"
        });

        //get new list
        that.load_apps();
        that.$router.go(0);
      }).catch(error => {
        console.log(error);
      });

    },

    reviewReject: function (applyid) {
      //console.log(localStorage);
      let that = this;
      sessionStorage.getItem('session');
      this.$axios.post('/api/setInstitutionStatus/'+applyid+'/-1').then(response => {
        M.toast({
          html:"<span style='font-weight: bold'>已拒绝该请求</span>",
          classes: "rounded red"
        });

        //get new list
        that.load_apps();
        that.$router.go(0);

      }).catch(error => {
        console.log(error)
      })
    }
  },
}

</script>

<style scoped>
.check-institution{
  font-weight: 500;
  font-size: 1.4rem;
}

.download {
  cursor: pointer;
  float: right;
  font-size: 16px;
  line-height: 32px;
  padding-left: 8px;
}
</style>
