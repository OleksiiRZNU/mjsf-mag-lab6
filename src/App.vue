<template>
  <div id="app">

    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Tasks</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link to="/todos" class="p-2 text-dark">ToDos</router-link>
        <router-link to="/about" class="p-2 text-dark">About</router-link>
      </nav>

      <template v-if="!isAuthenticated">
        <router-link to="/sign-in" class="btn btn-link">Sign in</router-link>
        <router-link to="/sign-up" class="btn btn-outline-primary">Sign up</router-link>
      </template>
      <template v-else>
        <span class="btn btn-link">{{ user.email }}</span>
        <a href="javascript:" class="btn btn-outline-primary" @click="logout">Logout</a>
      </template>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {RouterView} from "vue-router";
import state from "@/state";
import { mapState, mapActions } from 'vuex'



export default Vue.extend({
  name: 'App',
  components: {
    RouterView
  },
  data() {
    return {
      authenticated: state.authorized
    }
  },
  mounted() {
    state.$on('authorized', () => this.authenticated = true);
  },
  computed: {
    ...mapState(['user', 'isAuthenticated'])
  },
  methods: {
    ...mapActions(['loginUser', 'logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.replace('sign-in');
    }
  }
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
#app{
  display: block;
}

</style>
