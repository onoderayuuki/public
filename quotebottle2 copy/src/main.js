import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCbPcuWafk5Dd1GB23SFYUWC_t-QRo-jRA",
  authDomain: "my-chat-60cbb.firebaseapp.com",
  databaseURL: "https://my-chat-60cbb-default-rtdb.firebaseio.com",
  projectId: "my-chat-60cbb",
  storageBucket: "my-chat-60cbb.appspot.com",
  messagingSenderId: "525288095874",
  appId: "1:525288095874:web:896b721101852a8b6af49b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); //送信オブジェクト

//index.jsのappをApp.vueで書き換えてる？的な？
new Vue({
  render: h => h(App),
}).$mount('#app')
