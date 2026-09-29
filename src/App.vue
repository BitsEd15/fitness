<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HomeView from './views/HomeView.vue';

</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>

        <RouterView />
    </div>

</template>

<style>
	nav>*{
		color: white;
		margin: 0 10px 0 0;
	}
</style>
