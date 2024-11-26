<script setup>

</script>

<template>
  <div class="line"></div>
  <div class="foot">
    <p class="subscription">Подписывайтесь на меня в ВК</p>
    <p class="instagram">@foto.gubar</p>
  </div>
</template>

<style scoped>
  .line {
    margin-top: 300px;
    background-color: rgba(133, 12, 12, 1);
    width: 900px;
    height: 2px;
  }
  .foot {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .subscription {
    padding-top: 50px;
  }
  .instagram {
    padding-top: 12px;
  }
  @media (max-width: 425px) {
    .line {
      width: 100%;
    }
  }
</style>