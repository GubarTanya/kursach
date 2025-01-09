<!--<template>-->
<!--  <section>-->
<!--    &lt;!&ndash; Форма для отзывов &ndash;&gt;-->
<!--    <form class="review-form" @submit.prevent="onSubmit">-->
<!--      <h3>Отзыв</h3>-->
<!--      <p>-->
<!--        <label for="name">Имя:</label>-->
<!--        <input id="name" v-model="formData.name" placeholder="name">-->
<!--      </p>-->
<!--      <p>-->
<!--        <label for="review">Отзыв:</label>-->
<!--        <textarea id="review" v-model="formData.review" placeholder="Ваш комментарий"></textarea>-->
<!--      </p>-->
<!--      <div>-->
<!--        <label for="rating">Рейтинг:</label>-->
<!--        <select id="rating" v-model="formData.rating">-->
<!--          <option value="1">Плохо</option>-->
<!--          <option value="2">Средне</option>-->
<!--          <option value="3">Нормально</option>-->
<!--          <option value="4">Хорошо</option>-->
<!--          <option value="5">Отлично</option>-->
<!--        </select>-->
<!--      </div>-->
<!--      <p>-->
<!--        <input class="button" type="submit" value="Отправить">-->
<!--      </p>-->
<!--    </form>-->

<!--    &lt;!&ndash; Список отзывов &ndash;&gt;-->
<!--    <section class="review-list">-->
<!--      <ul>-->
<!--        <li v-for="(review, index) in reviews" :key="review.id">-->
<!--          <strong>{{ review.name }}</strong>-->
<!--          <p>{{ review.review }}</p>-->
<!--          <p>{{ review.rating }}</p>-->
<!--          <div class="likes-dislikes">-->
<!--            <button @click="likeReview(index)">Like ({{ review.likes || 0 }})</button>-->
<!--            <button @click="dislikeReview(index)">Dislike ({{ review.dislikes || 0 }})</button>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </section>-->
<!--  </section>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted } from 'vue';-->

<!--// Состояние формы и отзывов-->
<!--const formData = ref({-->
<!--  name: '',-->
<!--  review: '',-->
<!--  rating: 1,-->
<!--});-->
<!--const reviews = ref([]);-->

<!--// Жизненный цикл: выполняется после монтирования компонента-->
<!--onMounted(async () => {-->
<!--  await loadReviews();-->
<!--});-->

<!--// Функция для загрузки отзывов-->
<!--const loadReviews = async () => {-->
<!--  try {-->
<!--    const response = await fetch('https://your-firebase-database-url/review.json', {-->
<!--      method: 'GET',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--      },-->
<!--    });-->

<!--    if (!response.ok) {-->
<!--      throw new Error('Ошибка при загрузке отзывов');-->
<!--    }-->

<!--    const data = await response.json();-->
<!--    if (data) {-->
<!--      reviews.value = Object.keys(data).map(key => ({-->
<!--        id: key,-->
<!--        ...data[key],-->
<!--      }));-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при загрузке отзывов:', error);-->
<!--  }-->
<!--};-->

<!--// Функция для обработки отправки формы-->
<!--const onSubmit = async () => {-->
<!--  if (!formData.value.name || !formData.value.review) {-->
<!--    alert('Пожалуйста, заполните все поля');-->
<!--    return;-->
<!--  }-->

<!--  try {-->
<!--    const response = await fetch('https://your-firebase-database-url/review.json', {-->
<!--      method: 'POST',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--      },-->
<!--      body: JSON.stringify({-->
<!--        name: formData.value.name,-->
<!--        review: formData.value.review,-->
<!--        rating: formData.value.rating,-->
<!--      }),-->
<!--    });-->

<!--    if (!response.ok) {-->
<!--      throw new Error('Ошибка при отправке отзыва');-->
<!--    }-->

<!--    const data = await response.json();-->
<!--    console.log('Отзыв успешно отправлен с ключом:', data.name);-->

<!--    // Добавляем новый отзыв в список-->
<!--    reviews.value.push({-->
<!--      id: data.name,-->
<!--      ...formData.value,-->
<!--    });-->

<!--    // Очищаем форму после отправки-->
<!--    formData.value.name = '';-->
<!--    formData.value.review = '';-->
<!--    formData.value.rating = 1;-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при отправке отзыва:', error);-->
<!--  }-->
<!--};-->

