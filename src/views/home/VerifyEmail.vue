<script>
import Vue from 'vue'
import { getAuth, sendEmailVerification } from "firebase/auth";
import router from "@/router";
import state from "@/state";

export default Vue.extend({
  name: "VerifyEmail",
  data() {
    return {
      verifying: true,
      verified: false
    }
  },
  methods: {
    resend() {
      const user = getAuth(this.$firebase).currentUser;
      sendEmailVerification(user);
    }
  },
  mounted() {
    const user = getAuth(this.$firebase).currentUser;
    this.verifying = false;
    if (user !== null && typeof user !== "undefined") {
      this.verified = user.emailVerified;
      if (this.verified) {
        state.authorized = true;
        state.$emit('authorized');
        router.replace('todos');
      }
    } else {
      router.replace('sign-in');
    }
  }
})
</script>

<template>
<div class="email-verification-placeholder">
  <span v-if="verifying">Перевіряємо...</span>
  <div v-else>
    <div>Спочатку підтвердіть вашу пошту</div>
    <div><a class="btn btn-link" @click.prevent="resend">Відправити повторно</a></div>
  </div>
</div>
</template>

<style scoped>
.email-verification-placeholder {
  max-width: 300px;
  margin: 75px auto;
  text-align: center;
}
</style>