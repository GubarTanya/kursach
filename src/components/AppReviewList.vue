<template>
  <section class="review-list">
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <strong>{{ review.name }}</strong>
        <p>{{ review.review }}</p>
        <p>{{ review.rating }}</p>
        <div class="likes-dislikes">
          <button @click="likeReview(index)">Like ({{ review.likes || 0 }})</button>
          <button @click="dislikeReview(index)">Dislike ({{ review.dislikes || 0 }})</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { getDatabase, ref, get, update } from "firebase/database";
import { db } from "@/main.js";

export default {
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.loadReviews();
  },
  methods: {
    loadReviews() {
      const reviewRef = ref(db, 'review');
      get(reviewRef).then(snapshot => {
        if (snapshot.exists()) {
          this.reviews = [];
          snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            data.id = childSnapshot.key; // Добавляем уникальный идентификатор
            this.reviews.push(data);
          });
          console.log('Отзывы загружены:', this.reviews);
        } else {
          console.log("Данные не найдены");
        }
      }).catch(error => {
        console.error("Ошибка при получении данных из базы данных:", error);
      });
    },
    likeReview(index) {
      const reviewId = this.reviews[index].id;
      const reviewRef = ref(db, `review/${reviewId}`);
      update(reviewRef, {
        likes: (this.reviews[index].likes || 0) + 1
      }).then(() => {
        this.reviews[index].likes = (this.reviews[index].likes || 0) + 1;
        console.log('Лайк добавлен:', this.reviews[index]);
      }).catch(error => {
        console.error("Ошибка при обновлении лайка:", error);
      });
    },
    dislikeReview(index) {
      const reviewId = this.reviews[index].id;
      const reviewRef = ref(db, `review/${reviewId}`);
      update(reviewRef, {
        dislikes: (this.reviews[index].dislikes || 0) + 1
      }).then(() => {
        this.reviews[index].dislikes = (this.reviews[index].dislikes || 0) + 1;
        console.log('Дизлайк добавлен:', this.reviews[index]);
      }).catch(error => {
        console.error("Ошибка при обновлении дизлайка:", error);
      });
    }
  }
};
</script>

<style scoped>
.review-list ul {
  list-style-type: none;
  padding: 0;
}

.review-list li {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
}

.likes-dislikes {
  margin-top: 10px;
}

button {
  border: rgba(175, 154, 113, 0.58);
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: bisque;
}
</style>