<!--<template>-->
<!--  <div class="background" @click="toggleLike(images)">-->
<!--    <div class="like" :class="{ active: like }"></div>-->
<!--    <img v-if="!like" :src="likesNone" class="liked-image" alt="likeNone">-->
<!--    <transition name="fade">-->
<!--      <img v-if="like" :src="likes" class="liked-image" alt="like">-->
<!--    </transition>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, watch } from 'vue';-->
<!--import * as image from "../assets/icon/index.js";-->
<!--import { useUserStore } from "@/store/user";-->
<!--import { storeToRefs } from "pinia";-->

<!--// Принимаем данные о фотографии через props-->
<!--const props = defineProps({-->
<!--  images: {-->
<!--    type: Object,-->
<!--    required: true,-->
<!--  },-->
<!--});-->

<!--// Используем store для получения текущего пользователя-->
<!--const userStore = useUserStore();-->
<!--const { user } = storeToRefs(userStore);-->


<!--// Реактивные переменные-->
<!--const like = ref(false); // Состояние лайка текущего пользователя-->
<!--const likeCount = ref(0); // Количество лайков-->
<!--const likes = ref(image.likes);-->
<!--const likesNone = ref(image.likesNone);-->


<!--// Функция для получения чистого ID фотографии (без расширения)-->
<!--const getCleanPhotoId = (photoId) => {-->
<!--  return photoId.split('.')[0]; // Убираем расширение файла-->
<!--};-->

<!--// Функция для проверки, загружены ли данные пользователя и фотографии-->
<!--const areDataLoaded = () => {-->
<!--  return user.value?.uid && props.images?.id;-->
<!--};-->


<!--// Функция для загрузки начальных данных о лайках-->
<!--const loadLikeState = async () => {-->
<!--  try {-->
<!--    if (!areDataLoaded()) {-->
<!--      console.warn('Данные пользователя или фотографии не загружены.');-->
<!--      return;-->
<!--    }-->

<!--    // Получаем чистый ID фотографии-->
<!--    const cleanPhotoId = getCleanPhotoId(props.images.id);-->

<!--    const response = await fetch(`https://photographer-269e5-default-rtdb.firebaseio.com/like/${cleanPhotoId}.json`, {-->
<!--      method: 'GET',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--      },-->
<!--    });-->

<!--    if (!response.ok) {-->
<!--      console.error('Ошибка при загрузке данных о лайках:', response.statusText);-->
<!--      return;-->
<!--    }-->

<!--    const likeData = await response.json();-->
<!--    likeCount.value = likeData?.count || 0;-->
<!--    const users = likeData?.users || [];-->
<!--    like.value = users.includes(user.value?.uid);-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при загрузке данных о лайках:', error);-->
<!--  }-->
<!--};-->

<!--// Функция для переключения лайка (лайк/анлайк)-->
<!--const toggleLike = async () => {-->
<!--  if (!areDataLoaded()) {-->
<!--    console.warn('Данные пользователя или фотографии не загружены.');-->
<!--    return;-->
<!--  }-->

<!--  like.value = !like.value;-->

<!--  try {-->
<!--    // Получаем чистый ID фотографии-->
<!--    const cleanPhotoId = getCleanPhotoId(props.images.id);-->

<!--    // Загружаем текущие данные лайков-->
<!--    const response = await fetch(`https://photographer-269e5-default-rtdb.firebaseio.com/like/${cleanPhotoId}.json`);-->
<!--    let likeData = { count: 0, users: [] };-->
<!--    if (response.ok) {-->
<!--      likeData = await response.json();-->
<!--    }-->

<!--    // Обновляем данные о лайках-->
<!--    if (like.value) {-->
<!--      likeData.count += 1;-->
<!--      if (!likeData.users.includes(user.value.uid)) {-->
<!--        likeData.users.push(user.value.uid);-->
<!--      }-->
<!--    } else {-->
<!--      likeData.count -= 1;-->
<!--      likeData.users = likeData.users.filter(userId => userId !== user.value.uid);-->
<!--    }-->

<!--    likeCount.value = likeData.count;-->

<!--    // Отправляем обновлённые данные в Firebase Realtime Database-->
<!--    const uploadResponse = await fetch(`${FIREBASE_DATABASE_URL}/like/${cleanPhotoId}.json`, {-->
<!--      method: 'PUT',-->
<!--      headers: { 'Content-Type': 'application/json' },-->
<!--      body: JSON.stringify(likeData),-->
<!--    });-->

<!--    if (!uploadResponse.ok) {-->
<!--      console.error('Ошибка при обновлении лайка:', uploadResponse.statusText);-->
<!--      // Откат изменений, если запрос не удался-->
<!--      like.value = !like.value;-->
<!--      likeCount.value = likeData.count;-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при отправке запроса лайка:', error);-->
<!--    // Откат изменений, если запрос не удался-->
<!--    like.value = !like.value;-->
<!--    likeCount.value = likeData.count;-->
<!--  }-->
<!--};-->

<!--// Отслеживаем изменения в данных пользователя и фотографии-->
<!--watch([user, () => props.images], ([newUser, newImages]) => {-->
<!--  if (areDataLoaded()) {-->
<!--    loadLikeState();-->
<!--  }-->
<!--});-->

<!--// При загрузке компонента проверяем, загружены ли данные-->
<!--onMounted(() => {-->
<!--  if (areDataLoaded()) {-->
<!--    loadLikeState();-->
<!--  } else {-->
<!--    console.warn('Данные пользователя или фотографии еще не загружены.');-->
<!--  }-->
<!--});-->
<!--</script>-->


<!--<style scoped>-->
<!--@media screen  and (max-width: 768px) {-->
<!--  .background {-->
<!--    min-width: 40px;-->
<!--  }-->
<!--}-->

<!--@media screen  and (max-width: 475px) {-->
<!--  .background {-->
<!--    min-width: 40px;-->
<!--  }-->
<!--}-->

<!--@media screen  and (max-width: 1200px) {-->
<!--  .background {-->
<!--    min-width: 40px;-->
<!--  }-->
<!--}-->

<!--.background {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  cursor: pointer;-->
<!--}-->


<!--.liked-image {-->
<!--  background-color: rgba(152, 152, 152, 0.01);-->
<!--  width: 65%;-->
<!--  position: relative;-->
<!--  right: 61px;-->
<!--  top: -42px;-->
<!--}-->
<!--</style>-->