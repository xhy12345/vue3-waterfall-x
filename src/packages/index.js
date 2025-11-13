import Waterfall from "./waterfall/waterfall.vue";

// 为组件提供 install 方法，用于按需引入
Waterfall.install = function (Vue) {
    Vue.component(Waterfall.name, Waterfall)
  }
  
export default Waterfall;

export { Waterfall };