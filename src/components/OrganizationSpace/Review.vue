<template>
  <div class="row">
    <!--<loader v-show="is_loading"></loader>-->
    <div class="col s10 offset-s1">
      <div id="contrib_detail" class="card">
        <div class="card-content">
          <span class="card-title">{{ contrib.title }}</span>
          <div class="row">
            <span class="grey-text">{{ contrib.uploader }} 最近上传于 {{ readable_time(contrib.total_submit) }} #{{ contrib.paper_number }}</span>
            <span class="new teal badge" v-if="contrib.total_result === '1'">已通过</span>
            <span class="new blue badge" v-else-if="contrib.total_result === '0'">未审核</span>
            <span class="new orange badge" v-else-if="contrib.total_result === '2'">修改中</span>
            <span class="new red badge" v-else="contrib.total_result === '3'">已拒绝</span>
          </div>
          <div class="row">
            <div class="col center-align" v-bind:class="'s'+(12/contrib.author.length)"
                 v-for="author in contrib.author">
              <h5>{{ author.name }}</h5>
              <h6>{{ author.institution }}</h6>
              <h6>{{ author.email }}</h6>
            </div>
          </div>
          <div class="row">
            <h5>摘要</h5>
            <span>{{ contrib.abstract_ }}</span>
          </div>
        </div>
      </div>
      <!--<div class="center row">-->
      <!--<h5-->
      <!--style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">-->
      <!--评审记录-->
      <!--</h5>-->
      <!--</div>-->
      <div id="contrib_review">
        <ul class="collapsible z-depth-1" style="border: none;">
          <li v-for="(review, index) in contrib.review" v-bind:key="index">
            <div class="collapsible-header">
              <span>{{ review_names[index] }}</span>
              <span class="new teal badge" v-if="review.result === '1'">已通过</span>
              <span class="new blue badge" v-else-if="review.result === '0'">未审核</span>
              <span class="new orange badge" v-else-if="review.result === '2'">修改中</span>
              <span class="new red badge" v-else="review.result === '3'">已拒绝</span>
            </div>
            <div class="collapsible-body white">
              <h5>提交描述</h5>
              <span class="grey-text">提交于 {{ readable_time(review.submit_time) }}</span>
              <a v-bind:href="$image(review.attachment)" target="_blank">下载</a>
              <br/>
              <span>{{ review.description }}</span>
              <h5>评审意见</h5>
              <div v-if="review.result === '0'">
                <div class="input-field">
                  <textarea id="suggestion" class="materialize-textarea" v-model="suggestion"></textarea>
                  <label for="suggestion">评审意见</label>
                </div>
                <div class="center-left" style="width: fit-content">
                  <label>
                    <input id="approve" name="review" type="radio" value="1" checked/>
                    <span id="span-approve">通过</span>
                  </label>
                  <label>
                    <input id="fixing" name="review" type="radio" value="2"/>
                    <span id="span-fixing">修改</span>
                  </label>
                  <label>
                    <input id="reject" name="review" type="radio" value="3"/>
                    <span id="span-reject">拒绝</span>
                  </label>
                  <br/>
                  <br/>
                  <!--<a class="waves-effect waves-light btn grey">取消</a>-->
                  <a class="waves-effect waves-light btn" @click="submit_review(review.id)">提交</a>
                </div>
              </div>
              <div v-else>
                <span>{{ review.suggestion }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { humanize_time } from '@/js/utils';
  import loader from '@/include/Loader';

  export default {
    name: "Review",
    components: { loader },
    data: function () {
      return {
        contrib_id: 1,
        contrib: {},
        review_names: [
          '第一次评审',
          '第二次评审',
          '第三次评审'
        ],
        states: [
          '未评审',
          '已通过',
          '修改中',
          '已拒绝'
        ],
        suggestion: '',
        is_loading: true
      }
    },
    mounted: function () {

        this.$bus.emit("toOS")


      this.contrib_id = parseInt(this.$route.params.id);
      this.$bus.emit('manage-change-title', { text: '审核稿件' });
      this.get_detail();
      $('.collapsible').collapsible();
    },
    methods: {
      get_detail: function () {
        this.is_loading = true;
        this.$axios.post('/api/manage/contribution', {
          id: this.contrib_id
        }).then(rsp => {
          if (rsp.data.status === 'succ')
            this.contrib = rsp.data.data;
          else {
            M.toast({
              html: "<span style='font-weight: bold'>" + rsp.data.info + "</span>",
              classes: "rounded red"
            });
          }
          this.is_loading = false;
        }).catch(err => {
          M.toast({
            html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
            classes: "rounded red"
          });
          this.is_loading = false;
        });
      },
      readable_time: function (str) {
        return humanize_time(str);
      },
      submit_review: function(review_id) {
        let action = parseInt($('input[name="review"]:checked').val());
        this.$axios.post('/api/manage/review', {
          id: review_id,
          user_id: this.contrib.user_id,
          action: action,
          suggestion: this.suggestion
        }).then(rsp => {
          if (rsp.data.status === 'succ') {
            M.toast({
              html: "<span style='font-weight: bold'>评审成功</span>",
              classes: "rounded green"
            });
            this.get_detail();
          }
          else {
            M.toast({
              html: "<span style='font-weight: bold'>" + rsp.data.info + "</span>",
              classes: "rounded red"
            });
          }
        }).catch(err => {
          M.toast({
            html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
            classes: "rounded red"
          })
        })
      }
    }
  }
</script>

<style scoped>
  .new.badge::after {
    content: ""
  }

  .col .row {
    margin-left: 0;
    margin-right: 0;
  }

  .row {
    margin-bottom: 0;
  }

  #span-approve::after {
    background-color: #009688;
    border: 2px solid #009688;
  }

  #span-approve::before {
    border: 2px solid #009688;
  }

  #span-fixing::after {
    background-color: #FF9800;
    border: 2px solid #FF9800;
  }

  #span-fixing::before {
    border: 2px solid #FF9800;
  }

  #span-reject::after {
    background-color: #F44336;
    border: 2px solid #F44336;
  }

  #span-reject::before {
    border: 2px solid #F44336;
  }
</style>
