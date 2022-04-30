import KindEditor from '../components/management/news/Kindeditor/kindEditor'
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('editor', KindEditor)
}

export default install