<template>
    <header>
            <nav>
                <router-link to="/">главная</router-link>
                <router-link to="/reviews">отзывы</router-link>
                <router-link to="/art">работы</router-link>
                <router-link to="/info">информация</router-link>
                <router-link to="/contactme">контакты</router-link>
                <router-link to="/registration" v-if="!isAuth">вход</router-link>
              <form @submit.prevent="logout">
                <button type="submit" v-if="isAuth">выйти</button>
              </form>
            </nav>
    </header>
    <div class="line"></div>
    <h3 class="name">foto.gubar</h3>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import { useUserStore } from "../store/user.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    // Используем storeToRefs для получения реактивных ссылок на состояние хранилища
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
    };
  },
};
</script>

<style scoped>
    header {
      display: flex;
      flex-direction: row;
      margin-top: 15px;
      width: 850px;
      margin-bottom: 11px;
    }
    nav {
      width: 500px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 250px;
    }
    .line {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      background-color: rgba(133, 12, 12, 1);
      width: 900px;
      height: 3px;
    }
    .name {
      padding: 30px;
      text-align: center;
      color: rgba(133, 12, 12, 1);
    }
    form {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      color: rgba(133, 50, 72, 1);
      border: none;
      cursor: pointer;
    }
    @media (max-width: 425px) {
      header {
        flex-direction: column;
        align-items: flex-start;
      }
      nav {
        flex-direction: row;
        gap: 10px;
        justify-content: end;
      }
      .line {
        width: 100%;
      }
    }
</style>