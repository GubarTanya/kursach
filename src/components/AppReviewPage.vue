<template>
  <div>
    <ReviewForm/>
    <ReviewList/>
  </div>
</template>

<script>
import ReviewForm from './AppReviewsFotm.vue';
import ReviewList from './AppReviewList.vue';

export default {
  components: {
    ReviewForm,
    ReviewList
  }
}
</script>
<style scoped>
  h3 {
    color: rgba(133, 12, 12, 1);
  }
</style>