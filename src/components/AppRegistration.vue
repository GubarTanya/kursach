<template>
  <section class="wrap registration">
    <form @submit.prevent="handleSubmit">
      <h3>Регистрация</h3>
      <input
          type="email"
          name="email"
          placeholder="email"
          v-model="formData.email"
          :class="{ 'is-invalid': errors.email }"
          required
      />
      <div v-if="errors.email" class="error">{{ errors.email }}</div>
      <input
          type="password"
          name="password"
          placeholder="пароль"
          v-model="formData.password"
          :class="{ 'is-invalid': errors.password }"
          required
      />
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
      <button type="submit">Зарегистрироваться</button>
      <p v-if="success">Регистрация успешна!</p>
      <div class="comeIn">
        <router-link to="./login">Уже есть аккаунт?</router-link>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
  email: '',
  password: ''
});

const success = ref(false);
const errors = reactive({
  email: '',
  password: ''
});

const validateForm = () => {
  errors.email = '';
  errors.password = '';

  if (!formData.email) {
    errors.email = 'Email обязателен';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Неверный формат email';
  }

  if (!formData.password) {
    errors.password = 'Пароль обязателен';
  } else if (formData.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  }

  return !errors.email && !errors.password;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfwg3EKbEuCVGbjT033jEidEvvXzIzkck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        returnSecureToken: true
      })
    });

    const data = await response.json();

    if (response.ok) {
      success.value = true;
      localStorage.setItem('userUID', data.localId);
      await router.push('./login');
    } else {
      if (data.error.message === 'EMAIL_EXISTS') {
        errors.email = 'Этот email уже зарегистрирован';
      } else {
        errors.email = 'Произошла ошибка при регистрации';
      }
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    errors.email = 'Произошла ошибка при регистрации';
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
  height: 250px;
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
.comeIn {
  display: flex;
}
.error {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}
.is-invalid {
  border-color: red;
}
</style>