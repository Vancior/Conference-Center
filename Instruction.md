# Frontend Developing

## 综述

前端开发主要内容是实现学术会议管理平台中的表示层，并通过JSON数据请求的方式与API通信完成业务逻辑以及数据显示，涉及到的实现方式为前端框架的MVVM (Model View Viewmodel)模式以及Restful API通信。

## 框架及工具

JavaScript: Vue-cli with Webpack template [Vue.js](https://cn.vuejs.org)

HTML & CSS: [Materialize CSS](https://materializecss.com)

Package Manager: npm

IDE: WebStorm

Version Control: Git

### 环境配置

仅安装npm即可。推荐安装[Node.js](https://nodejs.org/en/)，里面附带了npm。

拉取项目，首先要已经在GitLab上添加了SSH key。
```sh
git clone git@140.143.182.144:frontend/ccfront.git
```

### npm

如果直接使用npm无法下载包

可行方法1，使用淘宝镜像cnpm，并用cnpm命令替代npm

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

可行方法2，使用nrm切换淘宝源

```shell
npm install -g nrm
nrm ls
nrm use taobao
```

### Vue-cli

首先要明白Vue-cli与直接使用js使用Vue的区别，Vue-cli是完全面向关注点分离和组件形式的开发方式，每个页面都是一个大的单文件组件（文件扩展名为`.vue`），其中有可以根据复杂程度再分解组件，每个组件都有三个元素template script style(optional)。template中是使用html构建的页面骨架，script中负责定义数据成员和成员函数（相当于一个类），而css则定义样式（`<style scoped>`可以让样式仅适用于当前组件，并支持sass）。一个例子如下

```vue
<template>
	<p>Hello, {{ user_name }}!</p>
	<button @click="change_user('test')">change</button>
</template>
<script>
  export default {
    name: "Hello",
    data: function() {
      return {
        user_name: ""
      };
    },
    methods: {
      change_user: function(name) {
        this.user_name = name;
      }
    },
    created: function() {
      this.user_name = "Vuejs";
    }
  }
</script>
<style scoped>
p {
  font-size: 2em
}
</style>
```

#### 工具

API请求：[axios](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

**UPDATE**
现已将axios封装到全局变量中，使用方法
```javascript
this.$axios.get('/api/something').then(data => {
  
});
```

组件通信：[vue-bus](https://github.com/yangmingshan/vue-bus)

Model：未定


#### 使用方式

```shell
# 当前位于根目录
# 当项目未初始化或者新增了依赖没有安装的时候，使用--no-save选项让npm不更新package-lock.json，一定要加
npm install --no-save
# 想要安装某个依赖包，一定只能对某一个特定的包使用--save选项
npm install --save [package name]
# 编译运行项目，并且热更新（即保存文件修改自动网页自动刷新）
npm run dev
# 生成release dist
npm run build
```

#### 目录结构

`index.html` 项目入口，除添加CDN资源外，不需要修改

`package.json` npm依赖包列表，勿手动修改

`package-lock.json` npm依赖包版本控制，勿手动修改

`node_modules` npm依赖包安装位置

`src/App.vue` Vue入口

`src/router/index.js` Vue-router路由列表，常修改文件，参考网站[Vue-router](https://router.vuejs.org)

`src/components` 页面组件以及页面子组件，目录规范见下

`src/include` 放置所有跨页面共享的元素，比如导航栏

`src/assests` 不推荐的静态资源位置

`static` 推荐的静态资源位置

## 目录规范

src/components下放置所有的页面组件，每个页面形成一个文件夹，页面主文件命名为Main.vue，比如
src/components/Index
src/components/Index/Main.vue
src/components/Index/ConferenceItem.vue
src/components/Index/PaperItem.vue

src/include下放置所有跨页面共享元素，可以为单文件或者文件夹，比如
src/include/NavBar.vue
src/include/Modal
src/include/Modal/Main.vue
src/include/Modal/RichTextBox.vue

static下放置静态资源，访问形式为`src="/static/a.jpg"`，如果放在src/assets下，图片会被编为base64，避免

#### 代码规范

+ 所有组件名为首字母大写的CamelCase，不能存在两个文件名为同一个词的不同大小写的情况。
+ JavaScript中字符串使用单引号，行末加分号
+ 缩进使用WebStorm的默认设置

#### 风格参考

使用material design设计风格，所以为了一致性，请前端开发人员先感受一下风格
+ http://closeheat.com
+ http://stephaniejagiello.com
+ https://www.mockplus.com/blog/post/material-design-website-examples

#### 公用组件列表

##### 时间戳转XX天前字符串

```javascript
import { humanize_time } from '@/js/utils';
let str = humanize_time(time);
```

##### 图片路径wrapper

```javascript
let path = this.$image(relative_path);
```

##### 导航栏

```javascript
import navbar from '@/include/NavBar';
```

##### 翻页组件

```javascript
import pagination from '@/include/Pagination';
```

需要参数：number 页面总数，current 当前页面号（从1开始）

返回事件：page(the_page_number_jump_to)

示例使用
```vue
<template>
  <pagination @page="i_want_to_page" v-bind:number="total_num" v-bind:current="current"></pagination>
</template>
<script>
  import pagination from '@/include/Pagination';
  export default {
    components: { pagination },
    data: function() {
      return {
        total_num: 10,
        current: 1
      }
    },
    methods: {
      i_want_to_page: function(page) {
        console.log(page);
      }
    }
  }
</script>
```
