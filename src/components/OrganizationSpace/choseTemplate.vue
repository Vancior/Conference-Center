<template>
  <div class="choseTP" v-if="ifShow">
    <div class="bg "></div>
    <div class="pp">
    <div class="row">
      <div class="col s12 m3 " @click="chose(1)">
        <div class="card hoverable">
          <div class="card-image ">
            <img src='global replacement'>
            <span class="card-title"></span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-action">
            <a href="#">质感</a>
          </div>
        </div>
      </div>

      <div class="col s12 m3 " @click="chose(2)">
        <div class="card hoverable">
          <div class="card-image ">
            <img src='global replacement'>
            <span class="card-title"></span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-action">
            <a href="#">科技</a>
          </div>
        </div>
      </div>

      <div class="col s12 m3 " @click="chose(3)">
        <div class="card hoverable">
          <div class="card-image ">
            <img src='global replacement'>
            <span class="card-title"></span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-action">
            <a href="#">简约</a>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "choseTemplate",
        data: function () {
        return {
            ifShow: false
        };
        },
        created:function () {
        },
        mounted:function () {
          this.ifShow=false
          this.$bus.on("showChose",this.showTP)
          this.$bus.on("closeChose",this.offTP)
        },
        beforeDestroy:function(){
          this.$bus.off("showChose")
          this.$bus.off("closeChose")
        },
        methods:{
          showTP:function () {
            this.ifShow=true
          },
          offTP:function () {
            this.ifShow=false
          },
          chose:function (num) {

            this.$bus.emit("TPChoseOver",num)
            this.offTP()
          }

        }
    }
</script>

<style scoped>
  .bg{
    margin-left: -80px;
    display: block;
    z-index: 2;
    position: fixed;
    top: 0px;
    min-width: 100%;
    height: 100%;
    /*background-color: rgba(1,1,1,0.4);*/

  }
  .blur {
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }
.choseTP{


}
  .pp{
    z-index: 3;
    position: fixed;
    top:30%;
  }

</style>
