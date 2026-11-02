<script setup>
import { ref, onMounted } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import ServiceCard from '@/components/ServiceCard.vue';
import { request } from '@/api/http';


const services = ref([]);//Начальное значение это пустой массив, потому что в момент открытия страницы данных ещё нет. В скрипте значение читается и пишется через .value, в шаблоне .value не нужен.
const isLoading = ref(true);
const errorMessage = ref('');

async function loadServices() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        services.value = await request('/services');
    } catch (error) {
        console.error(error);
        errorMessage.value = 'Не удалось загрузить услуги. Попробуйте позже.';
    } finally {
        isLoading.value = false;
    }

    // try {
    //     const response = await fetch(`${API_URL}/services`);

    //     if (!response.ok) {
    //         throw new Error(`Ошибка сервера: ${response.status}`);
    //     }

    //     services.value = await response.json();//важно не забывай await
    // } catch (error) {
    //     console.error(error);
    //     errorMessage.value = 'Не удалось загрузить услуги. Попробуйте позже.';
    // } finally {
    //     isLoading.value = false;
    // }
}

onMounted(loadServices);

</script>

<template>
    <div class="services-page">
        <TheHeader />
        <main class="services-page__main">
            <p v-if="isLoading">Загрузка...</p>
            <div v-else-if="errorMessage" role="alert">
                <p>{{ errorMessage }}</p>
                <button type="button" @click="loadServices">Повторить</button>
            </div>
            <p v-else-if="services.length === 0">Услуги пока не добавлены.</p>

            <template v-else>
                <ServiceCard v-for="service in services" :key="service.id" :service="service" />
            </template>
            <!-- Разница в том, чем гарантируется «показывается что-то одно»:

У тебя цепочка v-if / v-else-if / v-else-if и отдельно стоящий v-for. Он не часть цепочки, он выполняется всегда. Исключительность держится на допущении, что массив пуст, когда показано сообщение.
С v-else карточки показываются только тогда, когда не сработала ни одна из веток выше. Это гарантирует сама конструкция, а не состояние данных. -->

        </main>
        <TheFooter />
    </div>

</template>

<style>
.services-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
}

.services-page__main {
    flex: 1;
}
</style>