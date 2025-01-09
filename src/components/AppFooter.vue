<script setup>

</script>

<template>
  <body>
    <div class="line"></div>
    <div class="foot">
      <p class="subscription">Подписывайтесь на меня в ВК</p>
      <p class="instagram">@foto.gubar</p>
    </div>
  </body>
</template>

<style scoped>
body {
  background-color: rgba(131, 1, 18, 1);
}
  .line {
    background-color: white;
    width: 100%;
    height: 2px;
  }
  .foot {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }
  .subscription {
    padding-top: 50px;
  }
  .instagram {
    padding-top: 12px;
    margin-bottom: 50px;
  }
  @media (max-width: 425px) {
    .line {
      width: 100%;
    }
  }
</style>