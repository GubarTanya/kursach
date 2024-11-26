<template>
    <body>
        <div class="job">
            <div>
                <img :src="imgFirst" class="img" alt="photo">
            </div>
            <div>
                <img :src="imgSecond" class="img" alt="photo">
            </div>
            <div>
                <img :src="imgThird" class="img" alt="photo">
            </div>
        </div>
        <h3 class="description">Фотографирую с любовью</h3>
        <p class="text"> Привет! Меня зовут Таня, и я — профессиональный фотограф, который превращает обычные моменты в незабываемые воспоминания. Моя страсть — снимать живые, эмоциональные кадры, которые заставляют вас улыбаться, плакать и переживать вместе с теми, кто на фотографии.
          Я увлеченная и внимательная к деталям фотограф, которая ценит каждого своего клиента. Я рада, когда вы доверяете мне ваши самые важные моменты и идеи, и я гарантирую, что ваши фотографии будут отражать вашу уникальную историю и эмоции.
          Не упустите возможность запечатлеть свои особенные моменты с помощью профессионала, который понимает вас и ваши потребности. Свяжитесь со мной, и давайте вместе создадим фотографии, которые будут радовать вас долгие годы!</p>
    </body>
</template>

<script>
  import * as images from "../assets/index.js"
  export default {
    data() {
      return {
        imgFirst: images.imgFirst,
        imgSecond: images.imgSecond,
        imgThird: images.imgThird,
      }
    },
  }
</script>

<style>
    * {
    margin: 0;
    padding: 0;
    background-color: rgba(255, 247, 226, 1);
    }
    body {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    h3 {
      color: rgba(133, 12, 12, 1);
    }
    P {
      color: rgba(133, 12, 12, 1);
    }
    .job {
      display: flex;
      justify-content: space-around;
      width: 902px;
    }
    .img {
      box-shadow: black 2px 2px 20px;
    }
    .description {
      margin-top: 70px;
    }
    .text {
      padding-top: 30px;
      width: 670px;
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