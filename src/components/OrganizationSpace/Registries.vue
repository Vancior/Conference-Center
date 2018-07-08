<template>
  <div>
    <div class="row" style="padding-top: .5em">
      <div class="col s12">
        <a class="waves-effect waves-light btn" @click="refresh()"><i class="material-icons left">refresh</i>刷新</a>
        <a class="waves-effect waves-light btn" @click="download()"><i class="material-icons left">cloud_download</i>导出</a>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <table class="striped centered responsive-table">
          <thead>
          <tr>
            <th rowspan="2">注册用户</th>
            <th rowspan="2">论文编号(无为聆听者)</th>
            <th rowspan="2">缴费凭证</th>
            <th colspan="6">参会者</th>
          </tr>
          <tr>
            <!--<th colspan="3"></th>-->
            <th>姓名</th>
            <th>性别</th>
            <th>工作</th>
            <th>联系方式</th>
            <th>住宿</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="regist in registry_list">
            <td>{{ regist.user_name }}</td>
            <td v-if="regist.paper_number">{{ regist.paper_number }}</td>
            <td v-else></td>
            <td v-if="regist.payment">
              <a v-bind:href="$image(regist.payment)" target="_blank">
                <i class="material-icons">attachment</i>
              </a>
            </td>
            <td v-else></td>
            <td>{{ regist.name }}</td>
            <td>{{ regist.sex }}</td>
            <td>{{ regist.job }}</td>
            <td>{{ regist.contact }}</td>
            <td v-if="regist.is_book">是</td>
            <td v-else>否</td>
            <td><a class="modal-trigger" href="#modal-detail" @click="detail_name = regist.name; detail_text = regist.note"><i
              class="material-icons">subject</i></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="modal-detail" class="modal">
      <div class="modal-content">
        <h4>{{ detail_name }} 备注</h4>
        <pre>{{ detail_text }}</pre>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">关闭</a>
      </div>
    </div>
    <div class="row center">
      <pagination @page="page" v-bind:number="page_num" v-bind:current="current"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '@/include/Pagination';

  export default {
    name: "Registries",
    components: { pagination },
    data: function () {
      return {
        conf_id: 1,
        registries: [],
        page_num: 1,
        current: 1,
        per_page: 10,
        download_link: '',
        detail_text: ''
      };
    },
    mounted: function () {
      $('.modal').modal();
      this.$bus.emit("toOS");
      this.$bus.emit('manage-change-title', { text: '注册列表' });
      this.conf_id = this.$route.params.id;
      this.refresh();
      this.$axios.post('/api/conference/' + this.conf_id + '/registers/export', {}).then(rsp => {
        if (rsp.data.status) {
          this.download_link = rsp.data.data;
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
    },
    methods: {
      refresh: function () {
        this.$axios.post('/api/manage/registry', {
          conference_id: this.conf_id,
          index: this.current,
          size: this.per_page
        }).then(rsp => {
          if (rsp.data.status === 'succ') {
            this.registries = rsp.data.data.registers;
            this.page_num = rsp.data.data.page_num;
          }
        }).catch(err => {

        })
      },
      page: function (num) {
        this.current = num;
        this.refresh();
      },
      download: function () {
        window.open(this.download_link, '_blank');
      }
    },
    computed: {
      registry_list: function () {
        let list = [];
        for (let item in this.registries) {
          item = this.registries[ item ];
          if (item.participant.length === 0)
            continue;
          list.push({
            user_name: item.user_name,
            user_id: item.user_id,
            paper_number: item.type === 0 ? item.paper_number : '无',
            payment: item.payment,
            name: item.participant[ 0 ].name,
            sex: item.participant[ 0 ].sex,
            job: item.participant[ 0 ].job,
            contact: item.participant[ 0 ].contract,
            is_book: item.participant[ 0 ].is_book,
            note: item.participant[ 0 ].note
          });
          for (let i = 1; i < item.participant.length; ++i) {
            list.push({
              user_name: '',
              user_id: '',
              paper_number: '',
              payment: false,
              name: item.participant[ i ].name,
              sex: item.participant[ i ].sex,
              job: item.participant[ i ].job,
              contact: item.participant[ i ].contract,
              is_book: item.participant[ i ].is_book,
              note: item.participant[ i ].note
            });
          }
        }
        return list;
      }
    }
  }
</script>

<style scoped>
  .row {
    margin: 0;
  }

  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
