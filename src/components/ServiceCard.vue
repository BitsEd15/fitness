<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
});

const SLIDE_INTERVAL = 5000; // миллисекунды

const currentIndex = ref(0);
const currentPrice = computed(() => props.service.prices[currentIndex.value]);

let timerId = null;//Номер нужен, чтобы потом остановить его через clearInterval(номер). Поэтому мы сохраняем его в timerId.

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.service.prices.length;//При трёх ценах: (0+1)%3 = 1, (1+1)%3 = 2, (2+1)%3 = 0. На последнем слайде индекс возвращается к нулю
}

const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
}

const startTimer = () => {
    stopTimer();//Почему startTimer начинается с stopTimer(). Это защита от двойных таймеров. Если вызвать startTimer дважды подряд (например, клик по точке во время работающего таймера), без этой строки запустились бы два интервала.
    if (props.service.prices.length < 2) return;//Для «Мини-групп» и «Беговых» с одной ценой переключать нечего, и таймер им не нужен.
    timerId = setInterval(nextSlide, SLIDE_INTERVAL);
}

const selectSlide = (index) => {
    currentIndex.value = index;
    startTimer();
}

const pauseOnHover = (event) => {
    if (event.pointerType === 'mouse') stopTimer();
}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
    <div class="service-card" @pointerenter="pauseOnHover" @pointerleave="startTimer">
        <h2 class="service-card__title">{{ service.title }}</h2>
        <p class="service-card__description">{{ service.description }}</p>

        <div v-if="currentPrice" class="service-card__price-block">
            <p class="service-card__label">{{ currentPrice.label }}</p>
            <p class="service-card__price">{{ priceFormatter.format(currentPrice.price)}}</p>
        </div>
        <div v-if="service.prices.length > 1" class="service-card__dots">
            <button v-for="(price, index) in service.prices" :key="price.id" type="button" class="service-card__dot"
                :class="{ 'service-card__dot--active': index === currentIndex }"
                :aria-label="`Показать вариант: ${price.label}`" @click="selectSlide(index)"></button>
        </div>
    </div>
</template>

<style>
.service-card__dots {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.service-card__dot {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
}

.service-card__dot::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
}

.service-card__dot--active::after {
    background: #333;
}
</style>