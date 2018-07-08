<template>
  <div>
    <div class="row" id="contribution-manage">
      <div class="col s12" style="padding: 0">
        <ul class="tabs white center">
          <!--<li class="col s1"></li>-->
          <li class="tab col s2"><a class="active" href="#all" @click="filter = 'all'; refresh();">全部 {{ all_num }}</a></li>
          <li class="tab col s2"><a href="#passed" @click="filter = 'passed'; refresh();">已通过 {{ passed_num }}</a></li>
          <li class="tab col s2"><a href="#pending" @click="filter = 'pending'; refresh();">未审核 {{ pending_num }}</a></li>
          <li class="tab col s2"><a href="#fixing" @click="filter = 'fixing'; refresh();">修改中 {{ fixing_num }}</a></li>
          <li class="tab col s2"><a href="#rejected" @click="filter = 'rejected'; refresh();">已拒绝 {{ rejected_num }}</a></li>
          <!--<li class="tab col s2"><a v-bind:href="download_link" target="_blank">导出投稿列表</a></li>-->
          <li class="tab col s2"><a style="cursor: pointer" @click="download()">导出投稿列表</a></li>
        </ul>
      </div>
      <div id="all" class="col s12 m10 offset-m1">
        <div class="row valign-wrapper" v-if="all_list.length === 0" style="height: 25rem">
          <empty></empty>
        </div>
        <div class="card hoverable" v-else v-for="(item, index) in all_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <span class="grey-text">{{ item.uploader }} 最近上传于 {{ readable_time(item.total_submit) }} #{{ item.paper_number }}</span>
              <!--<span class="grey-text" v-if="item.review.length > 0">{{ item.uploader }} 最近上传于 {{ readable_time(item.review[item.review.length-1].submit_time) }}</span>-->
              <!--<span class="grey-text" v-else>{{ item.uploader }}</span>-->
              <span class="new teal badge" v-if="item.total_result === '1'">已通过</span>
              <span class="new blue badge" v-else-if="item.total_result === '0'">未审核</span>
              <span class="new orange badge" v-else-if="item.total_result === '2'">修改中</span>
              <span class="new red badge" v-else="item.total_result === '3'">已拒绝</span>
            </div>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">arrow_downward</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="passed" class="col s12 m10 offset-m1">
        <div class="row valign-wrapper" v-if="all_list.length === 0" style="height: 25rem">
          <empty></empty>
        </div>
        <div class="card hoverable" v-else v-for="(item, index) in passed_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row card-row">
              <!--<span class="grey-text">{{ item.uploader }} 于 {{ readable_time(item.submit_time) }}</span>-->
              <!--<span class="grey-text">{{ item.uploader }}</span>-->
              <span class="grey-text">{{ item.uploader }} 最近上传于 {{ readable_time(item.total_submit) }} #{{ item.paper_number }}</span>
            </div>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">arrow_downward</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="pending" class="col s12 m10 offset-m1">
        <div class="row valign-wrapper" v-if="all_list.length === 0" style="height: 25rem">
          <empty></empty>
        </div>
        <div class="card hoverable" v-else v-for="(item, index) in pending_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row card-row">
              <!--<span class="grey-text">{{ item.uploader }} 于 {{ readable_time(item.submit_time) }}</span>-->
              <!--<span class="grey-text">{{ item.uploader }}</span>-->
              <span class="grey-text">{{ item.uploader }} 最近上传于 {{ readable_time(item.total_submit) }} #{{ item.paper_number }}</span>
            </div>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">arrow_downward</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="fixing" class="col s12 m10 offset-m1">
        <div class="row valign-wrapper" v-if="all_list.length === 0" style="height: 25rem">
          <empty></empty>
        </div>
        <div class="card hoverable" v-else v-for="(item, index) in fixing_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row card-row">
              <!--<span class="grey-text">{{ item.uploader }} 于 {{ readable_time(item.submit_time) }}</span>-->
              <!--<span class="grey-text">{{ item.uploader }}</span>-->
              <span class="grey-text">{{ item.uploader }} 最近上传于 {{ readable_time(item.total_submit) }} #{{ item.paper_number }}</span>
            </div>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">arrow_downward</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="rejected" class="col s12 m10 offset-m1">
        <div class="row valign-wrapper" v-if="all_list.length === 0" style="height: 25rem">
          <empty></empty>
        </div>
        <div class="card hoverable" v-else v-for="(item, index) in rejected_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row card-row">
              <!--<span class="grey-text">{{ item.uploader }} 于 {{ readable_time(item.submit_time) }}</span>-->
              <!--<span class="grey-text">{{ item.uploader }}</span>-->
              <span class="grey-text">{{ item.uploader }} 最近上传于 {{ readable_time(item.total_submit) }} #{{ item.paper_number }}</span>
            </div>
            <div class="row card-row" @click="goto_review('/orgspace/review/'+item.id)">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">arrow_downward</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row center-align">
      <pagination @page="page" v-bind:number="number" v-bind:current="current"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '@/include/Pagination';
  import empty from '@/include/EmptyView'
  import { humanize_time } from '@/js/utils';

  export default {
    name: "Contributions",
    components: { pagination, empty },
    data: function () {
      return {
        conference_id: 1,
        passed_list: [],
        passed_num: 0,
        pending_list: [],
        pending_num: 0,
        fixing_list: [],
        fixing_num: 0,
        rejected_list: [],
        rejected_num: 0,
        all_list: [],
        all_num: 0,
        number: 1,
        current: 1,
        per_page: 6,
        filter: 'all',
        download_link: '',
      }
    },
    created: function () {
      this.conference_id = parseInt(this.$route.params.id);
    },
    mounted: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
      });
      this.refresh();
      this.$bus.emit('manage-change-title', { text: '稿件管理' });
      this.$axios.post('/api/conference/' + this.conference_id + '/contributions/export', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
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
      });
    },
    methods: {
      refresh: function () {
        this.$axios.post('/api/manage/conference/' + this.conference_id + '/contributions', {
          index: this.current,
          size: this.per_page,
          type: this.filter
        }).then(rsp => {
          if (this.filter === 'all') {
            this.all_list = rsp.data.data.contributions;
          }
          else if (this.filter === 'pending') {
            this.pending_list = rsp.data.data.contributions;
          }
          else if (this.filter === 'passed') {
            this.passed_list = rsp.data.data.contributions;
          }
          else if (this.filter === 'fixing') {
            this.fixing_list = rsp.data.data.contributions;
          }
          else if (this.filter === 'rejected') {
            this.rejected_list = rsp.data.data.contributions;
          }
          this.all_num = rsp.data.data.total_num[ 0 ];
          this.pending_num = rsp.data.data.total_num[ 2 ];
          this.passed_num = rsp.data.data.total_num[ 1 ];
          this.fixing_num = rsp.data.data.total_num[ 3 ];
          this.rejected_num = rsp.data.data.total_num[ 4 ];
          this.number = parseInt(rsp.data.data.page_num);
        });
      },
      readable_time: function (str) {
        return humanize_time(str);
      },
      page: function (num) {
        this.current = num;
        this.refresh();
      },
      goto_review: function (url) {
        this.$router.push(url);
      },
      download: function() {
        window.open(this.download_link, '_blank');
      }
    },
    watch: {
      filter: function(val) {
        this.current = 1;
      }
    }
  }
</script>

<style scoped>
  #contribution-manage {
    margin-right: 0;
  }

  .card-row {
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .new.badge:after {
    content: ""
  }

  .col .row {
    margin-right: 0;
    margin-left: 0;
  }

  .card {
    cursor: pointer;
  }
</style>
