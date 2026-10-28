<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="app-root">
        <RouterView />
    </div>
</template>

<style>


/* Гарантируем минимальную высоту */
html, body, #app {
    min-height: 100vh;
    margin: 0;
}

/* Корневой контейнер на всю высоту */
.app-root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Убираем старую навигацию, если не нужна */
nav {
    display: none;
}
</style>