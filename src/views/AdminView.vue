<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

async function logout() {
    await auth.logout();
    router.replace({ name: 'admin-login' });
}
</script>

<template>
    <div class="admin-page">
        <h1>Админ-панель</h1>
        <p>Здесь будет редактирование услуг и цен.</p>
        <button class="g-button" type="button" @click="logout">Выйти</button>
    </div>
</template>

<style>
.admin-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
}
</style>
