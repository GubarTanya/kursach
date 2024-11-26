<template>
  <section class="wrap authorization">
    <form @submit.prevent="handleSubmit">
      <h3 class="">Авторизация</h3>
      <p v-if="errorUser" class="error">{{ errorUser }}</p>
      <input
          v-model="formData.email"
          name="email"
          placeholder="email"
          type="email"
      />
      <input
          type="password"
          name="password"
          placeholder="пароль"
          v-model="formData.password"
      />
      <button type="submit">Войти</button>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '../store/user.js';
import { storeToRefs } from 'pinia';
import router from '../router/index';

const userStore = useUserStore();
const { user, isAuth } = storeToRefs(userStore);

const formData = reactive({
  email: '',
  password: ''
});

const errorUser = ref('');

const isFormValid = computed(() => {
  return formData.email && formData.password;
});

const validateForm = () => {
  const errors = [];
  if (!formData.email) {
    errors.push('требуется Email');
  }
  if (!formData.password) {
    errors.push('требуется пароль');
  }
  return errors;
};

const handleSubmit = async () => {
  const errors = validateForm();
  if (errors.length > 0) {
    errorUser.value = errors.join(', ');
    return;
  }

  try {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfwg3EKbEuCVGbjT033jEidEvvXzIzkck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      switch (errorData.code) {
        case 'auth/invalid-credential':
          errorUser.value = 'Неверные учетные данные. Пожалуйста, проверьте ваш email и пароль.';
          break;
        case 'auth/user-disabled':
          errorUser.value = 'Ваш аккаунт был отключен.';
          break;
        case 'auth/user-not-found':
          errorUser.value = 'Пользователь с таким email не найден.';
          break;
        case 'auth/wrong-password':
          errorUser.value = 'Неверный пароль.';
          break;
        default:
          errorUser.value = 'Произошла ошибка при авторизации. Пожалуйста, попробуйте позже.';
          break;
      }
      return;
    }

    const userData = await response.json();
    localStorage.setItem('user', JSON.stringify(userData));
    user.value = userData;
    isAuth.value = true;
    router.push('/');
  } catch (error) {
    errorUser.value = 'Произошла ошибка при авторизации. Пожалуйста, попробуйте позже.';
  }
};
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 200px;
    background-color: rgba(255, 247, 226, 1);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(110, 106, 96);
  }
  h3 {
    color: rgba(133, 12, 12, 1);
    margin-bottom: 10px;
  }
  label {
    color: rgba(133, 12, 12, 1);
    background-color: rgba(255, 247, 226, 1);
    border-radius: 10px;
  }
  .error {
    color: rgba(133, 12, 12, 1);
  }
  input {
    border: 2px solid #989898;
    border-radius: 10px;
    width: 200px;
    height: 30px;
    margin-bottom: 10px;
  }
  input::placeholder {
    padding-left: 7px;
  }
  button {
    border: none;
    background-color: gray;
    color: rgba(255, 247, 226, 1);
    border-radius: 17px;
    width: 200px;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;
  }
  button:hover {
    background-color: rgba(133, 12, 12, 1);
  }

</style>