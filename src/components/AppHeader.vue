<template>
  <header>
    <nav>
      <router-link to="/">главная</router-link>
      <router-link to="/reviews">отзывы</router-link>
      <router-link to="/art">работы</router-link>
      <router-link to="/info">информация</router-link>
      <router-link to="/contactme">цены</router-link>
      <router-link to="/registration" v-if="!isAuth">вход</router-link>
      <form @submit.prevent="logout">
        <button type="submit" v-if="isAuth">выйти</button>
      </form>
    </nav>
  </header>

<!--  <h1 class="name">foto.gubar</h1>-->
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import { useUserStore } from "../store/user.js";
import { storeToRefs } from "pinia";
import imgFirst from "../assets/image/111-heder.jpg"; // Импортируем изображение

export default {
  setup() {
    const userStore = useUserStore();
    const { isAuth } = storeToRefs(userStore);

    // Метод для обработки выхода пользователя
    const logout = () => {
      const auth = getAuth();
      if (isAuth.value) {
        signOut(auth)
            .then(() => {
              localStorage.removeItem('user');
              isAuth.value = false;
            })
            .catch((error) => {
              console.error('Error:', error.message);
            });
      } else {
        console.log('Пользователь был не авторизован');
      }
    };

    return {
      isAuth,
      logout,
      imgFirst, // Передаем изображение в шаблон (если нужно)
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* Шапка */
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 100%;
  margin-bottom: 11px;
}

/* Меню */
nav {
  position: absolute; /* Позиционируем меню поверх фотографии */
  top: 20px; /* Отступ сверху */
  left: 50%; /* Центрируем по горизонтали */
  transform: translateX(-50%); /* Точное центрирование */
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 10px; /* Отступы внутри меню */
  color: rgba(131, 1, 18, 1);
}

/* Кнопка выхода */
form {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: rgba(0, 0, 0, 0.96);
  color: rgba(133, 50, 72, 1);
  border: none;
  cursor: pointer;
}

/* Адаптив для мобильных устройств */
@media (max-width: 425px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    flex-direction: row;
    gap: 10px;
    justify-content: end;
    top: 10px; /* Уменьшаем отступ для мобильных устройств */
    left: 10px; /* Сдвигаем меню влево */
    transform: none; /* Отключаем центрирование */
  }

  .line {
    width: 100%;
  }
}
</style>