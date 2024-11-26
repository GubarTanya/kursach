<template>
  <div>
    <div v-for="photo in photographer" :key="photo.id" class="image-container">
      <img :src="photo.url" :alt="photo.name" />
      <AppLike :images="photo" :photoUrl="photo.url" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppLike from '@/components/AppLike.vue';

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
    photographer.value = data.items.map(item => ({
      id: item.name,
      name: item.name,
      url: item.mediaLink,
    }));
  } catch (error) {
    console.error('Ошибка при получении фотографий:', error);
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
}
.image-container img {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}
</style>