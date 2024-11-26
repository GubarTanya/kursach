<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
  <div class="wrapper">
    <AppHeader></AppHeader>
    <main>
      <RouterView></RouterView>
    </main>
    <AppFooter></AppFooter>
  </div>

</template>