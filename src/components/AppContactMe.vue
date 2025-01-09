<template>
    <body>
      <div class="row1">
        <div>
          <div class="price1"></div>
          <div class="but">записаться</div>
        </div>
        <div>
          <div class="price2"></div>
          <div class="but">записаться</div>
        </div>
      </div>
      <div class="row2">
        <div>
          <div class="price3"></div>
          <div class="but">записаться</div>
        </div>
        <div>
          <div class="price4"></div>
          <div class="but">записаться</div>
        </div>
      </div>
    </body>

</template>

<script setup>
</script>

<style scoped>
  template {
    background-color: rgba(131, 1, 18, 1);
  }
  body {
    margin-top: 50px;
    background-color: rgba(131, 1, 18, 1);
    width: 1440px;
    height: 1500px;
    display: flex;
  }
  .row1 {
    margin-top: 100px;
    display: flex;
    flex-direction: row;
  }
  .row2 {
    margin-top: 100px;
    display: flex;
    flex-direction: row;
  }
  .but {
    background-color: white;
    color: rgba(131, 1, 18, 1);
    width: 200px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .price1 {
    background-image: url('../assets/image/price1.jpg');
    background-size: cover;
    width: 200px;
    height: 350px;
    border-radius: 30px;
    margin-right: 100px;
  }
  .price2 {
    background-image: url('../assets/image/price2.jpg');
    background-size: cover;
    width: 200px;
    height: 350px;
    border-radius: 30px;
  }
  .price3 {
    background-image: url('../assets/image/price3.jpg');
    background-size: cover;
    width: 200px;
    height: 350px;
    border-radius: 30px;
    margin-right: 100px;
  }
  .price4 {
    background-image: url('../assets/image/price4.jpg');
    background-size: cover;
    width: 200px;
    height: 350px;
    border-radius: 30px;
  }
</style>