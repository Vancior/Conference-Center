<template>
  <div class="row">
    <!--<loader v-show="is_loading"></loader>-->
    <div class="col s12 m10 offset-m1">
      <div class="row v" style="margin-top: 20px">
        <div class="row valign-wrapper"
             style="height: 25rem"
             v-if="conference_list.length === 0">
          <empty></empty>
        </div>
        <div class="col s12 m12 l6 xl6" v-for="conf in conference_list">
          <div class="card hoverable">
            <div class="card-image waves-effect" @click="jump('/orgspace/conference/'+conf.id+'/modify')"
                 style="background: black">
              <img v-bind:src="$image(conf.backimg)"
                   style="opacity: 0.5; object-fit: cover; object-position: center center;">
              <div class="card-title">
                <h5 style="color: white; font-weight: bold">{{ conf.title }}</h5>
              </div>
            </div>
            <div class="card-content">
              <div class="row">
                <div class="col s5 offset-s1 center-align">
                  <h6>投稿数</h6>
                  <h3 class="light-green-text">{{ conf.papers }}</h3>
                </div>
                <div class="col s5 center-align">
                  <h6>注册数</h6>
                  <h3 class="cyan-text">{{ conf.registers }}</h3>
                </div>
              </div>
            </div>
            <div class="card-action">
              <div class="row">
                <div class="col s5 offset-s1 center-align">
                  <router-link class="teal-text" v-bind:to="'/orgspace/conference/'+conf.id+'/contributions'">管理投稿
                  </router-link>
                </div>
                <div class="col s5 center-align">
                  <router-link class="teal-text" v-bind:to="'/orgspace/conference/'+conf.id+'/registries'">管理注册
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loader from '@/include/Loader';
  import empty from '@/include/EmptyView';

  export default {
    name: "Conferences",
    components: { loader, empty },
    data: function () {
      return {
        conference_list: [],
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),",
        is_loading: true
      };
    },
    created: function () {
      // M.toast({html: 'test'});
      $(document).ready(function () {
        $('.fixed-action-btn').floatingActionButton();
      });
      this.refresh();
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', { text: '会议管理' });
    },
    methods: {
      refresh: function () {
        this.is_loading = true;
        this.$axios.post('/api/manage/conferences', {}).then(rsp => {
          let data = rsp.data;
          if (data.status === 'succ') {
            this.conference_list = data.data;
          }
          this.is_loading = false;
        }).catch(err => {
          M.toast({ html: err.toString() });
          this.is_loading = false;
        });
      },
      jump: function (url) {
        this.$router.push(url);
      }
    }
  }
</script>

<style scoped>
  .card-title h3, .card-title h5 {
    font-weight: lighter;
  }

  .card-title {
    font-weight: 300;
  }

  .card-content .row {
    margin-bottom: 0;
  }

  .card-action .row {
    margin-bottom: 0;
  }

  .card-action a {
    margin-right: 0 !important;
  }

  .card-content h3, .card-content h6 {
    margin-top: .2em;
    margin-bottom: .2em;
  }

  .card-content h6 {
    font-weight: 600;
  }

  .card-content {
    padding: 1em 1em 0 1em;
  }

  .card-action {
    padding: .5em 1em;
  }

  .card-image {
    height: 200px;
    overflow: hidden;
  }

  .col .row {
    margin-left: 0;
    margin-right: 0;
  }
</style>
