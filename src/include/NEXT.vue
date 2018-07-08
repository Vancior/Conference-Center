<template>
  <div>
      <indexNEXT v-if="state==='index'"></indexNEXT>
      <psNEXT v-if="state==='ps'"></psNEXT>
      <osNEXT v-if="state==='os'"></osNEXT>
      <ncNEXT v-if="state==='nc'"></ncNEXT>
      <cfNEXT v-if="state==='cf'"></cfNEXT>
      <contriNEXT v-if="state==='contri'"></contriNEXT>
    <otherNEXT v-if="state==='other'"></otherNEXT>
  </div>
</template>

<script>
    import IndexNEXT from "./next/indexNEXT";
    import PsNEXT from "./next/psNEXT";
    import OsNEXT from "./next/osNEXT";
    import NcNEXT from "./next/ncNEXT";
    import CfNEXT from "./next/cfNEXT";
    import ContriNEXT from "./next/contriNEXT";
    import OtherNEXT from "./next/otherNEXT";
    export default {
        name: "NEXT",
      components: {OtherNEXT, ContriNEXT, CfNEXT, NcNEXT, OsNEXT, PsNEXT, IndexNEXT},
      data:function () {
        return {
          state:"index"
        }
      },
      mounted:function () {
        this.$bus.on("toIndex",()=>{this.state='index'})
        this.$bus.on("toPS",()=>{this.state='ps'})
        this.$bus.on("toOS",()=>{this.state='os'})
        this.$bus.on("newCF",()=>{this.state='nc'})
        this.$bus.on("toCF",()=>{this.state='cf'})
        this.$bus.on("toContribute",()=>{this.state='contri'})
        this.$bus.on("toOther",()=>{this.state='other'})
        // setInterval(this.updateState,1000)
      },
      beforeDestroy:function () {
        this.$bus.off("toIndex")
        this.$bus.off("toPS")
        this.$bus.off("toOS")
        this.$bus.off("newCF")
        this.$bus.off("toCF")
        this.$bus.off("toContribute")
        this.$bus.off("toOther")
      },
      methods:{
        updateState:function () {
          // let rt= this.$router.currentRoute
          // console.log("路由如下:"+rt)
        }
      }

    }
</script>

<style scoped>

</style>
