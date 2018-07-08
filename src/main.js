// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
Vue.use(VueBus);

function AxiosToken() {
  this.io = axios.create({
    baseURL: 'your api server'
  });
}

AxiosToken.prototype = {
  constructor: AxiosToken,
  post: function(url, data) {
    if (data === undefined)
      data = {};
    data.token = sessionStorage.getItem('session');
    return this.io.post(url, data);
  }
};

Vue.prototype.$axios = new AxiosToken();

Vue.prototype.$user = axios.create({
  baseURL: 'your user server'
});

Vue.prototype.$file = axios.create({
  baseURL: 'your file upload server'
});

Vue.prototype.$test = axios.create({
  baseURL: 'your api test server'
});

Vue.prototype.$image = function(relative) {
  return 'your file download path' + relative;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
