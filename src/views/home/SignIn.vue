<script>
import Vue from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

export default Vue.extend({
  name: "SignIn",
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      const auth = getAuth(this.$firebase);
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            // Signed in
            router.push({ name: 'verify' });

            this.email = '';
            this.password = '';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.error = errorCode + ': ' + errorMessage;
          });
    }
  }
})
</script>

<template>
<div>
  <form class="form-signin" @submit.prevent="login">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <div class="alert alert-danger" v-if="error.length > 0">{{ error }}</div>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="password" />
    <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button>
  </form>
</div>
</template>

<style scoped>
.form-signin {
  max-width: 300px;
  margin: 75px auto;
}

#inputEmail {
  border-radius: 6px 6px 0 0;
}
#inputPassword {
  border-radius: 0 0 6px 6px;
  border-top: none;
}
</style>