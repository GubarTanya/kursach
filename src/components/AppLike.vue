<template>
  <div class="background" @click="toggleLike(images)">
    <div class="like" :class="{ active: like }"></div>
    <img v-if="!like" :src="likesNone" class="liked-image" alt="likeNone">
    <transition name="fade">
      <img v-if="like" :src="likes" class="liked-image" alt="like">
    </transition>
  </div>
</template>

<script>
import * as image from "../assets/icon/index.js";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: "AppLike",
  props: {
    images: Object, // Принимаем данные о фотографии через props
  },
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    return {
      user
    }
  },
  data() {
    return {
      like: false,
      likes: image.likes,
      likesNone: image.likesNone,
    }
  },
  methods: {
    toggleLike() {
      this.like = !this.like;
    },
  }
}
</script>


<style scoped>
@media screen  and (max-width: 768px) {
  .background {
    min-width: 40px;
  }
}

@media screen  and (max-width: 475px) {
  .background {
    min-width: 40px;
  }
}

@media screen  and (max-width: 1200px) {
  .background {
    min-width: 40px;
  }
}

.background {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}


.liked-image {
  background-color: rgba(152, 152, 152, 0.01);
  width: 65%;
  position: relative;
  right: 61px;
  top: -42px;
}
</style>