import Vue from 'vue'
import App from './App.vue'
import {prepareTodo} from "@/plugins/todo.plugin.js";
import router from "@/router";
import VueRouter from "vue-router";
import store from "@/store";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsfqKEtrRM8CqS01YlOKGA82mE3k6DyAo",
  authDomain: "todos-ed554.firebaseapp.com",
  projectId: "todos-ed554",
  storageBucket: "todos-ed554.appspot.com",
  messagingSenderId: "994773119505",
  appId: "1:994773119505:web:a40ce6b10d8c0e4c10b7b0",
  measurementId: "G-22X449V1KV"

};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = app;

Vue.config.productionTip = false

prepareTodo()

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

console.log(router);
console.log(store);
