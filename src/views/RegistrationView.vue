<template>
  <section class="wrap registration">
    <p>Регистрация</p>
    <form @submit.prevent="handleSubmit">
      <input
          type="email"
          name="email"
          placeholder="email"
          v-model="formData.email"
          required
      />
      <input
          type="password"
          name="password"
          placeholder="password"
          v-model="formData.password"
          required
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </section>
</template>

<script>
import {apps} from "../main.js";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {storeToRefs} from "pinia";
import {useUserStore} from "../store/user.js";

export default {

  data () {
    return {
      errorUser:'',
      errorEmail:"",
      errors: [],
      formData: {
        email:'',
        password:'',
      },
    }
  },
  setup() {
    const userStore = storeToRefs(useUserStore())
    const { user } = userStore

    return {
      user
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const userAuth = getAuth(apps)
        const userCredential = await createUserWithEmailAndPassword(userAuth, this.formData.email, this.formData.password);
        const userData = userCredential.user;
        localStorage.setItem('userUID', userData.uid);
        this.user = userData;
        console.log(this.user)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.errorEmail = ''
          this.errorUser = error
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error:', errorMessage,errorCode);
      }
    },
  }
}

</script>