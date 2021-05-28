import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'


Vue.config.productionTip = false

// Initialize Firebase
const firebaseConfig = (new Function("return " + process.env.VUE_APP_FIRE_CONFIG))();
firebase.initializeApp(firebaseConfig); //送信オブジェクト

//index.jsのappをApp.vueで書き換えてる？的な？
new Vue({
  render: h => h(App),
}).$mount('#app')
