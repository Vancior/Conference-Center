<template>
  <div>
    <div class="fixed-action-btn" v-if="is_visibility===1">
      <a class="btn-floating btn-large"
         :class="{'grey darken-3':  url!=='/user/register' && url!=='/login', 'blue': url==='/user/register' || url==='/login'}"
         style="margin-bottom: 68px"
         data-position="left"
         data-tooltip="测试">
        <i class="large material-icons">face</i>
      </a>
      <ul>
        <li v-if="url==='/login'">
          <span class="mobile-fab-tip">学者登录</span>
          <a class="btn-floating red darken-2"  data-position="left" data-tooltip="学者登录" @click="scholar_login()">
            <i class="material-icons">school</i>
          </a>
        </li>
        <li v-if="url==='/login'">
          <span class="mobile-fab-tip">主办方登录</span>
          <a class="btn-floating yellow darken-2" data-position="left" data-tooltip="主办方登录" @click="institution_login()">
            <i class="material-icons">account_balance</i>
          </a>
        </li>
        <li v-if="url==='/login'">
          <span class="mobile-fab-tip">管理员登录</span>
          <a class="btn-floating green darken-2" style="margin-bottom: 65px" data-position="left" data-tooltip="管理员登录" @click="manager_login()">
            <i class="material-icons">work</i>
          </a>
        </li>
        <li v-if="url==='/user/register'">
          <span class="mobile-fab-tip">自动填写</span>
          <a class="btn-floating green darken-2"  style="margin-bottom: 65px" data-position="left" data-tooltip="个人注册" @click="user_register()">
            <i class="material-icons">create</i>
          </a>
        </li>
        <li v-if="url==='/institution/register'">
          <span class="mobile-fab-tip">自动填写</span>
          <a class="btn-floating green darken-2"  style="margin-bottom: 65px" data-position="left" data-tooltip="机构注册" @click="institution_register()">
            <i class="material-icons">create</i>
          </a>
        </li>
        <li v-if="url==='/orgspace/new/conference'">
          <span class="mobile-fab-tip">发布</span>
          <a class="btn-floating green darken-2"  style="margin-bottom: 65px" data-position="left" data-tooltip="发布新会议" @click="new_conference()">
            <i class="material-icons">send</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TestRobot",
        data() {
          return {
            is_visibility:0,
            url:'',
            login_data:{
              email:'',
              password:'',
              isScholar:''
            },
            user_register_data:{
              name:'',
              email:'',
              password:'',
              confirmPassword:''
            },
            institution_register_data:{
              name: '',
              email : '',
              location : '',
              phone:'',
              introduction:'',
              password:'',
              confirmPassword:'',
              managerName:'',
              managerPhone:'',
            },
            new_conference_data:{
              conf_topic: '',
              conf_field: '',
              conf_desc: '',
              conf_start_date: '',
              conf_end_date: '',
              conf_location: '',
              conf_essay_info: '',
              conf_essay_inst: '',
              conf_essay_ddl: '',
              // conf_essay_time: "23:59",
              conf_essay_time: '',
              conf_release_ddl: '',
              conf_release_time: '',
              conf_register_ddl: '',
              // conf_register_time: "23:59",
              conf_register_time: '',
              conf_schedule: '',
              conf_paper_template: '',
              conf_register_info: '',
              conf_commute_info: '',
              conf_contact: '',
            }
          }
        },
        methods:{
          init_fab_tip: function () {
            let width = 0;
            $('.overlay-trigger').click(this.overlay);
            $('.overlay').click(this.hideOverlay);
            $(window).on("scroll", this.hideOverlay);
          },
          scholar_login:function(){
            this.login_data.email='global replacement';
            this.login_data.password="123456";
            this.login_data.isScholar="scholar";
            this.$emit('child-say',this.login_data)
          },
          institution_login:function(){
            this.login_data.email="buaa@edu.cn";
            this.login_data.password="buaa";
            this.login_data.isScholar="institution";
            this.$emit('child-say',this.login_data);
          },
          manager_login:function(){
            this.login_data.email="manager@qq.com";
            this.login_data.password="manager";
            this.login_data.isScholar="manager";
            this.$emit('child-say',this.login_data);
          },
          user_register:function () {
            this.user_register_data.name="肖暐奇";
            this.user_register_data.email='global replacement';
            this.user_register_data.password="123456";
            this.user_register_data.confirmPassword="123456";
            this.$emit('child-say',this.user_register_data);
          },
          institution_register:function () {
              this.institution_register_data.name="北京航空航天大学";
              this.institution_register_data.email='Beihang@buaa.edu.cn';
              this.institution_register_data.location="北京市海淀区学院路37号";
              this.institution_register_data.phone="82317114";
              this.institution_register_data.introduction="北京航空航天大学位列“211工程”、“985工程”、“世界一流大学建设高校";
              this.institution_register_data.password="123456";
              this.institution_register_data.confirmPassword="123456";
              this.institution_register_data.managerName="徐慧彬";
              this.institution_register_data.managerPhone="82317114";
              this.$emit('child-say',this.institution_register_data);
          },
          new_conference:function () {
            this.new_conference_data.conf_topic="IEEE国际计算机视觉与模式识别会议";
            this.new_conference_data.conf_field=2;
            this.new_conference_data.conf_desc = "CVPR是世界顶级的计算机视觉会议";
            this.new_conference_data.conf_start_date="Aug 01, 2018";
            this.new_conference_data.conf_end_date="Aug 15, 2018";
            this.new_conference_data.conf_location="法国巴黎";
            this.new_conference_data.conf_essay_info="与计算机视觉相关";
            this.new_conference_data.conf_essay_inst="英文，不少于10页";
            this.new_conference_data.conf_essay_ddl="Jul 18, 2018";
            // conf_essay_time: "23:59",
            this.new_conference_data.conf_essay_time="23:59";
            this.new_conference_data.conf_release_ddl="Jul 27, 2018";
            this.new_conference_data.conf_register_ddl="Jan 22, 2018";
            // conf_register_time: "23:59",
            this.new_conference_data.conf_register_time="23:59";
            this.new_conference_data.conf_schedule="第一天：主会场；第二天：分会场";
            this.new_conference_data.conf_register_info="1.投稿人可带至多三人参会；2.普通与会人员：300/人次。";
            this.new_conference_data.conf_commute_info="北航招待 地铁十三号线知春路站";
            this.new_conference_data.conf_contact="谭老师 电话：123456789";
            this.$emit('child-say',this.new_conference_data);
          }
        },
        created(){
          this.url=this.$route.path;
          $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton();
          });
          this.init_fab_tip();
        },
    }
</script>

<style scoped>
  .overlay {
    display: none;
    background-color: #E1E1E1;
    opacity: 0.80;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 900;
  }
  .fixed-action-btn ul {
    display: none;
  }
  .fixed-action-btn:hover ul {
    display: block;
  }
  .material-tooltip {
    display: none !important;
  }
  .mobile-fab-tip {
    position: fixed;
    right: 85px;
    padding: 4px 10px 4px 10px;
    text-align: right;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 2px;
    font-size: 14px;
    color: #424242;
    opacity: 0;
  }
  .mobile-fab-tip {
    -webkit-animation: fadein 1s;
    -moz-animation: fadein 1s;
    -o-animation: fadein 1s;
    animation: fadein 1s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    -o-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  @keyframes fadein {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-o-keyframes fadein {
    /* Opera */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
