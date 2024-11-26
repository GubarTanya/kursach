<template>
  <section class="wrap authorization">
    <p class="">Авторизация</p>
    <form @submit.prevent="handleSubmit">
      <input
          v-model="formData.email"
          name="email"
          placeholder="email"
          type="email"
      />
      <input
          type="password"
          name="password"
          placeholder="password"
          v-model="formData.password"
      />
      <button type="submit">Войти</button>
    </form>
  </section>
</template>

<script>
import {apps} from "../main.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useUserStore} from "../store/user.js";
import {storeToRefs} from 'pinia'
import router from "../router/index";

export default {
  setup() {
    const userStore = storeToRefs(useUserStore())
    const { user, isAuth } = userStore

    return {
      user,
      isAuth
    }
  },
  data() {
    return {
      errorUser: '',
      errors: [],
      formData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    handleSubmit() {
      const userAuth = getAuth(apps)
      signInWithEmailAndPassword(userAuth, this.formData.email, this.formData.password).then((res) => {
        const userData = res.user;
        localStorage.setItem('user', JSON.stringify(userData));
        this.user = userData;
        this.isAuth = true
        // router.push('/main'); поставить путь на дом
      }).catch((error) => {
        this.errorUser = error.message
      })
    }
  }
}
</script>