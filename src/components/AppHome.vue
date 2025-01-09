<template>
  <div class="photoHeader"></div>
  <h1 class="name">foto.gubar</h1>
    <body>
        <div class="bod">
          <h1 class="description">Фотографирую с любовью</h1>
          <p class="text"> Привет! Меня зовут Таня, и я — профессиональный фотограф, который превращает обычные моменты в незабываемые воспоминания. Моя страсть — снимать живые, эмоциональные кадры, которые заставляют вас улыбаться, плакать и переживать вместе с теми, кто на фотографии.
            Я увлеченная и внимательная к деталям фотограф, которая ценит каждого своего клиента. Я рада, когда вы доверяете мне ваши самые важные моменты и идеи, и я гарантирую, что ваши фотографии будут отражать вашу уникальную историю и эмоции.
            Не упустите возможность запечатлеть свои особенные моменты с помощью профессионала, который понимает вас и ваши потребности. Свяжитесь со мной, и давайте вместе создадим фотографии, которые будут радовать вас долгие годы!</p>
        </div>
    </body>
  <div class="why">
    <div class="photoWhy"></div>
    <div class="textWhy">
      <h1>Почему именно я?</h1>
      <h3>Всё просто, я вижу красоту в простых вещах, со мной не нужно притворяться и надевать на себя маски. Я покажу через объектив, насколько ты красив!</h3>
    </div>
  </div>
</template>

<script>
  import * as images from "../assets/index.js"
  export default {
    data() {
      return {

      }
    },
  }
</script>

<style scoped>
    * {
    margin: 0;
    padding: 0;
    //background-color: black;
    }
    .photoHeader {
      width: 1440px;
      height: 600px;
      background-image: url('../assets/image/111-heder.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .name {
      position: absolute; /* Позиционируем меню поверх фотографии */
      top: 610px; /* Отступ сверху */
      right: 45%;
      text-align: center;
      color: rgba(131, 1, 18, 1);
      background-color: black;
      width: 170px;
      height: 30px;
      border-radius: 10px;
    }
    .bod {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 1443px;
      height: 500px;
      margin-top: 300px;
    }
    .why {
      background-color: rgba(131, 1, 18, 1);
      width: 1440px;
      height: 800px;
      display: flex;
      justify-content: center;
    }
    .textWhy {
      width: 373px;
      height: 198px;
      margin-top: 150px;
      margin-left: 70px;
    }
    .photoWhy {
      background-image: url('../assets/image/me.jpg');
      background-size: cover;
      width: 350px;
      height: 450px;
      border-radius: 30px;
      margin-top: 80px;
    }

    h3 {
      color: white;
    }
    h1 {
      color: white;
    }
    P {
      color: white;
    }
    .text {
      padding-top: 30px;
      width: 670px;
      text-align: center;
    }
    @media (max-width: 425px) {
      .job {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      .img {
        max-width: 100%;
        box-shadow: none;
      }
      .description {
        margin-top: 30px;
      }
      .text {
        padding-top: 20px;
        max-width: 100%;
      }
    }
</style>