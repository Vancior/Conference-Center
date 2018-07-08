<template>
  <div>
  <!--<div class="ui fluid container" style="text-align: center;">-->
    <ul class="pagination" v-if="number <= 5">
      <li :class="{disabled: current === 1}">
        <a href="javascript:void(0);" @click="prev()"><i class="material-icons">chevron_left</i></a>
      </li>
      <li class="waves-effect" v-for="i in Array.from(Array(number).keys())" v-bind:key="i+1" v-bind:class="{active: i+1 === current}">
        <a href="javascript:void(0);" @click="jump(i+1)">{{ i+1 }}</a>
      </li>
      <li :class="{disabled: current >= number}">
        <a href="javascript:void(0);" @click="next()"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>
    <ul class="pagination" v-else>
      <li :class="{disabled: current === 1}">
        <a href="javascript:void(0);" @click="prev()"><i class="material-icons">chevron_left</i></a>
      </li>
      <li class="waves-effect" v-for="i in head_range" v-bind:key="i" v-bind:class="{active: i === current}">
        <a href="javascript:void(0);" @click="jump(i)">{{ i }}</a>
      </li>
      <li class="disabled" v-if="head_disabled">
        ...
      </li>
      <li class="waves-effect" v-for="i in middle_range" v-bind:key="i" v-bind:class="{active: i === current}">
        <a href="javascript:void(0);" @click="jump(i)">{{ i }}</a>
      </li>
      <li class="disabled" v-if="rear_disabled">
        ...
      </li>
      <li class="waves-effect" v-for="i in rear_range" v-bind:key="i" v-bind:class="{active: i === current}">
        <a href="javascript:void(0);" @click="jump(i)">{{ i }}</a>
      </li>
      <li :class="{disabled: current >= number}">
        <a href="javascript:void(0);" @click="jump(i)"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["number", "current"],
  data: function() {
    return {
      head_range: undefined,
      middle_range: undefined,
      rear_range: undefined,
      head_disabled: true,
      rear_disabled: true
    };
  },
  created: function() {
    this.head_range = [1];
  },
  watch: {
    current: function(val) {
      let temp_range = [];
      for (let i = val - 2; i <= val + 2; i++) temp_range.push(i);
      if (val <= 4) {
        for (let i = val - 2; i <= 1; i++) temp_range.splice(0, 1);
        this.head_disabled = false;
      } else this.head_disabled = true;
      if (val >= this.number - 3) {
        for (let i = val + 2; i >= this.number; i--) temp_range.pop();
        this.rear_disabled = false;
      } else this.rear_disabled = true;
      this.middle_range = temp_range;
    },
    number: function(num) {
      this.rear_range = [num];
      let temp_range = [];
      for (let i = this.current - 2; i <= this.current + 2; i++)
        temp_range.push(i);
      if (this.current <= 4) {
        for (let i = this.current - 2; i <= 1; i++) temp_range.splice(0, 1);
        this.head_disabled = false;
      } else this.head_disabled = true;
      if (this.current >= num - 3) {
        for (let i = this.current + 2; i >= num; i--) temp_range.pop();
        this.rear_disabled = false;
      } else this.rear_disabled = true;
      this.middle_range = temp_range;
    }
  },
  methods: {
    jump: function(page) {
      if (page >= 1 && page <= this.number) this.$emit("page", page);
    },
    next: function() {
      if (this.current >= 1 && this.current < this.number){
        this.$emit("page", this.current + 1);

      }
    },
    prev: function() {
      if (this.current > 1 && this.current <= this.number)
        this.$emit("page", this.current - 1);
    }
  }
};
</script>

<style scoped>
  li {
    display: inline-block;
    margin: 0 8px;
  }
</style>
