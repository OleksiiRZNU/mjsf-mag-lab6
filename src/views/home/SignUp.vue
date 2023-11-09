<script>
import Vue from 'vue'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import router from "@/router";

export default Vue.extend({
  name: "SignUp",
  data() {
    return {
      email: '',
      password: '',
      repeat_password: '',
      error: ''
    }
  },
  methods: {
    signup() {
      if (this.password !== this.repeat_password) {
        this.error = 'Паролі не збігаються!'
        return ;
      }
      const auth = getAuth(this.$firebase);
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            router.push({ name: 'verify' });

            sendEmailVerification(user);

            this.email = '';
            this.password = '';
            this.repeat_password = '';
            this.error = '';
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
  <form class="form-signup" @submit.prevent="signup">
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
    <div class="alert alert-danger" v-if="error.length > 0">{{ error }}</div>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="password" />
    <label for="inputPassword" class="sr-only">Repeat password</label>
    <input type="password" id="inputPasswordRepeat" class="form-control" placeholder="Repeat password" required="" v-model="repeat_password" />
    <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">Register</button>
  </form>
</div>
</template>

<style scoped>
.form-signup {
  max-width: 300px;
  margin: 75px auto;
}

#inputEmail {
  border-radius: 6px 6px 0 0;
}
#inputPassword {
  border-radius: 0;
  border-top: none;
}
#inputPasswordRepeat {
  border-radius: 0 0 6px 6px;
  border-top: none;
}
</style>