<!--// Функция для добавления лайка-->
<!--const likeReview = async (index) => {-->
<!--  const reviewId = reviews.value[index].id;-->
<!--  try {-->
<!--    const response = await fetch(`https://your-firebase-database-url/review/${reviewId}.json`, {-->
<!--      method: 'PATCH',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--      },-->
<!--      body: JSON.stringify({-->
<!--        likes: (reviews.value[index].likes || 0) + 1,-->
<!--      }),-->
<!--    });-->

<!--    if (!response.ok) {-->
<!--      throw new Error('Ошибка при добавлении лайка');-->
<!--    }-->

<!--    reviews.value[index].likes = (reviews.value[index].likes || 0) + 1;-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при добавлении лайка:', error);-->
<!--  }-->
<!--};-->

<!--// Функция для добавления дизлайка-->
<!--const dislikeReview = async (index) => {-->
<!--  const reviewId = reviews.value[index].id;-->
<!--  try {-->
<!--    const response = await fetch(`https://your-firebase-database-url/review/${reviewId}.json`, {-->
<!--      method: 'PATCH',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--      },-->
<!--      body: JSON.stringify({-->
<!--        dislikes: (reviews.value[index].dislikes || 0) + 1,-->
<!--      }),-->
<!--    });-->

<!--    if (!response.ok) {-->
<!--      throw new Error('Ошибка при добавлении дизлайка');-->
<!--    }-->

<!--    reviews.value[index].dislikes = (reviews.value[index].dislikes || 0) + 1;-->
<!--  } catch (error) {-->
<!--    console.error('Ошибка при добавлении дизлайка:', error);-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--textarea {-->
<!--  padding: 5px;-->
<!--  outline: none;-->
<!--  max-width: 400px;-->
<!--  max-height: 300px;-->
<!--  min-height: 70px;-->
<!--  min-width: 190px;-->
<!--  background: rgba(255, 247, 226, 1);-->
<!--  resize: none;-->
<!--  border: 2px solid #989898;-->
<!--  border-radius: 10px;-->
<!--}-->
<!--section {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->
<!--form {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  padding: 25px 20px 25px 20px;-->
<!--  width: fit-content;-->
<!--  height: fit-content;-->
<!--  background-color: rgba(255, 247, 226, 1);-->
<!--  border-radius: 10px;-->
<!--  box-shadow: 2px 2px 10px rgb(110, 106, 96);-->
<!--}-->
<!--h3 {-->
<!--  color: rgba(133, 12, 12, 1);-->
<!--  margin-bottom: 10px;-->
<!--}-->
<!--label {-->
<!--  color: rgba(133, 12, 12, 1);-->
<!--  background-color: rgba(255, 247, 226, 1);-->
<!--  border-radius: 10px;-->
<!--  margin-right: 10px;-->
<!--}-->
<!--input {-->
<!--  border: 2px solid #989898;-->
<!--  border-radius: 10px;-->
<!--  width: 200px;-->
<!--  height: 30px;-->
<!--  margin-bottom: 10px;-->
<!--  padding: 5px;-->
<!--}-->
<!--.button {-->
<!--  border: none;-->
<!--  background-color: gray;-->
<!--  color: rgba(255, 247, 226, 1);-->
<!--  border-radius: 17px;-->
<!--  width: 200px;-->
<!--  height: 40px;-->
<!--  margin-top: 20px;-->
<!--  cursor: pointer;-->
<!--}-->
<!--.button:hover {-->
<!--  background-color: rgba(133, 12, 12, 1);-->
<!--}-->
<!--#rating {-->
<!--  border: 2px solid #989898;-->
<!--  border-radius: 10px;-->
<!--  width: 200px;-->
<!--  height: 30px;-->
<!--  margin-bottom: 10px;-->
<!--  margin-top: 15px;-->
<!--}-->

<!--.review-list ul {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--}-->

<!--.review-list li {-->
<!--  margin-bottom: 1rem;-->
<!--  border: 1px solid #ccc;-->
<!--  padding: 1rem;-->
<!--}-->

<!--.likes-dislikes {-->
<!--  margin-top: 10px;-->
<!--}-->

<!--button {-->
<!--  border: rgba(175, 154, 113, 0.58);-->
<!--  margin-right: 10px;-->
<!--  padding: 5px 10px;-->
<!--  cursor: pointer;-->
<!--  background-color: bisque;-->
<!--}-->
<!--</style>-->