<template>
  <section class="first">
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Хотите оставить отзыв?</h3>
      <p class="nameForm">
        <label for="name">Ваше имя:</label>
        <input id="name" v-model="formData.name" placeholder="name">
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </p>
      <p>
        <label for="review">Ваш отзыв:</label>
        <textarea id="review" v-model="formData.review" placeholder="Ваш комментарий"></textarea>
        <span v-if="errors.review" class="error">{{ errors.review }}</span>
      </p>

      <p>
        <input class="button" type="submit" value="Отправить">
      </p>
    </form>
  </section>

  <!-- Список отзывов -->
  <section class="review-list">
    <ul>
      <li v-for="(review, index) in reviews" :key="review.id">
        <strong>{{ review.name }}</strong>
        <p>{{ review.review }}</p>
        <div class="likes-dislikes">
          <button @click="toggleLike(index)">
            <img
                :src="userLikes[review.id] ? likeActiveIcon : likeInactiveIcon"
                alt="Like"
                class="icon"
            />
            {{ review.likes || 0 }}
          </button>
          <button @click="toggleDislike(index)">
            <img
                :src="userDislikes[review.id] ? dislikeActiveIcon : dislikeInactiveIcon"
                alt="Dislike"
                class="icon"
            />
            {{ review.dislikes || 0 }}
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import likeActiveIcon from '../assets/icon/likeActiveIcon.png'; // Активная иконка лайка
import likeInactiveIcon from '../assets/icon/likeInactiveIcon.png'; // Неактивная иконка лайка
import dislikeActiveIcon from '../assets/icon/dislikeActiveIcon.png'; // Активная иконка дизлайка
import dislikeInactiveIcon from '../assets/icon/dislikeInactiveIcon.png'; // Неактивная иконка дизлайка

// Состояние формы, отзывов и ошибок
const formData = ref({
  name: '',
  review: '',
});
const errors = ref({
  name: '',
  review: '',
});
const reviews = ref([]);
const userLikes = ref({});
const userDislikes = ref({});

// Жизненный цикл: выполняется после монтирования компонента
onMounted(async () => {
  await loadReviews();
});

// Функция для загрузки отзывов
const loadReviews = async () => {
  try {
    const response = await fetch('https://photographer-269e5-default-rtdb.firebaseio.com/reviews.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке отзывов');
    }

    const data = await response.json();
    if (data) {
      reviews.value = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
    }
  } catch (error) {
    console.error('Ошибка при загрузке отзывов:', error);
  }
};

// Функция для обработки отправки формы
const onSubmit = async () => {
  errors.value.name = '';
  errors.value.review = '';

  if (!formData.value.name) {
    errors.value.name = 'Пожалуйста, введите имя';
  }
  if (!formData.value.review) {
    errors.value.review = 'Пожалуйста, введите отзыв';
  }

  if (errors.value.name || errors.value.review) {
    return;
  }

  try {
    const response = await fetch('https://photographer-269e5-default-rtdb.firebaseio.com/reviews.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name,
        review: formData.value.review,
        likes: 0,
        dislikes: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке отзыва');
    }

    const data = await response.json();
    console.log('Отзыв успешно отправлен с ключом:', data.name);

    reviews.value.push({
      id: data.name,
      ...formData.value,
      likes: 0,
      dislikes: 0,
    });

    formData.value.name = '';
    formData.value.review = '';
    formData.value.rating = 1;
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error);
  }
};

// Функция для переключения лайка
const toggleLike = async (index) => {
  const reviewId = reviews.value[index].id;
  const hasLiked = userLikes.value[reviewId];
  const hasDisliked = userDislikes.value[reviewId];

  try {
    const response = await fetch(`https://photographer-269e5-default-rtdb.firebaseio.com/reviews/${reviewId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: (reviews.value[index].likes || 0) + (hasLiked ? -1 : 1),
        dislikes: (reviews.value[index].dislikes || 0) - (hasDisliked ? 1 : 0),
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при изменении лайка');
    }

    reviews.value[index].likes = (reviews.value[index].likes || 0) + (hasLiked ? -1 : 1);
    reviews.value[index].dislikes = (reviews.value[index].dislikes || 0) - (hasDisliked ? 1 : 0);
    userLikes.value[reviewId] = !hasLiked;
    userDislikes.value[reviewId] = false;
  } catch (error) {
    console.error('Ошибка при изменении лайка:', error);
  }
};

// Функция для переключения дизлайка
const toggleDislike = async (index) => {
  const reviewId = reviews.value[index].id;
  const hasDisliked = userDislikes.value[reviewId];
  const hasLiked = userLikes.value[reviewId];

  try {
    const response = await fetch(`https://photographer-269e5-default-rtdb.firebaseio.com/reviews/${reviewId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dislikes: (reviews.value[index].dislikes || 0) + (hasDisliked ? -1 : 1),
        likes: (reviews.value[index].likes || 0) - (hasLiked ? 1 : 0),
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при изменении дизлайка');
    }

    reviews.value[index].dislikes = (reviews.value[index].dislikes || 0) + (hasDisliked ? -1 : 1);
    reviews.value[index].likes = (reviews.value[index].likes || 0) - (hasLiked ? 1 : 0);
    userDislikes.value[reviewId] = !hasDisliked;
    userLikes.value[reviewId] = false;
  } catch (error) {
    console.error('Ошибка при изменении дизлайка:', error);
  }
};
</script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
}

.first {
  width: 1440px;
  height: 700px;
}
.nameForm {
  margin-top: 20px;
}
.review-form {
  background-color: white;
}

textarea {
  padding: 5px;
  outline: none;
  max-width: 400px;
  max-height: 300px;
  min-height: 70px;
  min-width: 190px;
  resize: none;
  border: 1px solid #989898;
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
  border-radius: 10px;
}
h3 {
  color: rgba(133, 12, 12, 1);
  margin-bottom: 10px;
}
label {
  color: rgba(133, 12, 12, 1);
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
  background-color: rgba(131, 1, 18, 1);
  color: white;
  border-radius: 17px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
}
.button:hover {
  background-color: rgba(133, 12, 12, 1);
}

.review-list {
  width: 1440px;
  margin-top: 20px;
  background-color: rgba(131, 1, 18, 1);
}

.review-list ul {
  margin-top: 50px;
  margin-bottom: 70px;
  list-style-type: none;
  padding: 0;
}
strong {
  color: rgba(159, 0, 3, 1);
  margin-right: 15px;
}
.review-list li {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 2px 5px rgb(110, 106, 96);
  width: 1350px;
  height: 100%;
  display: flex;
}

.likes-dislikes {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1em;
  border: none;
  background-color: white;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>