<template>
  <section>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Отзыв</h3>
      <p>
        <label for="name">Имя:</label>
        <input id="name" v-model="formData.name" placeholder="name">
      </p>
      <p>
        <label for="review">Отзыв:</label>
        <textarea id="review" v-model="formData.review" placeholder="Ваш комментарий"></textarea>
      </p>
      <div>
        <label for="rating">Рейтинг:</label>
        <select id="rating" v-model="formData.rating">
          <option value="1">Плохо</option>
          <option value="2">Средне</option>
          <option value="3">Нормально</option>
          <option value="4">Хорошо</option>
          <option value="5">Отлично</option>
        </select>
      </div>
      <p>
        <input class="button" type="submit" value="Отправить">
      </p>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue';
import { getDatabase, set, ref as dbRef, push } from "firebase/database";
import { db } from "@/main.js";

export default {
  setup() {
    // Создаем реактивные переменные
    const id = ref('');
    const formData = ref({
      name: '',
      review: '',
      rating: 1,
    });

    // Метод для обработки отправки формы
    const onSubmit = () => {
      if (!formData.value.name || !formData.value.review) {
        alert('Пожалуйста, заполните все поля');
        return;
      }

      const database = db;
      const Review = dbRef(database, "review");
      const newReview = push(Review);

      console.log('Отправляем данные:', {
        name: formData.value.name,
        review: formData.value.review,
        rating: formData.value.rating,
      });

      set(newReview, {
        name: formData.value.name,
        review: formData.value.review,
        rating: formData.value.rating,
      }).then(() => {
        const key = newReview.key;
        id.value = key;
        console.log('Отзыв успешно отправлен с ключом:', id.value);

        // Очищаем форму после отправки
        formData.value.name = '';
        formData.value.review = '';
        formData.value.rating = 1;
      }).catch((error) => {
        console.error('Ошибка при отправке отзыва:', error);
      });
    };

    // Возвращаем данные и методы, которые будут доступны в шаблоне
    return {
      id,
      formData,
      onSubmit,
    };
  },
};
</script>

<style scoped>
textarea {
  padding: 5px;
  outline: none;
  max-width: 400px;
  max-height: 300px;
  min-height: 70px;
  min-width: 190px;
  background: rgba(255, 247, 226, 1);
  resize: none;
  border: 2px solid #989898;
  border-radius: 10px;
}
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
  padding: 25px 20px 25px 20px;
  width: fit-content;
  height: fit-content;
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
  margin-right: 10px;
}
input {
  border: 2px solid #989898;
  border-radius: 10px;
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
  padding: 5px;
}
.button {
  border: none;
  background-color: gray;
  color: rgba(255, 247, 226, 1);
  border-radius: 17px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
}
.button:hover {
  background-color: rgba(133, 12, 12, 1);
}
#rating {
  border: 2px solid #989898;
  border-radius: 10px;
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 15px;
}
</style>