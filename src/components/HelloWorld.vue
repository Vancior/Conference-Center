<template>
  <div>
  <!--<div class="ui fluid container">-->
    <navbar></navbar>
    <div class="hello">
      <!--v-if 用于判断该组件是否显示->

      <pagination v-bind:number="15" v-bind:current="1" v-if="value>10"></pagination>

      <route-link to="/conference"><botton>tijiao</botton></route-link>
      <!--<ul clas s="pagination">-->
        <!--<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>-->
        <!--<li class="active"><a href="#!">1</a></li>-->
        <!--<li class="waves-effect"><a href="#!">2</a></li>-->
        <!--<li class="waves-effect"><a href="#!">3</a></li>-->
        <!--<li class="waves-effect"><a href="#!">4</a></li>-->
        <!--<li class="waves-effect"><a href="#!">5</a></li>-->
        <!--<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
  import pagination from '@/include/Pagination';

  export default {
    name: 'HelloWorld',
    components: { navbar, pagination },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        value:10,
        href_str:"/set/fgs"
      }
    },
    methods(){
      function setName(){
        this.value=20;
      }
    },
    created(){
      this.setName();

    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
