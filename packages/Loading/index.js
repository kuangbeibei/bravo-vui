import loadingDirective from './src/directive.js';
export default {
  install (Vue) {
    Vue.directive('loading', loadingDirective)
  }
}