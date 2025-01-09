<template>
  <div>
    <div v-for="photo in photographer" :key="photo.id" class="image-container">
      <img :src="photo.url" :alt="photo.name" />
      <div class="like-container" @click="toggleLike(photo)">
        <img v-if="!photo.liked" src="../assets/icon/like.svg" class="liked-image" alt="likeNone">
        <transition name="fade">
          <img v-if="photo.liked" src="@/assets/icon/likeActive.svg" class="liked-image" alt="like">
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

// Используем store для получения текущего пользователя
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// URL базы данных Firebase
const FIREBASE_DATABASE_URL = 'https://photographer-269e5-default-rtdb.firebaseio.com';

// Состояние фотографий
const photographer = ref([]);

// Жизненный цикл: выполняется после монтирования компонента
onMounted(async () => {
  await fetchPhotos();
});

// Функция для получения фотографий
const fetchPhotos = async () => {
  try {
    console.log('Fetching photos...');

    // Выполнение GET-запроса для получения фотографий
    const response = await fetch('https://firebasestorage.googleapis.com/v0/b/photographer-269e5.appspot.com/o?prefix=photo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching photos:', errorData);
      throw new Error(`Ошибка получения фотографий: ${errorData.error.message}`);
    }

    const data = await response.json();
    console.log('Photos fetched successfully:', data);

    // Проверка формата данных
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Неправильный формат данных');
    }

    // Преобразуем данные в нужный формат
    photographer.value = data.items.map(item => ({
      id: item.name, // Идентификатор фотографии
      name: item.name, // Имя файла
      url: `https://firebasestorage.googleapis.com/v0/b/${item.bucket}/o/${encodeURIComponent(item.name)}?alt=media`, // URL изображения
      liked: false, // Состояние лайка по умолчанию
    }));
  } catch (error) {
    console.error('Ошибка при получении фотографий:', error);
  }
};

// Функция для получения чистого ID фотографии (без расширения)
const getCleanPhotoId = (photoId) => {
  return photoId.split('.')[0]; // Убираем расширение файла
};

// Функция для загрузки состояния лайков из Firebase
const loadLikeState = async (photo) => {
  try {
    if (!user.value?.uid || !photo.id) {
      console.warn('Данные пользователя или фотографии не загружены.');
      return;
    }

    // Получаем чистый ID фотографии
    const cleanPhotoId = getCleanPhotoId(photo.id);

    const response = await fetch(`${FIREBASE_DATABASE_URL}/like/${cleanPhotoId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Ошибка при загрузке данных о лайках:', response.statusText);
      return;
    }

    const likeData = await response.json();
    const users = likeData?.users || [];
    photo.liked = users.includes(user.value?.uid);
  } catch (error) {
    console.error('Ошибка при загрузке данных о лайках:', error);
  }
};

// Функция для переключения лайка (лайк/анлайк)
const toggleLike = async (photo) => {
  if (!user.value?.uid || !photo.id) {
    console.warn('Данные пользователя или фотографии не загружены.');
    return;
  }

  try {
    // Получаем чистый ID фотографии
    const cleanPhotoId = getCleanPhotoId(photo.id);

    // Загружаем текущие данные лайков из Firebase
    const response = await fetch(`${FIREBASE_DATABASE_URL}/like/${cleanPhotoId}.json`);
    let likeData = { users: [] };
    if (response.ok) {
      likeData = await response.json();
    }

    // Обновляем данные о лайках
    const userLiked = likeData.users?.includes(user.value.uid);
    if (userLiked) {
      // Если пользователь уже лайкнул, убираем лайк
      likeData.users = likeData.users.filter(userId => userId !== user.value.uid);
    } else {
      // Если пользователь не лайкнул, добавляем лайк
      likeData.users = likeData.users || [];
      likeData.users.push(user.value.uid);
    }

    // Отправляем обновлённые данные в Firebase
    const uploadResponse = await fetch(`${FIREBASE_DATABASE_URL}/like/${cleanPhotoId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(likeData),
    });

    if (!uploadResponse.ok) {
      console.error('Ошибка при обновлении лайка:', uploadResponse.statusText);
      return;
    }

    // Обновляем состояние лайка на основе ответа от Firebase
    photo.liked = !userLiked;
  } catch (error) {
    console.error('Ошибка при отправке запроса лайка:', error);
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
}

.image-container {
  width: calc(18% - 10px);
  margin: 5px;
  flex-grow: 0;
  position: relative;
}

.image-container img {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}

.like-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.liked-image {
  width: 24px; /* Увеличим размер иконки лайка */
  height: 24px; /* Увеличим размер иконки лайка */
}
</style>